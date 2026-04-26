import { defineConfig, type PlaywrightTestConfig } from "@playwright/test";

const baseURL = process.env.APP_URL || "http://localhost:8000";
const isPipeline = process.env.CI !== undefined;
const gitHubActionsReporter = "./playwright-github-reporter.mts";

const baseConfiguration: PlaywrightTestConfig = {
	name: "Acceptance Tests",
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

const localConfiguration: PlaywrightTestConfig = {
	webServer: {
		command: "task serve",
		reuseExistingServer: true,
		timeout: 120 * 1000,
		url: baseURL,
	},
};

const pipelineConfiguration: PlaywrightTestConfig = {
	forbidOnly: true,
	globalTimeout: 60 * 60 * 1000,
	reporter: [["dot"], [gitHubActionsReporter]],
	timeout: 60 * 1000,
	webServer: {
		command: "task serve",
		reuseExistingServer: false,
		timeout: 120 * 1000,
		url: baseURL,
	},
	workers: 2,
};

export default defineConfig({
	...baseConfiguration,
	...(isPipeline ? pipelineConfiguration : localConfiguration),
});
