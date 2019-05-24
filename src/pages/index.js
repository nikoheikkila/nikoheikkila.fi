import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'

import Layout from '../components/layout'
import Bio from '../components/bio'
import SEO from '../components/seo'
import { formatReadingTime } from '../utils/helpers'
import banner from '../assets/banner.png'

class BlogIndex extends React.Component {
  render() {
    const { data, location } = this.props
    const { title: siteTitle } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={location} title={siteTitle}>
        <aside><Bio /></aside>
        <SEO title="All Posts" image={banner} />

        {posts
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const date = dayjs(node.frontmatter.date).format('MMMM D, YYYY')

            return (
              <div key={node.fields.slug} className="post-content">
                <h2 className="post-title">
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h2>
                <p className="post-meta">
                  {date} &bull;
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
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { type: { ne: "page" } } }
      ) {
      edges {
        node {
          timeToRead
          fields {
            slug
          }
          frontmatter {
            type
            excerpt
            date(formatString: "YYYY-MM-DD")
            title
            categories
          }
        }
      }
    }
  }
`
