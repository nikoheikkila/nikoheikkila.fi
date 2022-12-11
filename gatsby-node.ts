import onCreateSchemaCustomization from "./gatsby/onCreateSchemaCustomization";
import onCreatePages from "./gatsby/onCreatePages";
import onCreateNodes from "./gatsby/onCreateNodes";

export const createSchemaCustomization = onCreateSchemaCustomization;

export const createPages = onCreatePages;

export const onCreateNode = onCreateNodes;
