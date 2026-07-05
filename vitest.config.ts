import { defineConfig } from "vitest/config";

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
			thresholds: {
				lines: 100,
				functions: 100,
				branches: 100,
				statements: 100,
			},
		},
	},
});
