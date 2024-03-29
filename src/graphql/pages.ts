import { graphql, useStaticQuery } from "gatsby";

export const getStaticPages = () => {
	const data = useStaticQuery<Queries.PagesQuery>(graphql`
		query Pages {
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
	`);

	return data.allMarkdownRemark.edges.map(({ node }) => ({
		slug: node.fields?.slug,
		title: node.frontmatter?.title,
	}));
};
