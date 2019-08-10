import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'

import { DiscussionEmbed, CommentCount } from 'disqus-react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Bio from '../components/bio'
import Tag from '../components/tag'
import Translation from '../components/translation'
import Article from '../components/post/content'
import ExternalLink from '../components/elements'

import { formatReadingTime } from '../utils/helpers'

const Post = ({ data, location, pageContext }) => {
  const {
    markdownRemark: post,
    site: {
      siteMetadata: { siteUrl, repository, title: siteTitle, disqus },
    },
  } = data

  const { previous, next } = pageContext
  const { author, date, lang, title, type } = post.frontmatter
  const { fluid: cover } = post.frontmatter.cover.childImageSharp

  const slug = post.fields.slug.slice(1, post.fields.slug.length - 1)
  const postUrl = `${siteUrl}/${slug}`
  const datePublished = dayjs(date || null).format('MMMM D, YYYY')
  const categories = post.frontmatter.categories || []

  const translateUrl = `https://translate.google.com/translate?js=n&sl=${lang}&tl=en&u=${encodeURIComponent(postUrl)}`
  const editUrl = `${repository}/edit/master/src/pages/${slug}/index.md`
  const historyUrl = `${repository}/commits/master/src/pages/${slug}/index.md`

  const disqusConfig = {
    url: postUrl,
    identifier: slug,
    title,
  }

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

        <section className="post-meta">
          <p>
            <span>✏️ Conceived by {author} &bull; </span>
            <span>{datePublished} &bull; </span>
            {post.timeToRead >= 1 && <span>{formatReadingTime(post.timeToRead)} &bull; </span>}
            <span>
              💬 <CommentCount shortname={disqus} config={disqusConfig} />
            </span>
          </p>
        </section>
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
        <ul>
          <li>
            <ExternalLink url={editUrl} text="Edit Page" />
          </li>
          <li>
            <ExternalLink url={historyUrl} text="View History" />
          </li>
        </ul>
      </section>

      <DiscussionEmbed shortname={disqus} config={disqusConfig} />

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

Post.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired,
}

export default Post

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
