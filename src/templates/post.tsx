import { fab } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { graphql } from "gatsby";
import React from "react";
import { ImageSharp, MarkdownRemarkEdge, PageInfo, Query } from "../types";
import { useIcons } from "../components/hooks/useIcons";
import Layout from "../components/layout/layout";
import PostAttachments from "../components/post/attachments";
import Content from "../components/post/content";
import PostFooter from "../components/post/footer";
import PostHeader from "../components/post/header";
import PostNavigation from "../components/post/navigation";
import SEO from "../components/seo";
import { combinePaths } from "../utils/helpers";
import { Route } from "../gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";

interface PostProps {
  data: Query;
  location: Route;
  pageContext: PageInfo & MarkdownRemarkEdge;
}

const Post: React.FC<PostProps> = ({ data, location, pageContext }) => {
  const {
    markdownRemark: {
      fields: { slug },
      hero,
      html,
      timeToRead,
      frontmatter: {
        author,
        date,
        lang,
        title: postTitle,
        type,
        excerpt,
        categories,
      },
    },
    site: {
      siteMetadata: { siteUrl, repository, title, disqus },
    },
  } = data;

  const previous = pageContext.previous;
  const next = pageContext.next;
  const postUrl = combinePaths(siteUrl, slug);
  const datePublished = dayjs(date).format("DD.MM.YYYY");
  const postSlug = slug.slice(1, slug.length - 1);
  const editUrl = `${repository}/edit/main/content/${postSlug}/index.md`;
  const historyUrl = `${repository}/commits/main/content/${postSlug}/index.md`;

  const cover: ImageSharp | undefined = hero?.childImageSharp;
  const coverImage: IGatsbyImageData | undefined = cover?.gatsbyImageData;
  const coverPath = cover?.original?.src ?? "";

  useIcons([fab]);

  return (
    <Layout title={title} cover={coverImage}>
      <SEO
        description={excerpt}
        lang={lang}
        keywords={categories}
        title={postTitle}
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
        title={postTitle}
      />
      <Content content={html} />
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
