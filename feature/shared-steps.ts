import { expect, type Page } from "@playwright/test";
import { Given, Then, When } from "./fixtures";
import { link, lookup, openPage, sidebarMenu, toggleSidebarMenu, viewports } from "./support";

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

When("the visitor follows the {string} link", async ({ page, destination }, name: string) => {
	const target = link(page, name);

	destination.remember((await target.getAttribute("href")) ?? "");
	await target.click();
});

Then("the visitor sees the {string} link", async ({ page }, name: string) => {
	await expect(link(page, name)).toBeVisible();
});

Then("the visitor does not see the {string} link", async ({ page }, name: string) => {
	await expect(link(page, name)).toHaveCount(0);
});

Then("the visitor is at {string}", async ({ page }, path: string) => {
	await expect(page).toHaveURL(path);
});

Then("the visitor arrives at the linked page", async ({ page, destination }) => {
	await expect(page).toHaveURL(destination.value);
});
