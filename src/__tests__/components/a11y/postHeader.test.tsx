import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import PostHeader from "../../../components/post/header";

const defaultProps = {
	title: "My Blog Post",
	excerpt: "A short excerpt of the post",
	author: "Niko Heikkilä",
	datePublished: "2024-01-15",
	timeToRead: 7,
};

describe("PostHeader Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<PostHeader {...defaultProps} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("contains exactly one h1", async () => {
		const { container } = await render(<PostHeader {...defaultProps} />);

		const h1s = container.querySelectorAll("h1");
		expect(h1s).toHaveLength(1);
	});

	test("h1 contains the post title", async () => {
		await render(<PostHeader {...defaultProps} />);

		const h1 = page.getByRole("heading", { level: 1 });
		await expect.element(h1).toHaveTextContent(defaultProps.title);
	});
});
