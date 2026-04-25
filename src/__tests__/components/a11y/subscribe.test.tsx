import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Subscribe from "../../../components/post/subscribe";
import type { GatsbyConfig } from "gatsby";

const configWithRss: GatsbyConfig = {
	siteMetadata: {
		rss: "/rss.xml",
	},
};

describe("Subscribe Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<Subscribe config={configWithRss} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("RSS link has an accessible name", async () => {
		await render(<Subscribe config={configWithRss} />);

		const rssLink = page.getByRole("link", { name: /rss feed/i });
		await expect.element(rssLink).toBeInTheDocument();
	});
});
