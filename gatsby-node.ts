import onCreateSchemaCustomization from "./gatsby/onCreateSchemaCustomization";
import onCreatePages from "./gatsby/onCreatePages";
import onCreateNodes from "./gatsby/onCreateNodes";
import onPreBootstrap from "./gatsby/onPreBootstrap";
import onPostBuild from "./gatsby/onPostBuild";

export const createSchemaCustomization = onCreateSchemaCustomization;

export const createPages = onCreatePages;

export const onCreateNode = onCreateNodes;

export { onPreBootstrap, onPostBuild };
