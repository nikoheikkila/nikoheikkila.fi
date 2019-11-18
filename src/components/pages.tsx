import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import ExternalLink from './elements'

interface Props {
  links: Array<{
    slug: string,
    title: string,
  }>
}

const renderLink = (slug: string, title: string) => {
  if (slug.startsWith('/')) {
    return (
      <Link key={slug} to={slug}>
        {title}
      </Link>
    )
  }

  return (
    <ExternalLink key={slug} to={slug}>{title}</ExternalLink>
  )
}

const Pages = ({ links }: Props) => {
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

export default Pages
