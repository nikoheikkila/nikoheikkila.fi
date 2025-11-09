import { describe, expect, test } from "vitest";
import { generatePolicies } from "../../utils/robots";

describe("Robots", () => {
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
});
