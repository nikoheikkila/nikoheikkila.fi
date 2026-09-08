import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// @see https://vitest.dev/guide/projects.html
		projects: ["vitest.unit.config.ts", "vitest.component.config.ts"],
		// Coverage is a root-only option under the projects feature — it is ignored if declared
		// on a project config, so it lives here even though only the "unit" project uses it.
		// Left disabled by default (component tests aren't held to a coverage threshold);
		// `task test:unit` opts in with the --coverage flag.
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			// Without an explicit include list the V8 provider only reports files that a test
			// imported, which silently hides never-imported backend modules from the denominator.
			// The trade-off is that filtering a run (e.g. `vitest run foo.test.ts`) no longer
			// narrows the report — every file below is always measured.
			include: [
				"gatsby/**/*.ts",
				"gatsby-node.ts",
				"gatsby-config.ts",
				"src/utils/**/*.ts",
				"src/search/index.ts",
				"src/components/layout/socialIcons.ts",
				"infra/site/worker.ts",
			],
			exclude: [...coverageConfigDefaults.exclude, "src/__tests__/**"],
			thresholds: {
				lines: 100,
				functions: 100,
				branches: 100,
				statements: 100,
			},
		},
	},
});
