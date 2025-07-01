/**
 * @see https://github.com/itgalaxy/generate-robotstxt#usage
 */
interface Policy {
	userAgent: string;
	disallow: string;
	allow?: string;
	crawlDelay?: number;
	cleanParam?: string;
}

/**
 * @see https://github.com/ai-robots-txt/ai.robots.txt/blob/main/robots.txt
 */
export const disallowedCrawlers: string[] = [
	"AI2Bot",
	"Ai2Bot-Dolma",
	"aiHitBot",
	"Amazonbot",
	"Andibot",
	"anthropic-ai",
	"Applebot",
	"Applebot-Extended",
	"Awario",
	"bedrockbot",
	"Brightbot 1.0",
	"Bytespider",
	"CCBot",
	"ChatGPT-User",
	"Claude-SearchBot",
	"Claude-User",
	"Claude-Web",
	"ClaudeBot",
	"cohere-ai",
	"cohere-training-data-crawler",
	"Cotoyogi",
	"Crawlspace",
	"Datenbank Crawler",
	"Devin",
	"Diffbot",
	"DuckAssistBot",
	"Echobot Bot",
	"EchoboxBot",
	"FacebookBot",
	"facebookexternalhit",
	"Factset_spyderbot",
	"FirecrawlAgent",
	"FriendlyCrawler",
	"GPTBot",
	"iaskspider/2.0",
	"ICC-Crawler",
	"ImagesiftBot",
	"img2dataset",
	"ISSCyberRiskCrawler",
	"Kangaroo Bot",
	"meta-externalagent",
	"Meta-ExternalAgent",
	"meta-externalfetcher",
	"Meta-ExternalFetcher",
	"MistralAI-User",
	"MistralAI-User/1.0",
	"MyCentralAIScraperBot",
	"NovaAct",
	"OAI-SearchBot",
	"omgili",
	"omgilibot",
	"Operator",
	"PanguBot",
	"Panscient",
	"panscient.com",
	"Perplexity-User",
	"PerplexityBot",
	"PetalBot",
	"PhindBot",
	"Poseidon Research Crawler",
	"QualifiedBot",
	"QuillBot",
	"quillbot.com",
	"SBIntuitionsBot",
	"Scrapy",
	"SemrushBot",
	"SemrushBot-BA",
	"SemrushBot-CT",
	"SemrushBot-OCOB",
	"SemrushBot-SI",
	"SemrushBot-SWA",
	"Sidetrade indexer bot",
	"TikTokSpider",
	"Timpibot",
	"VelenPublicWebCrawler",
	"WARDBot",
	"Webzio-Extended",
	"wpbot",
	"YandexAdditional",
	"YandexAdditionalBot",
	"YouBot",
];

export const generatePolicies = (agents: string[]): Policy[] => {
	return agents.map((agent) => ({
		disallow: "/",
		userAgent: agent,
	}));
};
