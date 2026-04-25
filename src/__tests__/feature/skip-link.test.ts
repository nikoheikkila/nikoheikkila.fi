import { expect, test } from "@playwright/test";

test.describe("Given I navigate to the homepage with a keyboard", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });
	});

	test("When I tab once then the skip link becomes visible and focused", async ({ page }) => {
		await test.step("And I press Tab from page load", async () => {
			await page.keyboard.press("Tab");
		});

		await test.step("Then the skip link should be focused", async () => {
			const skipLink = page.getByRole("link", { name: /skip to main content/i });
			await expect(skipLink).toBeFocused();
		});

		await test.step("And the skip link should be visible when focused", async () => {
			const skipLink = page.getByRole("link", { name: /skip to main content/i });
			await expect(skipLink).toBeVisible();
		});
	});

	test("When I activate the skip link then focus moves to main content", async ({ page }) => {
		await test.step("And I tab to and activate the skip link", async () => {
			await page.keyboard.press("Tab");
			await page.keyboard.press("Enter");
		});

		await test.step("Then the main content landmark is scrolled into view", async () => {
			const main = page.locator("#main-content");
			await expect(main).toBeInViewport();
		});

		await test.step("And the URL fragment points to main-content", async () => {
			await expect(page).toHaveURL(/#main-content$/);
		});
	});
});
