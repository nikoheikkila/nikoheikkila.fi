import { expect, test } from "@playwright/test";

test.describe("Given the site is deployed", () => {
	const expectedTitle = "Niko Heikkilä";

	test("When I load the home page", async ({ page }) => {
		const firstHeading = page.getByRole("heading", { level: 1 });
		const homeLink = page.getByRole("link", { name: `${expectedTitle} — Home` });
		const firstArticle = page.getByRole("article").first();
		const footer = page.locator("footer");

		await page.goto("/");

		await test.step(`Then the page title should read '${expectedTitle}'`, async () => {
			await expect(page).toHaveTitle(expectedTitle);
		});

		await test.step(`And the first heading should read '${expectedTitle}'`, async () => {
			await expect(firstHeading).toContainText(expectedTitle);
		});

		await test.step(`And the home link should read '${expectedTitle} — Home'`, async () => {
			await expect(homeLink).toBeVisible();
		});

		await test.step("And at least one article should be visible", async () => {
			await expect(firstArticle).toBeVisible();
		});

		await test.step("And the footer should be visible", async () => {
			await expect(footer).toBeVisible();
		});
	});
});
