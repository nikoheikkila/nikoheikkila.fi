import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Locator, type Page } from "@playwright/test";
import { Given, Then } from "../fixtures";
import { lookup } from "../support";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const elements: Record<string, (page: Page) => Locator> = {
	"Skip to main content link": (page) => page.getByRole("link", { name: /skip to main content/i }),
	"main content": (page) => page.locator("#main-content"),
};

const assertions: Record<string, (locator: Locator) => Promise<void>> = {
	focused: (locator) => expect(locator).toBeFocused(),
	"in view": (locator) => expect(locator).toBeInViewport(),
};

const fragments: Record<string, RegExp> = {
	"main content": /#main-content$/,
};

Given("the {string} is {string}", async ({ page }, element: string, state: string) => {
	expect(state).toBe("focused");
	await lookup(elements, element)(page).focus();
});

Then("the page has no accessibility violations", async ({ page }) => {
	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

	expect(results.violations).toEqual([]);
});

Then("the {string} is {string}", async ({ page }, element: string, state: string) => {
	await lookup(assertions, state)(lookup(elements, element)(page));
});

Then("the page address points to the {string}", async ({ page }, element: string) => {
	await expect(page).toHaveURL(lookup(fragments, element));
});
