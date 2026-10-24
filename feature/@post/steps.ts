import { expect, type Locator, type Page } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const olderPostLink = (page: Page) => page.locator('a[rel="prev"]');
const newerPostLink = (page: Page) => page.locator('a[rel="next"]');

const rssLink = (page: Page) => page.getByRole("link", { name: "RSS feed" });

const elements: Record<string, (page: Page) => Locator> = {
	"older post link": olderPostLink,
	"newer post link": newerPostLink,
};

const links: Record<string, (page: Page) => Locator> = {
	"older post": olderPostLink,
	"newer post": newerPostLink,
	"RSS feed": rssLink,
};

const headings: Record<string, (page: Page) => Promise<string>> = {
	"post title": (page) => page.title(),
};

When("the visitor follows the {string} link", async ({ page, destination }, name: string) => {
	const link = lookup(links, name)(page);
	destination.remember((await link.getAttribute("href")) ?? "");
	await link.click();
});

Then("the visitor sees the {string}", async ({ page }, name: string) => {
	await expect(lookup(elements, name)(page)).toBeVisible();
});

Then("the visitor sees the {string} link", async ({ page }, name: string) => {
	await expect(lookup(links, name)(page)).toBeVisible();
});

Then("the visitor sees the {string} as main heading", async ({ page }, name: string) => {
	const heading = page.getByRole("heading", { level: 1 });

	await expect(heading).toBeVisible();
	expect(await lookup(headings, name)(page)).toContain(await heading.textContent());
});

Then("the visitor does not see the {string}", async ({ page }, name: string) => {
	await expect(lookup(elements, name)(page)).toHaveCount(0);
});

Then("the visitor is on the {string}", async ({ page, destination }, _name: string) => {
	await expect(page).toHaveURL(destination.expected);
});
