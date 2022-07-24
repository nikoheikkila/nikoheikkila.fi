import { PlaywrightTestConfig } from "@playwright/test";

const baseURL = process.env.APP_URL || "http://localhost:8000";

const config: PlaywrightTestConfig = {
    testDir: "src/__tests__/feature",
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 2 : undefined,
    reporter: process.env.CI ? "github" : "list",
    timeout: process.env.CI ? 60 * 1000 : undefined,
    globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
    use: {
        baseURL,
        ignoreHTTPSErrors: true,
        video: "retain-on-failure",
        screenshot: "only-on-failure",
        trace: "retain-on-failure",
    },
    webServer: {
        command: "yarn serve",
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
    },
};

export default config;
