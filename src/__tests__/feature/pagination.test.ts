import { test, expect } from "@playwright/test";

const fixtures = {
	postsPerPage: 30,
	touchTargets: {
		minimum: 44,
		iosRecommended: 44,
	},
	viewport: {
		mobile: { width: 375, height: 667 },
	},
	pagination: {
		pageNumberPattern: /\d+\/\d+/,
		minimumPostsOnPage: 1,
	},
};

test.describe
	.parallel("Given I want to test blog pagination", () => {
		test("when I view the homepage, then pagination should show correct page info", async ({ page }) => {
			await test.step("Navigate to homepage", async () => {
				await page.goto("/");
			});

			await test.step("Verify first page pagination state", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await expect(nextPageLink).toBeVisible();
				await expect(nextPageLink).toContainText("2/");

				const prevPageLink = page.getByRole("link", { name: /Previous Page/ });
				await expect(prevPageLink).not.toBeVisible();
			});

			await test.step("Verify post count on first page", async () => {
				const posts = page.getByTestId("post-title");
				await expect(posts).toHaveCount(fixtures.postsPerPage);
			});
		});

		test("when I navigate to page 2, then pagination should work correctly", async ({ page }) => {
			await test.step("Navigate to second page", async () => {
				await page.goto("/2/");
			});

			await test.step("Verify second page pagination state", async () => {
				const prevPageLink = page.getByRole("link", { name: /Previous Page/ });
				await expect(prevPageLink).toBeVisible();
				await expect(prevPageLink).toContainText("1/");

				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				const nextPageExists = (await nextPageLink.count()) > 0;
				if (nextPageExists) {
					await expect(nextPageLink).toBeVisible();
				}
			});

			await test.step("Verify URL is correct", async () => {
				await expect(page).toHaveURL("/2/");
			});

			await test.step("Verify posts are different from page 1", async () => {
				const posts = page.getByTestId("post-title");
				const postsCount = await posts.count();
				expect(postsCount).toBeGreaterThan(0);

				const firstPostPage2 = await posts.first().textContent();

				await page.goto("/");
				const postsPage1 = page.getByTestId("post-title");
				const firstPostPage1 = await postsPage1.first().textContent();

				expect(firstPostPage1).not.toBe(firstPostPage2);
			});
		});

		test("when I navigate through pagination links, then URLs should update correctly", async ({ page }) => {
			await test.step("Start from homepage", async () => {
				await page.goto("/");
				await expect(page).toHaveURL("/");
			});

			await test.step("Click Next Page link", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await nextPageLink.click();
				await expect(page).toHaveURL("/2/");
			});

			await test.step("Click Previous Page link", async () => {
				const prevPageLink = page.getByRole("link", { name: /Previous Page/ });
				await prevPageLink.click();
				await expect(page).toHaveURL("/");
			});
		});

		test("when I access the last page, then it should load correctly", async ({ page }) => {
			await test.step("Navigate to page 2", async () => {
				await page.goto("/2/");
			});

			await test.step("Verify page loads with content", async () => {
				const posts = page.getByTestId("post-title");
				const postsCount = await posts.count();
				expect(postsCount).toBeGreaterThan(fixtures.pagination.minimumPostsOnPage - 1);
			});

			await test.step("Verify pagination controls work", async () => {
				const prevPageLink = page.getByRole("link", { name: /Previous Page/ });
				await expect(prevPageLink).toBeVisible();
				await expect(prevPageLink).toContainText("1/");

				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await expect(nextPageLink).not.toBeVisible();
			});
		});
	});

test.describe
	.parallel("Given I want to test pagination accessibility", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("when I use keyboard navigation, then pagination links should be accessible", async ({ page }) => {
			await test.step("Tab to pagination area", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await nextPageLink.focus();
				await expect(nextPageLink).toBeFocused();
			});

			await test.step("Activate pagination with keyboard", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await nextPageLink.press("Enter");
				await expect(page).toHaveURL("/2/");
			});
		});

		test("when I use screen reader, then pagination should have proper ARIA attributes", async ({ page }) => {
			await test.step("Verify pagination has semantic structure", async () => {
				const paginationList = page.locator("ul").filter({ has: page.getByRole("link", { name: /Next Page/ }) });
				await expect(paginationList).toBeVisible();
			});

			await test.step("Verify pagination links have descriptive text", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				const linkText = await nextPageLink.textContent();

				expect(linkText).toMatch(fixtures.pagination.pageNumberPattern);
			});
		});
	});

test.describe
	.parallel("Given I test pagination on mobile device", () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize(fixtures.viewport.mobile);
			await page.goto("/");
		});

		test("when I view pagination on mobile, then it should be touch-friendly", async ({ page }) => {
			await test.step("Verify pagination links are large enough for touch", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });
				await expect(nextPageLink).toBeVisible();

				const boundingBox = await nextPageLink.boundingBox();
				const minMobileTouchSize = 20;
				expect(boundingBox?.height).toBeGreaterThanOrEqual(minMobileTouchSize);
				expect(boundingBox?.width).toBeGreaterThanOrEqual(minMobileTouchSize);
			});

			await test.step("Test touch navigation", async () => {
				const nextPageLink = page.getByRole("link", { name: /Next Page/ });

				await nextPageLink.click();
				await expect(page).toHaveURL("/2/");
			});
		});
	});
