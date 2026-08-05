import { expect, test } from "@playwright/test";

test.describe("Given I'm on a blog post that has both older and newer neighbouring content", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/blog/my-vibe-coding-workflow/", { waitUntil: "networkidle" });
	});

	test("When I scroll to the bottom navigation list below 'Back to posts' / 'Edit Page' / 'View History'", async ({
		page,
	}) => {
		const attachments = page.getByRole("link", { name: "Back to posts" });
		const previousLink = page.locator('a[rel="prev"]');
		const nextLink = page.locator('a[rel="next"]');

		await test.step("Then a link with rel=prev pointing to the chronologically older content should be visible", async () => {
			await attachments.scrollIntoViewIfNeeded();
			await expect(previousLink).toBeVisible();
		});

		await test.step("And a link with rel=next pointing to the chronologically newer content should be visible", async () => {
			await expect(nextLink).toBeVisible();
		});
	});

	for (const rel of ["next", "prev"] as const) {
		test(`When I capture the ${rel} content link's href and click it`, async ({ page }) => {
			const link = page.locator(`a[rel="${rel}"]`);
			const linkText = (await link.innerText()).trim();

			await test.step("Then the browser should navigate to the captured href", async () => {
				const href = await link.getAttribute("href");

				await link.click();
				await expect(page).toHaveURL(href ?? "");
			});

			await test.step("And the destination page should render a heading matching the link's accessible text", async () => {
				await expect(page.getByRole("heading", { level: 1, name: linkText })).toBeVisible();
			});
		});
	}
});

test.describe("Given I'm on the very first post published (oldest by date)", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/blog/listin-it-up-the-musical-abc/", { waitUntil: "networkidle" });
	});

	test("When I inspect the content navigation list", async ({ page }) => {
		const previousLink = page.locator('a[rel="prev"]');
		const nextLink = page.locator('a[rel="next"]');

		await test.step("Then no rel=prev link should be present", async () => {
			await expect(previousLink).toHaveCount(0);
		});

		await test.step("And a rel=next link should be present", async () => {
			await expect(nextLink).toBeVisible();
		});
	});
});
