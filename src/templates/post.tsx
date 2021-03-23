import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faComment,
  faCommentSlash,
  faEdit,
  faHistory,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { DiscussionEmbed } from "disqus-react";
import { graphql, Link } from "gatsby";
import { Maybe } from "purify-ts";
import React from "react";
import ExternalLink from "../components/elements";
import { useIcons } from "../components/hooks/useIcons";
import useToggle from "../components/hooks/useToggle";
import Layout from "../components/layout";
import Article from "../components/post/content";
import PostHeader from "../components/post/header";
import SEO from "../components/seo";
import Tag from "../components/tag";
import { Page } from "../types";
import { getPreviousPage, isIndex } from "../utils/helpers";

const ShowComments = () => (
  <span>
    <FontAwesomeIcon icon={faComment} />
    Show Comments
  </span>
);

const HideComments = () => (
  <span>
    <FontAwesomeIcon icon={faCommentSlash} />
    Hide Comments
  </span>
);

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

  const disqusConfig = {
    url: postUrl,
    identifier: slug,
    title,
  };

  useIcons([fab]);
  const [comments, toggleComments] = useToggle(false);

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

      <section className="post-footer">
        <p>
          {categories.map((c: string) => (
            <Tag key={c} title={c} />
          ))}
        </p>
      </section>

      <section className="post-attachments">
        <p>
          {isIndex(location) || (
            <Link rel="back" to={getPreviousPage(location)}>
              <FontAwesomeIcon icon={faUndo} /> Back to posts
            </Link>
          )}
          <ExternalLink to={editUrl}>
            <FontAwesomeIcon icon={faEdit} />
            Edit Page
          </ExternalLink>
          <ExternalLink to={historyUrl}>
            <FontAwesomeIcon icon={faHistory} />
            View History
          </ExternalLink>
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              toggleComments();
            }}
          >
            {comments ? <HideComments /> : <ShowComments />}
          </a>
        </p>
      </section>

      <section className="post-comments">
        {comments && (
          <DiscussionEmbed shortname={disqus} config={disqusConfig} />
        )}
      </section>

      <section className="post-navigation">
        <ul>
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{ paddingRight: "5px" }}
                />
                {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ paddingLeft: "5px" }}
                />
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
