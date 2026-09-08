import type { GatsbyNode } from "gatsby";
import onCreateSchemaCustomization from "./gatsby/onCreateSchemaCustomization";
import onCreatePages from "./gatsby/onCreatePages";
import onCreateNodes from "./gatsby/onCreateNodes";
import onCreateWebpackConfigHook from "./gatsby/onCreateWebpackConfig";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = onCreateSchemaCustomization;

export const createPages: GatsbyNode["createPages"] = onCreatePages;

export const onCreateNode: GatsbyNode["onCreateNode"] = onCreateNodes;

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = onCreateWebpackConfigHook;
