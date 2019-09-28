import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

const renderLink = (slug, title) => (
  <Link key={slug} to={slug}>
    {title}
  </Link>
)

function Pages({ links }) {
  const data = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: ASC }
          filter: { frontmatter: { type: { eq: "page" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  const pages = data.allMarkdownRemark.edges.map(({ node }) => renderLink(node.fields.slug, node.frontmatter.title))

  return links.map(({ slug, title }) => renderLink(slug, title)).concat(pages)
}

Pages.defaultProps = {
  links: [],
}

Pages.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
}

export default Pages
