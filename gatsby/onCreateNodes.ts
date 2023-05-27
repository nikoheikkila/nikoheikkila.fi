import { createFilePath, createRemoteFileNode } from "gatsby-source-filesystem";
import { CreateNodeArgs, Node } from "gatsby";

interface OnCreateNodeArgs extends CreateNodeArgs {
	node: Node & {
		frontmatter: Queries.MarkdownRemarkFrontmatter;
		hero: string | null;
		[key: string]: unknown;
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
	const { hero } = frontmatter;

	if (hero && isRemoteImage(hero)) {
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
	}

	const value = createFilePath({ node, getNode });

	createNodeField({
		name: "slug",
		node,
		value,
	});
};

const isMarkdownNode = (node: Node): boolean =>
	node.internal.type === "MarkdownRemark";
const isRemoteImage = (url: string): boolean => /^https?:\/\/+/.test(url);

export default onCreateNodes;
