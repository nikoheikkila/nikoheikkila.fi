import { test, expect, type Page } from "@playwright/test";
import * as Navigate from "./navigate";

test.describe
	.parallel("Given I'm on a single post page", () => {
		test.beforeEach(async ({ page }) => {
			const title = page.getByTestId("post-title").first();

			await page.goto("/");
			await Navigate.toInternalPageByClicking(page, title);

			await expect(page).toHaveURL(/blog/);
		});

		test("when I view it, then title should render correctly", async ({ page }) => {
			const postHeader = page.getByTestId("post-header");
			await expect(postHeader).toBeVisible();
		});

		test("when I view it, then I should see a subscribe box", async ({ page }) => {
			const subscribeBox = page.getByTestId("rss-subscribe");
			await expect(subscribeBox).toBeVisible();
		});

		test("when I click the RSS link, then I should be redirected to the feed", async ({ page }) => {
			const rssLink = page.getByTestId("rss-subscribe").getByRole("link");

			await rssLink.click();

			await page.waitForURL(/feed/);
			await expect(page).toHaveURL(/feed/);
		});

		test("when I click the 'Edit' button, then I should be taken to GitHub web editor", async ({ page }) => {
			let github: Page;

			await test.step("Locate and click edit link", async () => {
				const editLink = page.getByRole("link", { name: /Edit Page/ });
				github = await Navigate.toExternalSiteByClicking(page, editLink);
			});

			await test.step("Verify GitHub page opened correctly", async () => {
				await expect(github).toHaveURL(/github\.com/);
				await expect(github).toHaveTitle(/Sign in to GitHub/);
			});
		});

		test("when I click the 'View History' button, then I should be taken to GitHub history view", async ({ page }) => {
			let github: Page;

			await test.step("Locate and click history link", async () => {
				const historyLink = page.getByRole("link", { name: /View History/ });
				github = await Navigate.toExternalSiteByClicking(page, historyLink);
			});

			await test.step("Verify GitHub history page opened correctly", async () => {
				await expect(github).toHaveURL(/github\.com/);
				await expect(github).toHaveTitle(/History for/);
			});
		});
	});

test.describe
	.parallel("Given I'm on a page with cover image", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/about");
			await expect(page).toHaveURL(/about/);
		});

		test("when I view it, then it should display the accessible cover image", async ({ page }) => {
			const heroImage = page.locator("img[data-main-image]");

			await expect(heroImage).toBeVisible();
			await expect(heroImage).toHaveAttribute("alt");
		});
	});
