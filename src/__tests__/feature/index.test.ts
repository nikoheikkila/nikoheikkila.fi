import { expect, test } from "@playwright/test";

test.describe
	.parallel("Given I visit the home page using a desktop browser", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("When I query all the post titles", async ({ page }) => {
			const posts = page.getByTestId("post-title");

			await test.step("Then I should see all the posts", async () => {
				await expect(posts).toHaveCount(30);
			});
		});

		test("When I click the 'Next' button, then I should visit the respective page", async ({ page }) => {
			const nextPage = page.getByRole("link", { name: /Next Page/ });

			await test.step("Then I should navigate to the next page", async () => {
				await nextPage.click();
				await expect(page).toHaveURL("/2/");
			});
		});

		test("When I click the 'Previous' button", async ({ page }) => {
			const previousPage = page.getByRole("link", { name: /Previous Page/ });

			await test.step("Then I should navigate back to previous page", async () => {
				await page.goto("/2");
				await previousPage.click();
				await expect(page).toHaveURL("/");
			});
		});
	});

test.describe
	.parallel("Given I visit the home page using a mobile browser", () => {
		test.use({
			hasTouch: true,
			viewport: {
				width: 375,
				height: 667,
			},
		});

		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("When I view the page", async ({ page }) => {
			const posts = page.getByTestId("post-title");

			await test.step("Then I should see all the posts", async () => {
				await expect(posts).toHaveCount(30);
			});
		});

		test("When I click the 'Next' button, then I should visit the respective page", async ({ page }) => {
			const nextPage = page.getByRole("link", { name: /Next Page/ });

			await test.step("Then I should navigate to the next page", async () => {
				await nextPage.click();
				await expect(page).toHaveURL("/2/");
			});
		});

		test("When I click the 'Previous' button", async ({ page }) => {
			const previousPage = page.getByRole("link", { name: /Previous Page/ });

			await test.step("Then I should navigate back to previous page", async () => {
				await page.goto("/2");
				await previousPage.click();
				await expect(page).toHaveURL("/");
			});
		});
	});
