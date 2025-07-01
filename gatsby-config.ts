import type { GatsbyConfig } from "gatsby";
import { rssQuery, serialize } from "./src/utils/rss";

const environment = process.env.NODE_ENV;
const isProduction = environment === "production";

const config: GatsbyConfig = {
	flags: {
		DEV_SSR: false,
		FAST_DEV: true,
		PRESERVE_FILE_DOWNLOAD_CACHE: true,
	},
	graphqlTypegen: true,
	plugins: [
		"gatsby-plugin-image",
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			options: {
				plugins: [
					{
						options: {
							maxWidth: 960,
						},
						resolve: "gatsby-remark-images",
					},
					{
						options: {
							icon: false,
						},
						resolve: "gatsby-remark-autolink-headers",
					},
					"gatsby-remark-copy-linked-files",
					"gatsby-remark-smartypants",
				],
			},
			resolve: "gatsby-transformer-remark",
		},
		{
			options: {
				name: "blog",
				path: "./content",
			},
			resolve: "gatsby-source-filesystem",
		},
		{
			options: {
				name: "assets",
				path: "./src/assets",
			},
			resolve: "gatsby-source-filesystem",
		},
		{
			options: {
				feeds: [
					{
						match: "^/blog/",
						output: "/rss.xml",
						query: rssQuery,
						serialize,
						title: "RSS Feed | Niko Heikkilä",
					},
				],
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
			},
			resolve: "gatsby-plugin-feed",
		},
		{
			options: {
				background_color: "#ffffff",
				crossOrigin: "use-credentials",
				display: "standalone",
				icon: "./static/favicon.png",
				name: "Niko Heikkilä",
				short_name: "nikoheikkila",
				start_url: "/",
				theme_color: "#663399",
			},
			resolve: "gatsby-plugin-manifest",
		},
		{
			options: {
				output: "/robots.txt",
				policy: [{ allow: "/", userAgent: "*" }],
			},
			resolve: "gatsby-plugin-robots-txt",
		},
		{
			options: {
				sassOptions: {
					includePaths: ["./src/styles"],
					silenceDeprecations: ["legacy-js-api"],
				},
			},
			resolve: "gatsby-plugin-sass",
		},
		"gatsby-plugin-sitemap",
		"gatsby-adapter-netlify",
	].concat(
		// Load the PWA service worker only in production to enhance development experience.
		isProduction ? ["gatsby-plugin-offline"] : [],
	),
	siteMetadata: {
		author: {
			name: "Niko Heikkilä",
		},
		description: "A blog by Niko Heikkilä. Powered by coffee, VS Code, and Gatsby.",
		language: "en",
		repository: "https://github.com/nikoheikkila/nikoheikkila.fi",
		rss: "/feed",
		siteUrl: "https://nikoheikkila.fi",
		social: [
			{
				name: "bluesky",
				url: "https://bsky.app/profile/nikoheikkila.fi",
			},
			{
				name: "mastodon",
				url: "https://fosstodon.org/@nikoheikkila",
			},
			{
				name: "linkedin",
				url: "https://www.linkedin.com/in/nikoheikkila",
			},
			{
				name: "github",
				url: "https://github.com/nikoheikkila",
			},
		],
		title: "Niko Heikkilä",
	},
	trailingSlash: "always",
};

export default config;
