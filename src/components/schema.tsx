import React from "react";
import { Helmet } from "react-helmet";
import favicon from "../static/favicon.png";

interface Props {
    author?: string;
    canonicalUrl?: string;
    datePublished?: string;
    dateModified?: string;
    defaultTitle?: string;
    description?: string;
    image?: string;
    isBlogPost?: boolean;
    title?: string;
    url?: string;
    organization?: string;
}

export default React.memo(
    ({
        author = "",
        canonicalUrl = "",
        dateModified = "",
        datePublished = "",
        defaultTitle = "",
        description = "",
        image = "",
        isBlogPost = true,
        title = "",
        url = "",
    }: Props) => {
        const baseSchema = [
            {
                "@context": "http://schema.org",
                "@type": "WebSite",
                url,
                name: title,
                alternateName: defaultTitle,
            },
        ];

        const schema = isBlogPost
            ? [
                  ...baseSchema,
                  {
                      "@context": "http://schema.org",
                      "@type": "BreadcrumbList",
                      itemListElement: [
                          {
                              "@type": "ListItem",
                              position: 1,
                              item: {
                                  "@id": url,
                                  image,
                                  name: title,
                              },
                          },
                      ],
                  },
                  {
                      "@context": "http://schema.org",
                      "@type": "BlogPosting",
                      url,
                      name: title,
                      alternateName: defaultTitle,
                      headline: title,
                      image: {
                          "@type": "ImageObject",
                          url: image,
                      },
                      description,
                      author: {
                          "@type": "Person",
                          name: author,
                      },
                      publisher: {
                          "@type": "Organization",
                          url: canonicalUrl,
                          logo: {
                              "@type": "ImageObject",
                              url: canonicalUrl + favicon,
                              width: 512,
                              height: 512,
                          },
                          name: title,
                      },
                      mainEntityOfPage: {
                          "@type": "WebSite",
                          "@id": canonicalUrl,
                      },
                      datePublished,
                      dateModified,
                  },
              ]
            : baseSchema;

        const jsonSchema = JSON.stringify(schema);

        return (
            <Helmet>
                <script type="application/ld+json">{jsonSchema}</script>
            </Helmet>
        );
    }
);
