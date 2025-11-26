import { graphql, useStaticQuery } from "gatsby";

export const getSEOData = () =>
	useStaticQuery<Queries.SEOQuery>(graphql`
		query SEO {
			site {
				siteMetadata {
					language
					title
					cover
					description
					siteUrl
					author {
						name
					}
				}
			}
		}
	`);
