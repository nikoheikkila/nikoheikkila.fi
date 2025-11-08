import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		// @see https://vitest.dev/guide/projects.html
		projects: ["vitest.unit.config.ts", "vitest.component.config.ts"],
	},
});
