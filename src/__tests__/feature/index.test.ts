import { test, expect } from "@playwright/test";

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
			await test.step("Navigate to next page", async () => {
				const nextURL = `${baseURL}/2/`;
				await Promise.all([page.waitForURL(nextURL), page.getByRole("link", { name: /Next Page/ }).click()]);
			});

			await test.step("Navigate back to previous page", async () => {
				const previousURL = `${baseURL}/`;
				await Promise.all([page.waitForURL(previousURL), page.getByRole("link", { name: /Previous Page/ }).click()]);
			});
		});
	});

test.describe
	.parallel("Given I'm on the index page using mobile device", () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto("/");
		});

		test("when I view the page on mobile, then posts should render correctly", async ({ page }) => {
			await test.step("Verify mobile layout renders posts", async () => {
				const posts = page.getByTestId("post-title");
				await expect(posts).toHaveCount(30);
			});

			await test.step("Verify pagination controls are accessible on mobile", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await expect(nextPageLink).toBeVisible();
			});
		});
	});
