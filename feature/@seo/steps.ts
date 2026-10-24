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
	"link preview address": meta("og:url"),
	"link preview type": meta("og:type"),
	"link preview author": meta("article:author"),
	"link preview image protocol": async (page) =>
		new URL(await meta("og:image")(page)).protocol.replace(":", "").toUpperCase(),
};

const postDetails: Record<string, (page: Page) => Promise<string>> = {
	excerpt: async (page) => (await page.getByTestId("post-excerpt").textContent()) ?? "",
	heading: async (page) => (await page.getByRole("heading", { level: 1 }).textContent()) ?? "",
	link: async (page) => page.url(),
};

const expectations: Record<string, (actual: string) => void> = {
	"non-empty": (actual) => expect(actual).toBeTruthy(),
};

const comparisons: Record<string, (actual: string, expected: string) => void> = {
	"link preview address": (actual, expected) => expect(pathOf(actual)).toBe(pathOf(expected)),
};

const structuredData = async (page: Page): Promise<StructuredDataEntry[]> => {
	let entries: StructuredDataEntry[] = [];

	// The schema script is injected with ScriptStrategy.idle, so it can lag behind client-side navigation.
	await expect(async () => {
		const raw = await page.locator("script[type='application/ld+json']").first().textContent();
		entries = JSON.parse(raw ?? "");

		const website = entries.find((entry) => entry["@type"] === "WebSite");
		expect(pathOf(website?.url ?? "")).toBe(pathOf(page.url()));
	}).toPass();

	return entries;
};

const sections: Record<string, (page: Page) => Promise<StructuredDataEntry[]>> = {
	"structured data": structuredData,
};

Then("the page description matches the post {string}", async ({ page }, name: string) => {
	await expect(async () => {
		const description = await lookup(properties, "search description")(page);

		expect(description).toBeTruthy();
		expect(description).toBe(await lookup(postDetails, name)(page));
	}).toPass();
});

Then("the page {string} matches the post {string}", async ({ page }, property: string, name: string) => {
	const compare = comparisons[property] ?? ((a: string, e: string) => expect(a).toBe(e));

	await expect(async () => {
		compare(await lookup(properties, property)(page), await lookup(postDetails, name)(page));
	}).toPass();
});

Then("the page {string} is {string}", async ({ page }, property: string, expected: string) => {
	const verify = expectations[expected] ?? ((value: string) => expect(value).toBe(expected));

	await expect(async () => {
		verify(await lookup(properties, property)(page));
	}).toPass();
});

Then("the page {string} includes website name at the post address", async ({ page }, name: string) => {
	const entries = await lookup(sections, name)(page);
	const website = entries.find((entry) => entry["@type"] === "WebSite");

	expect(pathOf(website?.url ?? "")).toBe(pathOf(page.url()));
});

Then("the page {string} includes a breadcrumb trail", async ({ page }, name: string) => {
	const entries = await lookup(sections, name)(page);
	const breadcrumbs = entries.find((entry) => entry["@type"] === "BreadcrumbList");

	expect(breadcrumbs?.itemListElement?.length).toBeGreaterThan(0);
});
