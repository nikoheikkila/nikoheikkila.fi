module.exports = {
  siteMetadata: {
    title: `Niko Heikkilä`,
    author: {
      name: `Niko Heikkilä`,
      twitter: `@nikoheikkila`
    },
    description: `A blog by Niko Heikkilä. Powered by coffee, VS Code, and Gatsby.`,
    siteUrl: `https://nikoheikkila.fi`,
    social: [{
        name: `dev`,
        url: `https://dev.to/nikoheikkila`
      },
      {
        name: `twitter`,
        url: `https://twitter.com/nikoheikkila`
      },
      {
        name: `mastodon`,
        url: `https://mastodon.technology/@nikoheikkila`
      },
      {
        name: `github`,
        url: `https://github.com/nikoheikkila`
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/nikoheikkila`
      }
    ],
    repository: `https://github.com/nikoheikkila/nikoheikkila.fi`,
    rss: `/rss.xml`
  },
  plugins: [{
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [{
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // TODO: trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
      feeds: [{
        serialize: ({
          query: {
            site,
            allMarkdownRemark
          }
        }) => allMarkdownRemark.edges.map(edge => Object.assign({}, edge.node.frontmatter, {
          description: edge.node.excerpt,
          date: edge.node.frontmatter.date,
          url: site.siteMetadata.siteUrl + edge.node.fields.slug,
          guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
          custom_elements: [{
            'content:encoded': edge.node.html
          }]
        })),
        query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: { draft: { ne: true } }}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            }
          `,
        output: `/rss.xml`,
        title: `RSS Feed`,
      }, ],
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Niko Heikkilä`,
        short_name: `nikoheikkila`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/static/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`
  ],
}