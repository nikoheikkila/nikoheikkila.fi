import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Bio from '../components/bio'
import Tag from '../components/tag'
import Translation from '../components/translation'
import Article from '../components/post/content'
import Comments from '../components/post/comments'
import ExternalLink from '../components/elements'

import { isPage, formatReadingTime } from '../utils/helpers'

class BlogPostTemplate extends React.Component {
  render() {
    const {
      location,
      data: {
        markdownRemark: post,
        site: {
          siteMetadata: { siteUrl, repository, title: siteTitle },
        },
      },
      pageContext: { previous, next },
    } = this.props

    const { author, date, lang, title, type } = post.frontmatter
    const { fluid: cover } = post.frontmatter.cover.childImageSharp
    const { slug } = post.fields
    const postUrl = `${siteUrl}${slug}`
    const datePublished = dayjs(date || null).format('MMMM D, YYYY')
    const categories = post.frontmatter.categories || []

    const translateUrl = `
    https://translate.google.com/translate?js=n&sl=${lang}&tl=en&u=${encodeURIComponent(postUrl)}
    `
    const editUrl = `${repository}/edit/master/src/pages/${slug.slice(1, slug.length - 1)}/index.md`
    const discussUrl = `https://twitter.com/search?q=${encodeURIComponent(postUrl)}`

    return (
      <Layout location={location} title={siteTitle} cover={cover}>
        <SEO
          description={post.excerpt}
          lang={lang}
          keywords={post.categories}
          title={title}
          image={cover.src}
          type={type}
          url={postUrl}
          datePublished={date || dayjs().format('YYYY-MM-DD')}
        />
        <header>
          <h1 className="post-title">{title}</h1>

          {!isPage(type) && (
            <section className="post-meta">
              <p>
                <span>✏️ Conceived by {author} &bull; </span>
                <span>{datePublished} &bull; </span>
                {post.timeToRead >= 1 && <span>{formatReadingTime(post.timeToRead)}</span>}
              </p>
            </section>
          )}
        </header>

        {lang !== 'en' && <Translation lang={lang} url={translateUrl} />}

        <Article content={post.html} />

        <section className="post-footer">
          <p>
            {categories.map(c => (
              <Tag key={c} title={c} />
            ))}
          </p>
        </section>

        <section className="post-attachments">
          <p>
            <ExternalLink url={discussUrl} text="Discuss on Twitter" />
            {' • '}
            <ExternalLink url={editUrl} text="Edit on GitHub" />
          </p>
        </section>

        <Comments url={postUrl} identifier={slug} title={title} />

        <Bio />

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
        author {
          name
        }
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
        type
        date(formatString: "YYYY-MM-DD")
        author
        categories
        cover {
          childImageSharp {
            fluid(maxWidth: 960, quality: 100) {
              ...GatsbyImageSharpFluid
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`
