import { fab } from "@fortawesome/free-brands-svg-icons";
import PostFooter from "../components/post/footer";
import dayjs from "dayjs";
import { graphql } from "gatsby";
import { Maybe } from "purify-ts";
import React from "react";
import { useIcons } from "../components/hooks/useIcons";
import Layout from "../components/layout/layout";
import Content from "../components/post/content";
import PostHeader from "../components/post/header";
import SEO from "../components/seo";
import { Page } from "../types";
import PostAttachments from "../components/post/attachments";
import PostNavigation from "../components/post/navigation";

const Post = ({ data, location, pageContext }: Page) => {
  const {
    markdownRemark: {
      fields: { slug },
      hero,
      html,
      timeToRead,
      frontmatter: { author, date, lang, title, type, excerpt, categories },
    },
    site: {
      siteMetadata: { siteUrl, repository, title: siteTitle, disqus },
    },
  } = data;

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

  const cover = Maybe.fromNullable(hero).chainNullable(
    (_) => _.childImageSharp
  );
  const coverImage = cover.chainNullable((_) => _.gatsbyImageData).extract();
  const coverPath = cover.chainNullable((_) => _.original.src).orDefault("");

  const postSlug = slug.slice(1, slug.length - 1);
  const postUrl = `${siteUrl}/${slug}`;
  const postCategories = categories || [];
  const datePublished = dayjs(date).format("DD.MM.YYYY");

  const editUrl = `${repository}/edit/main/content/${postSlug}/index.md`;
  const historyUrl = `${repository}/commits/main/content/${postSlug}/index.md`;

  useIcons([fab]);

  return (
    <Layout title={siteTitle} cover={coverImage}>
      <SEO
        description={excerpt}
        lang={lang}
        keywords={postCategories}
        title={title}
        image={coverPath}
        type={type}
        url={postUrl}
        datePublished={date}
      />
      <PostHeader
        author={author}
        datePublished={datePublished}
        excerpt={excerpt}
        timeToRead={timeToRead}
        title={title}
      />
      <Content content={html} />
      <PostFooter categories={postCategories} />
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
      hero {
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          original {
            src
          }
        }
      }
      frontmatter {
        lang
        title
        type
        date
        author
        excerpt
        categories
      }
    }
  }
`;
