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
export const socialLinks: readonly SocialLink[] = [
	{
		name: "Bluesky",
		icon: "bluesky",
		url: "https://short.nikoheikkila.fi",
	},
	{
		name: "LinkedIn",
		icon: "linkedin",
		url: "https://cv.nikoheikkila.fi",
	},
	{
		name: "GitHub",
		icon: "github",
		url: "https://git.nikoheikkila.fi",
	},
	{
		name: "Telegram",
		icon: "telegram",
		url: "https://telegram.nikoheikkila.fi",
	},
	{
		name: "Signal",
		icon: "signal-messenger",
		url: "https://signal.nikoheikkila.fi",
	},
];
