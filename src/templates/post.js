import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { rhythm, scale } from '../utils/typography'
import { formatCategories } from '../utils/helpers'

class BlogPostTemplate extends React.Component {
  render() {
    const {
      location,
      data: {
        markdownRemark: post,
        site: {
          siteMetadata: {
            title: siteTitle
          }
        }
      },
      pageContext: {
        previous, next
      }
    } = this.props

    const categories = formatCategories(post.frontmatter.categories)

    const styles = {
      postMeta: {
        display: `inline-block`,
        paddingRight: rhythm(1 / 2)
      }
    }

    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <header>
        <h1>{post.frontmatter.title}</h1>

        <p style={styles.postMeta}>✏️ Conceived by {post.frontmatter.author}</p>
          <p style={styles.postMeta}>🗂 Filed under <strong>{categories}</strong></p>

        <p
          style={{
            ...scale(-1 / 6),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1 / 2),
          }}
        >
          {post.frontmatter.date}
        </p>
        </header>

        <article dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />

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
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "DD.MM.YYYY")
        author
        categories
      }
    }
  }
`
