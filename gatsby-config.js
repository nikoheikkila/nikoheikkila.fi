module.exports = {
  siteMetadata: {
    language: `en`,
    title: `Niko Heikkilä`,
    author: {
      name: `Niko Heikkilä`,
    },
    description: `A blog by Niko Heikkilä. Powered by coffee, VS Code, and Gatsby.`,
    siteUrl: `https://nikoheikkila.fi`,
    social: [
      {
        name: `dev`,
        url: `https://dev.to/nikoheikkila`,
      },
      {
        name: `facebook`,
        url: `https://fb.me/heikkilaniko`,
      },
      {
        name: `github`,
        url: `https://github.com/nikoheikkila`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/nikoheikkila`,
      },
      {
        name: `mastodon`,
        url: `https://mastodon.technology/@nikoheikkila`,
      },
    ],
    repository: `https://github.com/nikoheikkila/nikoheikkila.fi`,
    rss: `/rss.xml`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
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
    {
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
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-41155961-1`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
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
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) =>
              allMarkdownRemark.edges.map(edge =>
                Object.assign({}, edge.node.frontmatter, {
                  language: edge.node.frontmatter.lang,
                  title: edge.node.frontmatter.title,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  author: edge.node.frontmatter.author,
                  custom_elements: [
                    {
                      'content:encoded': edge.node.html,
                    },
                  ],
                })
              ),
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: { frontmatter: { type: { ne: "page" } } }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      author
                      date
                      lang
                      title
                      type
                    }
                  }
                }
              }
            }
          `,
            output: `/rss.xml`,
            title: `RSS Feed | Niko Heikkilä`,
            match: `^/blog/`,
          },
        ],
      },
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
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: '*', allow: '/' }],
        output: `/robots.txt`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `nikoheikkilafi`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
  ],
}
