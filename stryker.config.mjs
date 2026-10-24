// @ts-check
/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
export default {
	testRunner: "vitest",
	// Browser Mode component tests are out of reach for the Vitest runner, so this extends the Node "unit" project only.
	vitest: { configFile: "vitest.stryker.config.ts" },
	coverageAnalysis: "perTest",
	reporters: ["clear-text", "progress", "html", "json"],
	clearTextReporter: { logTests: false },
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
