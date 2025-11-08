import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "unit",
		include: ["src/__tests__/unit/**/*.test.{ts,tsx}"],
		environment: "node",
		coverage: {
			enabled: true,
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
