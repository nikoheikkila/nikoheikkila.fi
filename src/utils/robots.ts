import { EOL } from "node:os";
import crawlers from "./crawlers.json";

/**
 * @see https://github.com/itgalaxy/generate-robotstxt#usage
 */
export interface Policy {
	userAgent: string;
	disallow: string;
	allow?: string;
	crawlDelay?: number;
	cleanParam?: string;
}

/**
 * @see https://github.com/ai-robots-txt/ai.robots.txt/blob/main/robots.txt
 */
export const disallowedCrawlers = new Set(crawlers);

export const generatePolicies = (agents: Set<string>): Policy[] => {
	return [...agents].map((agent) => ({
		disallow: "/",
		userAgent: agent,
	}));
};

export const formatRobotsTxt = (policies: Policy[], siteUrl: string): string => {
	const groups = policies.map((policy) => `User-agent: ${policy.userAgent}${EOL}Disallow: ${policy.disallow}`);
	return `${groups.join(`${EOL}${EOL}`)}${EOL}Sitemap: ${siteUrl}/sitemap-index.xml${EOL}Host: ${siteUrl}${EOL}`;
};

export const buildRobotsTxt = (siteUrl: string): string =>
	formatRobotsTxt(generatePolicies(disallowedCrawlers), siteUrl);
