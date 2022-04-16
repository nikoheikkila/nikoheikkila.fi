import test from "ava";
import * as RSS from "../../utils/rss";

test("should serialize a valid query object", async (t) => {
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
            guid: "https://www.nikoheikkila.fi/blog/test-post/",
            author: "Niko Heikkilä",
            categories: ["article"],
            custom_elements: [
                {
                    "content:encoded": "<article>Hello World!</article>",
                },
            ],
        },
    ];

    t.deepEqual(actualSerialization, expectedSerialization);
});

test("should serialize an empty object", async (t) => {
    const data: RSS.Serializable = {
        query: {
            site: { siteMetadata: {} },
            allMarkdownRemark: { edges: [] },
        },
    };

    t.deepEqual(RSS.serialize(data), []);
});
