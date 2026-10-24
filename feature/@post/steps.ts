import { expect, type Locator, type Page } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const links: Record<string, (page: Page) => Locator> = {
	"older post": (page) => page.locator('a[rel="prev"]'),
	"newer post": (page) => page.locator('a[rel="next"]'),
	"RSS feed": (page) => page.getByRole("link", { name: "RSS feed" }),
};

When("the visitor follows the {string} link", async ({ page, destination }, name: string) => {
	const link = lookup(links, name)(page);
	destination.remember((await link.getAttribute("href")) ?? "");
	await link.click();
});

Then("the visitor sees the {string} link", async ({ page }, name: string) => {
	await expect(lookup(links, name)(page)).toBeVisible();
});

Then("the visitor does not see the {string} link", async ({ page }, name: string) => {
	await expect(lookup(links, name)(page)).toHaveCount(0);
});

Then("the visitor sees the post title as the main heading", async ({ page }) => {
	const heading = page.getByRole("heading", { level: 1 });

	await expect(heading).toBeVisible();
	expect(await page.title()).toContain(await heading.textContent());
});

Then("the visitor arrives at the linked page", async ({ page, destination }) => {
	await expect(page).toHaveURL(destination.expected);
});
