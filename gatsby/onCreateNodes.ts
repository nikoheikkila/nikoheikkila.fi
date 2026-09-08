import { createFilePath, createRemoteFileNode } from "gatsby-source-filesystem";
import type { CreateNodeArgs, Node } from "gatsby";
import config from "../gatsby-config";

interface MarkdownNode extends Node {
	frontmatter?: Queries.MarkdownRemarkFrontmatter | null;
}

interface OnCreateNodeArgs {
	node: Node;
	actions: Pick<CreateNodeArgs["actions"], "createNode" | "createNodeField">;
	getCache: CreateNodeArgs["getCache"];
	getNode: CreateNodeArgs["getNode"];
	createNodeId: CreateNodeArgs["createNodeId"];
}

interface RemoteFileArgs {
	url: string;
	parentNodeId: string;
	createNode: CreateNodeArgs["actions"]["createNode"];
	createNodeId: CreateNodeArgs["createNodeId"];
	getCache: CreateNodeArgs["getCache"];
}

interface FilePathArgs {
	node: Node;
	getNode: CreateNodeArgs["getNode"];
}

export interface NodeDependencies {
	downloadHero: (args: RemoteFileArgs) => Promise<{ id: string } | null>;
	resolveFilePath: (args: FilePathArgs) => string;
	defaultHero: unknown;
}

export const createOnCreateNodes =
	({ downloadHero, resolveFilePath, defaultHero }: NodeDependencies) =>
	async ({ node, actions: { createNode, createNodeField }, getCache, getNode, createNodeId }: OnCreateNodeArgs) => {
		if (!isMarkdownNode(node)) {
			return;
		}

		const { id, frontmatter } = node;
		const hero = String(frontmatter?.hero ?? defaultHero);

		const fileNode = await downloadHero({
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

		const value = resolveFilePath({ node, getNode });

		createNodeField({
			name: "slug",
			node,
			value,
		});
	};

const isMarkdownNode = (node: Node): node is MarkdownNode => node.internal.type === "MarkdownRemark";

const onCreateNodes = createOnCreateNodes({
	downloadHero: createRemoteFileNode,
	resolveFilePath: createFilePath,
	defaultHero: config.siteMetadata?.cover,
});

export default onCreateNodes;
