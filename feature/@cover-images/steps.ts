import { expect, type Locator, type Page } from "@playwright/test";
import { Then } from "../fixtures";
import { lookup } from "../support";

const elements: Record<string, (page: Page) => Locator> = {
	"cover image": (page) => page.locator("header [data-main-image]"),
};

const assertions: Record<string, (locator: Locator) => Promise<void>> = {
	"hidden from screen readers": (locator) => expect(locator).toHaveAttribute("alt", ""),
	loaded: (locator) => expect(locator).toHaveJSProperty("complete", true),
};

Then("the visitor sees the {string}", async ({ page }, element: string) => {
	await expect(lookup(elements, element)(page)).toBeVisible();
});

Then("the {string} is {string}", async ({ page }, element: string, state: string) => {
	await lookup(assertions, state)(lookup(elements, element)(page));
});
