import { test, expect } from "vitest";
import * as RSS from "../../utils/rss";

test("should serialize a valid query object", () => {
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
                                date: "2022-12-31" as any,
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

    const actualSerialization = RSS.serialize(data);
    const expectedSerialization = [
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
                    "content:encoded": "<article>Hello World!</article>",
                },
            ],
        },
    ];

    expect(actualSerialization).toMatchObject(expectedSerialization);
});

test("should serialize an empty object", () => {
    const data: RSS.Serializable = {
        query: {
            site: { siteMetadata: {} },
            allMarkdownRemark: { edges: [] },
        },
    };

    expect(RSS.serialize(data)).toHaveLength(0);
});
