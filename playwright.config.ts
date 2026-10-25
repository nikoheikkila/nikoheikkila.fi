import { defineConfig, devices, type PlaywrightTestConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const baseURL = process.env.APP_URL || "http://localhost:8000";
const isPipeline = process.env.CI !== undefined;
const gitHubActionsReporter = "@nikoheikkila/playwright-github-actions-reporter";

const bddTestDir = defineBddConfig({
	features: "feature/**/*.feature",
	featuresRoot: "feature",
	steps: "feature/**/*.ts",
	outputDir: "test",
	matchKeywords: true,
});

const baseConfiguration: PlaywrightTestConfig = {
	fullyParallel: true,
	reporter: "list",
	snapshotPathTemplate: "{testDir}/snapshots/{testFilePath}/{arg}{ext}",
	projects: [
		{ name: "chromium", testDir: bddTestDir, use: { ...devices["Desktop Chrome"] } },
		{ name: "firefox", testDir: bddTestDir, use: { ...devices["Desktop Firefox"] } },
		// Like Safari, WebKit moves Tab focus only between form controls unless "tab to links" is enabled.
		{ name: "webkit", testDir: bddTestDir, grepInvert: /@tabs-to-links/, use: { ...devices["Desktop Safari"] } },
	],
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
