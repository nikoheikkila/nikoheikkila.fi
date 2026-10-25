// @ts-check
/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
export default {
	testRunner: "vitest",
	// Browser Mode component tests are out of reach for the Vitest runner, so this extends the Node "unit" project only.
	vitest: { configFile: "vitest.stryker.config.ts" },
	coverageAnalysis: "perTest",
	// The progress reporter appends a line every 10s on CI, so only use it in an interactive terminal.
	reporters: process.env.CI ? ["clear-text", "html", "json"] : ["clear-text", "progress", "html", "json"],
	// The per-test listing under "All tests" is the bulk of the output; the score table and survivors are enough.
	clearTextReporter: { reportTests: false, logTests: false },
	// Don't print the static-mutant hint on every run.
	warnings: { slow: false },
	// Every mutant must be killed: a survivor fails the run.
	thresholds: { high: 100, low: 100, break: 100 },
	// Mirrors the coverage `include` list in vitest.config.ts — add new backend files to both.
	mutate: [
		"gatsby/**/*.ts",
		"gatsby-node.ts",
		"gatsby-config.ts",
		"src/utils/**/*.ts",
		"src/search/index.ts",
		"src/mermaid/index.ts",
		"src/components/layout/socialIcons.ts",
		"infra/site/worker.ts",
		"scripts/preview-report/logic.ts",
		"scripts/stryker-diff/logic.ts",
	],
	ignorePatterns: [
		// Agent tooling contains directory symlinks, which the sandbox copy cannot handle.
		".agents",
		".claude",
		"skills",
		".idea",
		".playwright-mcp",
		".task",
		".vitest",
		".vitest-attachments",
		"**/.terraform",
		"feature",
		"public",
		".cache",
		"coverage",
		"test-results",
		"playwright-report",
		"content",
		"static",
		"test",
		"src/__tests__/components",
	],
	incrementalFile: "reports/stryker-incremental.json",
	// Stryker rewrites tsconfig `extends`/`references` through the TypeScript JS API, which TypeScript 7 no longer ships.
	// Our tsconfig.json has neither, so point at a file that doesn't exist to skip the rewrite instead of crashing.
	tsconfigFile: "tsconfig.stryker-skip.json",
};
