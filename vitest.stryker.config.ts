import { defineConfig, mergeConfig } from "vitest/config";
import unit from "./vitest.unit.config";

// Stryker runs one Vitest per CPU, all sharing node_modules/.vitest-cache through the sandbox symlink.
// When the lockfile changes they race to wipe that cache and crash, so mutation runs skip it.
// Every one of those runs would otherwise append its own Job Summary on GitHub Actions.
export default mergeConfig(
	unit,
	defineConfig({
		test: {
			fsModuleCache: false,
			reporters: [["default"], ["github-actions", { jobSummary: { enabled: false } }]],
		},
	}),
);
