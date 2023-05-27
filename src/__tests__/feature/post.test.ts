import test, { expect } from "@playwright/test";
import * as Navigate from "./navigate";

test.describe.parallel("Given I'm on a single post page", () => {
	test.beforeEach(async ({ page }) => {
		const title = page.getByTestId("post-title").first();

		await page.goto("/");
		await Navigate.toInternalPageByClicking(page, title);

		await expect(page).toHaveURL(/blog/);
	});

	test("when I view it, then title should render correctly", async ({
		page,
	}) => {
		const postHeader = page.locator("data-testid=post-header");
		await expect(postHeader).toBeVisible();
	});

	test("when I view it, then I should see a subscribe box", async ({
		page,
	}) => {
		const subscribeBox = page.locator("data-test-id=rss-subscribe");
		await expect(subscribeBox).toBeVisible();
	});

	test("when I click the RSS link, then I should be redirected to the feed", async ({
		page,
	}) => {
		const rssLink = page.locator("data-test-id=rss-subscribe").locator("a");

		await rssLink.click();

		await page.waitForURL(/feed/);
		await expect(page).toHaveURL(/feed/);
	});

	test("when I click the 'Edit' button, then I should be taken to GitHub web editor", async ({
		page,
	}) => {
		const editLink = page.getByRole("link", { name: /Edit Page/ });

		const github = await Navigate.toExternalSiteByClicking(page, editLink);

		await expect(github).toHaveURL(/github\.com/);
		await expect(github).toHaveTitle(/Sign in to GitHub/);
	});

	test("when I click the 'View History' button, then I should be taken to GitHub history view", async ({
		page,
	}) => {
		const historyLink = page.getByRole("link", { name: /View History/ });

		const github = await Navigate.toExternalSiteByClicking(
			page,
			historyLink
		);

		await expect(github).toHaveURL(/github\.com/);
		await expect(github).toHaveTitle(/History for/);
	});
});

test.describe.parallel("Given I'm on a page with cover image", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/about");
		await expect(page).toHaveURL(/about/);
	});

	test("when I view it, then it should display the accessible cover image", async ({
		page,
	}) => {
		const heroImage = page.locator("img[data-main-image]");

		await expect(heroImage).toBeVisible();
		await expect(heroImage.getAttribute("alt")).not.toBeNull();
	});
});
