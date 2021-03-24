import React from "react";
import { graphql } from "gatsby";
import dayjs from "dayjs";
import Layout from "../components/layout/layout";
import BlogHeader from "../components/blog/header";
import SEO from "../components/seo";
import { Page } from "../types";
import profile from "../assets/profile.png";
import ArticleCard from "../components/blog/card";
import Pagination from "../components/blog/pagination";

const Index = ({ data, location, pageContext }: Page) => {
  const {
    site: {
      siteMetadata: { title: siteTitle },
    },
    allMarkdownRemark: { edges: posts },
  } = data;

  const { currentPage, numberOfPages } = pageContext;
  const datePublished = dayjs().format("YYYY-MM-DD");

  return (
    <Layout title={siteTitle}>
      <BlogHeader title={siteTitle} />
      <SEO
        title="All Posts"
        image={profile}
        url={location.href}
        type="page"
        datePublished={datePublished}
      />

      {posts.map(({ node }: any) => {
        const { timeToRead } = node;
        const { slug } = node.fields;
        const { title, categories, excerpt } = node.frontmatter;
        const date = dayjs(node.frontmatter.date).format("DD.MM.YYYY");

        return (
          <ArticleCard
            key={slug}
            slug={slug}
            location={location}
            title={title}
            categories={categories || []}
            date={date}
            excerpt={excerpt}
            timeToRead={timeToRead || 0}
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
