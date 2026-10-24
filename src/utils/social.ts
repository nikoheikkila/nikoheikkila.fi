import links from "./social.json";

export type SocialLink = {
	readonly name: string;
	readonly icon: string;
	readonly url: string;
};

/**
 * Social links published in `siteMetadata`. Kept out of `gatsby-config.ts` so
 * tests can assert against them without importing the config — and separate
 * from `socialIcons.ts` so FontAwesome stays out of the config's module graph.
 * Every `icon` here needs a matching definition in
 * `src/components/layout/socialIcons.ts`.
 */
export const socialLinks: readonly SocialLink[] = links;
