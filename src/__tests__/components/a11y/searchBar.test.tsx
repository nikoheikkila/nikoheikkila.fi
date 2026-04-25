import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import SearchBar from "../../../search/components/searchBar";

describe("SearchBar Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<SearchBar onSubmit={vi.fn()} query="" setQuery={vi.fn()} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("search input has an accessible name", async () => {
		await render(<SearchBar onSubmit={vi.fn()} query="" setQuery={vi.fn()} />);

		const searchbox = page.getByRole("searchbox", { name: /search posts/i });
		await expect.element(searchbox).toBeInTheDocument();
	});

	test("form is wrapped in a search landmark", async () => {
		const { container } = await render(<SearchBar onSubmit={vi.fn()} query="" setQuery={vi.fn()} />);

		const searchElement = container.querySelector("search");
		expect(searchElement).not.toBeNull();
	});
});
