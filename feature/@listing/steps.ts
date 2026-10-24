import { expect, type Locator, type Page } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const links: Record<string, (page: Page) => Locator> = {
	"next index page": (page) => page.getByRole("link", { name: /Next Page/ }),
	"previous index page": (page) => page.getByRole("link", { name: /Previous Page/ }),
};

const paths: Record<string, string> = {
	"home page": "/",
	"second index page": "/2/",
};

When("the visitor follows the {string} link", async ({ page }, name: string) => {
	await lookup(links, name)(page).click();
});

Then("the visitor sees {int} posts", async ({ page }, count: number) => {
	await expect(page.getByRole("article")).toHaveCount(count);
});

Then("the visitor sees the {string} link", async ({ page }, name: string) => {
	await expect(lookup(links, name)(page)).toBeVisible();
});

Then("the visitor does not see the {string} link", async ({ page }, name: string) => {
	await expect(lookup(links, name)(page)).toHaveCount(0);
});

Then("the visitor is on the {string}", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(paths, name));
});
