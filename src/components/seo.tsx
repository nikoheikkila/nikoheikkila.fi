import React, { Fragment, FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import SchemaOrg from "./schema";
import { getSEOData } from "../graphql/seo";

interface Props {
  title: string;
  type: string;
  url: string;
  datePublished: string;
  description?: string;
  dateModified?: string;
  image?: string;
  lang?: string;
  keywords?: readonly string[];
}

const SEO: FunctionComponent<Props> = ({
  title,
  type,
  url,
  datePublished,
  description = "",
  dateModified = "",
  image = "",
  lang = "en",
  keywords = [],
}) => {
  const { site } = getSEOData();
  const metaDescription = description || site.siteMetadata.description;
  const imageURL = `${site.siteMetadata.siteUrl}${image}`;

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
            property: `og:url`,
            content: url,
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
            name: `twitter:domain`,
            content: site.siteMetadata.siteUrl,
          },
          {
            name: `twitter:url`,
            content: url,
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
        ].concat(
          keywords && keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )}
      />
      <SchemaOrg
        isBlogPost={type === `post`}
        url={url}
        title={title}
        image={imageURL}
        description={metaDescription}
        datePublished={datePublished}
        dateModified={dateModified || datePublished}
        defaultTitle={site.siteMetadata.title}
        author={site.siteMetadata.author.name}
        canonicalUrl={url}
        organization={site.siteMetadata.title}
      />
    </Fragment>
  );
};

export default SEO;
