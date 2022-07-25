import type { PlaywrightTestConfig } from "@playwright/experimental-ct-react";

const config: PlaywrightTestConfig = {
    name: "React Component Tests",
    testDir: "src/__tests__/components",
    forbidOnly: !!process.env.CI,
    fullyParallel: true,
    reporter: [["html"], ["github"], ["list"]],
    use: {
        trace: "on-first-retry",
    },
};

export default config;
