import { test, expect, type Page } from "@playwright/test";
import * as Navigate from "./navigate";

test.describe
	.parallel("Given I'm on a single post page", () => {
		test.beforeEach(async ({ page }) => {
			const title = page.getByRole("article").first().getByRole("link");

			await page.goto("/");
			await Navigate.toInternalPageByClicking(page, title);

			await expect(page).toHaveURL(/blog/);
		});

		test("when I view it, then title should render correctly", async ({ page }) => {
			const postTitle = page.getByRole("heading", { level: 1 });
			await expect(postTitle).toBeVisible();
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

		test("Post byline shows author, publish date, and reading time", async ({ page }) => {
			await test.step("Given I'm on a single blog post page", async () => {
				await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
			});

			await test.step("When I inspect the byline paragraph under the title", async () => {
				await expect(page.getByTestId("post-author")).toContainText("By Niko Heikkilä");
				await expect(page.getByTestId("post-date")).toBeVisible();
				await expect(page.getByTestId("post-ttr")).toContainText("☕️");
				await expect(page.getByTestId("post-ttr")).toContainText(/minutes? read/);
			});
		});
	});

test.describe
	.parallel("Given I'm on a blog post containing a fenced code block", () => {
		test.beforeEach(async ({ page }) => {
			await page.goto("/blog/hello-neovim-my-old-friend/", { waitUntil: "networkidle" });
		});

		test("Code block renders with a visible language label and line numbers", async ({ page }) => {
			const codeRegion = page.getByRole("region", { name: /code block$/ });

			await test.step("When I locate the code block region", async () => {
				const languageLabel = codeRegion.locator("xpath=preceding-sibling::span[1]");
				const firstLineNumber = codeRegion.locator(".react-syntax-highlighter-line-number").first();

				await expect(languageLabel).toHaveText("Sh");
				await expect(codeRegion).toHaveAttribute("role", "region");
				await expect(codeRegion).toHaveAccessibleName(/code block$/);
				await expect(firstLineNumber).toHaveText("1");
			});
		});

		test("Code block region is keyboard focusable for horizontal scrolling", async ({ page }) => {
			const codeRegion = page.getByRole("region", { name: /code block$/ });

			await test.step("When I press Tab until the code region receives focus", async () => {
				await expect(async () => {
					await page.keyboard.press("Tab");
					await expect(codeRegion).toBeFocused({ timeout: 100 });
				}).toPass({ timeout: 10_000 });

				await expect(codeRegion).toHaveAttribute("tabindex", "0");
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

		test("Cover image on pages resolves to a real, successfully-loaded image", async ({ page }) => {
			const heroImage = page.locator("img[data-main-image]");

			await test.step("When the page finishes loading", async () => {
				await expect(heroImage).toBeVisible();

				const naturalWidth = await heroImage.evaluate((image: HTMLImageElement) => image.naturalWidth);
				expect(naturalWidth).toBeGreaterThan(0);

				const src = await heroImage.getAttribute("src");

				if (!src) {
					throw new Error("Cover image is missing a resolved src attribute");
				}

				const response = await page.request.get(new URL(src, page.url()).toString());
				expect(response.status()).toBe(200);
			});
		});
	});
