import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import React from "react";
import SEO from "../../components/seo";
import { getSEOData } from "../../graphql/seo";

vi.mock("../../graphql/seo", () => ({
	getSEOData: vi.fn(),
}));

const givenSite = (cover?: string) =>
	vi.mocked(getSEOData).mockReturnValue({
		site: {
			siteMetadata: {
				language: "en",
				title: "Site",
				cover: cover ?? null,
				description: "Description",
				siteUrl: "https://example.com",
				author: { name: "Author" },
			},
		},
	});

describe("seo component", () => {
	test.each([
		["/", "https://example.com/"],
		["/2/", "https://example.com/2/"],
		["/blog/post/", "https://example.com/blog/post/"],
	])("builds an absolute og:url for path %s", async (path, expected) => {
		givenSite();

		await render(<SEO title="Title" type="page" url={path} />);

		expect(document).toHaveMetaProperty("og:url", expected);
	});

	test("omits og:image without an image or a cover", async () => {
		givenSite();

		await render(<SEO title="Title" type="page" url="/" />);

		expect(document).not.toHaveMetaProperty("og:image");
	});

	test("falls back to the site cover for og:image", async () => {
		givenSite("https://example.com/cover.png");

		await render(<SEO title="Title" type="page" url="/" />);

		expect(document).toHaveMetaProperty("og:image", "https://example.com/cover.png");
	});

	test("omits article:published_time for an empty date", async () => {
		givenSite();

		await render(<SEO datePublished="" title="Title" type="post" url="/blog/post/" />);

		expect(document).not.toHaveMetaProperty("article:published_time");
	});

	test("links article:author to the about page", async () => {
		givenSite();

		await render(<SEO datePublished="2026-01-01" title="Title" type="post" url="/blog/post/" />);

		expect(document).toHaveMetaProperty("article:author", "https://example.com/about/");
		expect(document).toHaveMetaProperty("article:published_time", "2026-01-01");
	});
});
