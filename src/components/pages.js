import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

const renderLink = (slug, title) => (
    <li key={slug}>
        <Link to={slug}>
            {title}
        </Link>
    </li>
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
                        fields { slug }
                        frontmatter { title }
                    }
                }
            }
        }
        `
    )

    const pages = data.allMarkdownRemark.edges
        .map(({ node }) => renderLink(node.fields.slug, node.frontmatter.title))

    return (
        <ul>
            {links
                .map(({ slug, title }) => renderLink(slug, title))
                .concat(pages)
            }
        </ul>
    )
}

Pages.defaultProps = {
    links: []
}

Pages.propTypes = {
    links: PropTypes.arrayOf(PropTypes.object)
}

export default Pages
