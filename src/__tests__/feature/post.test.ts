import test, { expect } from "@playwright/test";

test.describe.parallel("Given I'm on a single post page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await Promise.all([
            page.waitForNavigation(),
            page.click('[data-testid="post-title"]:first-child > a'),
        ]);
        await expect(page).toHaveURL(/blog/);
    });

    test("when I view it, then it should render correctly", async ({
        page,
    }) => {
        const postHeader = page.locator('[data-testid="post-header"]');
        await expect(postHeader).toBeVisible();
    });

    test("when I click the 'Edit' button, then I should be taken to GitHub", async ({
        page,
    }) => {
        const [github] = await Promise.all([
            page.context().waitForEvent("page"),
            page.click('text="Edit Page"'),
        ]);

        await github.waitForLoadState();
        await expect(github).toHaveURL(/github\.com/);
        await expect(github).toHaveURL(/edit/);
    });

    test("when I click the 'View History' button, then I should be taken to GitHub", async ({
        page,
    }) => {
        const [github] = await Promise.all([
            page.context().waitForEvent("page"),
            page.click('text="View History"'),
        ]);

        await github.waitForLoadState();
        await expect(github).toHaveURL(/github\.com/);
        await expect(github).toHaveURL(/commits/);
    });
});
