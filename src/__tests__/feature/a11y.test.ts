import { expect, test, type Page } from "@playwright/test";
import { AxeBuilder } from "@axe-core/playwright";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const scanPage = async (page: Page) => new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

test.describe("Given I audit the site for WCAG 2.2 AA accessibility", () => {
	test("When I scan the homepage then there are no violations", async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });

		await test.step("Then the homepage passes the axe scan", async () => {
			const results = await scanPage(page);
			expect(results.violations).toEqual([]);
		});
	});

	test("When I scan the second index page then there are no violations", async ({ page }) => {
		await page.goto("/2/", { waitUntil: "networkidle" });

		await test.step("Then the paginated index passes the axe scan", async () => {
			const results = await scanPage(page);
			expect(results.violations).toEqual([]);
		});
	});

	test("When I scan a blog post then there are no violations", async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });

		await test.step("And I navigate to the first article", async () => {
			const firstArticleLink = page.getByRole("article").first().getByRole("link").first();
			await Promise.all([page.waitForURL(/\/blog\//), firstArticleLink.click()]);
		});

		await test.step("Then the blog post passes the axe scan", async () => {
			const results = await scanPage(page);
			expect(results.violations).toEqual([]);
		});
	});

	test("When I scan the About page then there are no violations", async ({ page }) => {
		await page.goto("/about/", { waitUntil: "networkidle" });

		await test.step("Then the About page passes the axe scan", async () => {
			const results = await scanPage(page);
			expect(results.violations).toEqual([]);
		});
	});

	test("When I scan the Uses page then there are no violations", async ({ page }) => {
		await page.goto("/uses/", { waitUntil: "networkidle" });

		await test.step("Then the Uses page passes the axe scan", async () => {
			const results = await scanPage(page);
			expect(results.violations).toEqual([]);
		});
	});
});
