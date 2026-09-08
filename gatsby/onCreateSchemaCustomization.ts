import type { CreateSchemaCustomizationArgs } from "gatsby";

interface SchemaArgs {
	actions: Pick<CreateSchemaCustomizationArgs["actions"], "createTypes">;
}

const onCreateSchemaCustomization = ({ actions: { createTypes } }: SchemaArgs) =>
	createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }

    type MarkdownRemark implements Node {
      hero: File @link(from: "fields.hero")
    }
  `);

export default onCreateSchemaCustomization;
