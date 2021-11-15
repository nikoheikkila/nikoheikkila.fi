import { graphql, useStaticQuery } from "gatsby";
import { Query } from "../types";

export const getStaticPages = () => {
    const data: Query = useStaticQuery(
        graphql`
            {
                allMarkdownRemark(
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

    return data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields?.slug,
        title: node.frontmatter?.title,
    }));
};
