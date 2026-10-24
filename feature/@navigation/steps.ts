import { expect, type Page } from "@playwright/test";
import { socialLinks } from "../../src/utils/social";
import { Then, When } from "../fixtures";
import { lookup, sidebarMenu, toggleSidebarMenu, viewports } from "../support";

const footer = (page: Page) => page.getByRole("contentinfo");

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

Then("the visitor sees the sidebar menu", async ({ page }) => {
	await expect(sidebarMenu(page)).toBeVisible();
});

Then("the sidebar menu is closed", async ({ page }) => {
	await expect(sidebarMenu(page)).toBeHidden();
});

Then("the visitor sees the social profile links", async ({ page }) => {
	const socialProfileNames = new RegExp(socialLinks.map(({ name }) => name).join("|"));

	await expect(footer(page).getByRole("link", { name: socialProfileNames }).first()).toBeVisible();
});
