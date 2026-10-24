import { expect, type Page } from "@playwright/test";
import { Given, When } from "./fixtures";
import { lookup, openPage, sidebarMenu, toggleSidebarMenu, viewports } from "./support";

const visitPage = async ({ page }: { page: Page }, name: string) => {
	await openPage(page, name);
};

Given("the visitor is browsing on a {string}", async ({ page }, device: string) => {
	await page.setViewportSize(lookup(viewports, device));
});

Given("the visitor is on the {string}", visitPage);

Given("the visitor has the sidebar menu open", async ({ page }) => {
	await openPage(page, "home page");
	await toggleSidebarMenu(page);
	await expect(sidebarMenu(page)).toBeVisible();
});

When("the visitor opens the {string}", visitPage);

When("the visitor presses {string}", async ({ page }, key: string) => {
	await page.keyboard.press(key);
});
