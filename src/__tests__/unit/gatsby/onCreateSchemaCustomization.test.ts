import { describe, expect, test } from "vitest";
import onCreateSchemaCustomization from "../../../../gatsby/onCreateSchemaCustomization";
import { SchemaActions } from "./fakes";

const run = () => {
	const actions = new SchemaActions();

	onCreateSchemaCustomization({ actions: { createTypes: actions.createTypes } });

	return actions;
};

describe("onCreateSchemaCustomization", () => {
	test("registers the custom types exactly once", () => {
		expect(run().types).toHaveLength(1);
	});

	test.each([
		["a non-inferred SitePage node with a required path", "type SitePage implements Node @dontInfer"],
		["the SitePage path field", "path: String!"],
		["a MarkdownRemark node", "type MarkdownRemark implements Node"],
		["the hero link to the File node created in onCreateNode", 'hero: File @link(from: "fields.hero")'],
	])("declares %s", (_description, expected) => {
		expect(String(run().types[0])).toContain(expected);
	});
});
