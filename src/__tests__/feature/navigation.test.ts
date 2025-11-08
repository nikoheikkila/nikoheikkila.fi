import { expect, test } from "@playwright/test";

test.describe
	.parallel("Given I navigate to the site using a desktop browser", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("When I click the burger menu button", async ({ page }) => {
			const burgerMenuButton = page.locator(".bm-burger-button");
			const menuContainer = page.locator(".bm-menu");
			const menuOverlay = page.locator(".bm-overlay");

			await test.step("Then the sidebar menu should be visible", async () => {
				await burgerMenuButton.click();
				await expect(menuContainer).toBeVisible();
			});

			await test.step("And menu should close by clicking on the overlay", async () => {
				await expect(menuOverlay).toBeVisible();
				await page.mouse.click(100, 100);
				await expect(menuContainer).toBeHidden();
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
				await expect(socialLinks).toHaveCount(4);
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
			await page.goto("/");
		});

		test("When I click the burger menu button", async ({ page }) => {
			const burgerMenuButton = page.locator(".bm-burger-button");
			const menuContainer = page.locator(".bm-menu");
			const menuOverlay = page.locator(".bm-overlay");

			await test.step("Then the sidebar menu should be visible", async () => {
				await burgerMenuButton.click();
				await expect(menuContainer).toBeVisible();
			});

			await test.step("And menu should close by clicking on the overlay", async () => {
				await expect(menuOverlay).toBeVisible();
				await page.mouse.click(100, 100);
				await expect(menuContainer).toBeHidden();
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
