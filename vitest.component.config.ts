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
		include: [
			"react-syntax-highlighter",
			"react-syntax-highlighter/dist/esm/languages/hljs/bash",
			"react-syntax-highlighter/dist/esm/languages/hljs/diff",
			"react-syntax-highlighter/dist/esm/languages/hljs/dockerfile",
			"react-syntax-highlighter/dist/esm/languages/hljs/gherkin",
			"react-syntax-highlighter/dist/esm/languages/hljs/go",
			"react-syntax-highlighter/dist/esm/languages/hljs/haskell",
			"react-syntax-highlighter/dist/esm/languages/hljs/javascript",
			"react-syntax-highlighter/dist/esm/languages/hljs/json",
			"react-syntax-highlighter/dist/esm/languages/hljs/markdown",
			"react-syntax-highlighter/dist/esm/languages/hljs/php",
			"react-syntax-highlighter/dist/esm/languages/hljs/plaintext",
			"react-syntax-highlighter/dist/esm/languages/hljs/python",
			"react-syntax-highlighter/dist/esm/languages/hljs/typescript",
			"react-syntax-highlighter/dist/esm/languages/hljs/xml",
			"react-syntax-highlighter/dist/esm/languages/hljs/yaml",
			"react-syntax-highlighter/dist/esm/styles/hljs",
		],
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
});
