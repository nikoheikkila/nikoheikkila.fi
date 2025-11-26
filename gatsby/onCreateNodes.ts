import { createFilePath, createRemoteFileNode } from "gatsby-source-filesystem";
import type { CreateNodeArgs, Node } from "gatsby";
import config from "../gatsby-config";

interface OnCreateNodeArgs extends CreateNodeArgs {
	node: Node & {
		frontmatter: Queries.MarkdownRemarkFrontmatter;
	};
}

const onCreateNodes = async ({
	node,
	actions: { createNode, createNodeField },
	getCache,
	getNode,
	createNodeId,
}: OnCreateNodeArgs) => {
	if (!isMarkdownNode(node)) {
		return;
	}

	const { id, frontmatter } = node;
	const hero = String(frontmatter.hero ?? config.siteMetadata?.cover);

	const fileNode = await createRemoteFileNode({
		url: hero,
		parentNodeId: id,
		createNode,
		createNodeId,
		getCache,
	});

	if (fileNode) {
		createNodeField({
			node,
			name: "hero",
			value: fileNode.id,
		});
	}

	const value = createFilePath({ node, getNode });

	createNodeField({
		name: "slug",
		node,
		value,
	});
};

const isMarkdownNode = (node: Node): boolean => node.internal.type === "MarkdownRemark";

export default onCreateNodes;
