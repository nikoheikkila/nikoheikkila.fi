import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Bio from '../components/bio'
import { formatCategories, formatReadingTime } from '../utils/helpers'

class BlogPostTemplate extends React.Component {
  render() {
    const {
      location,
      data: {
        markdownRemark: post,
        site: {
          siteMetadata: {
            siteUrl,
            repository,
            title: siteTitle
          }
        }
      },
      pageContext: {
        previous, next
      }
    } = this.props

    const categories = formatCategories(post.frontmatter.categories)
    const { slug } = post.fields
    const editUrl = `${repository}/edit/master/src/pages/${slug.slice(1, slug.length - 1)}.md`
    const discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteUrl}${slug}`
    )}`;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.excerpt}
          lang={post.frontmatter.lang}
        />
        <header>
          <h1 className="post-title">{post.frontmatter.title}</h1>

          <p className="post-meta">
            <span>✏️ Conceived by {post.frontmatter.author}</span>
            <span>🗂 Filed under <strong>{categories}</strong></span>
          </p>

          <p className="post-meta">
            <span>📅 {post.frontmatter.date}</span>
            <span>{formatReadingTime(post.timeToRead)}</span>
          </p>

        </header>

        <article dangerouslySetInnerHTML={{ __html: post.html }} />

        <p>
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
              </a>
          {` • `}
          <a href={editUrl} target="_blank" rel="noopener noreferrer">
            Edit on GitHub
              </a>
        </p>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
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
        <hr />
        <aside>
          <Bio />
        </aside>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
        title
        author
        repository
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
        date(formatString: "DD.MM.YYYY")
        author
        categories
      }
    }
  }
`
