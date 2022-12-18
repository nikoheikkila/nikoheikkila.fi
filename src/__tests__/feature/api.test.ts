import test, { expect } from "@playwright/test";

const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

test.describe.parallel("API Tests", () => {
    test("/robots.txt should return correct robots.txt file", async ({
        request,
    }) => {
        const response = await request.get("/robots.txt");
        await expect(response).toBeOK();

        const body = await response.text();
        expect(body).toContain("User-agent: ");
        expect(body).toContain("Allow: ");
        expect(body).toContain("Sitemap: ");
        expect(body).toContain("Host: ");
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
});
