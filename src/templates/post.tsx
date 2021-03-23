import { fab } from "@fortawesome/free-brands-svg-icons";
import PostFooter from "../components/post/footer";
import dayjs from "dayjs";
import { graphql } from "gatsby";
import { Maybe } from "purify-ts";
import React from "react";
import { useIcons } from "../components/hooks/useIcons";
import Layout from "../components/layout";
import Article from "../components/post/content";
import PostHeader from "../components/post/header";
import SEO from "../components/seo";
import { Page } from "../types";
import PostAttachments from "../components/post/attachments";
import PostNavigation from "../components/post/navigation";

const Post = ({ data, location, pageContext }: Page) => {
  const {
    markdownRemark: post,
    site: {
      siteMetadata: { siteUrl, repository, title: siteTitle, disqus },
    },
  } = data;

  const { previous, next } = pageContext;
  const { author, date, lang, title, type, excerpt } = post.frontmatter;
  const cover = Maybe.fromNullable(post.frontmatter.cover)
    .chainNullable((x) => x.childImageSharp.gatsbyImageData)
    .extractNullable();

  const slug = post.fields.slug.slice(1, post.fields.slug.length - 1);
  const postUrl = `${siteUrl}/${slug}`;
  const datePublished = dayjs(date || null).format("MMMM D, YYYY");
  const categories = post.frontmatter.categories || [];

  const editUrl = `${repository}/edit/main/content/${slug}/index.md`;
  const historyUrl = `${repository}/commits/main/content/${slug}/index.md`;

  useIcons([fab]);

  return (
    <Layout location={location} title={siteTitle} cover={cover}>
      <SEO
        description={post.excerpt}
        lang={lang}
        keywords={post.categories}
        title={title}
        image={cover?.src}
        type={type}
        url={postUrl}
        datePublished={date || dayjs().format("YYYY-MM-DD")}
      />
      <PostHeader
        author={author}
        datePublished={datePublished}
        excerpt={excerpt}
        timeToRead={post.timeToRead}
        title={title}
      />
      <Article content={post.html} />
      <PostFooter categories={categories} />
      <PostAttachments
        location={location}
        urls={{ edit: editUrl, history: historyUrl }}
        disqusId={disqus}
        disqusConfiguration={{
          url: postUrl,
          identifier: slug,
          title,
        }}
      />

      <PostNavigation
        previous={{
          slug: Maybe.fromNullable(previous)
            .chainNullable((_) => _.fields)
            .map((_) => _.slug)
            .orDefault(""),
          title: Maybe.fromNullable(previous)
            .chainNullable((_) => _.frontmatter)
            .map((_) => _.title)
            .orDefault("Previous"),
        }}
        next={{
          slug: Maybe.fromNullable(next)
            .chainNullable((_) => _.fields)
            .map((_) => _.slug)
            .orDefault(""),
          title: Maybe.fromNullable(next)
            .chainNullable((_) => _.frontmatter)
            .map((_) => _.title)
            .orDefault("Next"),
        }}
      />
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author {
          name
        }
        repository
        disqus
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        lang
        title
        type
        date(formatString: "YYYY-MM-DD")
        author
        excerpt
        categories
        cover {
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
