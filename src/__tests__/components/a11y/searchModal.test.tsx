import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import SearchModal from "../../../search/components/searchModal";

const createMockSearchResult = (overrides = {}) => ({
	id: "test-post",
	title: "Test Post Title",
	slug: "/blog/test-post/",
	excerpt: "This is a test excerpt for the search result",
	date: "2024-01-01",
	...overrides,
});

describe("SearchModal Accessibility", () => {
	test("passes axe scan when open with results", async () => {
		const results = [createMockSearchResult()];
		const { container } = await render(
			<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />,
		);

		await expect(container).toHaveNoA11yViolations();
	});

	test("dialog has role=dialog with aria-label", async () => {
		const results = [createMockSearchResult()];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const dialog = page.getByRole("dialog", { name: /search results/i });
		await expect.element(dialog).toBeInTheDocument();
	});

	test("backdrop button has an accessible name", async () => {
		const results = [createMockSearchResult()];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const backdrop = page.getByRole("button", { name: /dismiss search results/i });
		await expect.element(backdrop).toBeInTheDocument();
	});

	test("result items are rendered as articles", async () => {
		const results = [createMockSearchResult({ id: "1" }), createMockSearchResult({ id: "2" })];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const articles = page.getByRole("article").all();
		expect(articles.length).toBe(2);
	});
});
