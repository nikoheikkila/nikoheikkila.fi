import { expect } from "@playwright/test";
import { Then, When } from "../fixtures";

When("the visitor fetches {string}", async ({ request, fetched }, path: string) => {
	const response = await request.get(path);

	await expect(response).toBeOK();
	fetched.remember(response);
});

Then("the response is a valid XML document", async ({ fetched }) => {
	expect(await fetched.value.text()).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
});

Then("the response matches the approved version", async ({ fetched }) => {
	expect(await fetched.value.text()).toMatchSnapshot("robots.txt");
});
