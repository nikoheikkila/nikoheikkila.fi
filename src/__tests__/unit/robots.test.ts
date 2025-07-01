import { describe, expect, test } from "vitest";
import { generatePolicies } from "../../utils/robots";

describe("Robots", () => {
	test("returns empty policy list when agent data missing", () => {
		const result = generatePolicies([]);

		expect(result).toHaveLength(0);
	});

	test("returns a policy list with single item for one agent", () => {
		const result = generatePolicies(["AIBot"]);

		expect(result).toStrictEqual([
			{
				userAgent: "AIBot",
				disallow: "/",
			},
		]);
	});

	test("returns a policy list with multiple items for two agents", () => {
		const result = generatePolicies(["AIBot", "ClaudeBot"]);

		expect(result).toStrictEqual([
			{
				userAgent: "AIBot",
				disallow: "/",
			},
			{
				userAgent: "ClaudeBot",
				disallow: "/",
			},
		]);
	});
});
