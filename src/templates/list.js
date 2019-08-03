import React from 'react'
import { Link, graphql } from 'gatsby'
import dayjs from 'dayjs'

import Layout from '../components/layout'
import Bio from '../components/bio'
import SEO from '../components/seo'
import Tag from '../components/tag'
import Article from '../components/post/content'
import { formatReadingTime } from '../utils/helpers'
import banner from '../assets/banner.png'

class BlogIndex extends React.Component {
  render() {
    const {
      data,
      location,
      pageContext: { currentPage, numberOfPages },
    } = this.props
    const { title: siteTitle } = data.site.siteMetadata
    const posts = data.allMarkdownRemark.edges

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === numberOfPages
    const previousPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <SEO title="All Posts" image={banner} />

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          const date = dayjs(node.frontmatter.date).format('MMMM D, YYYY')

          return (
            <div key={node.fields.slug} className="post-content">
              <h2 className="post-title">
                <Link to={node.fields.slug}>{title}</Link>
              </h2>
              <p className="post-tags">
                {node.frontmatter.categories.map(c => (
                  <Tag key={c} title={c} />
                ))}
              </p>
              <p className="post-meta">
                {date} &bull; {formatReadingTime(node.timeToRead)} &bull;
              </p>
              <Article className="post-spoiler" content={node.frontmatter.excerpt} />
            </div>
          )
        })}
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {!isFirstPage && (
            <Link to={previousPage} rel="prev">
              👈 Previous Page ({currentPage - 1}/{numberOfPages})
            </Link>
          )}
          {!isLastPage && (
            <Link to={nextPage} rel="next">
              Next Page ({currentPage + 1}/{numberOfPages}) 👉
            </Link>
          )}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { ne: "page" } } }
      limit: $limit
      skip: $skip
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
