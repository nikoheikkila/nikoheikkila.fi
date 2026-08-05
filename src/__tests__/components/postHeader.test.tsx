import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import PostHeader from "../../components/post/header";

const defaultProps = {
	title: "My Blog Post",
	excerpt: "A short excerpt of the post",
	author: "Niko Heikkilä",
	datePublished: "2024-01-15",
	timeToRead: 7,
};

describe("PostHeader Component", () => {
	test("renders the byline with the author", async () => {
		await render(<PostHeader {...defaultProps} />);

		const author = page.getByText(`By ${defaultProps.author}`, { exact: false });
		await expect.element(author).toBeInTheDocument();
	});

	test("renders the byline with the publish date", async () => {
		await render(<PostHeader {...defaultProps} />);

		const date = page.getByText(defaultProps.datePublished, { exact: false });
		await expect.element(date).toBeInTheDocument();
	});

	test("renders the byline with the estimated reading time", async () => {
		await render(<PostHeader {...defaultProps} />);

		const readingTime = page.getByText(/minutes? read/, { exact: false });
		await expect.element(readingTime).toBeInTheDocument();
		await expect.element(readingTime).toHaveTextContent("☕️");
	});
});
