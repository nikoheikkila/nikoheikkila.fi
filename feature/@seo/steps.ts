import { expect, type Page } from "@playwright/test";
import { Then } from "../fixtures";
import { lookup } from "../support";

type StructuredDataEntry = {
	"@type": string;
	url?: string;
	itemListElement?: unknown[];
};

const meta = (name: string) => (page: Page) =>
	page.evaluate((key) => document.querySelector(`meta[name='${key}']`)?.getAttribute("content") ?? "", name);

const pathOf = (address: string) => new URL(address).pathname;

const properties: Record<string, (page: Page) => Promise<string>> = {
	title: (page) => page.title(),
	"search description": meta("description"),
	"link preview title": meta("og:title"),
	"link preview address": async (page) => pathOf(await meta("og:url")(page)),
	"link preview type": meta("og:type"),
	"link preview author": meta("article:author"),
	"link preview image protocol": async (page) =>
		new URL(await meta("og:image")(page)).protocol.replace(":", "").toUpperCase(),
};

const postDetails: Record<string, (page: Page) => Promise<string>> = {
	excerpt: async (page) => (await page.getByTestId("post-excerpt").textContent()) ?? "",
	heading: async (page) => (await page.getByRole("heading", { level: 1 }).textContent()) ?? "",
	link: async (page) => pathOf(page.url()),
};

// The schema script is injected with ScriptStrategy.idle, so it can lag behind client-side navigation.
const findStructuredData = async (page: Page, type: string): Promise<StructuredDataEntry | undefined> => {
	const raw = await page.locator("script[type='application/ld+json']").first().textContent();
	const entries: StructuredDataEntry[] = JSON.parse(raw ?? "[]");

	return entries.find((entry) => entry["@type"] === type);
};

Then("the page {string} matches the post {string}", async ({ page }, property: string, detail: string) => {
	const expected = await lookup(postDetails, detail)(page);

	await expect.poll(() => lookup(properties, property)(page)).toBe(expected);
});

Then("the page {string} is {string}", async ({ page }, property: string, expected: string) => {
	await expect.poll(() => lookup(properties, property)(page)).toBe(expected);
});

Then("the page {string} is not empty", async ({ page }, property: string) => {
	await expect.poll(() => lookup(properties, property)(page)).not.toBe("");
});

Then("the structured data names the website at the post address", async ({ page }) => {
	await expect(async () => {
		const website = await findStructuredData(page, "WebSite");

		expect(pathOf(website?.url ?? "")).toBe(pathOf(page.url()));
	}).toPass();
});

Then("the structured data includes a breadcrumb trail", async ({ page }) => {
	await expect(async () => {
		const breadcrumbs = await findStructuredData(page, "BreadcrumbList");

		expect(breadcrumbs?.itemListElement?.length).toBeGreaterThan(0);
	}).toPass();
});
