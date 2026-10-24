import { EOL } from "node:os";
import { describe, expect, test } from "vitest";
import { buildRobotsTxt, formatRobotsTxt, generatePolicies } from "../../utils/robots";

describe("Robots", () => {
	test.each(["anthropic-ai", "ChatGPT-User", "Claude-SearchBot", "PerplexityBot"])(
		"disallows the %s crawler from the whole site",
		(agent) => {
			expect(buildRobotsTxt("https://nikoheikkila.fi")).toContain(`User-agent: ${agent}${EOL}Disallow: /${EOL}`);
		},
	);

	test("returns empty policy list when agent data missing", () => {
		const result = generatePolicies(new Set());

		expect(result).toHaveLength(0);
	});

	test("returns a policy list with single item for one agent", () => {
		const result = generatePolicies(new Set(["AIBot"]));

		expect(result).toStrictEqual([
			{
				disallow: "/",
				userAgent: "AIBot",
			},
		]);
	});

	test("returns a policy list with multiple items for two agents", () => {
		const result = generatePolicies(new Set(["AIBot", "ClaudeBot"]));

		expect(result).toStrictEqual([
			{
				disallow: "/",
				userAgent: "AIBot",
			},
			{
				disallow: "/",
				userAgent: "ClaudeBot",
			},
		]);
	});

	test("formats policies and sitemap into robots.txt content", () => {
		const policies = generatePolicies(new Set(["A", "B"]));

		const result = formatRobotsTxt(policies, "https://nikoheikkila.fi");

		expect(result).toBe(
			[
				"User-agent: A",
				"Disallow: /",
				"",
				"User-agent: B",
				"Disallow: /",
				"Sitemap: https://nikoheikkila.fi/sitemap-index.xml",
				"Host: https://nikoheikkila.fi",
				"",
			].join(EOL),
		);
	});
});
