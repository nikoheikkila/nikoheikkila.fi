import { expect, type Locator, type Page } from "@playwright/test";
import { Given, Then, When } from "../fixtures";
import { lookup } from "../support";

const viewports: Record<string, { width: number; height: number }> = {
	desktop: { width: 1280, height: 720 },
	phone: { width: 375, height: 667 },
};

const posts = (page: Page) => page.getByRole("article");
const previousPageLink = (page: Page) => page.getByRole("link", { name: /Previous Page/ });
const nextPageLink = (page: Page) => page.getByRole("link", { name: /Next Page/ });

const elements: Record<string, (page: Page) => Locator> = {
	"30 posts": posts,
	"previous index page link": previousPageLink,
	"next index page link": nextPageLink,
};

const visibilities: Record<string, (locator: Locator) => Promise<void>> = {
	"30 posts": (locator) => expect(locator).toHaveCount(30),
	"previous index page link": (locator) => expect(locator).toBeVisible(),
	"next index page link": (locator) => expect(locator).toBeVisible(),
};

const links: Record<string, (page: Page) => Locator> = {
	"next index page": nextPageLink,
	"previous index page": previousPageLink,
};

const paths: Record<string, string> = {
	"home page": "/",
	"second index page": "/2/",
};

Given("the visitor is browsing on a {string}", async ({ page }, device: string) => {
	await page.setViewportSize(lookup(viewports, device));
});

When("the visitor follows the {string} link", async ({ page }, name: string) => {
	await lookup(links, name)(page).click();
});

Then("the visitor sees the {string}", async ({ page }, name: string) => {
	await lookup(visibilities, name)(lookup(elements, name)(page));
});

Then("the visitor does not see the {string}", async ({ page }, name: string) => {
	await expect(lookup(elements, name)(page)).toHaveCount(0);
});

Then("the visitor is on the {string}", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(paths, name));
});
