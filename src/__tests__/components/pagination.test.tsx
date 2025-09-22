import { describe, expect, test } from "bun:test";
import React from "react";
import { render } from "../test-utils";
import Pagination from "../../components/blog/pagination";

describe("Pagination Component", () => {
	test("shows only next page link on first page", () => {
		const { container } = render(<Pagination currentPage={1} numberOfPages={5} />);

		const links = container.querySelectorAll("a");
		expect(links.length).toBe(1);

		const nextLink = Array.from(links).find((link) => link.textContent?.includes("Next Page"));
		expect(nextLink).toBeDefined();
		expect(nextLink?.getAttribute("href")).toBe("/2");
	});

	test("shows both previous and next links on middle pages", () => {
		const { container } = render(<Pagination currentPage={3} numberOfPages={5} />);

		const links = container.querySelectorAll("a");
		expect(links.length).toBe(2);

		const previousLink = Array.from(links).find((link) => link.textContent?.includes("Previous Page"));
		expect(previousLink).toBeDefined();
		expect(previousLink?.getAttribute("href")).toBe("/2");

		const nextLink = Array.from(links).find((link) => link.textContent?.includes("Next Page"));
		expect(nextLink).toBeDefined();
		expect(nextLink?.getAttribute("href")).toBe("/4");
	});

	test("shows only previous page link on last page", () => {
		const { container } = render(<Pagination currentPage={5} numberOfPages={5} />);

		const links = container.querySelectorAll("a");
		expect(links.length).toBe(1);

		const previousLink = Array.from(links).find((link) => link.textContent?.includes("Previous Page"));
		expect(previousLink).toBeDefined();
		expect(previousLink?.getAttribute("href")).toBe("/4");
	});

	test("correctly handles page 2 previous link to root", () => {
		const { container } = render(<Pagination currentPage={2} numberOfPages={5} />);

		const links = container.querySelectorAll("a");
		const previousLink = Array.from(links).find((link) => link.textContent?.includes("Previous Page"));
		expect(previousLink).toBeDefined();
		expect(previousLink?.getAttribute("href")).toBe("/");
	});

	test("displays correct page numbers in links", () => {
		const { container } = render(<Pagination currentPage={3} numberOfPages={10} />);

		const links = container.querySelectorAll("a");
		const previousLink = Array.from(links).find((link) => link.textContent?.includes("Previous Page (2/10)"));
		const nextLink = Array.from(links).find((link) => link.textContent?.includes("Next Page (4/10)"));

		expect(previousLink).toBeDefined();
		expect(nextLink).toBeDefined();
	});

	test("renders nothing for single page", () => {
		const { container } = render(<Pagination currentPage={1} numberOfPages={1} />);

		const links = container.querySelectorAll("a");
		expect(links.length).toBe(0);
	});

	test("has proper rel attributes for SEO", () => {
		const { container } = render(<Pagination currentPage={3} numberOfPages={5} />);

		const links = container.querySelectorAll("a");
		const previousLink = Array.from(links).find((link) => link.textContent?.includes("Previous Page"));
		const nextLink = Array.from(links).find((link) => link.textContent?.includes("Next Page"));

		expect(previousLink?.getAttribute("rel")).toBe("prev");
		expect(nextLink?.getAttribute("rel")).toBe("next");
	});
});
