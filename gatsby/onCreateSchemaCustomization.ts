import { CreateSchemaCustomizationArgs } from "gatsby";

const onCreateSchemaCustomization = ({
	actions: { createTypes },
}: CreateSchemaCustomizationArgs) =>
	createTypes(`
    type SitePage implements Node @dontInfer {
      path: String!
    }

    type MarkdownRemark implements Node {
      hero: File @link(from: "fields.hero")
    }
  `);

export default onCreateSchemaCustomization;
