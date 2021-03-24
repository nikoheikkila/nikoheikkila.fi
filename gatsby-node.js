const path = require(`path`);
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`);

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }

    type MarkdownRemark implements Node {
      hero: File @link(from: "hero___NODE")
    }
  `);
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogIndex = path.resolve(`./src/templates/list.tsx`);
  const blogPost = path.resolve(`./src/templates/post.tsx`);

  return graphql(
    `
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
    `
  ).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    /**
     * Create blog posts by first querying all page objects from GraphQL
     * and then looping them to the createPage() function.
     */
    const pages = result.data.allMarkdownRemark.edges;

    pages.forEach((post, index) => {
      const previous =
        index === pages.length - 1 ? null : pages[index + 1].node;
      const next = index === 0 ? null : pages[index - 1].node;

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      });
    });

    /**
     * Create index page by filtering the actual blog posts from all page
     * objects and creating an index-based array of those. Result will be
     * a site structure where '/' is the first page and subsequent pages will
     * be '/{2..m}' where m is the maximum number of posts.
     */
    const posts = pages.filter((page) => page.node.frontmatter.type === "post");
    const postsPerPage = 8;
    const numberOfPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? "/" : `/${i + 1}`,
        component: blogIndex,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

exports.onCreateNode = async ({
  node,
  actions: { createNode, createNodeField },
  store,
  cache,
  getNode,
  createNodeId,
}) => {
  // skip for non-markdown nodes
  if (!isMarkdownNode(node.internal.type)) {
    return;
  }

  const { id, frontmatter } = node;
  const { hero } = frontmatter;

  if (isRemoteImage(hero)) {
    try {
      const fileNode = await createRemoteFileNode({
        url: hero,
        parentNodeId: id,
        createNode,
        createNodeId,
        cache,
        store,
      });

      node.hero___NODE = fileNode ? fileNode.id : null;
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

/**
 * @param {string} type
 * @returns boolean
 */
const isMarkdownNode = (type) => type === "MarkdownRemark";

/**
 * Checks if given url is a valid remote url
 * @param {string | null} url
 * @returns boolean
 */
const isRemoteImage = (url) => url !== null && /^https?:\/\/+/.test(url);
