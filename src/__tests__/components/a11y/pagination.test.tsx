import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Pagination from "../../../components/blog/pagination";

describe("Pagination Accessibility", () => {
	test("passes axe scan on first page", async () => {
		const { container } = await render(<Pagination currentPage={1} numberOfPages={5} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("passes axe scan on middle page", async () => {
		const { container } = await render(<Pagination currentPage={3} numberOfPages={5} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("previous link has rel=prev and discernible name", async () => {
		await render(<Pagination currentPage={3} numberOfPages={5} />);

		const prevLink = page.getByRole("link", { name: /previous page/i });
		await expect.element(prevLink).toHaveAttribute("rel", "prev");
	});

	test("next link has rel=next and discernible name", async () => {
		await render(<Pagination currentPage={3} numberOfPages={5} />);

		const nextLink = page.getByRole("link", { name: /next page/i });
		await expect.element(nextLink).toHaveAttribute("rel", "next");
	});
});
