import React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import Layout from "../components/layout";
import BlogHeader from "../components/blog/header";
import SEO from "../components/seo";
import Tag from "../components/tag";
import Article from "../components/post/content";
import { formatReadingTime } from "../utils/helpers";
import { Page, MarkdownRemark } from "../types";
import banner from "../assets/banner.png";

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
        const title = node.frontmatter.title || node.fields.slug;
        const date = dayjs(node.frontmatter.date).format("DD.MM.YYYY");

        return (
          <div key={node.fields.slug} className="post-content">
            <h2 className="post-title">
              <Link
                to={node.fields.slug}
                state={{ previous: location.pathname }}
              >
                {title}
              </Link>
            </h2>
            <p className="post-tags">
              {node.frontmatter.categories.map((c) => (
                <Tag key={c} title={c} />
              ))}
            </p>
            <p className="post-meta">
              <span>{date} </span>
              <span>{formatReadingTime(node.timeToRead)}</span>
            </p>
            <Article
              className="post-spoiler"
              content={node.frontmatter.excerpt}
            />
          </div>
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
