import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Footer from "../../../components/layout/footer";

vi.mock("../../../graphql/footer", () => ({
	getFooterLinks: vi.fn(),
}));

const setupFooterLinks = async () => {
	const { getFooterLinks } = await import("../../../graphql/footer.js");
	vi.mocked(getFooterLinks).mockReturnValue({
		site: {
			siteMetadata: {
				rss: "/rss.xml",
				social: [
					{ name: "github", url: "https://github.com/testuser" },
					{ name: "linkedin", url: "https://linkedin.com/in/testuser" },
				],
			},
		},
	});
};

describe("Footer Accessibility", () => {
	test("passes axe scan", async () => {
		await setupFooterLinks();
		const { container } = await render(<Footer />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("RSS link has accessible name", async () => {
		await setupFooterLinks();
		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: /rss/i });
		await expect.element(rssLink).toBeInTheDocument();
	});

	test("each social icon link has an accessible name", async () => {
		await setupFooterLinks();
		await render(<Footer />);

		const githubLink = page.getByRole("link", { name: /github/i });
		const linkedinLink = page.getByRole("link", { name: /linkedin/i });

		await expect.element(githubLink).toBeInTheDocument();
		await expect.element(linkedinLink).toBeInTheDocument();
	});
});
