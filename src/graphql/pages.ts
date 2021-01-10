import { graphql, useStaticQuery } from "gatsby";
import { ContentLink } from "types";

export const getStaticPages = (): ContentLink[] => {
  const data = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: ASC }
          filter: { frontmatter: { type: { eq: "page" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  );

  //@ts-ignore
  return data.allMarkdownRemark.edges.map(({ node }) => ({
    slug: node.fields.slug,
    title: node.frontmatter.title,
  }));
};
