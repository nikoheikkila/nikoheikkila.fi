import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Pagination from "../../components/blog/pagination";

describe("Pagination Component", () => {
	test("shows only next page link on first page", async () => {
		await render(<Pagination currentPage={1} numberOfPages={5} />);

		const links = page.getByRole("link").all();
		expect(links).toHaveLength(1);

		const nextLink = page.getByRole("link", { name: /next page/i });
		await expect.element(nextLink).toBeInTheDocument();
		await expect.element(nextLink).toHaveAttribute("href", "/2");
	});

	test("shows both previous and next links on middle pages", async () => {
		await render(<Pagination currentPage={3} numberOfPages={5} />);

		const links = page.getByRole("link").all();
		expect(links).toHaveLength(2);

		const previousLink = page.getByRole("link", { name: /previous page/i });
		await expect.element(previousLink).toBeInTheDocument();
		await expect.element(previousLink).toHaveAttribute("href", "/2");

		const nextLink = page.getByRole("link", { name: /next page/i });
		await expect.element(nextLink).toBeInTheDocument();
		await expect.element(nextLink).toHaveAttribute("href", "/4");
	});

	test("shows only previous page link on last page", async () => {
		await render(<Pagination currentPage={5} numberOfPages={5} />);

		const links = page.getByRole("link").all();
		expect(links).toHaveLength(1);

		const previousLink = page.getByRole("link", { name: /previous page/i });
		await expect.element(previousLink).toBeInTheDocument();
		await expect.element(previousLink).toHaveAttribute("href", "/4");
	});

	test("correctly handles page 2 previous link to root", async () => {
		await render(<Pagination currentPage={2} numberOfPages={5} />);

		const previousLink = page.getByRole("link", { name: /previous page/i });
		await expect.element(previousLink).toBeInTheDocument();
		await expect.element(previousLink).toHaveAttribute("href", "/");
	});

	test("displays correct page numbers in links", async () => {
		await render(<Pagination currentPage={3} numberOfPages={10} />);

		const previousLink = page.getByRole("link", {
			name: /previous page \(2\/10\)/i,
		});
		const nextLink = page.getByRole("link", {
			name: /next page \(4\/10\)/i,
		});

		await expect.element(previousLink).toBeInTheDocument();
		await expect.element(nextLink).toBeInTheDocument();
	});

	test("renders nothing for single page", async () => {
		await render(<Pagination currentPage={1} numberOfPages={1} />);

		const links = page.getByRole("link").all();
		expect(links).toHaveLength(0);
	});

	test("has proper rel attributes for SEO", async () => {
		await render(<Pagination currentPage={3} numberOfPages={5} />);

		const previousLink = page.getByRole("link", { name: /previous page/i });
		const nextLink = page.getByRole("link", { name: /next page/i });

		await expect.element(previousLink).toHaveAttribute("rel", "prev");
		await expect.element(nextLink).toHaveAttribute("rel", "next");
	});
});
