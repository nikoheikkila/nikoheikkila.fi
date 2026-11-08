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
					{ name: "GitHub", url: "https://github.com/testuser", icon: "github" },
					{ name: "LinkedIn", url: "https://linkedin.com/in/testuser", icon: "linkedin" },
				],
			},
		},
	});
};

describe("footer accessibility", () => {
	test("passes axe scan", async () => {
		await setupFooterLinks();
		const { container } = await render(<Footer />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("the RSS link has an accessible name", async () => {
		await setupFooterLinks();
		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: /rss/iu });
		await expect.element(rssLink).toBeInTheDocument();
	});

	test("each social icon link has an accessible name", async () => {
		await setupFooterLinks();
		await render(<Footer />);

		const githubLink = page.getByRole("link", { name: /github/iu });
		const linkedinLink = page.getByRole("link", { name: /linkedin/iu });

		await expect.element(githubLink).toBeInTheDocument();
		await expect.element(linkedinLink).toBeInTheDocument();
	});
});
