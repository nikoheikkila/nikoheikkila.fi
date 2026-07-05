import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		name: "unit",
		include: ["src/__tests__/unit/**/*.test.{ts,tsx}", "infra/site/*.test.ts"],
		environment: "node",
	},
});
