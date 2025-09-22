import { describe, expect, spyOn, test } from "bun:test";
import React from "react";
import Footer from "../../components/layout/footer";
// Mock the graphql module using spyOn
import * as footerGraphQL from "../../graphql/footer";
import { render } from "./test-utils";

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
		const { container } = render(<Footer />);

		const links = container.querySelectorAll("a");
		const rssLink = Array.from(links).find((link) => link.textContent?.includes("RSS"));
		expect(rssLink).toBeDefined();
	});

	test("renders RSS icon", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		const { container } = render(<Footer />);

		// Check footer spans which contain icons and text
		const footerSpans = container.querySelectorAll("footer span");
		expect(footerSpans.length).toBeGreaterThan(0);
	});

	test("renders all social media links", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		const { container } = render(<Footer />);

		const links = container.querySelectorAll("a");
		const linkTexts = Array.from(links).map((link) => link.textContent?.toLowerCase());

		expect(linkTexts).toContain("github");
		expect(linkTexts).toContain("twitter");
		expect(linkTexts).toContain("linkedin");
	});

	test("renders social media icons", () => {
		spyOn(footerGraphQL, "getFooterLinks").mockReturnValue(mockFooterData);
		const { container } = render(<Footer />);

		// Check that we have footer spans for RSS + 3 social links
		const footerSpans = container.querySelectorAll("footer > span");
		expect(footerSpans.length).toBe(4);
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

		const { container } = render(<Footer />);

		const links = container.querySelectorAll("a");
		const rssLink = Array.from(links).find((link) => link.textContent?.includes("RSS"));
		expect(rssLink).toBeDefined();

		// Only RSS span should be present
		const footerSpans = container.querySelectorAll("footer > span");
		expect(footerSpans.length).toBe(1);
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

		const { container } = render(<Footer />);

		const links = container.querySelectorAll("a");
		const linkTexts = Array.from(links).map((link) => link.textContent?.toLowerCase());

		// Only valid links should render
		expect(linkTexts).toContain("github");
		// Invalid links should not render
		expect(linkTexts).not.toContain("twitter");
	});
});
