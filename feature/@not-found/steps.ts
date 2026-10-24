import { expect } from "@playwright/test";
import { Given, Then, When } from "../fixtures";
import { lookup } from "../support";

const addresses: Record<string, string> = {
	"missing page": "/this-page-does-not-exist/",
};

const pages: Record<string, string> = {
	Home: "/",
};

Given("the visitor is on a {string}", async ({ page, visit }, name: string) => {
	visit.remember(await page.goto(lookup(addresses, name), { waitUntil: "networkidle" }));
});

When("the visitor lands on a {string}", async ({ page, visit }, name: string) => {
	visit.remember(await page.goto(lookup(addresses, name), { waitUntil: "networkidle" }));
});

When("the visitor follows the {string} link", async ({ page }, name: string) => {
	await page.getByRole("link", { name }).click();
});

Then("the response status is {int}", async ({ visit }, status: number) => {
	expect(visit.status).toBe(status);
});

Then("the page title is {string}", async ({ page }, title: string) => {
	await expect(page).toHaveTitle(title);
});

Then("the visitor sees a heading {string}", async ({ page }, heading: string) => {
	await expect(page.getByRole("heading", { name: heading })).toBeVisible();
});

Then("the visitor sees a text {string}", async ({ page }, text: string) => {
	await expect(page.getByText(text)).toBeVisible();
});

Then("the visitor lands on the {string} page", async ({ page }, name: string) => {
	await expect(page).toHaveURL(lookup(pages, name));
});
