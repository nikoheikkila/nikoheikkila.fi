import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		name: "component",
		include: ["src/__tests__/components/**/*.test.{ts,tsx}"],
		setupFiles: ["./src/__tests__/components/setup.ts"],
		browser: {
			enabled: true,
			provider: playwright(),
			instances: [
				{ browser: "chromium", name: "Component Tests (Chromium)" },
				{ browser: "firefox", name: "Component Tests (Firefox)" },
				{ browser: "webkit", name: "Component Tests (WebKit)" },
			],
			headless: true,
		},
	},
	define: {
		"process.env": "{}",
	},
	optimizeDeps: {
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
});
