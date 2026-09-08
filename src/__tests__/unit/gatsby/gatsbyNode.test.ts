import { describe, expect, test } from "vitest";
import * as gatsbyNode from "../../../../gatsby-node";
import onCreateNodes from "../../../../gatsby/onCreateNodes";
import onCreatePages from "../../../../gatsby/onCreatePages";
import onCreateSchemaCustomization from "../../../../gatsby/onCreateSchemaCustomization";
import onCreateWebpackConfig from "../../../../gatsby/onCreateWebpackConfig";

describe("gatsby-node", () => {
	test.each([
		["createSchemaCustomization", gatsbyNode.createSchemaCustomization, onCreateSchemaCustomization],
		["createPages", gatsbyNode.createPages, onCreatePages],
		["onCreateNode", gatsbyNode.onCreateNode, onCreateNodes],
		["onCreateWebpackConfig", gatsbyNode.onCreateWebpackConfig, onCreateWebpackConfig],
	])("exports %s from its hook module", (_name, exported, hook) => {
		expect(exported).toBe(hook);
	});
});
