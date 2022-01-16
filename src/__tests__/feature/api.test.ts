import test, { expect } from "@playwright/test";

const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

test.describe.parallel("API Tests", () => {
    test("/robots.txt should return correct robots.txt file", async ({
        request,
    }) => {
        const response = await request.get("/robots.txt");
        const body = await response.text();

        expect(response.ok()).toBeTruthy();
        expect(body).toMatch(/User-agent: \*/);
        expect(body).toMatch(/Allow: \//);
        expect(body).toMatch(/Sitemap: (.*)/);
        expect(body).toMatch(/Host: (.*)/);
    });

    test("/rss.xml should return valid RSS feed", async ({ request }) => {
        const response = await request.get("/rss.xml");
        const body = await response.text();

        expect(response.ok()).toBeTruthy();
        expect(body).toMatch(validXMLHeader);
    });

    test("/sitemap should return valid XML sitemap", async ({ request }) => {
        const response = await request.get("/sitemap/sitemap-index.xml");
        const body = await response.text();

        expect(response.ok()).toBeTruthy();
        expect(body).toMatch(validXMLHeader);
    });
});
