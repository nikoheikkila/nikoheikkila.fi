import { expect, test } from "@playwright/test";

test.describe
	.parallel("Given I visit the home page using a desktop browser", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("When I query all the post titles", async ({ page }) => {
			const posts = page.getByRole("article");

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
				await page.goto("/2", { waitUntil: "networkidle" });
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
			const posts = page.getByRole("article");

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
				await page.goto("/2", { waitUntil: "networkidle" });
				await previousPage.click();
				await expect(page).toHaveURL("/");
			});
		});
	});

test.describe("Pagination boundaries", () => {
	test("First index page has no Previous Page link", async ({ page }) => {
		await test.step("Given I'm on the home page (first index page)", async () => {
			await page.goto("/", { waitUntil: "networkidle" });
		});

		await test.step("When I look for a 'Previous Page' link", async () => {
			const previousPage = page.getByRole("link", { name: /Previous Page/ });

			await expect(previousPage).toHaveCount(0);
		});
	});

	test("Last index page has no Next Page link", async ({ page }) => {
		await test.step("Given I navigate directly to /3/ (the last paginated index page)", async () => {
			await page.goto("/3/", { waitUntil: "networkidle" });

			await expect(page.getByRole("article").first()).toBeVisible();
		});

		await test.step("When I look for a 'Next Page' link", async () => {
			const nextPage = page.getByRole("link", { name: /Next Page/ });

			await expect(nextPage).toHaveCount(0);
		});

		await test.step("And I look for a 'Previous Page' link", async () => {
			const previousPage = page.getByRole("link", { name: /Previous Page/ });

			await expect(previousPage).toBeVisible();
			await expect(previousPage).toHaveAttribute("href", "/2/");
		});
	});

	test("Directly visiting a numbered pagination route loads the correct page", async ({ page }) => {
		await test.step("Given I navigate directly to /2/ by typing the URL (no client-side navigation)", async () => {
			const response = await page.goto("/2/", { waitUntil: "networkidle" });

			expect(response?.status()).toBe(200);
			await expect(page.getByRole("heading", { name: "Latest Articles" })).toBeVisible();
		});

		await test.step("When I inspect the pagination links", async () => {
			const previousPage = page.getByRole("link", { name: /Previous Page/ });
			const nextPage = page.getByRole("link", { name: /Next Page/ });

			await expect(previousPage).toHaveAttribute("href", "/");
			await expect(nextPage).toHaveAttribute("href", "/3/");
		});
	});
});
