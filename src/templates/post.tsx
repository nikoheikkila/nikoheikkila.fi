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

  const { author, date, lang, title, type, excerpt } = post.frontmatter;

  const previous = {
    slug: Maybe.fromNullable(pageContext.previous)
      .chainNullable((_) => _.fields)
      .map((_) => _.slug)
      .orDefault(""),
    title: Maybe.fromNullable(pageContext.previous)
      .chainNullable((_) => _.frontmatter)
      .map((_) => _.title)
      .orDefault("Previous"),
  };

  const next = {
    slug: Maybe.fromNullable(pageContext.next)
      .chainNullable((_) => _.fields)
      .map((_) => _.slug)
      .orDefault(""),
    title: Maybe.fromNullable(pageContext.next)
      .chainNullable((_) => _.frontmatter)
      .map((_) => _.title)
      .orDefault("Next"),
  };

  const cover = Maybe.fromNullable(post.frontmatter.cover)
    .chainNullable((x) => x.childImageSharp.gatsbyImageData)
    .extractNullable();

  const slug = post.fields.slug.slice(1, post.fields.slug.length - 1);
  const postUrl = `${siteUrl}/${slug}`;
  const datePublished = dayjs(date).format("DD.MM.YYYY");
  const categories = post.frontmatter.categories || [];

  const editUrl = `${repository}/edit/main/content/${slug}/index.md`;
  const historyUrl = `${repository}/commits/main/content/${slug}/index.md`;

  useIcons([fab]);

  return (
    <Layout location={location} title={siteTitle} cover={cover}>
      <SEO
        description={excerpt}
        lang={lang}
        keywords={categories}
        title={title}
        image={cover?.src}
        type={type}
        url={postUrl}
        datePublished={date}
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

      <PostNavigation previous={previous} next={next} />
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
