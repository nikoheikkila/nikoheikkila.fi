import { expect, type Locator, type Page } from "@playwright/test";
import { socialLinks } from "../../src/utils/social";
import { Then, When } from "../fixtures";
import { lookup, sidebarMenu, toggleSidebarMenu, viewports } from "../support";

const footer = (page: Page) => page.locator("footer");
const socialProfileNames = new RegExp(socialLinks.map(({ name }) => name).join("|"));

const links: Record<string, (page: Page) => Locator> = {
	"footer RSS": (page) => footer(page).getByRole("link", { name: "RSS" }),
};

const destinations: Record<string, RegExp> = {
	"RSS feed": /\/(feed|rss\.xml)\/?$/,
};

When("the visitor opens the sidebar menu", async ({ page }) => {
	await toggleSidebarMenu(page);
});

When("the visitor clicks outside the sidebar menu", async ({ page }) => {
	const { width, height } = page.viewportSize() ?? lookup(viewports, "desktop");

	await page.mouse.click(width - 5, height / 2);
});

When("the visitor scrolls to the footer", async ({ page }) => {
	await footer(page).scrollIntoViewIfNeeded();
});

When("the visitor follows the {string} link", async ({ page }, name: string) => {
	await lookup(links, name)(page).click();
});

Then("the visitor sees the sidebar menu", async ({ page }) => {
	await expect(sidebarMenu(page)).toBeVisible();
});

Then("the sidebar menu is closed", async ({ page }) => {
	await expect(sidebarMenu(page)).toBeHidden();
});

Then("the visitor sees the social profile links", async ({ page }) => {
	await expect(footer(page).getByRole("link", { name: socialProfileNames }).first()).toBeVisible();
});

Then("the visitor is on the {string}", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(destinations, name));
});
