import onCreateSchemaCustomization from "./gatsby/onCreateSchemaCustomization";
import onCreatePages from "./gatsby/onCreatePages";
import onCreateNodes from "./gatsby/onCreateNodes";
import onCreateWebpackConfigHook from "./gatsby/onCreateWebpackConfig";

export const createSchemaCustomization = onCreateSchemaCustomization;

export const createPages = onCreatePages;

export const onCreateNode = onCreateNodes;

export const onCreateWebpackConfig = onCreateWebpackConfigHook;
