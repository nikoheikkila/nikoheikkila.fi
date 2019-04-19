import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Bio from '../components/bio'
import Translation from '../components/translation'

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

    const { author, date, lang, title, categories } = post.frontmatter
    const { slug } = post.fields

    const translateUrl = `
    https://translate.google.com/translate?js=n&sl=${lang}&tl=en&u=${encodeURIComponent(
      `${siteUrl}${slug}`
    )}
    `
    const editUrl = `${repository}/edit/master/src/pages/${slug.slice(1, slug.length - 1)}.md`
    const discussUrl = `https://twitter.com/search?q=${encodeURIComponent(
      `${siteUrl}${slug}`
    )}`;

    return (
      <Layout location={location} title={siteTitle}>
        <SEO
          title={title}
          description={post.excerpt}
          lang={lang}
          keywords={post.categories}
        />
        <header>
          <h1 className="post-title">{title}</h1>

          <p className="post-meta">
            {author !== '' && <span>✏️ Conceived by {author} &bull; </span>}
            {categories.length > 0 && <span>🗂 Filed under <strong>{formatCategories(categories)}</strong></span>}
          </p>

          <p className="post-meta">
            <span>{date} &bull; </span>
            {post.timeToRead >= 1 && <span>{formatReadingTime(post.timeToRead)}</span>}
          </p>

        </header>

        {lang !== 'en' && <Translation lang={lang} url={translateUrl} />}

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

        <hr />

        <aside>
          <Bio />
        </aside>

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
