#!/usr/bin/env bun

/**
 * Reports the outcome of a pull request's preview deployment as a single,
 * sticky PR comment and a `Preview Deployment` commit status on the PR head,
 * which branch protection can require.
 *
 * Runs as the `report` job of `.github/workflows/preview.yml`, a `workflow_run`
 * workflow triggered after `CI` completes, which also deploys the preview. That indirection exists so PRs
 * from forks and Dependabot — whose `pull_request` runs only ever get a
 * read-only token — can still be commented on, without ever handing a
 * write-scoped token to a job that executes PR-controlled code.
 *
 * Every fact used here (run id/attempt/number, head SHA, head repository)
 * comes from the `workflow_run` event or the GitHub API, which PR content
 * cannot forge. The preview URL is never taken from PR-controlled output —
 * it is the one predictable origin a preview deployment can ever use, so it
 * is derived directly from the resolved PR number. A "success" conclusion
 * from a fork is never trusted (forks receive no deployment secrets, so a
 * real deployment cannot succeed for them).
 */
import {
	type CommitStatus,
	type DeploymentMetadata,
	type DeploymentOutcome,
	type DeploymentReport,
	type IssueComment,
	type PreviewUrlExpectation,
	type PullRequestAssociation,
	type WorkflowJob,
	DEFAULT_PREVIEW_WORKER_NAME,
	DEFAULT_WORKERS_DEV_SUBDOMAIN,
	buildCommitStatus,
	buildFailureCommentBody,
	buildSuccessCommentBody,
	classifyConclusion,
	describeDeployment,
	findDeploymentJob,
	findStickyComment,
	isSameRepository,
	parseStoredMetadata,
	resolvePullRequestForCommit,
	shouldReplace,
} from "./preview-report/logic";

const GITHUB_API = "https://api.github.com";
const USER_AGENT = "nikoheikkila.fi-preview-reporter";
const PAGE_SIZE = 100;

/** The authenticated repository every GitHub API call in this script targets. */
interface Repository {
	token: string;
	owner: string;
	repo: string;
}

const env = (name: string): string => {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}

	return value;
};

/** Workflow commands GitHub Actions renders as annotations on the job summary. */
const logWarning = (message: string): void => {
	console.log(`::warning::${message.replace(/\r?\n/gu, " ")}`);
};

const logError = (message: string): void => {
	console.log(`::error::${message.replace(/\r?\n/gu, " ")}`);
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
	page = 1,
): Promise<Item[]> => {
	const separator = apiPath.includes("?") ? "&" : "?";
	const response = await githubFetch(token, `${apiPath}${separator}per_page=${PAGE_SIZE}&page=${page}`);
	const envelope: Envelope = await response.json();
	const batch = unwrap(envelope);

	if (batch.length < PAGE_SIZE) {
		return batch;
	}

	return [...batch, ...(await paginate(token, apiPath, unwrap, page + 1))];
};

const listWorkflowJobs = ({ token, owner, repo }: Repository, runId: string, attempt: string) =>
	paginate<WorkflowJob, { jobs: WorkflowJob[] }>(
		token,
		`/repos/${owner}/${repo}/actions/runs/${runId}/attempts/${attempt}/jobs`,
		(envelope) => envelope.jobs,
	);

const listPullRequestsForCommit = ({ token, owner, repo }: Repository, sha: string) =>
	paginate<PullRequestAssociation, PullRequestAssociation[]>(
		token,
		`/repos/${owner}/${repo}/commits/${sha}/pulls`,
		(envelope) => envelope,
	);

const getPullRequestState = async ({ token, owner, repo }: Repository, number: number): Promise<string> => {
	const response = await githubFetch(token, `/repos/${owner}/${repo}/pulls/${number}`);
	const pr: { state: string } = await response.json();

	return pr.state;
};

const listIssueComments = ({ token, owner, repo }: Repository, number: number) =>
	paginate<IssueComment, IssueComment[]>(
		token,
		`/repos/${owner}/${repo}/issues/${number}/comments`,
		(envelope) => envelope,
	);

const createIssueComment = ({ token, owner, repo }: Repository, number: number, body: string) =>
	githubFetch(token, `/repos/${owner}/${repo}/issues/${number}/comments`, {
		method: "POST",
		body: JSON.stringify({ body }),
	});

const updateIssueComment = ({ token, owner, repo }: Repository, commentId: number, body: string) =>
	githubFetch(token, `/repos/${owner}/${repo}/issues/comments/${commentId}`, {
		method: "PATCH",
		body: JSON.stringify({ body }),
	});

const createCommitStatus = ({ token, owner, repo }: Repository, sha: string, status: CommitStatus) =>
	githubFetch(token, `/repos/${owner}/${repo}/statuses/${sha}`, {
		method: "POST",
		body: JSON.stringify(status),
	});

const writeStickyComment = async (
	repository: Repository,
	prNumber: number,
	body: string,
	metadata: DeploymentMetadata,
): Promise<void> => {
	const comments = await listIssueComments(repository, prNumber);
	const existing = findStickyComment(comments);
	const storedMetadata = existing ? parseStoredMetadata(existing.body) : undefined;

	if (!shouldReplace(storedMetadata, metadata)) {
		console.log(`Skipping comment update: a newer deployment (run ${storedMetadata?.runId}) already reported.`);
		return;
	}

	if (existing) {
		await updateIssueComment(repository, existing.id, body);
	} else {
		await createIssueComment(repository, prNumber, body);
	}
};

/** Facts about the finished `CI` run, all taken from the `workflow_run` event. */
interface RunContext {
	repository: Repository;
	runId: string;
	runAttempt: string;
	runNumber: number;
	headSha: string;
	headRepoFullName: string;
	eventName: string;
	expectation: PreviewUrlExpectation;
}

const readRunContext = (): RunContext => {
	const [owner, repo] = env("GITHUB_REPOSITORY").split("/");

	return {
		repository: { token: env("GITHUB_TOKEN"), owner, repo },
		runId: env("RUN_ID"),
		runAttempt: env("RUN_ATTEMPT"),
		runNumber: Number(env("RUN_NUMBER")),
		headSha: env("HEAD_SHA"),
		headRepoFullName: env("HEAD_REPOSITORY"),
		eventName: env("EVENT_NAME"),
		expectation: {
			previewWorkerName: process.env.PREVIEW_WORKER_NAME || DEFAULT_PREVIEW_WORKER_NAME,
			workersDevSubdomain: process.env.WORKERS_DEV_SUBDOMAIN || DEFAULT_WORKERS_DEV_SUBDOMAIN,
		},
	};
};

/** Resolves the open pull request the run's head commit belongs to, logging why when there is none. */
const findOpenPullRequest = async ({
	repository,
	headSha,
	headRepoFullName,
}: RunContext): Promise<number | undefined> => {
	const candidates = await listPullRequestsForCommit(repository, headSha);
	const prNumber = resolvePullRequestForCommit(candidates, headSha, headRepoFullName);

	if (prNumber === undefined) {
		console.log("Skipping: could not uniquely resolve the pull request for this commit.");
		return undefined;
	}

	const prState = await getPullRequestState(repository, prNumber);

	if (prState !== "open") {
		console.log(`Skipping: pull request #${prNumber} is "${prState}", not open.`);
		return undefined;
	}

	return prNumber;
};

const buildComment = (
	{ runId, runAttempt, runNumber, headSha }: RunContext,
	{ outcome, previewUrl, jobUrl, stepName }: DeploymentReport,
): { body: string; metadata: DeploymentMetadata } => {
	const metadata: DeploymentMetadata = { runId: Number(runId), runNumber, runAttempt: Number(runAttempt) };

	if (outcome === "success") {
		return { body: buildSuccessCommentBody({ url: previewUrl, headSha, jobUrl, metadata }), metadata };
	}

	return { body: buildFailureCommentBody({ stepName, headSha, jobUrl, metadata }), metadata };
};

const publishReport = async (context: RunContext, report: DeploymentReport, prNumber: number): Promise<void> => {
	const { body, metadata } = buildComment(context, report);

	// Statuses are keyed by commit, so they need no ordering guard. Both writes run even if one fails.
	const results = await Promise.allSettled([
		createCommitStatus(context.repository, context.headSha, buildCommitStatus(report)),
		writeStickyComment(context.repository, prNumber, body, metadata),
	]);
	const failed = results.find((result) => result.status === "rejected");
	if (failed) {
		throw failed.reason;
	}

	console.log(`Reported preview deployment ${report.outcome} for pull request #${prNumber}.`);
};

/**
 * Fork PRs never receive deployment secrets, so a real deployment cannot
 * have succeeded. Trusting this would let a PR-controlled workflow forge
 * a "success" comment with an arbitrary link.
 */
const isForgedSuccess = ({ repository, headRepoFullName }: RunContext, outcome: DeploymentOutcome): boolean => {
	const baseRepoFullName = `${repository.owner}/${repository.repo}`;
	const isFork = !isSameRepository(headRepoFullName, baseRepoFullName);

	if (outcome === "success" && isFork) {
		logWarning(
			`Ignoring a "success" conclusion from fork ${headRepoFullName}: forks cannot receive deployment secrets, ` +
				"so this cannot be a genuine deployment.",
		);
		return true;
	}

	return false;
};

const main = async (): Promise<void> => {
	const context = readRunContext();
	const { repository, eventName } = context;

	if (eventName !== "pull_request") {
		console.log(`Skipping: originating event was "${eventName}", not "pull_request".`);
		return;
	}

	const jobs = await listWorkflowJobs(repository, context.runId, context.runAttempt);
	const deployJob = findDeploymentJob(jobs);
	const outcome = classifyConclusion(deployJob?.conclusion);

	if (outcome === "skip") {
		console.log(`Skipping: preview deployment job conclusion was "${deployJob?.conclusion ?? "not found"}".`);
		return;
	}

	if (isForgedSuccess(context, outcome)) {
		return;
	}

	const prNumber = await findOpenPullRequest(context);

	if (prNumber === undefined) {
		return;
	}

	const runUrl = `https://github.com/${repository.owner}/${repository.repo}/actions/runs/${context.runId}`;
	const report = describeDeployment({ outcome, deployJob, prNumber, expectation: context.expectation, runUrl });

	await publishReport(context, report, prNumber);
};

main().catch((error: unknown) => {
	logError(error instanceof Error ? error.message : String(error));
	process.exitCode = 1;
});
