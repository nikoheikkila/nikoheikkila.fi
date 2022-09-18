import { graphql, useStaticQuery } from "gatsby";
import { Site } from "../types";

type SEOData = { site: Site };

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
