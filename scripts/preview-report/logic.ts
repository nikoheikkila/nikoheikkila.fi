/**
 * Pure decision logic for the preview deployment reporter.
 *
 * Kept free of network/filesystem I/O so it can be unit tested with plain
 * fixtures. `scripts/preview-report.ts` wires these functions to the real
 * GitHub API and the running workflow context.
 */

export const DEPLOY_JOB_NAME = "Deploy to Preview";
export const STATUS_MARKER = "<!-- preview-deployment-status:v1 -->";
export const META_PREFIX = "<!-- preview-deployment-meta:";
export const META_SUFFIX = " -->";
export const BOT_LOGIN = "github-actions[bot]";
const MAX_STEP_NAME_LENGTH = 200;

export type DeploymentOutcome = "skip" | "success" | "failure";

export interface JobStep {
	name: string;
	conclusion: string | null;
}

export interface WorkflowJob {
	name: string;
	conclusion: string | null;
	html_url: string;
	steps: JobStep[];
}

export interface PullRequestAssociation {
	number: number;
	state: string;
	head: { sha: string; repo: { full_name: string } | null };
}

export interface PullRequestDetails {
	number: number;
	state: string;
	head: { sha: string };
}

export interface IssueComment {
	id: number;
	body: string;
	user: { login: string } | null;
}

export interface DeploymentMetadata {
	runId: number;
	runNumber: number;
	runAttempt: number;
}

export interface PreviewUrlExpectation {
	workerServiceName: string;
	workersDevSubdomain: string;
}

/** Skip: no genuine deployment attempt happened. Anything else is reportable. */
export const classifyConclusion = (conclusion: string | null | undefined): DeploymentOutcome => {
	if (conclusion == null || conclusion === "skipped" || conclusion === "cancelled") {
		return "skip";
	}

	return conclusion === "success" ? "success" : "failure";
};

export const findDeploymentJob = (jobs: WorkflowJob[]): WorkflowJob | undefined =>
	jobs.find((job) => job.name === DEPLOY_JOB_NAME);

export const isSameRepository = (a: string, b: string): boolean => a.toLowerCase() === b.toLowerCase();

/**
 * The `pull_requests` array on the `workflow_run` event is unreliable (it is
 * frequently empty even for same-repository PRs), so the commit is the only
 * trustworthy way to resolve which open PR a run belongs to. Both the head
 * SHA and the head repository must match what GitHub reports for the run
 * itself — never trust these fields from anywhere else (e.g. an artifact).
 */
export const resolvePullRequestForCommit = (
	candidates: PullRequestAssociation[],
	headSha: string,
	headRepoFullName: string,
): number | undefined => {
	const matches = candidates.filter(
		(pr) =>
			pr.state === "open" &&
			pr.head.sha === headSha &&
			pr.head.repo !== null &&
			isSameRepository(pr.head.repo.full_name, headRepoFullName),
	);

	return matches.length === 1 ? matches[0].number : undefined;
};

export const buildExpectedPreviewOrigin = (prNumber: number, expectation: PreviewUrlExpectation): string =>
	`https://${expectation.workerServiceName}-pr-${prNumber}.${expectation.workersDevSubdomain}.workers.dev`;

/** A deployment can only ever report success for the exact, predictable preview origin. */
export const validatePreviewUrl = (url: string, prNumber: number, expectation: PreviewUrlExpectation): boolean => {
	const expected = buildExpectedPreviewOrigin(prNumber, expectation);

	return url === expected || url === `${expected}/`;
};

/** Neutralises Markdown/HTML breakout characters in untrusted job/step names. */
export const escapeInlineCode = (text: string): string => {
	const singleLine = text.replace(/[\r\n]+/g, " ").trim();
	const truncated =
		singleLine.length > MAX_STEP_NAME_LENGTH ? `${singleLine.slice(0, MAX_STEP_NAME_LENGTH)}…` : singleLine;

	return truncated.replace(/`/g, "'") || DEPLOY_JOB_NAME;
};

export const findFailedStep = (job: WorkflowJob): string | undefined =>
	job.steps.find((step) => step.conclusion !== null && step.conclusion !== "success" && step.conclusion !== "skipped")
		?.name;

export const buildSuccessCommentBody = (params: {
	url: string;
	headSha: string;
	jobUrl: string;
	metadata: DeploymentMetadata;
}): string =>
	[
		STATUS_MARKER,
		"### 🚀 Preview deployment succeeded",
		"",
		`[Open preview](${params.url})`,
		"",
		`Commit: \`${params.headSha.slice(0, 7)}\` | [Deployment logs](${params.jobUrl})`,
		"",
		`${META_PREFIX}${JSON.stringify(params.metadata)}${META_SUFFIX}`,
	].join("\n");

export const buildFailureCommentBody = (params: {
	stepName: string;
	headSha: string;
	jobUrl: string;
	metadata: DeploymentMetadata;
}): string =>
	[
		STATUS_MARKER,
		"### Preview deployment failed",
		"",
		`Failed during **\`${escapeInlineCode(params.stepName)}\`**.`,
		"",
		`Commit: \`${params.headSha.slice(0, 7)}\` | [Deployment logs](${params.jobUrl})`,
		"",
		`${META_PREFIX}${JSON.stringify(params.metadata)}${META_SUFFIX}`,
	].join("\n");

export const findStickyComment = (comments: IssueComment[]): IssueComment | undefined =>
	comments.find((comment) => comment.user?.login === BOT_LOGIN && comment.body.includes(STATUS_MARKER));

export const parseStoredMetadata = (body: string): DeploymentMetadata | undefined => {
	const start = body.indexOf(META_PREFIX);

	if (start === -1) {
		return undefined;
	}

	const jsonStart = start + META_PREFIX.length;
	const end = body.indexOf(META_SUFFIX, jsonStart);

	if (end === -1) {
		return undefined;
	}

	try {
		const parsed: unknown = JSON.parse(body.slice(jsonStart, end));

		if (
			typeof parsed === "object" &&
			parsed !== null &&
			typeof (parsed as DeploymentMetadata).runId === "number" &&
			typeof (parsed as DeploymentMetadata).runNumber === "number" &&
			typeof (parsed as DeploymentMetadata).runAttempt === "number"
		) {
			return parsed as DeploymentMetadata;
		}

		return undefined;
	} catch {
		return undefined;
	}
};

/**
 * Monotonic ordering guard: a rerun of the same run (higher attempt) must
 * still win, but a run that started earlier (lower run number) must never
 * overwrite a status already written by a later run.
 */
export const shouldReplace = (stored: DeploymentMetadata | undefined, candidate: DeploymentMetadata): boolean => {
	if (!stored) {
		return true;
	}

	if (candidate.runNumber !== stored.runNumber) {
		return candidate.runNumber > stored.runNumber;
	}

	return candidate.runAttempt >= stored.runAttempt;
};
