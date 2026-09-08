import type { GatsbyConfig, PluginRef } from "gatsby";
import { describe, expect, test } from "vitest";
import config, { createConfig } from "../../../../gatsby-config";
import { searchNormalizer, searchQuery } from "../../../search";
import { disallowedCrawlers, generatePolicies } from "../../../utils/robots";
import { rssQuery, serialize } from "../../../utils/rss";
import { socialLinks } from "../../../utils/social";

const plugins = (candidate: GatsbyConfig): PluginRef[] => candidate.plugins ?? [];

const names = (candidate: GatsbyConfig): string[] =>
	plugins(candidate).map((plugin) => (typeof plugin === "string" ? plugin : (plugin.resolve ?? "")));

const optionsOf = (candidate: GatsbyConfig, resolve: string): Record<string, unknown> => {
	const plugin = plugins(candidate).find((entry) => typeof entry !== "string" && entry.resolve === resolve);

	if (plugin === undefined || typeof plugin === "string") {
		throw new Error(`plugin ${resolve} is not configured with options`);
	}

	return plugin.options ?? {};
};

describe("createConfig", () => {
	describe("service worker", () => {
		test("registers the offline plugin in production", () => {
			expect(names(createConfig("production"))).toContain("gatsby-plugin-offline");
		});

		test.each([
			["development", "development"],
			["test", "test"],
			["an unset environment", undefined],
		])("omits the offline plugin for %s", (_description, environment) => {
			expect(names(createConfig(environment))).not.toContain("gatsby-plugin-offline");
		});

		test("registers the offline plugin last so the rest of the pipeline is unchanged", () => {
			const production = names(createConfig("production"));

			expect(production.at(-1)).toBe("gatsby-plugin-offline");
			expect(production.slice(0, -1)).toStrictEqual(names(createConfig("development")));
		});
	});

	describe("content pipeline wiring", () => {
		test("indexes the local search engine with the shared query and normalizer", () => {
			expect(optionsOf(createConfig("production"), "gatsby-plugin-local-search")).toMatchObject({
				engine: "flexsearch",
				normalizer: searchNormalizer,
				query: searchQuery,
				ref: "id",
			});
		});

		test("builds the RSS feed from the shared query and serializer", () => {
			const { feeds } = optionsOf(createConfig("production"), "gatsby-plugin-feed");

			expect(feeds).toStrictEqual([
				expect.objectContaining({ match: "^/blog/", output: "/rss.xml", query: rssQuery, serialize }),
			]);
		});

		test("disallows every known AI crawler in robots.txt", () => {
			expect(optionsOf(createConfig("production"), "gatsby-plugin-robots-txt")).toStrictEqual({
				output: "/robots.txt",
				policy: generatePolicies(disallowedCrawlers),
			});
		});

		test("sources content from the content directory", () => {
			expect(optionsOf(createConfig("production"), "gatsby-source-filesystem")).toStrictEqual({
				name: "blog",
				path: "./content",
			});
		});
	});

	describe("site metadata", () => {
		test("publishes the shared social links", () => {
			expect(createConfig("production").siteMetadata?.social).toBe(socialLinks);
		});

		test("publishes the cover used as the default hero image", () => {
			expect(createConfig("production").siteMetadata?.cover).toBe("https://r2.nikoheikkila.fi/cover.png");
		});

		test("keeps trailing slashes so the Worker can canonicalise directory requests", () => {
			expect(createConfig("production").trailingSlash).toBe("always");
		});
	});
});

describe("the default config export", () => {
	test("is composed for the current environment", () => {
		expect(config).toStrictEqual(createConfig(process.env.NODE_ENV));
	});
});
