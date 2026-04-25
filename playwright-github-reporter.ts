import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import fs from "node:fs";
import os from "node:os";

export default class GitHubReporter implements Reporter {
	private suites = 0;
	private total = 0;
	private passes = 0;
	private failures = 0;
	private timeouts = 0;
	private skips = 0;

	public onBegin(config: FullConfig, suite: Suite): void {
		this.suites = suite.suites.length;
		this.total = suite.allTests().length;

		this.info(`Starting a test run with ${this.total} tests`);
		this.debug(`Playwright Configuration${os.EOL.repeat(2)}${JSON.stringify(config, null, 2)}`);
	}

	public onTestBegin(test: TestCase, _result: TestResult): void {
		this.debug(`Starting test ${test.title}`);
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
	}

	private duration(result: FullResult): string {
		// 34 passed (39.1s)

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
			`- 🧳 **${this.suites}** test files total`,
			`- 🧪 **${this.total}** tests total`,
			`- ✅ **${this.passes}** tests passed`,
			`- ❌ **${this.failures}** tests failed`,
			`- ⏰ **${this.timeouts}** tests timed out`,
			`- ⚠️ **${this.skips}** tests skipped`,
			"",
		].join(os.EOL);
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

	private debug(message: string): void {
		if (this.isDebug) {
			process.stdout.write(`::debug::${message}${os.EOL}`);
		}
	}

	private get isDebug(): boolean {
		return process.env.RUNNER_DEBUG === "1";
	}
}
