const path = require("path");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    language: `en`,
    title: `Niko Heikkilä`,
    author: {
      name: `Niko Heikkilä`,
    },
    description: `A blog by Niko Heikkilä. Powered by coffee, VS Code, and Gatsby.`,
    siteUrl: `https://nikoheikkila.fi`,
    disqus: process.env.GATSBY_DISQUS_SHORTNAME,
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
  flags: {
    FAST_DEV: process.env.FAST_DEV === "1",
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
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
        path: `${__dirname}/content`,
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
        trackingId: process.env.GATSBY_GA_TRACKING_CODE,
        anonymize: true,
        respectDNT: true,
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
              allMarkdownRemark.edges.map((edge) => ({
                ...edge.node.frontmatter,
                language: edge.node.frontmatter.lang,
                title: edge.node.frontmatter.title,
                description: edge.node.excerpt,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                author: edge.node.frontmatter.author,
                custom_elements: [
                  {
                    "content:encoded": edge.node.html,
                  },
                ],
              })),
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
        display: `standalone`,
        icon: `src/static/favicon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
        output: `/robots.txt`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src/styles")],
        },
      },
    },
    `gatsby-plugin-sitemap`,
  ],
};
