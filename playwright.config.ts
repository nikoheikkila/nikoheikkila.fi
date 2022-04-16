import { PlaywrightTestConfig, devices } from "@playwright/test";

const baseURL = process.env.APP_URL || "http://localhost:8000";

const config: PlaywrightTestConfig = {
    testDir: "src/__tests__/feature",
    forbidOnly: !!process.env.CI,
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
    projects: [
        {
            name: "Chromium",
            use: { ...devices["Desktop Chrome"] },
        },
        {
            name: "Firefox",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "Safari",
            use: { ...devices["Desktop Safari"] },
        },
        {
            name: "iPhone",
            use: { ...devices["iPhone 13"] },
        },
        {
            name: "Android",
            use: { ...devices["Pixel 5"] },
        },
    ],
};

export default config;
