/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import SchemaOrg from './schema'

function SEO({
  description,
  lang,
  meta,
  keywords,
  title,
  image,
  type,
  url,
  datePublished,
  dateModified,
}) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author {
              name
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const imageURL = `${site.siteMetadata.siteUrl}${image}`

  return (
    <>
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: type === `page` ? `website` : `article`
        },
        {
          name: `og:image`,
          content: imageURL
        },
        {
          name: `og:image:alt`,
          content: title
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:image`,
          content: imageURL
        },
        {
          name: `twitter:image:alt`,
          content: title
        }
      ]
        .concat(
          keywords.length > 0
            ? {
              name: `keywords`,
              content: keywords.join(`, `),
            }
            : []
        )
        .concat(meta)}
    />
    <SchemaOrg
        isBlogPost={type === `post`}
        url={url || site.siteMetadata.siteUrl}
        title={title}
        image={imageURL}
        description={metaDescription}
        datePublished={datePublished}
        dateModified={dateModified || datePublished}
        defaultTitle={site.siteMetadata.title}
        author={site.siteMetadata.author.name}
        canonicalUrl={site.siteMetadata.siteUrl}
        organization={site.siteMetadata.title}
    />
    </>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
  image: ``,
  type: `page`,
  url: ``,
  datePublished: ``,
  dateModified: ``
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  type: PropTypes.string
}

export default SEO
