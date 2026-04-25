import type {
	FullConfig,
	FullResult,
	Reporter,
	Suite,
	TestCase,
	TestResult,
	TestError,
} from "@playwright/test/reporter";
import fs from "node:fs";
import os from "node:os";

export default class GitHubReporter implements Reporter {
	private suites = 0;
	private total = 0;
	private passes = 0;
	private failures = 0;
	private timeouts = 0;
	private skips = 0;
	private quiet = false;

	public onBegin(config: FullConfig, suite: Suite): void {
		this.suites = suite.suites.length;
		this.total = suite.allTests().length;
		this.quiet = config.quiet;

		this.info(`Starting a test run with ${this.total} tests`);
		this.debug(`Playwright Configuration${os.EOL.repeat(2)}${JSON.stringify(config, null, 2)}`);
	}

	public onTestBegin(test: TestCase, _result: TestResult): void {
		this.debug(`Starting test ${test.title}`);
	}

	public onStdOut(chunk: string | Buffer, _: TestCase, __: TestResult): void {
		if (this.quiet) {
			return;
		}

		this.info(chunk.toString("utf-8"));
	}

	public onStdErr(chunk: string | Buffer, _: TestCase, __: TestResult): void {
		if (this.quiet) {
			return;
		}

		this.error(chunk.toString("utf-8"));
	}

	public onError(error: TestError): void {
		const message = error.cause?.message || error.message || "Unknown error";
		this.error(message);
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
	}

	public async onEnd(result: FullResult): Promise<void> {
		this.notice(`${this.passes} passed (${this.duration(result)})`);
		await this.saveSummary();

		if (result.status !== "passed") {
			this.setFailed("Test run failed");
		}
	}

	private duration(result: FullResult): string {
		return `${(result.duration / 1000).toFixed(1)}s`;
	}

	private async saveSummary(): Promise<void> {
		const summaryFile = process.env.GITHUB_STEP_SUMMARY;

		if (!summaryFile) {
			return this.error("GitHub step summary not available");
		}

		await fs.promises.appendFile(summaryFile, this.conclusion);
	}

	private get conclusion(): string {
		return [
			"## 🎭 Playwright Test Report",
			"",
			"### Summary",
			"",
			`- 🧳 **${this.suites}** test suites total`,
			`- 🧪 **${this.total}** test cases total`,
			`- ✅ **${this.passes}** tests passed`,
			`- ❌ **${this.failures}** tests failed`,
			`- ⏰ **${this.timeouts}** tests timed out`,
			`- ⚠️ **${this.skips}** tests skipped`,
			"",
		].join(os.EOL);
	}

	private debug(message: string): void {
		if (this.isDebug) {
			process.stdout.write(`::debug::${message}${os.EOL}`);
		}
	}

	private info(message: string): void {
		process.stdout.write(message + os.EOL);
	}

	private notice(message: string): void {
		process.stdout.write(`::notice::${message}${os.EOL}`);
	}

	private error(message: string): void {
		process.stdout.write(`::error::${message}${os.EOL}`);
	}

	private setFailed(message: string): never {
		this.error(message);
		process.exit(1);
	}

	private get isDebug(): boolean {
		return process.env.RUNNER_DEBUG === "1";
	}
}
