import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";
import React from "react";
import SearchBar from "../../search/components/searchBar";
import SearchModal from "../../search/components/searchModal";

const createMockSearchResult = (overrides = {}) => ({
	id: "test-post",
	title: "Test Post Title",
	slug: "/blog/test-post/",
	excerpt: "This is a test excerpt for the search result",
	date: "2024-01-01",
	...overrides,
});

describe("SearchBar Component", () => {
	test("renders search input with correct aria-label", async () => {
		await render(<SearchBar onSubmit={vi.fn()} query="" setQuery={vi.fn()} />);

		const input = page.getByRole("searchbox", { name: /search posts/i });
		await expect.element(input).toBeInTheDocument();
	});

	test("displays current query value", async () => {
		await render(<SearchBar onSubmit={vi.fn()} query="test query" setQuery={vi.fn()} />);

		const input = page.getByRole("searchbox", { name: /search posts/i });
		await expect.element(input).toHaveValue("test query");
	});

	test("calls onSubmit on form submission", async () => {
		const onSubmit = vi.fn();
		await render(<SearchBar onSubmit={onSubmit} query="test" setQuery={vi.fn()} />);

		await page.getByRole("searchbox", { name: /search posts/i }).click();
		await userEvent.keyboard("{Enter}");

		expect(onSubmit).toHaveBeenCalled();
	});

	test("calls setQuery on typing", async () => {
		const setQuery = vi.fn();
		await render(<SearchBar onSubmit={vi.fn()} query="" setQuery={setQuery} />);

		const input = page.getByRole("searchbox", { name: /search posts/i });
		await input.fill("hello");

		expect(setQuery).toHaveBeenCalled();
	});
});

describe("SearchModal Component", () => {
	test("does not render when isModalOpen is false", async () => {
		await render(<SearchModal isModalOpen={false} onClose={vi.fn()} query="" results={[]} />);

		const modal = page.getByRole("dialog");
		await expect.element(modal).not.toBeInTheDocument();
	});

	test("renders when isModalOpen is true", async () => {
		const results = [createMockSearchResult()];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const modal = page.getByRole("dialog", { name: /search results/i });
		await expect.element(modal).toBeInTheDocument();
	});

	test("renders results with titles and excerpts", async () => {
		const results = [
			createMockSearchResult({ id: "1", title: "First Post", excerpt: "First excerpt" }),
			createMockSearchResult({ id: "2", title: "Second Post", excerpt: "Second excerpt" }),
		];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		await expect.element(page.getByText("First Post")).toBeInTheDocument();
		await expect.element(page.getByText("First excerpt")).toBeInTheDocument();
		await expect.element(page.getByText("Second Post")).toBeInTheDocument();
		await expect.element(page.getByText("Second excerpt")).toBeInTheDocument();
	});

	test("shows empty state when no results found", async () => {
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="nonexistent" results={[]} />);

		const noResults = page.getByText(/no results/i);
		await expect.element(noResults).toBeInTheDocument();
	});

	test("calls onClose on backdrop click", async () => {
		const onClose = vi.fn();
		const results = [createMockSearchResult()];
		await render(<SearchModal isModalOpen={true} onClose={onClose} query="test" results={results} />);

		const backdrop = page.getByRole("button", { name: /dismiss search results/i });
		await backdrop.click({ position: { x: 5, y: 5 } });

		expect(onClose).toHaveBeenCalled();
	});

	test("renders correct number of results", async () => {
		const results = [
			createMockSearchResult({ id: "1", title: "Post One" }),
			createMockSearchResult({ id: "2", title: "Post Two" }),
			createMockSearchResult({ id: "3", title: "Post Three" }),
		];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const resultElements = page.getByRole("article").all();
		expect(resultElements.length).toBe(3);
	});

	test("result links have correct href", async () => {
		const results = [createMockSearchResult({ slug: "/blog/my-post/" })];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		const link = page.getByRole("link", { name: /test post title/i });
		await expect.element(link).toHaveAttribute("href", "/blog/my-post/");
	});

	test("highlights result on ArrowDown keypress", async () => {
		const results = [
			createMockSearchResult({ id: "1", title: "First Post" }),
			createMockSearchResult({ id: "2", title: "Second Post" }),
		];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		await userEvent.keyboard("{ArrowDown}");

		const resultElements = page.getByRole("article").all();
		await expect.element(resultElements[0]).toHaveClass(/resultItemActive/);
		await expect.element(resultElements[1]).not.toHaveClass(/resultItemActive/);
	});

	test("moves highlight with ArrowDown and ArrowUp", async () => {
		const results = [
			createMockSearchResult({ id: "1", title: "First Post" }),
			createMockSearchResult({ id: "2", title: "Second Post" }),
		];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{ArrowDown}");

		const resultElements = page.getByRole("article").all();
		await expect.element(resultElements[1]).toHaveClass(/resultItemActive/);

		await userEvent.keyboard("{ArrowUp}");
		await expect.element(resultElements[0]).toHaveClass(/resultItemActive/);
	});

	test("wraps highlight around when reaching the end", async () => {
		const results = [
			createMockSearchResult({ id: "1", title: "First Post" }),
			createMockSearchResult({ id: "2", title: "Second Post" }),
		];
		await render(<SearchModal isModalOpen={true} onClose={vi.fn()} query="test" results={results} />);

		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{ArrowDown}");
		await userEvent.keyboard("{ArrowDown}");

		const resultElements = page.getByRole("article").all();
		await expect.element(resultElements[0]).toHaveClass(/resultItemActive/);
	});
});
