import { expect, test } from "@playwright/test";

type StructuredDataEntry = {
	"@type": string;
	url?: string;
	itemListElement?: unknown[];
};

test.describe("Given I open a blog post page", () => {
	test.beforeEach(async ({ page }) => {
		const title = page.getByRole("article").first().getByRole("link");

		await page.goto("/", { waitUntil: "networkidle" });
		await title.click();

		await expect(page).toHaveURL(/blog/);
	});

	test("When I inspect the document head", async ({ page }) => {
		const heading = page.getByRole("heading", { level: 1 });
		const headingText = await heading.textContent();
		expect(headingText).not.toBeNull();

		const excerpt = page.getByTestId("post-excerpt");
		const excerptText = await excerpt.textContent();
		expect(excerptText).not.toBeNull();

		const metaContent = await page.evaluate(() =>
			Object.fromEntries(
				Array.from(document.querySelectorAll("meta[name]")).map((meta) => [
					meta.getAttribute("name"),
					meta.getAttribute("content"),
				]),
			),
		);

		await test.step("Then meta description should be non-empty and match the post excerpt", async () => {
			expect(metaContent.description).toBeTruthy();
			expect(metaContent.description).toBe(excerptText);
		});

		await test.step("And og:title should equal the post's H1 heading text", async () => {
			expect(metaContent["og:title"]).toBe(headingText ?? "");
		});

		await test.step("And og:type should equal 'article'", async () => {
			expect(metaContent["og:type"]).toBe("article");
		});

		await test.step("And og:url should equal the current page URL", async () => {
			expect(metaContent["og:url"]).toBeTruthy();
			// The site emits an absolute canonical URL, so compare paths rather than origins.
			expect(new URL(metaContent["og:url"] ?? "").pathname).toBe(new URL(page.url()).pathname);
		});

		await test.step("And article:author should equal 'Niko Heikkilä'", async () => {
			expect(metaContent["article:author"]).toBe("Niko Heikkilä");
		});

		await test.step("And og:image should resolve to an absolute https URL", async () => {
			expect(metaContent["og:image"]).toBeTruthy();
			expect(metaContent["og:image"]).toMatch(/^https:\/\//);
		});
	});

	test("When I parse the script[type='application/ld+json'] contents", async ({ page }) => {
		const jsonLd = page.locator("script[type='application/ld+json']").first();
		const rawContent = await jsonLd.textContent();

		await test.step("Then it should be valid JSON", async () => {
			expect(rawContent).toBeTruthy();
			expect(() => JSON.parse(rawContent ?? "")).not.toThrow();
		});

		const structuredData: StructuredDataEntry[] = JSON.parse(rawContent ?? "");

		await test.step("And it should contain a WebSite entry whose url matches the page", async () => {
			expect(Array.isArray(structuredData)).toBe(true);

			const website = structuredData.find((entry) => entry["@type"] === "WebSite");

			expect(website?.url).toBeTruthy();
			expect(new URL(website?.url ?? "").pathname).toBe(new URL(page.url()).pathname);
		});

		await test.step("And it should contain a BreadcrumbList entry with itemListElement entries", async () => {
			const breadcrumbList = structuredData.find((entry) => entry["@type"] === "BreadcrumbList");

			expect(Array.isArray(breadcrumbList?.itemListElement)).toBe(true);
			expect(breadcrumbList?.itemListElement?.length).toBeGreaterThan(0);
		});
	});
});

test.describe("Given I open the home page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });
	});

	test("When I inspect the document title and meta description", async ({ page }) => {
		await test.step("Then document.title should be non-empty", async () => {
			await expect(page).toHaveTitle(/.+/);
		});

		await test.step("And meta description should be non-empty", async () => {
			const description = page.locator("meta[name='description']");
			const content = await description.getAttribute("content");

			expect(content).toBeTruthy();
		});
	});
});
