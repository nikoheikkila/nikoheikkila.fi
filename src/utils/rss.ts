export type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export type Serializable = {
    query: {
        allMarkdownRemark: DeepPartial<Queries.MarkdownRemarkConnection>;
        site: {
            siteMetadata: DeepPartial<Queries.SiteSiteMetadata>;
        };
    };
};

export const serialize = ({
    query: { site, allMarkdownRemark },
}: Serializable) => {
    return (allMarkdownRemark?.edges || []).map((edge) => {
        const siteUrl = site?.siteMetadata?.siteUrl ?? "";
        const slug = edge?.node?.fields?.slug ?? "";
        const url = siteUrl + slug;

        return {
            url,
            language: edge?.node?.frontmatter?.lang,
            title: edge?.node?.frontmatter?.title,
            description: edge?.node?.excerpt,
            date: edge?.node?.frontmatter?.date,
            categories: edge?.node?.frontmatter?.categories,
            guid: edge?.node?.internal?.contentDigest,
            author: edge?.node?.frontmatter?.author,
            custom_elements: [
                {
                    "content:encoded": edge?.node?.html,
                },
            ],
        };
    });
};

export const rssQuery = `{
  allMarkdownRemark(
    limit: 1000
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {type: {ne: "page"}}}
  ) {
    edges {
      node {
        excerpt
        html
        internal {
          contentDigest
        }
        fields {
          slug
        }
        frontmatter {
          author
          date
          lang
          title
          type
          categories
        }
      }
    }
  }
}`;
