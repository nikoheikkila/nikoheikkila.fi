import { defineConfig, mergeConfig } from "vitest/config";
import unit from "./vitest.unit.config";

// Stryker runs one Vitest per CPU, all sharing node_modules/.vitest-cache through the sandbox symlink.
// When the lockfile changes they race to wipe that cache and crash, so mutation runs skip it.
export default mergeConfig(unit, defineConfig({ test: { fsModuleCache: false } }));
