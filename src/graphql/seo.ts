import { graphql, useStaticQuery } from "gatsby";

export const getSEOData = () =>
    useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        siteUrl
                        author {
                            name
                        }
                    }
                }
            }
        `
    );
