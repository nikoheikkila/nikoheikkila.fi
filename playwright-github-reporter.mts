import type {
	FullConfig,
	FullResult,
	Reporter,
	Suite,
	TestCase,
	TestResult,
	TestError,
} from "@playwright/test/reporter";
import * as core from "@actions/core";
import os from "node:os";

interface StoredResult {
	titlePath: string;
	status: string;
	duration: string;
	retries: string;
	tags: string;
}

export default class GitHubReporter implements Reporter {
	private config: FullConfig | undefined;
	private readonly results: StoredResult[] = [];

	private files = 0;
	private total = 0;
	private passes = 0;
	private failures = 0;
	private timeouts = 0;
	private skips = 0;

	public onBegin(config: FullConfig, suite: Suite): void {
		this.config = config;
		this.files = suite.suites.reduce((total, suite) => total + suite.suites.length, 0);
		this.total = suite.allTests().length;

		core.info(`Starting a test run with ${config.workers} workers and ${this.total} tests`);
		this.debug(`Playwright Configuration:${os.EOL.repeat(2)}${JSON.stringify(this.config, null, 2)}`);
	}

	public onTestBegin(test: TestCase, _result: TestResult): void {
		this.debug(`Starting test ${test.title}`);
	}

	public onStdOut(chunk: string | Buffer, _: TestCase, __: TestResult): void {
		this.onLog(chunk);
	}

	public onStdErr(chunk: string | Buffer, _: TestCase, __: TestResult): void {
		this.onLog(chunk);
	}

	public onError(error: TestError): void {
		const message = error.cause?.message || error.message || "Unknown error";
		core.error(message);
	}

	public onTestEnd(test: TestCase, result: TestResult) {
		this.debug(`${test.title} completed`);

		if (result.status === "skipped") {
			this.skips++;
		}

		if (result.status === "passed") {
			this.passes++;
		}

		if (result.status === "timedOut") {
			this.timeouts++;
		}

		if (result.status === "failed") {
			this.failures++;
		}

		this.results.push({
			titlePath: this.titlePath(test),
			status: this.status(result),
			duration: this.duration(result),
			retries: this.retries(test),
			tags: this.tags(test),
		});
	}

	public async onEnd(result: FullResult): Promise<void> {
		core.notice(`${this.passes} passed (${this.duration(result)})`);

		if (this.isSummaryAvailable()) {
			await this.saveSummary();
		}

		if (result.status !== "passed") {
			core.setFailed("Test run failed");
		}
	}

	private debug(message: string): void {
		if (core.isDebug()) {
			core.debug(message);
		}
	}

	private onLog(chunk: string | Buffer): void {
		if (!this.config?.quiet) {
			core.info(chunk.toString("utf-8"));
		}
	}

	private titlePath(test: TestCase) {
		return test.titlePath().filter(Boolean).join(" » ");
	}

	private status(result: TestResult): string {
		switch (result.status) {
			case "passed": return "✅ Passed";
			case "failed": return "❌ Failed";
			case "timedOut": return "⏰ Timed out";
			case "skipped": return "⚠️ Skipped";
			case "interrupted": return "🛑 Interrupted";
			default: return result.status;
		}
	}

	private duration(result: TestResult | FullResult): string {
		return `${(result.duration / 1000).toFixed(1)}s`;
	}

	private retries(testCase: TestCase): string {
		return testCase.retries === 0 ? "None" : testCase.retries.toString();
	}

	private tags(testCase: TestCase) {
		return testCase.tags.length > 0 ? testCase.tags.join(", ") : "None";
	}

	private get columns() {
		return [
			{ data: "Test", header: true },
			{ data: "Result", header: true },
			{ data: "Duration", header: true },
			{ data: "Retries", header: true },
			{ data: "Tags", header: true }
		];
	}

	private async saveSummary(): Promise<void> {
		const tableRows = [
			this.columns,
			...this.results.map(result => [
				result.titlePath,
				result.status,
				result.duration,
				result.retries,
				result.tags,
			]),
		];

		await core.summary
			.addHeading("🎭 Playwright Test Report", 2)
			.addHeading("Summary", 3)
			.addList([
				`📁 <strong>${this.files}</strong> test files total`,
				`🧪 <strong>${this.total}</strong> test cases total`,
				`✅ <strong>${this.passes}</strong> tests passed`,
				`❌ <strong>${this.failures}</strong> tests failed`,
				`⏰ <strong>${this.timeouts}</strong> tests timed out`,
				`⚠️ <strong>${this.skips}</strong> tests skipped`,
			])
			.addHeading("Details", 3)
			.addRaw("<details><summary>Show Test Cases</summary>", true)
			.addTable(tableRows)
			.addRaw("</details>", true)
			.write();
	}

	private isSummaryAvailable(): boolean {
		return process.env.GITHUB_STEP_SUMMARY !== undefined;
	}
}
