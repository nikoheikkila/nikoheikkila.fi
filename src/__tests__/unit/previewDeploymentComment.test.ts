import { describe, expect, test } from "vitest";
import {
	type DeploymentMetadata,
	type IssueComment,
	type PullRequestAssociation,
	type WorkflowJob,
	BOT_LOGIN,
	DEFAULT_WORKER_SERVICE_NAME,
	DEFAULT_WORKERS_DEV_SUBDOMAIN,
	META_PREFIX,
	META_SUFFIX,
	STATUS_MARKER,
	buildExpectedPreviewOrigin,
	buildFailureCommentBody,
	buildSuccessCommentBody,
	classifyConclusion,
	escapeInlineCode,
	findDeploymentJob,
	findFailedStep,
	findStickyComment,
	isSameRepository,
	parseStoredMetadata,
	resolvePullRequestForCommit,
	shouldReplace,
} from "../../../scripts/preview-report/logic";

const expectation = {
	workerServiceName: DEFAULT_WORKER_SERVICE_NAME,
	workersDevSubdomain: DEFAULT_WORKERS_DEV_SUBDOMAIN,
};
const previewUrl = (prNumber: number): string =>
	`https://${DEFAULT_WORKER_SERVICE_NAME}-pr-${prNumber}.${DEFAULT_WORKERS_DEV_SUBDOMAIN}.workers.dev`;

const job = (overrides: Partial<WorkflowJob> = {}): WorkflowJob => ({
	name: "Deploy to Preview",
	conclusion: "success",
	html_url: "https://github.com/nikoheikkila/nikoheikkila.fi/actions/runs/1/job/1",
	steps: [],
	...overrides,
});

const pullRequest = (overrides: Partial<PullRequestAssociation> = {}): PullRequestAssociation => ({
	number: 42,
	state: "open",
	head: { sha: "abc123", repo: { full_name: "nikoheikkila/nikoheikkila.fi" } },
	...overrides,
});

const comment = (overrides: Partial<IssueComment> = {}): IssueComment => ({
	id: 1,
	body: "",
	user: { login: BOT_LOGIN },
	...overrides,
});

const metadata = (overrides: Partial<DeploymentMetadata> = {}): DeploymentMetadata => ({
	runId: 100,
	runNumber: 10,
	runAttempt: 1,
	...overrides,
});

describe("classifyConclusion", () => {
	test.each([
		["skipped", "skip"],
		["cancelled", "skip"],
		[null, "skip"],
		[undefined, "skip"],
		["success", "success"],
		["failure", "failure"],
		["timed_out", "failure"],
		["action_required", "failure"],
	] as const)("given conclusion %s, classifies as %s", (conclusion, expected) => {
		expect(classifyConclusion(conclusion)).toBe(expected);
	});
});

describe("findDeploymentJob", () => {
	test("finds the job named Deploy to Preview", () => {
		const target = job();
		expect(findDeploymentJob([job({ name: "Unit Tests" }), target])).toBe(target);
	});

	test("returns undefined when absent", () => {
		expect(findDeploymentJob([job({ name: "Unit Tests" })])).toBeUndefined();
	});
});

describe("isSameRepository", () => {
	test("matches case-insensitively", () => {
		expect(isSameRepository("Niko/Repo", "niko/repo")).toBe(true);
	});

	test("rejects different repositories", () => {
		expect(isSameRepository("niko/repo", "attacker/repo")).toBe(false);
	});
});

describe("resolvePullRequestForCommit", () => {
	test("resolves the single open PR matching sha and head repository", () => {
		const pr = pullRequest();
		expect(resolvePullRequestForCommit([pr], "abc123", "nikoheikkila/nikoheikkila.fi")).toBe(42);
	});

	test("ignores closed pull requests", () => {
		const pr = pullRequest({ state: "closed" });
		expect(resolvePullRequestForCommit([pr], "abc123", "nikoheikkila/nikoheikkila.fi")).toBeUndefined();
	});

	test("ignores mismatched head sha", () => {
		const pr = pullRequest({ head: { sha: "different", repo: { full_name: "nikoheikkila/nikoheikkila.fi" } } });
		expect(resolvePullRequestForCommit([pr], "abc123", "nikoheikkila/nikoheikkila.fi")).toBeUndefined();
	});

	test("ignores mismatched head repository (spoofed PR number cannot be trusted from a fork)", () => {
		const pr = pullRequest({ head: { sha: "abc123", repo: { full_name: "some-fork/repo" } } });
		expect(resolvePullRequestForCommit([pr], "abc123", "nikoheikkila/nikoheikkila.fi")).toBeUndefined();
	});

	test("ignores entries with no repo association", () => {
		const pr = pullRequest({ head: { sha: "abc123", repo: null } });
		expect(resolvePullRequestForCommit([pr], "abc123", "nikoheikkila/nikoheikkila.fi")).toBeUndefined();
	});

	test("refuses to pick when multiple pull requests match ambiguously", () => {
		const first = pullRequest({ number: 1 });
		const second = pullRequest({ number: 2 });
		expect(resolvePullRequestForCommit([first, second], "abc123", "nikoheikkila/nikoheikkila.fi")).toBeUndefined();
	});
});

describe("buildExpectedPreviewOrigin", () => {
	test("builds the predictable preview origin", () => {
		expect(buildExpectedPreviewOrigin(42, expectation)).toBe(previewUrl(42));
	});
});

describe("escapeInlineCode", () => {
	test("neutralises backticks so a code span cannot be broken out of", () => {
		expect(escapeInlineCode("`) malicious [link](javascript:alert(1))")).not.toContain("`");
	});

	test("collapses newlines to spaces", () => {
		expect(escapeInlineCode("Deploy\nStep")).toBe("Deploy Step");
	});

	test("truncates excessively long names", () => {
		const long = "a".repeat(500);
		const result = escapeInlineCode(long);
		expect(result.length).toBeLessThan(500);
		expect(result.endsWith("…")).toBe(true);
	});

	test("falls back to a non-empty placeholder when the input is blank", () => {
		expect(escapeInlineCode("   ")).toBe("Deploy to Preview");
	});
});

describe("findFailedStep", () => {
	test("returns the first non-success, non-skipped step", () => {
		const target = job({
			steps: [
				{ name: "Checkout", conclusion: "success" },
				{ name: "Deploy", conclusion: "failure" },
				{ name: "Post Deploy", conclusion: "cancelled" },
			],
		});
		expect(findFailedStep(target)).toBe("Deploy");
	});

	test("returns undefined when every step succeeded or was skipped", () => {
		const target = job({
			steps: [
				{ name: "Checkout", conclusion: "success" },
				{ name: "Optional", conclusion: "skipped" },
			],
		});
		expect(findFailedStep(target)).toBeUndefined();
	});
});

describe("comment bodies", () => {
	const meta = metadata();

	test("success body links the preview and embeds machine-readable metadata", () => {
		const body = buildSuccessCommentBody({
			url: previewUrl(42),
			headSha: "abcdef1234567",
			jobUrl: "https://github.com/o/r/actions/runs/1/job/1",
			metadata: meta,
		});

		expect(body).toContain(STATUS_MARKER);
		expect(body).toContain(`[Open preview](${previewUrl(42)})`);
		expect(body).toContain("`abcdef1`");
		expect(body).toContain("[Deployment logs](https://github.com/o/r/actions/runs/1/job/1)");
		expect(parseStoredMetadata(body)).toStrictEqual(meta);
	});

	test("failure body names the failed step and escapes untrusted content", () => {
		const body = buildFailureCommentBody({
			stepName: "Deploy`) </code><script>alert(1)</script>",
			headSha: "abcdef1234567",
			jobUrl: "https://github.com/o/r/actions/runs/1/job/1",
			metadata: meta,
		});

		expect(body).toContain(STATUS_MARKER);
		expect(body).toContain("Preview deployment failed");
		expect(body).not.toContain("`) </code>");
		expect(parseStoredMetadata(body)).toStrictEqual(meta);
	});
});

describe("findStickyComment", () => {
	test("finds the bot-owned comment carrying the status marker", () => {
		const target = comment({ body: `${STATUS_MARKER}\nhello` });
		expect(findStickyComment([comment({ user: { login: "someone-else" }, body: STATUS_MARKER }), target])).toBe(target);
	});

	test("ignores comments without the marker even from the bot", () => {
		expect(findStickyComment([comment({ body: "unrelated" })])).toBeUndefined();
	});

	test("ignores the marker from a non-bot author", () => {
		expect(findStickyComment([comment({ user: { login: "someone-else" }, body: STATUS_MARKER })])).toBeUndefined();
	});
});

describe("parseStoredMetadata", () => {
	test("extracts previously stored metadata", () => {
		const meta = metadata();
		const body = `${STATUS_MARKER}\n${META_PREFIX}${JSON.stringify(meta)}${META_SUFFIX}`;
		expect(parseStoredMetadata(body)).toStrictEqual(meta);
	});

	test("returns undefined when no metadata marker is present", () => {
		expect(parseStoredMetadata("no marker here")).toBeUndefined();
	});

	test("returns undefined for malformed JSON", () => {
		expect(parseStoredMetadata(`${META_PREFIX}{not json${META_SUFFIX}`)).toBeUndefined();
	});

	test("returns undefined when required fields are missing", () => {
		expect(parseStoredMetadata(`${META_PREFIX}${JSON.stringify({ runId: 1 })}${META_SUFFIX}`)).toBeUndefined();
	});
});

describe("shouldReplace", () => {
	test("always writes when nothing is stored yet", () => {
		expect(shouldReplace(undefined, metadata())).toBe(true);
	});

	test("a newer run number wins", () => {
		expect(shouldReplace(metadata({ runNumber: 10 }), metadata({ runNumber: 11 }))).toBe(true);
	});

	test("an older run number never overwrites a newer one that already reported", () => {
		expect(shouldReplace(metadata({ runNumber: 11 }), metadata({ runNumber: 10 }))).toBe(false);
	});

	test("a rerun of the same run number with a higher attempt still wins", () => {
		expect(shouldReplace(metadata({ runNumber: 10, runAttempt: 1 }), metadata({ runNumber: 10, runAttempt: 2 }))).toBe(
			true,
		);
	});

	test("a stale attempt of the same run number is rejected", () => {
		expect(shouldReplace(metadata({ runNumber: 10, runAttempt: 2 }), metadata({ runNumber: 10, runAttempt: 1 }))).toBe(
			false,
		);
	});

	test("the same run and attempt reporting again is idempotent", () => {
		expect(shouldReplace(metadata({ runNumber: 10, runAttempt: 1 }), metadata({ runNumber: 10, runAttempt: 1 }))).toBe(
			true,
		);
	});
});
