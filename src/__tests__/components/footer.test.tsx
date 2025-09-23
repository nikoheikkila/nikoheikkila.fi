import { describe, expect, spyOn, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "../../components/layout/footer";
import * as footerGraphQL from "../../graphql/footer";

describe("Footer Component", () => {
	// Create a spy for getFooterLinks that we can control per test
	const mockFooterData = {
		site: {
			siteMetadata: {
				rss: "/feed.xml",
				social: [
					{ name: "github", url: "https://github.com/testuser" },
					{ name: "twitter", url: "https://twitter.com/testuser" },
					{ name: "linkedin", url: "https://linkedin.com/in/testuser" },
				],
			},
		},
	};

	test("renders RSS feed link", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		render(<Footer />);

		const rssLink = screen.getByRole("link", { name: /rss/i });
		expect(rssLink).toBeDefined();
	});

	test("renders RSS icon", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		render(<Footer />);

		// Check that the footer contains RSS icon and link
		const footer = screen.getByRole("contentinfo");
		expect(footer).toBeDefined();
		const rssElements = screen.getAllByText(/rss/i);
		expect(rssElements.length).toBeGreaterThan(0);
	});

	test("renders all social media links", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		render(<Footer />);

		const githubLink = screen.getByRole("link", { name: /github/i });
		const twitterLink = screen.getByRole("link", { name: /twitter/i });
		const linkedinLink = screen.getByRole("link", { name: /linkedin/i });

		expect(githubLink).toBeDefined();
		expect(twitterLink).toBeDefined();
		expect(linkedinLink).toBeDefined();
	});

	test("renders social media icons", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		render(<Footer />);

		// Check that we have all the social icons by checking for multiple elements
		expect(screen.getAllByText("github").length).toBeGreaterThan(0);
		expect(screen.getAllByText("twitter").length).toBeGreaterThan(0);
		expect(screen.getAllByText("linkedin").length).toBeGreaterThan(0);
		expect(screen.getAllByText(/rss/i).length).toBeGreaterThan(0);
	});

	test("handles missing social links gracefully", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue({
			site: {
				siteMetadata: {
					rss: "/feed.xml",
					social: [],
				},
			},
		});

		render(<Footer />);

		const rssLink = screen.getByRole("link", { name: /rss/i });
		expect(rssLink).toBeDefined();

		// Should only have RSS, no social links
		expect(screen.queryByText("github")).toBeNull();
		expect(screen.queryByText("twitter")).toBeNull();
		expect(screen.queryByText("linkedin")).toBeNull();
	});

	test("handles social links with missing data", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue({
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

		render(<Footer />);

		// Only valid links should render
		expect(screen.getByRole("link", { name: /github/i })).toBeDefined();
		// Invalid links should not render
		expect(screen.queryByRole("link", { name: /twitter/i })).toBeNull();
	});
});
