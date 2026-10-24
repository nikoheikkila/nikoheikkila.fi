import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";
import { Given, Then } from "../fixtures";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const skipLink = (page: Page) => page.getByRole("link", { name: /skip to main content/i });

Given("the skip link is focused", async ({ page }) => {
	await skipLink(page).focus();
});

Then("the page has no accessibility violations", async ({ page }) => {
	const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

	expect(results.violations).toEqual([]);
});

Then("the skip link is focused", async ({ page }) => {
	await expect(skipLink(page)).toBeFocused();
});

Then("the main content is in view", async ({ page }) => {
	await expect(page.getByRole("main")).toBeInViewport();
});

Then("the page address points to the main content", async ({ page }) => {
	await expect(page).toHaveURL(/#main-content$/);
});
