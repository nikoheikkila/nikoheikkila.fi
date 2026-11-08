import { describe, expect, test } from "vitest";
import * as Rss from "../../utils/rss";

describe("rss feed", () => {
	describe(".serialize()", () => {
		test("serializes an empty object", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [] },
					site: { siteMetadata: {} },
				},
			};

			const actual = Rss.serialize(data);
			const expected: unknown[] = [];

			expect(actual).toStrictEqual(expected);
		});

		test("serializes a valid query object", () => {
			const contentDigest = "e71faeed61b358a14ba16b3d3ff47967";
			const data: Rss.Serializable = {
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

			const actual = Rss.serialize(data);

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
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: {},
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(Rss.serialize(data)).toStrictEqual([]);
		});

		test("falls back to an empty URL when the site URL and slug are missing", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [{ node: {} }] },
					site: { siteMetadata: {} },
				},
			};

			const [entry] = Rss.serialize(data);

			expect(entry.url).toBe("");
		});

		test("uses only the slug when the site URL is missing", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [{ node: { fields: { slug: "/blog/orphan/" } } }] },
					site: { siteMetadata: {} },
				},
			};

			expect(Rss.serialize(data)[0].url).toBe("/blog/orphan/");
		});

		test("uses only the site URL when the slug is missing", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [{ node: {} }] },
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(Rss.serialize(data)[0].url).toBe("https://www.nikoheikkila.fi");
		});

		test("leaves every optional field undefined for a sparse node", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [{ node: {} }] },
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(Rss.serialize(data)).toStrictEqual([
				{
					url: "https://www.nikoheikkila.fi",
					language: undefined,
					title: undefined,
					description: undefined,
					date: undefined,
					guid: undefined,
					author: undefined,
					custom_elements: [{ "content:encoded": undefined }],
				},
			]);
		});

		test.each([
			["a missing edge", undefined],
			["an edge without a node", {}],
		])("serializes %s as an entry with only the site URL", (_description, edge) => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: { edges: [edge] },
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(Rss.serialize(data)).toStrictEqual([
				{
					url: "https://www.nikoheikkila.fi",
					language: undefined,
					title: undefined,
					description: undefined,
					date: undefined,
					guid: undefined,
					author: undefined,
					custom_elements: [{ "content:encoded": undefined }],
				},
			]);
		});

		test("serializes multiple posts in the queried order", () => {
			const data: Rss.Serializable = {
				query: {
					allMarkdownRemark: {
						edges: [
							{ node: { fields: { slug: "/blog/newest/" }, frontmatter: { title: "Newest" } } },
							{ node: { fields: { slug: "/blog/oldest/" }, frontmatter: { title: "Oldest" } } },
						],
					},
					site: { siteMetadata: { siteUrl: "https://www.nikoheikkila.fi" } },
				},
			};

			expect(Rss.serialize(data).map((entry) => [entry.title, entry.url])).toStrictEqual([
				["Newest", "https://www.nikoheikkila.fi/blog/newest/"],
				["Oldest", "https://www.nikoheikkila.fi/blog/oldest/"],
			]);
		});
	});

	describe(".rssQuery", () => {
		test("requests the fields the serializer reads, excluding pages", () => {
			expect(Rss.rssQuery).toContain("allMarkdownRemark");
			expect(Rss.rssQuery).toContain('type: {ne: "page"}');
			expect(Rss.rssQuery).toContain("contentDigest");
		});
	});
});
