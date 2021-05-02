import dayjs from "dayjs";
import { graphql } from "gatsby";
import React from "react";
import { MarkdownRemarkEdge, PageInfo, Query } from "../types";
import profile from "../assets/profile.png";
import ArticleCard from "../components/blog/card";
import BlogHeader from "../components/blog/header";
import Pagination from "../components/blog/pagination";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

interface IndexProps {
  data: Query;
  location: Location;
  pageContext: PageInfo & {
    numberOfPages: number;
  };
}

const Index: React.FC<IndexProps> = ({ data, location, pageContext }) => {
  const {
    site: {
      siteMetadata: { title = "" },
    },
    allMarkdownRemark: { edges = [] },
  } = data;

  const { currentPage, numberOfPages } = pageContext;
  const datePublished = dayjs().format("YYYY-MM-DD");

  return (
    <Layout title={title}>
      <BlogHeader title={title} />
      <SEO
        title={title}
        image={profile}
        url={location.href}
        type="page"
        datePublished={datePublished}
      />

      {edges.map((edge: MarkdownRemarkEdge) => {
        const {
          node: {
            timeToRead,
            fields: { slug },
            frontmatter: { title: postTitle, categories, date, excerpt },
          },
        } = edge;

        return (
          <ArticleCard
            key={slug}
            slug={slug}
            location={location}
            title={postTitle}
            categories={categories}
            date={dayjs(date).format("DD.MM.YYYY")}
            excerpt={excerpt}
            timeToRead={timeToRead}
          />
        );
      })}

      <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
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
          timeToRead
          fields {
            slug
          }
          frontmatter {
            type
            excerpt
            date
            title
            categories
          }
        }
      }
    }
  }
`;
