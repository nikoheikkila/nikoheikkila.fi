import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("Given I navigate to the site using a desktop browser", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/", { waitUntil: "networkidle" });
	});

	test("When I search for a known term and press ENTER", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("Then the search input should be visible", async () => {
			await expect(searchInput).toBeVisible();
		});

		await test.step("And I type a search query and press ENTER", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then the search results modal should be visible with results", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeVisible();

			const results = modal.getByTestId("search-result");
			await expect(results.first()).toBeVisible();
		});
	});

	test("When I click a search result", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I perform a search", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then clicking a result should navigate to the post", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			const firstResult = modal.getByTestId("search-result").first();
			const link = firstResult.getByRole("link");
			await link.click();

			await expect(page).toHaveURL(/\/blog\//);
		});

		await test.step("And the modal should be closed", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeHidden();
		});
	});

	test("When I press ESC to close the search modal", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I perform a search", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then the modal should be visible", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeVisible();
		});

		await test.step("And pressing ESC should close the modal", async () => {
			await page.keyboard.press("Escape");
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeHidden();
		});
	});

	test("When I search for a non-existent term", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I search for nonsense", async () => {
			await searchInput.fill("xyznonexistent123");
			await searchInput.press("Enter");
		});

		await test.step("Then I should see a no results message", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeVisible();
			await expect(modal.getByText(/no results/i)).toBeVisible();
		});
	});

	test("When I click the modal backdrop", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I perform a search", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then clicking the backdrop should close the modal", async () => {
			const backdrop = page.getByTestId("search-backdrop");
			await backdrop.click({ position: { x: 10, y: 10 } });
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeHidden();
		});
	});

	test("When I navigate results with keyboard arrows and press ENTER", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I perform a search", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then pressing ArrowDown should highlight the first result", async () => {
			await page.keyboard.press("ArrowDown");
			const results = page.getByTestId("search-result");
			await expect(results.first()).toHaveClass(/resultItemActive/);
		});

		await test.step("And pressing Enter should navigate to the highlighted result", async () => {
			await page.keyboard.press("Enter");
			await expect(page).toHaveURL(/\/blog\//);
		});
	});
});

test.describe("Given I navigate to the site using a mobile browser", () => {
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

	test("When I search for a known term and press ENTER", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("Then the search input should be visible", async () => {
			await expect(searchInput).toBeVisible();
		});

		await test.step("And I type a search query and submit", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then the search results modal should be visible with results", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			await expect(modal).toBeVisible();

			const results = modal.getByTestId("search-result");
			await expect(results.first()).toBeVisible();
		});
	});

	test("When I tap a search result", async ({ page }) => {
		const searchForm = page.getByRole("search");
		const searchInput = searchForm.getByRole("searchbox", { name: /search posts/i });

		await test.step("And I perform a search", async () => {
			await searchInput.fill("software");
			await searchInput.press("Enter");
		});

		await test.step("Then tapping a result should navigate to the post", async () => {
			const modal = page.getByRole("dialog", { name: /search results/i });
			const firstResult = modal.getByTestId("search-result").first();
			const link = firstResult.getByRole("link");
			await link.tap();

			await expect(page).toHaveURL(/\/blog\//);
		});
	});
});
