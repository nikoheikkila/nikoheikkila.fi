import { expect, type Response, test } from "@playwright/test";
import * as Navigate from "./navigate";

test.describe("Given I'm on the custom 404 page", () => {
	let response: Response | null;

	test.beforeEach(async ({ page }) => {
		response = await page.goto("/does-not-exist-page/", { waitUntil: "networkidle" });
	});

	test("When the page finishes loading", async ({ page }) => {
		await test.step("Then the HTTP response status should be 404", async () => {
			expect(response?.status()).toBe(404);
		});

		await test.step("And the document title should be 'Page Not Found'", async () => {
			await expect(page).toHaveTitle("Page Not Found");
		});

		await test.step("And a heading containing 'You have erred' should be visible", async () => {
			await expect(page.getByRole("heading", { name: /you have erred/i })).toBeVisible();
		});

		await test.step("And an error code such as 'ERR_CONTENT_NOT_FOUND' should be visible", async () => {
			await expect(page.getByText(/ERR_CONTENT_NOT_FOUND/)).toBeVisible();
		});
	});

	test("When I click the 'home' link", async ({ page }) => {
		const homeLink = page.getByRole("link", { name: "home" });

		await test.step("Then I should be navigated to / and see the Latest Articles listing", async () => {
			await homeLink.click();

			await expect(page).toHaveURL("/");
			await expect(page.getByRole("heading", { name: "Latest Articles" })).toBeVisible();
		});
	});

	test("When I type a known post title into the search box and press Enter", async ({ page }) => {
		const searchInput = Navigate.searchInput(page);

		await test.step("Then the search results modal should open and show a matching result", async () => {
			await searchInput.fill("Neovim");
			await searchInput.press("Enter");

			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeVisible();
			await expect(modal.getByRole("article").first()).toBeVisible();
		});
	});
});
