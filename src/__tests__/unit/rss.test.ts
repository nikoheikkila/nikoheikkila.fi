import { describe, expect, test } from "vitest";
import * as RSS from "../../utils/rss";

describe("RSS", () => {
    describe(".serialize()", () => {
        test("serializes an empty object", () => {
            const data: RSS.Serializable = {
                query: {
                    site: { siteMetadata: {} },
                    allMarkdownRemark: { edges: [] },
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
                    site: {
                        siteMetadata: {
                            siteUrl: "https://www.nikoheikkila.fi",
                        },
                    },
                    allMarkdownRemark: {
                        edges: [
                            {
                                node: {
                                    excerpt: "Lorem ipsum dolor sit amet",
                                    html: "<article>Hello World!</article>",
                                    internal: { contentDigest },
                                    fields: {
                                        slug: "/blog/test-post/",
                                    },
                                    frontmatter: {
                                        author: "Niko Heikkilä",
                                        date: "2022-12-31",
                                        lang: "en",
                                        title: "Test Post",
                                        type: "post",
                                        categories: ["article"],
                                    },
                                },
                            },
                        ],
                    },
                },
            };

            const actual = RSS.serialize(data);

            const expected = [
                {
                    language: "en",
                    title: "Test Post",
                    description: "Lorem ipsum dolor sit amet",
                    date: "2022-12-31",
                    url: "https://www.nikoheikkila.fi/blog/test-post/",
                    guid: contentDigest,
                    author: "Niko Heikkilä",
                    categories: ["article"],
                    custom_elements: [
                        {
                            "content:encoded":
                                "<article>Hello World!</article>",
                        },
                    ],
                },
            ];

            expect(actual).toStrictEqual(expected);
        });
    });
});
