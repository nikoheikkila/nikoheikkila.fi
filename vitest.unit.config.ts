import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "unit",
		include: ["src/__tests__/unit/**/*.test.{ts,tsx}"],
		environment: "node",
		setupFiles: ["./src/__tests__/matchers.unit.ts"],
	},
});
