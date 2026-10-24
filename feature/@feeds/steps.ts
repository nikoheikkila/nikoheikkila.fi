import { expect } from "@playwright/test";
import { Then, When } from "../fixtures";
import { lookup } from "../support";

const files: Record<string, string> = {
	"RSS feed": "/rss.xml",
	sitemap: "/sitemap-index.xml",
	"crawler rules": "/robots.txt",
};

const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

const expectations: Record<string, (body: string) => void> = {
	"valid XML": (body) => expect(body).toMatch(validXMLHeader),
	"the approved version": (body) => expect(body).toMatchSnapshot("robots.txt"),
};

When("the visitor fetches the {string}", async ({ request, responses }, name: string) => {
	const response = await request.get(lookup(files, name));

	await expect(response).toBeOK();
	responses.remember(response);
});

Then("the response is {string}", async ({ responses }, expectation: string) => {
	lookup(expectations, expectation)(await responses.received.text());
});
