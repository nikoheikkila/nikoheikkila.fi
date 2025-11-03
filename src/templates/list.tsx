import React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import Layout from "../components/layout/layout";
import { LayoutType } from "../components/layout/types";
import { ArticleView } from "../components/blog/article";
import BlogHeader from "../components/blog/header";
import Pagination from "../components/blog/pagination";
import SEO from "../components/seo";

type PageContext = { currentPage: number; numberOfPages: number };
type IndexProps = PageProps<Queries.IndexQuery, PageContext>;

const Index: React.FC<IndexProps> = ({ data, location, pageContext }) => {
	const {
		allMarkdownRemark: { edges },
	} = data;

	const title = data.site?.siteMetadata?.title ?? "";
	const nodes = edges.map((_) => _.node);

	return (
		<Layout type={LayoutType.LIST} title={title}>
			<BlogHeader title={title} />
			<ArticleView nodes={nodes} location={location} />
			<Pagination currentPage={pageContext.currentPage} numberOfPages={pageContext.numberOfPages} />
		</Layout>
	);
};

export const Head: HeadFC<Queries.Query> = ({ data, location }) => {
	const title = data.site?.siteMetadata?.title ?? "";

	return <SEO title={title} url={location.pathname} type="page" />;
};

export default Index;

// biome-ignore lint/style/useComponentExportOnlyModules: Gatsby requires pageQuery export
export const pageQuery = graphql`
	query Index($skip: Int!, $limit: Int!) {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(
			sort: { frontmatter: { date: DESC } }
			filter: { frontmatter: { type: { ne: "page" } } }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					excerpt(pruneLength: 160)
					timeToRead
					fields {
						hero
						slug
					}
					frontmatter {
						author
						excerpt
						hero
						lang
						type
						date
						title
						categories
					}
				}
			}
		}
	}
`;
