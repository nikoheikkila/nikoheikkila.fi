import React from "react";
import { Link, graphql } from "gatsby";
import dayjs from "dayjs";
import { Maybe } from "purify-ts";

import { DiscussionEmbed, CommentCount } from "disqus-react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tag from "../components/tag";
import Article from "../components/post/content";
import ExternalLink from "../components/elements";

import { formatReadingTime, isIndex, getPreviousPage } from "../utils/helpers";
import { Page } from "../types";

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
    .chainNullable((x) => x.childImageSharp.fluid)
    .extractNullable();

  const slug = post.fields.slug.slice(1, post.fields.slug.length - 1);
  const postUrl = `${siteUrl}/${slug}`;
  const datePublished = dayjs(date || null).format("MMMM D, YYYY");
  const categories = post.frontmatter.categories || [];

  const editUrl = `${repository}/edit/main/content/${slug}/index.md`;
  const historyUrl = `${repository}/commits/main/content/${slug}/index.md`;

  const disqusConfig = {
    url: postUrl,
    identifier: slug,
    title,
  };

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
      <header className="post-header">
        <h1 className="post-title">{title}</h1>

        {excerpt && (
          <section className="post-excerpt">
            <p>{excerpt}</p>
          </section>
        )}

        <section className="post-meta">
          <p>
            <span>{author}</span> {" / "}
            <span>{datePublished}</span> {" / "}
            <span>{formatReadingTime(post.timeToRead)}</span> {" / "}
            <span>
              💬 <CommentCount shortname={disqus} config={disqusConfig} />
            </span>
          </p>
        </section>
      </header>

      <Article content={post.html} />

      <section className="post-footer">
        <p>
          {categories.map((c: string) => (
            <Tag key={c} title={c} />
          ))}
        </p>
        {isIndex(location) || (
          <Link rel="back" to={getPreviousPage(location)}>
            ↩ Back to posts
          </Link>
        )}
      </section>

      <section className="post-attachments">
        <p>
          <ExternalLink to={editUrl}>Edit Page </ExternalLink>
          <ExternalLink to={historyUrl}>View History </ExternalLink>
        </p>
      </section>

      <DiscussionEmbed shortname={disqus} config={disqusConfig} />

      <section className="post-navigation">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </section>
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
      excerpt(pruneLength: 256)
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
            fluid(maxWidth: 960, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`;
