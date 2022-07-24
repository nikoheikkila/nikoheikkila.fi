import test, { expect } from "@playwright/test";

test.describe.parallel("Given I'm on a single post page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await Promise.all([
            page.waitForNavigation(),
            page.click("[data-testid=post-title]:first-child > a"),
        ]);
        await expect(page).toHaveURL(/blog/);
    });

    test("when I view it, then title should render correctly", async ({
        page,
    }) => {
        const postHeader = page.locator("data-testid=post-header");
        await expect(postHeader).toBeVisible();
    });

    test("when I view it, then I should see a subscribe box", async ({
        page,
    }) => {
        const subscribeBox = page.locator("data-test-id=rss-subscribe");
        await expect(subscribeBox).toBeVisible();
    });

    test("when I click the 'Edit' button, then I should be taken to GitHub", async ({
        page,
    }) => {
        const [github] = await Promise.all([
            page.waitForEvent("popup"),
            page.locator("text=Edit Page").click(),
        ]);

        await expect(github).toHaveURL(/github\.com/);
    });

    test("when I click the 'View History' button, then I should be taken to GitHub", async ({
        page,
    }) => {
        const [github] = await Promise.all([
            page.waitForEvent("popup"),
            page.locator("text=View History").click(),
        ]);

        await expect(github).toHaveURL(/github\.com/);
    });
});

test.describe.parallel("Given I'm on a page with cover image", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/about");
        await expect(page).toHaveURL(/about/);
    });

    test("when I view it, then it should display the accessible cover image", async ({
        page,
    }) => {
        const heroImage = page.locator('img[alt="Niko Heikkilä"]');

        await expect(heroImage).toBeVisible();
    });
});
