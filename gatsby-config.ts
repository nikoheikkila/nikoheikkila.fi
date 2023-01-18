import type { GatsbyConfig } from "gatsby";
import { rssQuery, serialize } from "./src/utils/rss";

const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

const config: GatsbyConfig = {
    siteMetadata: {
        language: "en",
        title: "Blog | Niko Heikkilä",
        author: {
            name: "Niko Heikkilä",
        },
        description:
            "A blog by Niko Heikkilä. Powered by coffee, VS Code, and Gatsby.",
        siteUrl: "https://nikoheikkila.fi",
        social: [
            {
                name: "dev",
                url: "https://dev.to/nikoheikkila",
            },
            {
                name: "facebook",
                url: "https://fb.me/heikkilaniko",
            },
            {
                name: "github",
                url: "https://github.com/nikoheikkila",
            },
            {
                name: "linkedin",
                url: "https://www.linkedin.com/in/nikoheikkila",
            },
            {
                name: "mastodon",
                url: "https://fosstodon.org/@nikoheikkila",
            },
        ],
        repository: "https://github.com/nikoheikkila/nikoheikkila.fi",
        rss: "/feed",
    },
    trailingSlash: "always",
    flags: {
        PRESERVE_FILE_DOWNLOAD_CACHE: true,
        FAST_DEV: true,
        DEV_SSR: false,
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sharp",
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [
                    {
                        resolve: "gatsby-remark-images",
                        options: {
                            maxWidth: 960,
                        },
                    },
                    {
                        resolve: "gatsby-remark-autolink-headers",
                        options: {
                            icon: false,
                        },
                    },
                    "gatsby-remark-copy-linked-files",
                    "gatsby-remark-smartypants",
                ],
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: "./content",
                name: "blog",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: "./src/assets",
                name: "assets",
            },
        },
        {
            resolve: "gatsby-plugin-feed",
            options: {
                query: `{
                    site {
                        siteMetadata {
                            title
                            description
                            siteUrl
                            site_url: siteUrl
                        }
                    }
                }`,
                feeds: [
                    {
                        serialize,
                        query: rssQuery,
                        output: "/rss.xml",
                        title: "RSS Feed | Niko Heikkilä",
                        match: "^/blog/",
                    },
                ],
            },
        },
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "Niko Heikkilä",
                short_name: "nikoheikkila",
                start_url: "/",
                background_color: "#ffffff",
                theme_color: "#663399",
                display: "standalone",
                icon: "./static/favicon.png",
                crossOrigin: "use-credentials",
            },
        },
        {
            resolve: "gatsby-plugin-robots-txt",
            options: {
                policy: [{ userAgent: "*", allow: "/" }],
                output: "/robots.txt",
            },
        },
        {
            resolve: "gatsby-plugin-sass",
            options: {
                sassOptions: {
                    includePaths: ["./src/styles"],
                },
            },
        },
        "gatsby-plugin-sitemap",
        "gatsby-plugin-netlify",
    ].concat(
        // Load the PWA service worker only in production to enhance development experience.
        isProduction ? ["gatsby-plugin-offline"] : []
    ),
};

export default config;
