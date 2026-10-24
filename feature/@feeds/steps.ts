import { expect } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const files: Record<string, string> = {
	"RSS feed": "/rss.xml",
	sitemap: "/sitemap-index.xml",
	"crawler rules": "/robots.txt",
};

When("the visitor fetches the {string}", async ({ request, responses }, name: string) => {
	const response = await request.get(lookup(files, name));

	await expect(response).toBeOK();
	responses.remember(response);
});

Then("the response is a valid XML document", async ({ responses }) => {
	expect(await responses.received.text()).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/);
});

Then("the response matches the approved version", async ({ responses }) => {
	expect(await responses.received.text()).toMatchSnapshot("robots.txt");
});
