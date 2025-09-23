import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import Pagination from "../../components/blog/pagination";

describe("Pagination Component", () => {
	test("shows only next page link on first page", () => {
		render(<Pagination currentPage={1} numberOfPages={5} />);

		const links = screen.getAllByRole("link");
		expect(links.length).toBe(1);

		const nextLink = screen.getByRole("link", { name: /next page/i });
		expect(nextLink).toBeDefined();
		expect(nextLink.getAttribute("href")).toBe("/2");
	});

	test("shows both previous and next links on middle pages", () => {
		render(<Pagination currentPage={3} numberOfPages={5} />);

		const links = screen.getAllByRole("link");
		expect(links.length).toBe(2);

		const previousLink = screen.getByRole("link", { name: /previous page/i });
		expect(previousLink).toBeDefined();
		expect(previousLink.getAttribute("href")).toBe("/2");

		const nextLink = screen.getByRole("link", { name: /next page/i });
		expect(nextLink).toBeDefined();
		expect(nextLink.getAttribute("href")).toBe("/4");
	});

	test("shows only previous page link on last page", () => {
		render(<Pagination currentPage={5} numberOfPages={5} />);

		const links = screen.getAllByRole("link");
		expect(links.length).toBe(1);

		const previousLink = screen.getByRole("link", { name: /previous page/i });
		expect(previousLink).toBeDefined();
		expect(previousLink.getAttribute("href")).toBe("/4");
	});

	test("correctly handles page 2 previous link to root", () => {
		render(<Pagination currentPage={2} numberOfPages={5} />);

		const previousLink = screen.getByRole("link", { name: /previous page/i });
		expect(previousLink).toBeDefined();
		expect(previousLink.getAttribute("href")).toBe("/");
	});

	test("displays correct page numbers in links", () => {
		render(<Pagination currentPage={3} numberOfPages={10} />);

		const previousLink = screen.getByRole("link", { name: /previous page \(2\/10\)/i });
		const nextLink = screen.getByRole("link", { name: /next page \(4\/10\)/i });

		expect(previousLink).toBeDefined();
		expect(nextLink).toBeDefined();
	});

	test("renders nothing for single page", () => {
		render(<Pagination currentPage={1} numberOfPages={1} />);

		const links = screen.queryAllByRole("link");
		expect(links.length).toBe(0);
	});

	test("has proper rel attributes for SEO", () => {
		render(<Pagination currentPage={3} numberOfPages={5} />);

		const previousLink = screen.getByRole("link", { name: /previous page/i });
		const nextLink = screen.getByRole("link", { name: /next page/i });

		expect(previousLink.getAttribute("rel")).toBe("prev");
		expect(nextLink.getAttribute("rel")).toBe("next");
	});
});
