import { expect, type Page, type Response } from "@playwright/test";
import { Given, Then, When } from "../fixtures";
import { goto, type Remembered } from "../support";

type NavigationOptions = { page: Page; visit: Remembered<Response | null> };

const navigateTo = async ({ page, visit }: NavigationOptions, path: string) => {
	visit.remember(await goto(page, path));
};

Given("the visitor is on {string}", navigateTo);

When("the visitor lands on {string}", navigateTo);

Then("the response status is {int}", async ({ visit }, status: number) => {
	expect(visit.value?.status()).toBe(status);
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
