import { describe, expect, test } from "vitest";
import * as RSS from "../../utils/rss";

describe("RSS", () => {
	describe(".serialize()", () => {
		test("serializes an empty object", () => {
			const data: RSS.Serializable = {
				query: {
					allMarkdownRemark: { edges: [] },
					site: { siteMetadata: {} },
				},
			};

			const actual = RSS.serialize(data);
			const expected: unknown[] = [];

			expect(actual).toStrictEqual(expected);
		});

		test("serializes a valid query object", () => {
			const contentDigest = "e71faeed61b358a14ba16b3d3ff47967";
			const data: RSS.Serializable = {
				query: {
					allMarkdownRemark: {
						edges: [
							{
								node: {
									excerpt: "Lorem ipsum dolor sit amet",
									fields: {
										slug: "/blog/test-post/",
									},
									frontmatter: {
										author: "Niko Heikkilä",
										date: "2022-12-31",
										lang: "en",
										title: "Test Post",
										type: "post",
									},
									html: "<article>Hello World!</article>",
									internal: { contentDigest },
								},
							},
						],
					},
					site: {
						siteMetadata: {
							siteUrl: "https://www.nikoheikkila.fi",
						},
					},
				},
			};

			const actual = RSS.serialize(data);

			const expected = [
				{
					author: "Niko Heikkilä",
					custom_elements: [
						{
							"content:encoded": "<article>Hello World!</article>",
						},
					],
					date: "2022-12-31",
					description: "Lorem ipsum dolor sit amet",
					guid: contentDigest,
					language: "en",
					title: "Test Post",
					url: "https://www.nikoheikkila.fi/blog/test-post/",
				},
			];

			expect(actual).toStrictEqual(expected);
		});

		test("returns an empty array when there are no edges", () => {
			const data: RSS.Serializable = {
				query: {
					allMarkdownRemark: {},
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(RSS.serialize(data)).toStrictEqual([]);
		});

		test("falls back to an empty URL when the site URL and slug are missing", () => {
			const data: RSS.Serializable = {
				query: {
					allMarkdownRemark: { edges: [{ node: {} }] },
					site: { siteMetadata: {} },
				},
			};

			const [entry] = RSS.serialize(data);

			expect(entry.url).toBe("");
		});
	});
});
