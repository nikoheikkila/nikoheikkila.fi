import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Footer from "../../components/layout/footer";

// Mock the footer GraphQL module
vi.mock("../../graphql/footer", () => ({
	getFooterLinks: vi.fn(),
}));

/** Asserts that the link's sibling icon renders with the given FontAwesome icon name (and pack prefix, if given). */
function expectIconFor(link: ReturnType<typeof page.getByRole>, iconName: string, prefix?: string) {
	const parent = link.element().parentElement;
	expect(parent).not.toBeNull();

	const selector = prefix
		? `svg[aria-hidden="true"][data-icon="${iconName}"][data-prefix="${prefix}"]`
		: `svg[aria-hidden="true"][data-icon="${iconName}"]`;
	expect(parent?.querySelector(selector)).not.toBeNull();
}

describe("Footer Component", () => {
	test("renders RSS feed link", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "GitHub", url: "https://github.com/testuser", icon: "github" },
						{
							name: "Bluesky",
							url: "https://bsky.social/testuser",
							icon: "bluesky",
						},
						{
							name: "LinkedIn",
							url: "https://linkedin.com/in/testuser",
							icon: "linkedin",
						},
					],
				},
			},
		});

		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: "RSS", exact: true });
		await expect.element(rssLink).toBeInTheDocument();
		expect(rssLink.element().getAttribute("href")).toBe("/feed.xml");
	});

	test("renders RSS icon", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "GitHub", url: "https://github.com/testuser", icon: "github" },
						{
							name: "Bluesky",
							url: "https://bsky.social/testuser",
							icon: "bluesky",
						},
						{
							name: "LinkedIn",
							url: "https://linkedin.com/in/testuser",
							icon: "linkedin",
						},
					],
				},
			},
		});

		await render(<Footer />);

		const rssLink = page.getByRole("link", { name: "RSS", exact: true });
		expectIconFor(rssLink, "rss");
	});

	test("renders all social media links", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "GitHub", url: "https://github.com/testuser", icon: "github" },
						{
							name: "Bluesky",
							url: "https://bsky.social/testuser",
							icon: "bluesky",
						},
						{
							name: "LinkedIn",
							url: "https://linkedin.com/in/testuser",
							icon: "linkedin",
						},
					],
				},
			},
		});

		await render(<Footer />);

		const githubLink = page.getByRole("link", { name: "GitHub", exact: true });
		const blueskyLink = page.getByRole("link", { name: "Bluesky", exact: true });
		const linkedinLink = page.getByRole("link", { name: "LinkedIn", exact: true });

		await expect.element(githubLink).toBeInTheDocument();
		await expect.element(blueskyLink).toBeInTheDocument();
		await expect.element(linkedinLink).toBeInTheDocument();

		expect(githubLink.element().getAttribute("href")).toBe("https://github.com/testuser");
		expect(blueskyLink.element().getAttribute("href")).toBe("https://bsky.social/testuser");
		expect(linkedinLink.element().getAttribute("href")).toBe("https://linkedin.com/in/testuser");
	});

	test("renders social media icons", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "GitHub", url: "https://github.com/testuser", icon: "github" },
						{
							name: "Bluesky",
							url: "https://bsky.social/testuser",
							icon: "bluesky",
						},
						{
							name: "LinkedIn",
							url: "https://linkedin.com/in/testuser",
							icon: "linkedin",
						},
					],
				},
			},
		});

		await render(<Footer />);

		// Verify each social link has the correct icon
		expectIconFor(page.getByRole("link", { name: "GitHub", exact: true }), "github", "fab");
		expectIconFor(page.getByRole("link", { name: "Bluesky", exact: true }), "bluesky", "fab");
		expectIconFor(page.getByRole("link", { name: "LinkedIn", exact: true }), "linkedin", "fab");
		expectIconFor(page.getByRole("link", { name: "RSS", exact: true }), "rss");
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

		const rssLink = page.getByRole("link", { name: "RSS", exact: true });
		await expect.element(rssLink).toBeInTheDocument();

		// Should only have RSS, no social links
		const githubLink = page.getByRole("link", { name: "GitHub", exact: true });
		const blueskyLink = page.getByRole("link", { name: "Bluesky", exact: true });
		const linkedinLink = page.getByRole("link", { name: "LinkedIn", exact: true });

		await expect.element(githubLink).not.toBeInTheDocument();
		await expect.element(blueskyLink).not.toBeInTheDocument();
		await expect.element(linkedinLink).not.toBeInTheDocument();
	});

	test("handles social links with missing data", async () => {
		const { getFooterLinks } = await import("../../graphql/footer.js");
		vi.mocked(getFooterLinks).mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [
						{ name: "GitHub", url: "https://github.com/test", icon: "github" },
						{ name: null, url: "https://example.com", icon: "" },
						{ name: "Bluesky", url: null, icon: "bluesky" },
					],
				},
			},
		});

		await render(<Footer />);

		// Only valid links should render
		const githubLink = page.getByRole("link", { name: "GitHub", exact: true });
		await expect.element(githubLink).toBeInTheDocument();

		// Invalid links should not render
		const blueskyLink = page.getByRole("link", { name: "Bluesky", exact: true });
		await expect.element(blueskyLink).not.toBeInTheDocument();

		// Verify that only the valid GitHub link is rendered (entry with null name excluded)
		const allLinks = page.getByRole("link").all();
		const socialLinks = allLinks.filter((link) => {
			const href = link.element().getAttribute("href");
			return href && !href.includes("/feed.xml");
		});
		expect(socialLinks).toHaveLength(1);
		expect(socialLinks[0].element().getAttribute("href")).toBe("https://github.com/test");
	});
});
