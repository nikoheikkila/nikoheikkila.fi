import { describe, expect, test } from "vitest";
import { parseNulSeparated, selectMutationTargets, toMutateArgument } from "../../../scripts/stryker-diff/logic";

describe("Stryker diff", () => {
	describe(".parseNulSeparated()", () => {
		test.each<[string, string, string[]]>([
			["empty output", "", []],
			["a single record", "gatsby-node.ts\0", ["gatsby-node.ts"]],
			["records with whitespace and newlines", "src/a b.ts\0src/c\nd.ts\0", ["src/a b.ts", "src/c\nd.ts"]],
		])("given %s, returns the file names", (_description, output, expected) => {
			expect(parseNulSeparated(output)).toStrictEqual(expected);
		});
	});

	describe(".selectMutationTargets()", () => {
		const patterns = ["gatsby/**/*.ts", "gatsby-node.ts", "!gatsby/**/*.test.ts"];

		test.each<[string, string[], string[]]>([
			["no changed files", [], []],
			["a file matching an include glob", ["gatsby/onPostBuild.ts"], ["gatsby/onPostBuild.ts"]],
			["a file matching an exact include", ["gatsby-node.ts"], ["gatsby-node.ts"]],
			["a file outside every include", ["README.md", "src/components/hero.tsx"], []],
			["a file matching an exclusion", ["gatsby/onPostBuild.test.ts"], []],
			[
				"a mix of files",
				["gatsby/onCreatePages.ts", "content/post.md", "gatsby/slices.test.ts", "gatsby-node.ts"],
				["gatsby/onCreatePages.ts", "gatsby-node.ts"],
			],
		])("given %s, keeps only the files Stryker would mutate", (_description, changed, expected) => {
			expect(selectMutationTargets(changed, patterns)).toStrictEqual(expected);
		});
	});

	describe(".toMutateArgument()", () => {
		test.each<[string, string[], string]>([
			["one file", ["gatsby-node.ts"], "gatsby-node.ts"],
			["several files", ["gatsby-node.ts", "src/utils/rss.ts"], "gatsby-node.ts,src/utils/rss.ts"],
		])("given %s, joins them with commas", (_description, files, expected) => {
			expect(toMutateArgument(files)).toBe(expected);
		});

		test("refuses file names containing a comma, naming each of them", () => {
			expect(() => toMutateArgument(["gatsby-node.ts", "src/a,b.ts", "src/c,d.ts"])).toThrow(
				"Cannot pass file names containing a comma to --mutate: src/a,b.ts, src/c,d.ts",
			);
		});
	});
});
