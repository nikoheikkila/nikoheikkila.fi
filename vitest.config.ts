import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	test: {
		include: ["src/__tests__/components/**/*.test.{ts,tsx}"],
		setupFiles: ["./src/__tests__/components/setup.ts"],
		browser: {
			enabled: true,
			provider: playwright(),
			// https://vitest.dev/guide/browser/playwright
			instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
			headless: true,
		},
		env: {
			NODE_ENV: "test",
		},
	},
	define: {
		"process.env.NODE_ENV": JSON.stringify("test"),
		"process.env": "{}",
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
		exclude: ["fsevents", "chromium-bidi"],
	},
	ssr: {
		noExternal: ["gatsby"],
	},
});
