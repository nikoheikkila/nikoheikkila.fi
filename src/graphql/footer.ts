import { graphql, useStaticQuery } from "gatsby";

export const getFooterLinks = () =>
    useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    social {
                        name
                        url
                    }
                    rss
                }
            }
        }
    `);
