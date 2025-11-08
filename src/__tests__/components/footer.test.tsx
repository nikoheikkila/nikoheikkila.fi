import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Footer from "../../components/layout/footer";

// Mock the footer GraphQL module
vi.mock("../../graphql/footer", () => ({
	getFooterLinks: vi.fn(),
}));

describe("Footer Component", () => {
	test("renders RSS feed link", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "github", url: "https://github.com/testuser" },
						{
							name: "twitter",
							url: "https://twitter.com/testuser",
						},
						{
							name: "linkedin",
							url: "https://linkedin.com/in/testuser",
						},
					],
				},
			},
		});

		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: /rss/i });
		await expect.element(rssLink).toBeInTheDocument();
	});

	test("renders RSS icon", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "github", url: "https://github.com/testuser" },
						{
							name: "twitter",
							url: "https://twitter.com/testuser",
						},
						{
							name: "linkedin",
							url: "https://linkedin.com/in/testuser",
						},
					],
				},
			},
		});

		await render(<Footer />);

		// Check that the footer contains RSS icon and link
		const footer = page.getByRole("contentinfo");
		await expect.element(footer).toBeInTheDocument();

		const rssElements = page.getByText(/rss/i).all();
		expect(rssElements.length).toBeGreaterThan(0);
	});

	test("renders all social media links", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "github", url: "https://github.com/testuser" },
						{
							name: "twitter",
							url: "https://twitter.com/testuser",
						},
						{
							name: "linkedin",
							url: "https://linkedin.com/in/testuser",
						},
					],
				},
			},
		});

		await render(<Footer />);

		const githubLink = page.getByRole("link", { name: /github/i });
		const twitterLink = page.getByRole("link", { name: /twitter/i });
		const linkedinLink = page.getByRole("link", { name: /linkedin/i });

		await expect.element(githubLink).toBeInTheDocument();
		await expect.element(twitterLink).toBeInTheDocument();
		await expect.element(linkedinLink).toBeInTheDocument();
	});

	test("renders social media icons", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "github", url: "https://github.com/testuser" },
						{
							name: "twitter",
							url: "https://twitter.com/testuser",
						},
						{
							name: "linkedin",
							url: "https://linkedin.com/in/testuser",
						},
					],
				},
			},
		});

		await render(<Footer />);

		// Check that we have all the social icons by checking for multiple elements
		const githubElements = page.getByText("github").all();
		const twitterElements = page.getByText("twitter").all();
		const linkedinElements = page.getByText("linkedin").all();
		const rssElements = page.getByText(/rss/i).all();

		expect(githubElements.length).toBeGreaterThan(0);
		expect(twitterElements.length).toBeGreaterThan(0);
		expect(linkedinElements.length).toBeGreaterThan(0);
		expect(rssElements.length).toBeGreaterThan(0);
	});

	test("handles missing social links gracefully", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [],
				},
			},
		});

		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: /rss/i });
		await expect.element(rssLink).toBeInTheDocument();

		// Should only have RSS, no social links
		const githubLink = page.getByText("github");
		const twitterLink = page.getByText("twitter");
		const linkedinLink = page.getByText("linkedin");

		await expect.element(githubLink).not.toBeInTheDocument();
		await expect.element(twitterLink).not.toBeInTheDocument();
		await expect.element(linkedinLink).not.toBeInTheDocument();
	});

	test("handles social links with missing data", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "github", url: "https://github.com/test" },
						{ name: null, url: "https://example.com" },
						{ name: "twitter", url: null },
					],
				},
			},
		});

		await render(<Footer />);

		// Only valid links should render
		const githubLink = page.getByRole("link", { name: /github/i });
		await expect.element(githubLink).toBeInTheDocument();

		// Invalid links should not render
		const twitterLink = page.getByRole("link", { name: /twitter/i });
		await expect.element(twitterLink).not.toBeInTheDocument();
	});
});
