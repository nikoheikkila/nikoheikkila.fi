import { expect } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const destinations: Record<string, RegExp> = {
	GitHub: /^https:\/\/github\.com\//,
	LinkedIn: /^https:\/\/(www\.)?linkedin\.com\//,
};

const views: Record<string, RegExp> = {
	"GitHub text editor": /\/edit\/main\/content\/|%2Fedit%2Fmain%2Fcontent%2F/,
	"GitHub commits listing": /\/commits\/main\/content\/|%2Fcommits%2Fmain%2Fcontent%2F/,
};

const originals: Record<string, RegExp> = {
	"latest post": /\/blog\//,
};

When("the visitor follows the {string} link", async ({ page, tabs }, name: string) => {
	const [popup] = await Promise.all([page.waitForEvent("popup"), page.getByRole("link", { name }).click()]);

	tabs.remember(popup);
});

Then("{string} opens in a new tab", async ({ tabs }, destination: string) => {
	await expect(tabs.opened).toHaveURL(lookup(destinations, destination));
});

Then("the visitor sees the {string}", async ({ tabs }, view: string) => {
	await expect(tabs.opened).toHaveURL(lookup(views, view));
});

Then("the {string} is open in the original tab", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(originals, name));
});
