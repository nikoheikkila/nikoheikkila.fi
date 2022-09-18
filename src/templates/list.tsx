import dayjs from "dayjs";
import { graphql } from "gatsby";
import React from "react";
import { ArticleView } from "../components/blog/article";
import BlogHeader from "../components/blog/header";
import Pagination from "../components/blog/pagination";
import Layout, { LayoutType } from "../components/layout/layout";
import SEO from "../components/seo";
import { PageInfo, Query } from "../types";
import profile from "../assets/profile.png";

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
            <SEO
                title={title}
                image={profile}
                url={location.href}
                type="page"
                datePublished={dayjs().format("YYYY-MM-DD")}
            />

            <ArticleView edges={edges} location={location} />

            <Pagination
                currentPage={pageContext.currentPage}
                numberOfPages={pageContext.numberOfPages}
            />
        </Layout>
    );
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
            sort: { fields: [frontmatter___date], order: DESC }
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
