import { test, expect } from "@playwright/test";

test.describe
	.parallel("Given I want to navigate the site", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/");
		});

		test("when I view the homepage, then navigation menu should be accessible", async ({ page }) => {
			await test.step("Verify burger menu is visible", async () => {
				const burgerMenuButton = page.locator(".bm-burger-button");
				await expect(burgerMenuButton).toBeVisible();
			});

			await test.step("Open burger menu and verify it works", async () => {
				const burgerMenuButton = page.locator(".bm-burger-button");
				await burgerMenuButton.click();

				// Wait for menu container to become visible
				const menuContainer = page.locator(".bm-menu");
				await expect(menuContainer).toBeVisible();
			});
		});

		test("when I view the homepage, then footer links should be accessible", async ({ page }) => {
			await test.step("Scroll to footer", async () => {
				await page.locator("footer").scrollIntoViewIfNeeded();
			});

			await test.step("Verify RSS link in footer", async () => {
				const rssFooterLink = page.locator("footer").getByRole("link", { name: "RSS" });
				await expect(rssFooterLink).toBeVisible();
				// The RSS link points to /feed/ based on siteMetadata.rss
				await expect(rssFooterLink).toHaveAttribute("href", "/feed/");
			});

			await test.step("Verify social media links are present", async () => {
				const footer = page.locator("footer");
				const socialLinks = footer.getByRole("link").filter({ hasNotText: "RSS" });
				const socialLinkCount = await socialLinks.count();

				await expect(socialLinkCount).toBeGreaterThan(0);
			});
		});

		test("when I interact with the burger menu, then it should open and close correctly", async ({ page }) => {
			await test.step("Open burger menu", async () => {
				const burgerMenuButton = page.locator(".bm-burger-button");
				await burgerMenuButton.click();

				const menuContainer = page.locator(".bm-menu");
				await expect(menuContainer).toBeVisible();
			});

			await test.step("Close menu by clicking overlay", async () => {
				const menuOverlay = page.locator(".bm-overlay");
				await expect(menuOverlay).toBeVisible();
				await menuOverlay.click();
			});
		});

		test("when I click RSS in footer, then I should navigate to feed redirect", async ({ page }) => {
			await test.step("Navigate to RSS feed via footer", async () => {
				await page.locator("footer").scrollIntoViewIfNeeded();
				const rssFooterLink = page.locator("footer").getByRole("link", { name: "RSS" });

				await rssFooterLink.click();
				// The footer link goes to /feed/ (a Gatsby redirect to /rss.xml)
				await expect(page).toHaveURL("/feed/");
			});
		});
	});

test.describe
	.parallel("Given I want to test mobile navigation", () => {
		test.beforeEach(async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto("/");
		});

		test("when I use mobile device, then burger menu should work correctly", async ({ page }) => {
			await test.step("Verify burger menu is accessible on mobile", async () => {
				const burgerMenuButton = page.locator(".bm-burger-button");
				await expect(burgerMenuButton).toBeVisible();
			});

			await test.step("Open and verify mobile menu works", async () => {
				const burgerMenuButton = page.locator(".bm-burger-button");
				await burgerMenuButton.click();

				const menuContainer = page.locator(".bm-menu");
				await expect(menuContainer).toBeVisible();
			});
		});

		test("when I use mobile device, then footer should remain accessible", async ({ page }) => {
			await test.step("Scroll to footer on mobile", async () => {
				await page.locator("footer").scrollIntoViewIfNeeded();
			});

			await test.step("Verify footer links work on mobile", async () => {
				const rssFooterLink = page.locator("footer").getByRole("link", { name: "RSS" });
				await expect(rssFooterLink).toBeVisible();

				const boundingBox = await rssFooterLink.boundingBox();
				// Touch target should be at least 20px (inclusive)
				expect(boundingBox?.height).toBeGreaterThanOrEqual(20);
			});
		});
	});
