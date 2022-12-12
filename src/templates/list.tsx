import React from "react";
import { graphql, HeadFC } from "gatsby";
import Layout, { LayoutType } from "../components/layout/layout";
import { ArticleView } from "../components/blog/article";
import BlogHeader from "../components/blog/header";
import Pagination from "../components/blog/pagination";
import SEO from "../components/seo";
import { MarkdownRemarkEdge, PageInfo, Query } from "../types";

interface IndexProps {
    data: Query;
    location: Location;
    pageContext: PageInfo & {
        numberOfPages: number;
    };
}

const Index: React.FC<IndexProps> = ({ data, location, pageContext }) => {
    const {
        allMarkdownRemark: { edges = [] },
    } = data;

    const title = data.site?.siteMetadata?.title ?? "";

    return (
        <Layout type={LayoutType.LIST} title={title}>
            <BlogHeader title={title} />
            <ArticleView edges={edges} location={location} />
            <Pagination
                currentPage={pageContext.currentPage}
                numberOfPages={pageContext.numberOfPages}
            />
        </Layout>
    );
};

export const Head: HeadFC<Query, PageInfo & MarkdownRemarkEdge> = ({
    data,
    location,
}) => {
    const title = data.site?.siteMetadata?.title ?? "";

    return <SEO title={title} url={location.pathname} type="page" />;
};

export default Index;

export const pageQuery = graphql`
    query BlogListQuery($skip: Int!, $limit: Int!) {
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
                        slug
                    }
                    frontmatter {
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
