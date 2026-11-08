import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import PostAttachments from "../../../components/post/attachments";

const defaultProps = {
	previous: "/blog/",
	urls: {
		edit: "https://github.com/user/repo/edit/main/content/post.md",
		history: "https://github.com/user/repo/commits/main/content/post.md",
	},
};

describe("post attachments accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<PostAttachments {...defaultProps} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("back link has accessible name", async () => {
		await render(<PostAttachments {...defaultProps} />);

		const backLink = page.getByRole("link", { name: /back to posts/iu });
		await expect.element(backLink).toBeInTheDocument();
	});

	test("edit link has accessible name", async () => {
		await render(<PostAttachments {...defaultProps} />);

		const editLink = page.getByRole("link", { name: /edit page/iu });
		await expect.element(editLink).toBeInTheDocument();
	});

	test("history link has accessible name", async () => {
		await render(<PostAttachments {...defaultProps} />);

		const historyLink = page.getByRole("link", { name: /view history/iu });
		await expect.element(historyLink).toBeInTheDocument();
	});
});
