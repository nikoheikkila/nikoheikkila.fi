const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

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

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
