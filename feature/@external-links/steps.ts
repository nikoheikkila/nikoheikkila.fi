import { expect } from "@playwright/test";
import { Then, When } from "../fixtures";

const externalSites = /^https:\/\/(github\.com|(www\.)?linkedin\.com)\//;

When("the visitor follows the external {string} link", async ({ page, popup }, name: string) => {
	await page.context().route(externalSites, (route) => route.fulfill({ body: "" }));
	const [tab] = await Promise.all([page.waitForEvent("popup"), page.getByRole("link", { name }).click()]);

	popup.remember(tab);
});

Then("the GitHub text editor opens in a new tab", async ({ popup }) => {
	await expect(popup.value).toHaveURL(/^https:\/\/github\.com\/.*\/edit\/main\/content\//);
});

Then("the GitHub commits listing opens in a new tab", async ({ popup }) => {
	await expect(popup.value).toHaveURL(/^https:\/\/github\.com\/.*\/commits\/main\/content\//);
});

Then("LinkedIn opens in a new tab", async ({ popup }) => {
	await expect(popup.value).toHaveURL(/^https:\/\/(www\.)?linkedin\.com\//);
});

Then("the latest post is open in the original tab", async ({ page }) => {
	await expect(page).toHaveURL(/\/blog\//);
});
