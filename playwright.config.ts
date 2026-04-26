import { defineConfig, type PlaywrightTestConfig, type Project } from "@playwright/test";

const baseURL = process.env.APP_URL || "http://localhost:8000";
const isPipeline = process.env.CI !== undefined;
const isLocalServer = baseURL.startsWith("http://localhost");
const gitHubActionsReporter = "./playwright-github-reporter.ts";

const smokeProject: Project = {
	name: "Smoke Tests",
	testMatch: "**/smoke.test.ts",
	timeout: 30_000,
};

const baseConfiguration: PlaywrightTestConfig = {
	fullyParallel: true,
	reporter: "list",
	snapshotPathTemplate: "{testDir}/snapshots/{testFilePath}/{arg}{ext}",
	testDir: "src/__tests__/feature",
	use: {
		baseURL,
		ignoreHTTPSErrors: true,
		screenshot: "only-on-failure",
		trace: "retain-on-failure",
		video: "retain-on-failure",
	},
};

const webServer: PlaywrightTestConfig["webServer"] = {
	command: "task serve",
	reuseExistingServer: true,
	timeout: 120_000,
	url: baseURL,
};

const localConfiguration: PlaywrightTestConfig = {
	projects: [{ name: "E2E Tests (Local)", testIgnore: "**/smoke.test.ts" }, smokeProject],
	webServer: isLocalServer ? webServer : undefined,
};

const pipelineConfiguration: PlaywrightTestConfig = {
	forbidOnly: true,
	globalTimeout: 3_600_000,
	projects: [{ name: "E2E Tests (CI)", testIgnore: "**/smoke.test.ts" }, smokeProject],
	reporter: [["dot"], [gitHubActionsReporter]],
	timeout: 60_000,
	webServer: isLocalServer
		? {
				...webServer,
				reuseExistingServer: false,
			}
		: undefined,
	workers: 2,
};

export default defineConfig({
	...baseConfiguration,
	...(isPipeline ? pipelineConfiguration : localConfiguration),
});
