import { defineConfig } from "vitest/config";

const isPipeline = !!process.env.CI;

export default defineConfig({
    test: {
        include: ["src/__tests__/unit/*.test.ts"],
        environment: "node",
        watch: !isPipeline,
        maxThreads: 8,
        minThreads: isPipeline ? 2 : undefined,
    },
});
