import { defineConfig } from "vitest/config";

const isPipeline = !!process.env.CI;

export default defineConfig({
	test: {
		include: ["src/__tests__/unit/*.test.ts"],
		reporters: ["verbose"],
		environment: "node",
		watch: !isPipeline,
	},
});
