import { expect, type Locator, test } from "@playwright/test";
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
			// 1. Given I'm on a blog post whose body contains an external link (e.g. to github.com)
			await page.goto("/blog/hello-neovim-my-old-friend/", { waitUntil: "networkidle" });
		});

		test("In-content external links open in a new tab with noopener/noreferrer", async ({ page }) => {
			const externalLink = page.getByRole("link", { name: "the source code" });

			// 2. When I inspect the link's attributes
			await test.step("When I inspect the link's attributes", async () => {
				await expectOpensSafelyInNewTab(externalLink);
			});

			// 3. And I click the link
			await test.step("And I click the link", async () => {
				const newTab = await Navigate.toExternalSiteByClicking(page, externalLink);

				await expect(newTab).toHaveURL(/github\.com/);
				await expect(page).toHaveURL(/hello-neovim-my-old-friend/);
			});
		});
	});

	test.describe("Given I open the burger/sidebar menu", () => {
		test.beforeEach(async ({ page }) => {
			// 1. Given I open the burger/sidebar menu
			await page.goto("/", { waitUntil: "networkidle" });
			await Navigate.openBurgerMenu(page);
		});

		test("Sidebar 'Skills' menu item opens the external CV site in a new tab", async ({ page }) => {
			const skillsLink = page.getByRole("link", { name: /skills/i });

			// 2. When I click the 'Skills' link
			await test.step("When I click the 'Skills' link", async () => {
				await expectOpensSafelyInNewTab(skillsLink);
				await expect(skillsLink).toHaveAttribute("href", /cv\.nikoheikkila\.fi/);

				await Navigate.toExternalSiteByClicking(page, skillsLink);
			});
		});
	});
});
