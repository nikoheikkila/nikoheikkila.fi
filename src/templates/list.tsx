import React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import Layout from "../components/layout";
import BlogHeader from "../components/blog/header";
import SEO from "../components/seo";
import { Page, MarkdownRemark } from "../types";
import banner from "../assets/banner.png";
import ArticleCard from "../components/blog/card";

const Index = ({ data, location, pageContext }: Page) => {
  const { currentPage, numberOfPages } = pageContext;
  const { title: siteTitle } = data.site.siteMetadata;
  const posts: MarkdownRemark = data.allMarkdownRemark;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === numberOfPages;
  const previousPage = currentPage - 1 === 1 ? "/" : `/${currentPage - 1}`;
  const nextPage = `/${currentPage + 1}`;

  const datePublished = dayjs().format("YYYY-MM-DD");

  return (
    <Layout location={location} title={siteTitle}>
      <BlogHeader title={siteTitle} />
      <SEO
        title="All Posts"
        image={banner}
        url={location.href}
        type="page"
        datePublished={datePublished}
      />

      {posts.edges.map(({ node }) => {
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

      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          listStyle: "none",
          padding: 0,
        }}
      >
        {!isFirstPage && (
          <li>
            <Link to={previousPage} rel="prev">
              👈 Previous Page ({currentPage - 1}/{numberOfPages})
            </Link>
          </li>
        )}
        {!isLastPage && (
          <li>
            <Link to={nextPage} rel="next">
              Next Page ({currentPage + 1}/{numberOfPages}) 👉
            </Link>
          </li>
        )}
      </ul>
    </Layout>
  );
};

export default Index;

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        siteUrl
        disqus
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
            date(formatString: "YYYY-MM-DD")
            title
            categories
          }
        }
      }
    }
  }
`;
