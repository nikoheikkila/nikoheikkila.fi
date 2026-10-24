import { expect, type Locator, type Page } from "@playwright/test";
import { socialLinks } from "../../src/utils/social";
import { Given, Then, When } from "../fixtures";
import { lookup, openPage, viewports } from "../support";

const menuLinks = (page: Page) => page.getByRole("navigation", { name: "Main" }).getByRole("link").first();
const menuToggle = (page: Page) => page.getByRole("button", { name: /(Open|Close) menu/ });
const footer = (page: Page) => page.locator("footer");
const socialProfileNames = new RegExp(socialLinks.map(({ name }) => name).join("|"));
const socialProfiles = (page: Page) => footer(page).getByRole("link", { name: socialProfileNames });

const elements: Record<string, (page: Page) => Locator> = {
	"sidebar menu": menuLinks,
	footer,
	"social profile links": socialProfiles,
};

const links: Record<string, (page: Page) => Locator> = {
	"footer RSS": (page) => footer(page).getByRole("link", { name: "RSS" }),
};

const destinations: Record<string, RegExp> = {
	"RSS feed": /\/(feed|rss\.xml)\/?$/,
};

Given("the visitor is browsing on a {string}", async ({ page }, device: string) => {
	await page.setViewportSize(lookup(viewports, device));
});

Given("the visitor has the {string} open", async ({ page }, name: string) => {
	await openPage(page, "home page");
	await menuToggle(page).click();
	await expect(lookup(elements, name)(page)).toBeVisible();
});

When("the visitor opens the {string}", async ({ page }, _name: string) => {
	await menuToggle(page).click();
});

When("the visitor clicks outside the {string}", async ({ page }, _name: string) => {
	const { width, height } = page.viewportSize() ?? lookup(viewports, "desktop");

	await page.mouse.click(width - 5, height / 2);
});

When("the visitor scrolls to the {string}", async ({ page }, name: string) => {
	await lookup(elements, name)(page).scrollIntoViewIfNeeded();
});

When("the visitor follows the {string} link", async ({ page }, name: string) => {
	await lookup(links, name)(page).click();
});

Then("the visitor sees the {string}", async ({ page }, name: string) => {
	await expect(lookup(elements, name)(page).first()).toBeVisible();
});

Then("the {string} is {string}", async ({ page }, name: string, state: string) => {
	expect(state).toBe("closed");
	await expect(lookup(elements, name)(page)).toBeHidden();
});

Then("the visitor is on the {string}", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(destinations, name));
});
