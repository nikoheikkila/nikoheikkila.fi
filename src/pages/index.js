import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'
import Bio from '../components/bio'
import SEO from '../components/seo'
import { formatReadingTime } from '../utils/helpers'

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props
    const { title: siteTitle } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={location} title={siteTitle}>
        <aside><Bio /></aside>
        <SEO title="All Posts" />

        {posts
          .filter(({ node }) => node.frontmatter.type !== 'page')
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug

            return (
              <div key={node.fields.slug} className="post-content">
                <h2 className="post-title">
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h2>
                <p className="post-meta">
                  {node.frontmatter.date} &bull;
                  {' '}{formatReadingTime(node.timeToRead)}
                </p>
                <article className="post-spoiler"
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.excerpt,
                  }}
                />
              </div>
            )
          })
        }
        <aside><Bio /></aside>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            type
            excerpt
            date(formatString: "DD.MM.YYYY")
            title
            categories
          }
        }
      }
    }
  }
`
