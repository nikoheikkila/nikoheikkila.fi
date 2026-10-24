import { expect, type Page } from "@playwright/test";
import { Given, Then, When } from "../fixtures";
import { lookup, openPage } from "../support";

const searchInput = (page: Page) => page.getByRole("search").getByRole("searchbox", { name: /search posts/i });
const resultsDialog = (page: Page) => page.getByRole("dialog", { name: /search results/i });
const results = (page: Page) => resultsDialog(page).getByRole("article");
const backdrop = (page: Page) => page.getByRole("button", { name: /dismiss search results/i });

const destinations: Record<string, RegExp> = {
	"post page": /\/blog\//,
};

const dismissals: Record<string, (page: Page) => Promise<void>> = {
	"pressing Escape": (page) => page.keyboard.press("Escape"),
	"clicking outside focus": (page) => backdrop(page).click({ position: { x: 10, y: 10 } }),
};

const search = async (page: Page, term: string): Promise<void> => {
	await searchInput(page).fill(term);
	await searchInput(page).press("Enter");
};

const expectSearchResults = async (page: Page): Promise<void> => {
	await expect(resultsDialog(page)).toBeVisible();
	await expect(results(page).first()).toBeVisible();
};

Given("the visitor has searched for {string}", async ({ page }, term: string) => {
	await openPage(page, "home page");
	await search(page, term);
	await expectSearchResults(page);
});

Given("the first search result is focused", async ({ page }) => {
	await page.keyboard.press("ArrowDown");
	await expect(results(page).first()).toHaveClass(/resultItemActive/);
});

When("the visitor searches for {string}", async ({ page }, term: string) => {
	await search(page, term);
});

When("the visitor follows the first search result link", async ({ page }) => {
	await results(page).first().getByRole("link").click();
});

When("the visitor dismisses the search results by {string}", async ({ page }, method: string) => {
	await lookup(dismissals, method)(page);
});

Then("the visitor sees the search results", async ({ page }) => {
	await expectSearchResults(page);
});

Then("the visitor sees a no results message", async ({ page }) => {
	await expect(resultsDialog(page).getByText(/no results/i)).toBeVisible();
});

Then("the visitor is on the {string}", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(destinations, name));
});

Then("the search results are hidden", async ({ page }) => {
	await expect(resultsDialog(page)).toBeHidden();
});
