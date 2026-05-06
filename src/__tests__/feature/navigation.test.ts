import { expect, test } from "@playwright/test";

test.describe
	.parallel("Given I navigate to the site using a desktop browser", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/", { waitUntil: "networkidle" });
		});

		test("When I click the burger menu button", async ({ page }) => {
			const nav = page.getByRole("navigation", { name: /main/i });
			const openButton = nav.getByRole("button", { name: /open menu/i });
			const menuPanel = nav.locator("div[id]");

			await test.step("Then the sidebar menu should be visible", async () => {
				await openButton.click();
				await expect(menuPanel).toBeVisible();
			});

			await test.step("And menu should close by clicking on the overlay", async () => {
				await page.mouse.click(300, 300);
				await expect(menuPanel).toBeHidden();
			});
		});

		test("When I view the homepage", async ({ page }) => {
			const footer = page.locator("footer");
			const rssLink = footer.getByRole("link", { name: "RSS" });
			const socialLinks = footer.getByRole("link").filter({ hasNotText: "RSS" });

			await test.step("Then the footer should be visible", async () => {
				await footer.scrollIntoViewIfNeeded();
				await expect(footer).toBeVisible();
			});

			await test.step("And I should see social links", async () => {
				await expect(socialLinks).toHaveCount(3);
			});

			await test.step("And the RSS link should navigate to feed", async () => {
				await Promise.all([rssLink.click(), page.waitForURL(/feed/)]);
			});
		});
	});

test.describe
	.parallel("Given I navigate to the site using a mobile browser", () => {
		test.use({
			hasTouch: true,
			viewport: {
				width: 375,
				height: 667,
			},
		});

		test.beforeEach(async ({ page }) => {
			await page.goto("/", { waitUntil: "networkidle" });
		});

		test("When I click the burger menu button", async ({ page }) => {
			const nav = page.getByRole("navigation", { name: /main/i });
			const openButton = nav.getByRole("button", { name: /open menu/i });
			const menuPanel = nav.locator("div[id]");

			await test.step("Then the sidebar menu should be visible", async () => {
				await openButton.click();
				await expect(menuPanel).toBeVisible();
			});

			await test.step("And menu should close by clicking on the overlay", async () => {
				await page.mouse.click(300, 300);
				await expect(menuPanel).toBeHidden();
			});
		});

		test("When I view the homepage", async ({ page }) => {
			const footer = page.locator("footer");
			const rssLink = footer.getByRole("link", { name: "RSS" });

			await test.step("Then the footer should be visible", async () => {
				await footer.scrollIntoViewIfNeeded();
				await expect(footer).toBeVisible();
			});

			await test.step("And the RSS link should navigate to feed", async () => {
				await Promise.all([rssLink.tap(), page.waitForURL(/feed/)]);
			});
		});
	});
