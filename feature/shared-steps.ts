import { Given, When } from "./fixtures";
import { openPage } from "./support";

Given("the visitor is on the {string}", async ({ page }, name: string) => {
	await openPage(page, name);
});

When("the visitor opens the {string}", async ({ page }, name: string) => {
	await openPage(page, name);
});

When("the visitor presses {string}", async ({ page }, key: string) => {
	await page.keyboard.press(key);
});
