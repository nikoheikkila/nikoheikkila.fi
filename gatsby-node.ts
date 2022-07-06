import {
    CreateNodeArgs,
    CreatePagesArgs,
    CreateSchemaCustomizationArgs,
    Node,
} from "gatsby";
import { createFilePath, createRemoteFileNode } from "gatsby-source-filesystem";
import path from "path";
import type {
    MarkdownRemarkConnection,
    MarkdownRemarkFrontmatter,
} from "./src/types";

interface CreatePagesData {
    allMarkdownRemark: MarkdownRemarkConnection;
}

interface OnCreateNodeArgs extends CreateNodeArgs {
    node: Node & {
        frontmatter: MarkdownRemarkFrontmatter;
        hero: string | null;
        [key: string]: unknown;
    };
}

const postsPerPage = 9;

const hasDSG = (): boolean => {
    return process.env.GATSBY_ENABLE_DSG === "true";
};

export const createSchemaCustomization = ({
    actions: { createTypes },
}: CreateSchemaCustomizationArgs) =>
    createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }

    type MarkdownRemark implements Node {
      hero: File @link(from: "hero")
    }
  `);

export const createPages = async ({
    graphql,
    actions: { createPage },
}: CreatePagesArgs) => {
    const blogIndex = path.resolve(`./src/templates/list.tsx`);
    const blogPost = path.resolve(`./src/templates/post.tsx`);

    const { data, errors } = await graphql<
        CreatePagesData,
        Record<string, unknown>
    >(`
        {
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            type
                        }
                    }
                }
            }
        }
    `);

    if (errors) {
        throw new Error(errors);
    }

    if (!data) {
        throw new Error("createPages() query returned no data");
    }

    /**
     * Create blog posts by first querying all page objects from GraphQL
     * and then looping them to the createPage() function.
     */
    const { edges = [] } = data.allMarkdownRemark;

    edges.forEach((post, index) => {
        const slug = post.node.fields?.slug;

        if (!slug || slug.length === 0) {
            return;
        }

        const previous =
            index === edges.length - 1 ? null : edges[index + 1].node;
        const next = index === 0 ? null : edges[index - 1].node;

        createPage({
            path: slug,
            component: blogPost,
            defer: hasDSG() ? index > postsPerPage : false,
            context: { slug, previous, next },
        });
    });

    /**
     * Create index page by filtering the actual blog posts from all page
     * objects and creating an index-based array of those. Result will be
     * a site structure where '/' is the first page and subsequent pages will
     * be '/{2..m}' where m is the maximum number of posts.
     */
    const posts = edges.filter(
        (page) => page.node.frontmatter?.type === "post"
    );
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages }).forEach((_, i) => {
        const currentPage = i + 1;

        createPage({
            path: i === 0 ? "/" : `/${currentPage}`,
            component: blogIndex,
            defer: hasDSG() ? currentPage > 1 : false,
            context: {
                limit: postsPerPage,
                skip: i * postsPerPage,
                numberOfPages,
                currentPage,
            },
        });
    });
};

export const onCreateNode = async ({
    node,
    actions: { createNode, createNodeField },
    cache,
    getNode,
    createNodeId,
}: OnCreateNodeArgs) => {
    if (!isMarkdownNode(node)) {
        return;
    }

    const { id, frontmatter } = node;
    const { hero } = frontmatter;

    if (hero && isRemoteImage(hero)) {
        try {
            const fileNode = await createRemoteFileNode({
                url: hero,
                parentNodeId: id,
                createNode,
                createNodeId,
                cache,
            });

            node.hero = fileNode?.id ?? null;
        } catch (err) {
            console.error(err);
        }
    }

    const value = createFilePath({ node, getNode });

    createNodeField({
        name: `slug`,
        node,
        value,
    });
};

const isMarkdownNode = (node: Node): boolean =>
    node.internal.type === "MarkdownRemark";
const isRemoteImage = (url: string): boolean => /^https?:\/\/+/.test(url);
