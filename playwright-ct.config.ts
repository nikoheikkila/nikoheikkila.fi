import type { PlaywrightTestConfig } from "@playwright/experimental-ct-react";

const config: PlaywrightTestConfig = {
    testDir: "src/__tests__/components",
    forbidOnly: !!process.env.CI,
    reporter: "html",
    use: {
        trace: "on-first-retry",
    },
};

export default config;
