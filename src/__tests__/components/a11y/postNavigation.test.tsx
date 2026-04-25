import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import PostNavigation from "../../../components/post/navigation";

describe("PostNavigation Accessibility", () => {
	test("passes axe scan with both links", async () => {
		const { container } = await render(
			<PostNavigation
				next={{ slug: "/blog/next-post", title: "Next Post" }}
				previous={{ slug: "/blog/previous-post", title: "Previous Post" }}
			/>,
		);

		await expect(container).toHaveNoA11yViolations();
	});

	test("previous link has discernible text from post title", async () => {
		await render(
			<PostNavigation
				next={{ slug: "/blog/next-post", title: "Next Post" }}
				previous={{ slug: "/blog/previous-post", title: "Previous Post" }}
			/>,
		);

		const prevLink = page.getByRole("link", { name: /previous post/i });
		await expect.element(prevLink).toBeInTheDocument();
	});

	test("next link has discernible text from post title", async () => {
		await render(
			<PostNavigation
				next={{ slug: "/blog/next-post", title: "Next Post" }}
				previous={{ slug: "/blog/previous-post", title: "Previous Post" }}
			/>,
		);

		const nextLink = page.getByRole("link", { name: /next post/i });
		await expect.element(nextLink).toBeInTheDocument();
	});
});
