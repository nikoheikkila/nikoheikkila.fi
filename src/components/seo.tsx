import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import SchemaOrg from './schema'
import { getSEOData } from '../graphql/seo'

interface Props {
  title: string
  image?: string
  type?: string
  url?: string
  datePublished?: string
  dateModified?: string
  description?: string
  lang?: string
  keywords?: Array<string>
}

const SEO = ({
  dateModified = '',
  datePublished = '',
  description = '',
  image = '',
  keywords = [],
  lang = 'en',
  title,
  type = 'page',
  url = '',
}: Props) => {
  const { site } = getSEOData();
  const metaDescription = description || site.siteMetadata.description
  const imageURL = `${site.siteMetadata.siteUrl}${image}`

  return (
    <Fragment>
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
            content: type === `page` ? `website` : `article`,
          },
          {
            name: `og:image`,
            content: imageURL,
          },
          {
            name: `og:image:alt`,
            content: title,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
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
            content: imageURL,
          },
          {
            name: `twitter:image:alt`,
            content: title,
          },
        ]
          .concat(
            keywords.length > 0
              ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
              : []
          )
        }
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
    </Fragment>
  )
}

export default SEO
