import { expect, type Locator, type Page, test } from "@playwright/test";
import * as Navigate from "./navigate";

const expectOpensSafelyInNewTab = async (link: Locator) => {
	await expect(link).toHaveAttribute("target", "_blank");

	const rel = await link.getAttribute("rel");
	expect(rel).toContain("noopener");
	expect(rel).toContain("noreferrer");
};

test.describe("External link safety", () => {
	test.describe("Given I'm on a blog post whose body contains an external link", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/blog/hello-neovim-my-old-friend/", { waitUntil: "networkidle" });
		});

		test("In-content external links open in a new tab with noopener/noreferrer", async ({ page }) => {
			const externalLink = page.getByRole("link", { name: "the source code" });
			let newTab: Page;

			await test.step("Then the link should be configured to open safely in a new tab", async () => {
				await expectOpensSafelyInNewTab(externalLink);
			});

			await test.step("When I click the link", async () => {
				newTab = await Navigate.toExternalSiteByClicking(page, externalLink);
			});

			await test.step("Then a new tab should open to the external site and the original page should remain", async () => {
				await expect(newTab).toHaveURL(/github\.com/);
				await expect(page).toHaveURL(/hello-neovim-my-old-friend/);
			});
		});
	});

	test.describe("Given I open the burger/sidebar menu", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/", { waitUntil: "networkidle" });
			await Navigate.openBurgerMenu(page);
		});

		test("Sidebar 'Skills' menu item opens the external CV site in a new tab", async ({ page }) => {
			const skillsLink = page.getByRole("link", { name: /skills/i });

			await test.step("Then the link should be configured to open safely in a new tab to the CV site", async () => {
				await expectOpensSafelyInNewTab(skillsLink);
				await expect(skillsLink).toHaveAttribute("href", /cv\.nikoheikkila\.fi/);
			});

			await test.step("When I click the 'Skills' link", async () => {
				await Navigate.toExternalSiteByClicking(page, skillsLink);
			});
		});
	});
});
