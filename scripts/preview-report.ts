#!/usr/bin/env bun

/**
 * Reports the outcome of a pull request's preview deployment as a single,
 * sticky PR comment.
 *
 * Runs in `.github/workflows/preview-comment.yml`, a separate `workflow_run`
 * reporter triggered after `CI` completes. That indirection exists so PRs
 * from forks and Dependabot — whose `pull_request` runs only ever get a
 * read-only token — can still be commented on, without ever handing a
 * write-scoped token to a job that executes PR-controlled code.
 *
 * Every identifying fact used here (run id/attempt/number, head SHA, head
 * repository) comes from the `workflow_run` event or the GitHub API, which
 * PR content cannot forge. The only PR-controlled input is the preview
 * result artifact, which is treated as untrusted: its URL is checked against
 * the exact, predictable preview origin before it is ever rendered, and a
 * "success" conclusion from a fork is never trusted (forks receive no
 * deployment secrets, so a real deployment cannot succeed for them).
 */
import * as fs from "node:fs/promises";
import * as os from "node:os";
import * as path from "node:path";
import {
	type DeploymentMetadata,
	type IssueComment,
	type PreviewUrlExpectation,
	type PullRequestAssociation,
	type WorkflowJob,
	buildFailureCommentBody,
	buildSuccessCommentBody,
	classifyConclusion,
	findDeploymentJob,
	findFailedStep,
	findStickyComment,
	isSameRepository,
	parseStoredMetadata,
	resolvePullRequestForCommit,
	shouldReplace,
	validatePreviewUrl,
} from "./preview-report/logic";

const GITHUB_API = "https://api.github.com";
const ARTIFACT_ENTRY_FILE = "preview-result.json";
const USER_AGENT = "nikoheikkila.fi-preview-reporter";

const env = (name: string): string => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

const githubFetch = async (token: string, apiPath: string, init: RequestInit = {}): Promise<Response> => {
	const response = await fetch(`${GITHUB_API}${apiPath}`, {
		...init,
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			"User-Agent": USER_AGENT,
			...init.headers,
		},
	});

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`GitHub API request failed (${response.status} ${response.statusText}): ${apiPath}\n${body}`);
	}

	return response;
};

const paginate = async <Item, Envelope>(
	token: string,
	apiPath: string,
	unwrap: (envelope: Envelope) => Item[],
): Promise<Item[]> => {
	const items: Item[] = [];
	let page = 1;

	for (;;) {
		const separator = apiPath.includes("?") ? "&" : "?";
		const response = await githubFetch(token, `${apiPath}${separator}per_page=100&page=${page}`);
		const batch = unwrap((await response.json()) as Envelope);
		items.push(...batch);

		if (batch.length < 100) {
			return items;
		}

		page += 1;
	}
};

const listWorkflowJobs = (token: string, owner: string, repo: string, runId: string, attempt: string) =>
	paginate<WorkflowJob, { jobs: WorkflowJob[] }>(
		token,
		`/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attempt}/jobs`,
		(envelope) => envelope.jobs,
	);

const listPullRequestsForCommit = (token: string, owner: string, repo: string, sha: string) =>
	paginate<PullRequestAssociation, PullRequestAssociation[]>(
		token,
		`/repos/${owner}/${repo}/commits/${sha}/pulls`,
		(envelope) => envelope,
	);

const getPullRequestState = async (token: string, owner: string, repo: string, number: number): Promise<string> => {
	const response = await githubFetch(token, `/repos/${owner}/${repo}/pulls/${number}`);
	const pr = (await response.json()) as { state: string };

	return pr.state;
};

const listIssueComments = (token: string, owner: string, repo: string, number: number) =>
	paginate<IssueComment, IssueComment[]>(
		token,
		`/repos/${owner}/${repo}/issues/${number}/comments`,
		(envelope) => envelope,
	);

const createIssueComment = (token: string, owner: string, repo: string, number: number, body: string) =>
	githubFetch(token, `/repos/${owner}/${repo}/issues/${number}/comments`, {
		method: "POST",
		body: JSON.stringify({ body }),
	});

const updateIssueComment = (token: string, owner: string, repo: string, commentId: number, body: string) =>
	githubFetch(token, `/repos/${owner}/${repo}/issues/comments/${commentId}`, {
		method: "PATCH",
		body: JSON.stringify({ body }),
	});

const findArtifactId = async (
	token: string,
	owner: string,
	repo: string,
	runId: string,
	name: string,
): Promise<number | undefined> => {
	const artifacts = await paginate<{ id: number; name: string }, { artifacts: { id: number; name: string }[] }>(
		token,
		`/repos/${owner}/${repo}/actions/runs/${runId}/artifacts`,
		(envelope) => envelope.artifacts,
	);

	return artifacts.find((artifact) => artifact.name === name)?.id;
};

/**
 * The artifact download endpoint replies with a 302 to a time-limited,
 * pre-signed storage URL. That second request must not carry our GitHub
 * token, so the redirect is followed manually.
 */
const downloadArtifactZip = async (
	token: string,
	owner: string,
	repo: string,
	artifactId: number,
): Promise<Uint8Array> => {
	const redirectResponse = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/actions/artifacts/${artifactId}/zip`, {
		redirect: "manual",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			"User-Agent": USER_AGENT,
		},
	});

	const location = redirectResponse.headers.get("location");

	if (redirectResponse.status !== 302 || !location) {
		throw new Error(
			`Unexpected response resolving artifact ${artifactId} download (status ${redirectResponse.status})`,
		);
	}

	const zipResponse = await fetch(location);

	if (!zipResponse.ok) {
		throw new Error(`Failed to download artifact ${artifactId} archive (status ${zipResponse.status})`);
	}

	return new Uint8Array(await zipResponse.arrayBuffer());
};

const extractArtifactJson = async (zipBytes: Uint8Array): Promise<unknown> => {
	const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "preview-artifact-"));

	try {
		const zipPath = path.join(tempDir, "artifact.zip");
		await Bun.write(zipPath, zipBytes);

		const unzip = Bun.spawn({
			cmd: ["unzip", "-p", zipPath, ARTIFACT_ENTRY_FILE],
			stdout: "pipe",
			stderr: "pipe",
		});
		const [stdout, stderr, exitCode] = await Promise.all([
			new Response(unzip.stdout).text(),
			new Response(unzip.stderr).text(),
			unzip.exited,
		]);

		if (exitCode !== 0) {
			throw new Error(`Failed to extract ${ARTIFACT_ENTRY_FILE} from the preview result artifact: ${stderr}`);
		}

		return JSON.parse(stdout);
	} finally {
		await fs.rm(tempDir, { recursive: true, force: true });
	}
};

const readDeploymentUrl = async (
	token: string,
	owner: string,
	repo: string,
	runId: string,
	artifactName: string,
): Promise<string> => {
	const artifactId = await findArtifactId(token, owner, repo, runId, artifactName);

	if (artifactId === undefined) {
		throw new Error(`Preview result artifact "${artifactName}" was not found for run ${runId}`);
	}

	const zipBytes = await downloadArtifactZip(token, owner, repo, artifactId);
	const payload = await extractArtifactJson(zipBytes);

	if (typeof payload !== "object" || payload === null || typeof (payload as { url?: unknown }).url !== "string") {
		throw new Error(`Preview result artifact "${artifactName}" did not contain a valid url field`);
	}

	return (payload as { url: string }).url;
};

const writeStickyComment = async (
	token: string,
	owner: string,
	repo: string,
	prNumber: number,
	body: string,
	metadata: DeploymentMetadata,
): Promise<void> => {
	const comments = await listIssueComments(token, owner, repo, prNumber);
	const existing = findStickyComment(comments);
	const storedMetadata = existing ? parseStoredMetadata(existing.body) : undefined;

	if (!shouldReplace(storedMetadata, metadata)) {
		console.log(`Skipping comment update: a newer deployment (run ${storedMetadata?.runId}) already reported.`);
		return;
	}

	if (existing) {
		await updateIssueComment(token, owner, repo, existing.id, body);
	} else {
		await createIssueComment(token, owner, repo, prNumber, body);
	}
};

const main = async (): Promise<void> => {
	const token = env("GITHUB_TOKEN");
	const [owner, repo] = env("GITHUB_REPOSITORY").split("/");
	const runId = env("RUN_ID");
	const runAttempt = env("RUN_ATTEMPT");
	const runNumber = Number(env("RUN_NUMBER"));
	const headSha = env("HEAD_SHA");
	const headRepoFullName = env("HEAD_REPOSITORY");
	const eventName = env("EVENT_NAME");
	const expectation: PreviewUrlExpectation = {
		workerServiceName: process.env.WORKER_SERVICE_NAME || "blog",
		workersDevSubdomain: process.env.WORKERS_DEV_SUBDOMAIN || "yo-062",
	};

	if (eventName !== "pull_request") {
		console.log(`Skipping: originating event was "${eventName}", not "pull_request".`);
		return;
	}

	const jobs = await listWorkflowJobs(token, owner, repo, runId, runAttempt);
	const deployJob = findDeploymentJob(jobs);
	const outcome = classifyConclusion(deployJob?.conclusion);

	if (outcome === "skip") {
		console.log(`Skipping: preview deployment job conclusion was "${deployJob?.conclusion ?? "not found"}".`);
		return;
	}

	const baseRepoFullName = `${owner}/${repo}`;
	const isFork = !isSameRepository(headRepoFullName, baseRepoFullName);

	if (outcome === "success" && isFork) {
		// Fork PRs never receive deployment secrets, so a real deployment cannot
		// have succeeded. Trusting this would let a PR-controlled workflow forge
		// a "success" comment with an arbitrary link.
		console.warn(
			`Ignoring a "success" conclusion from fork ${headRepoFullName}: forks cannot receive deployment secrets, ` +
				"so this cannot be a genuine deployment.",
		);
		return;
	}

	const candidates = await listPullRequestsForCommit(token, owner, repo, headSha);
	const prNumber = resolvePullRequestForCommit(candidates, headSha, headRepoFullName);

	if (prNumber === undefined) {
		console.log("Skipping: could not uniquely resolve the pull request for this commit.");
		return;
	}

	const prState = await getPullRequestState(token, owner, repo, prNumber);

	if (prState !== "open") {
		console.log(`Skipping: pull request #${prNumber} is "${prState}", not open.`);
		return;
	}

	const jobUrl = deployJob?.html_url ?? `https://github.com/${owner}/${repo}/actions/runs/${runId}`;
	const metadata: DeploymentMetadata = { runId: Number(runId), runNumber, runAttempt: Number(runAttempt) };

	let body: string;

	if (outcome === "success") {
		const artifactName = `preview-result-${runId}-${runAttempt}`;
		const url = await readDeploymentUrl(token, owner, repo, runId, artifactName);

		if (!validatePreviewUrl(url, prNumber, expectation)) {
			throw new Error(`Refusing to report success: URL "${url}" does not match the expected preview origin.`);
		}

		body = buildSuccessCommentBody({ url, headSha, jobUrl, metadata });
	} else {
		const stepName = (deployJob && findFailedStep(deployJob)) ?? deployJob?.name ?? "Deploy to Preview";
		body = buildFailureCommentBody({ stepName, headSha, jobUrl, metadata });
	}

	await writeStickyComment(token, owner, repo, prNumber, body, metadata);
	console.log(`Reported preview deployment ${outcome} for pull request #${prNumber}.`);
};

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
