import { graphql, useStaticQuery } from "gatsby";

export const getFooterLinks = () =>
    useStaticQuery<Queries.FooterQuery>(graphql`
        query Footer {
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
