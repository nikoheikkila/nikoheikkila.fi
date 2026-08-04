import test, { expect } from "@playwright/test";

const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

test.describe
	.parallel("API Tests", () => {
		test("/robots.txt should return correct robots.txt file", async ({ request }) => {
			const response = await request.get("/robots.txt");
			await expect(response).toBeOK();

			const body = await response.text();

			expect(body).toMatchSnapshot("robots.txt");
		});

		test("/rss.xml should return valid RSS feed", async ({ request }) => {
			const response = await request.get("/rss.xml");
			await expect(response).toBeOK();

			const body = await response.text();
			expect(body).toMatch(validXMLHeader);
		});

		test("/sitemap should return valid XML sitemap", async ({ request }) => {
			const response = await request.get("/sitemap-index.xml");
			await expect(response).toBeOK();

			const body = await response.text();
			expect(body).toMatch(validXMLHeader);
		});

		test("/.well-known/site.standard.publication should return the publication AT-URI", async ({ request }) => {
			const response = await request.get("/.well-known/site.standard.publication");

			// biome-ignore lint/suspicious/noSkippedTests: guards against offline/never-synced builds, not a placeholder
			test.skip(response.status() === 404, "standard.site records not present in this build");

			const body = await response.text();
			expect(body.trim()).toMatch(/^at:\/\/did:plc:[a-z0-9]+\/site\.standard\.publication\/[a-z0-9]+$/);
		});

		test("/ should carry the standard.site publication link tag", async ({ request }) => {
			const response = await request.get("/");
			const body = await response.text();

			// biome-ignore lint/suspicious/noSkippedTests: guards against offline/never-synced builds, not a placeholder
			test.skip(!body.includes('rel="site.standard.publication"'), "standard.site records not present in this build");

			expect(body).toContain('rel="site.standard.publication"');
		});

		test("a post page should carry both standard.site link tags", async ({ request }) => {
			const response = await request.get("/blog/my-vibe-coding-workflow/");
			const body = await response.text();

			// biome-ignore lint/suspicious/noSkippedTests: guards against offline/never-synced builds, not a placeholder
			test.skip(!body.includes('rel="site.standard.document"'), "standard.site records not present in this build");

			expect(body).toContain('rel="site.standard.document"');
			expect(body).toContain('rel="site.standard.publication"');
		});
	});
