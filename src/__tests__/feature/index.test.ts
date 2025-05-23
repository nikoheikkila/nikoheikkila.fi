import test, { expect } from "@playwright/test";

test.describe
	.parallel("Given I'm on the index page", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("when I query all the post titles, their count should be exactly 30", async ({ page }) => {
			const posts = page.locator('[data-testid="post-title"]');

			await expect(posts).toHaveCount(30);
		});

		test("when I click the next/previous button, then I should visit the respective page", async ({
			page,
			baseURL,
		}) => {
			const previousURL = `${baseURL}/`;
			const nextURL = `${baseURL}/2/`;

			await Promise.all([page.waitForURL(nextURL), page.click('a[rel="next"]')]);
			await Promise.all([page.waitForURL(previousURL), page.click('a[rel="prev"]')]);
		});
	});
