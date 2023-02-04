import { graphql, useStaticQuery } from "gatsby";

type SEOData = { site: Queries.Site };

export const getSEOData = () =>
    useStaticQuery<SEOData>(
        graphql`
            query {
                site {
                    siteMetadata {
                        language
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
