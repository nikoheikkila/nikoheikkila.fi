import type { CreateNodeArgs, Node } from "gatsby";
import { describe, expect, test } from "vitest";
import { createOnCreateNodes, type NodeDependencies } from "../../../../gatsby/onCreateNodes";
import { NodeActions } from "./fakes";

type RemoteFileArgs = Parameters<NodeDependencies["downloadHero"]>[0];
type FilePathArgs = Parameters<NodeDependencies["resolveFilePath"]>[0];

const defaultHero = "https://example.invalid/cover.png";

const getCache: CreateNodeArgs["getCache"] = () => {
	throw new Error("getCache is only forwarded, never called by the hook");
};

const getNode: CreateNodeArgs["getNode"] = () => {
	throw new Error("getNode is only forwarded, never called by the hook");
};

const createNodeId: CreateNodeArgs["createNodeId"] = (input) => `id-${input}`;

const frontmatterOf = (
	overrides: Partial<Queries.MarkdownRemarkFrontmatter> = {},
): Queries.MarkdownRemarkFrontmatter => ({
	author: null,
	date: null,
	excerpt: null,
	hero: null,
	lang: null,
	title: null,
	type: null,
	...overrides,
});

const markdownNode = (frontmatter: Partial<Queries.MarkdownRemarkFrontmatter> = {}) =>
	({
		id: "node-1",
		frontmatter: frontmatterOf(frontmatter),
		internal: { type: "MarkdownRemark", contentDigest: "digest", owner: "test" },
		parent: null,
		children: [],
	}) satisfies Node & { frontmatter: Queries.MarkdownRemarkFrontmatter };

const otherNode = () => ({ ...markdownNode(), internal: { ...markdownNode().internal, type: "File" } });

interface HeroStubInit {
	file?: { id: string } | null;
	error?: Error;
}

const heroStub = ({ file = { id: "file-1" }, error }: HeroStubInit = {}) => {
	const calls: RemoteFileArgs[] = [];
	const downloadHero: NodeDependencies["downloadHero"] = async (args) => {
		calls.push(args);

		if (error) {
			throw error;
		}

		return file;
	};

	return { downloadHero, calls };
};

const filePathStub = (value = "/blog/post/") => {
	const calls: FilePathArgs[] = [];
	const resolveFilePath: NodeDependencies["resolveFilePath"] = (args) => {
		calls.push(args);
		return value;
	};

	return { resolveFilePath, calls };
};

const run = async (node: Node, hero = heroStub(), file = filePathStub()) => {
	const actions = new NodeActions();

	const invoke = createOnCreateNodes({
		downloadHero: hero.downloadHero,
		resolveFilePath: file.resolveFilePath,
		defaultHero,
	})({
		node,
		actions: { createNode: actions.createNode, createNodeField: actions.createNodeField },
		getCache,
		getNode,
		createNodeId,
	});

	return { actions, hero, file, invoke };
};

describe("onCreateNodes", () => {
	test("ignores nodes that are not Markdown", async () => {
		const hero = heroStub();
		const file = filePathStub();
		const { actions, invoke } = await run(otherNode(), hero, file);

		await invoke;

		expect(hero.calls).toHaveLength(0);
		expect(file.calls).toHaveLength(0);
		expect(actions.fields).toHaveLength(0);
	});

	describe("hero image", () => {
		test("downloads the frontmatter hero when one is set", async () => {
			const { hero, invoke } = await run(markdownNode({ hero: "https://example.invalid/custom.png" }));

			await invoke;

			expect(hero.calls[0].url).toBe("https://example.invalid/custom.png");
		});

		test.each([
			["an absent hero", {}],
			["a null hero", { hero: null }],
		])("falls back to the default cover for %s", async (_description, frontmatter) => {
			const { hero, invoke } = await run(markdownNode(frontmatter));

			await invoke;

			expect(hero.calls[0].url).toBe(defaultHero);
		});

		test("falls back to the default cover when the node has no frontmatter at all", async () => {
			const node: Node = {
				id: "node-2",
				internal: { type: "MarkdownRemark", contentDigest: "digest", owner: "test" },
				parent: null,
				children: [],
			};
			const { hero, invoke } = await run(node);

			await invoke;

			expect(hero.calls[0].url).toBe(defaultHero);
		});

		test("forwards the parent node id and the Gatsby callbacks", async () => {
			const { actions, hero, invoke } = await run(markdownNode());

			await invoke;

			expect(hero.calls).toHaveLength(1);
			expect(hero.calls[0].parentNodeId).toBe("node-1");
			expect(hero.calls[0].createNode).toBe(actions.createNode);
			expect(hero.calls[0].createNodeId).toBe(createNodeId);
			expect(hero.calls[0].getCache).toBe(getCache);
		});

		test("creates a hero field pointing at the downloaded file", async () => {
			const node = markdownNode();
			const { actions, invoke } = await run(node, heroStub({ file: { id: "downloaded" } }));

			await invoke;

			expect(actions.fields[0]).toStrictEqual({ node, name: "hero", value: "downloaded" });
		});

		test("skips only the hero field when nothing was downloaded", async () => {
			const { actions, invoke } = await run(markdownNode(), heroStub({ file: null }));

			await invoke;

			expect(actions.fieldNames()).toStrictEqual(["slug"]);
		});
	});

	describe("slug", () => {
		test("creates the slug field from the resolved file path", async () => {
			const node = markdownNode();
			const { actions, invoke } = await run(node, heroStub(), filePathStub("/blog/hello/"));

			await invoke;

			expect(actions.fields.at(-1)).toStrictEqual({ node, name: "slug", value: "/blog/hello/" });
		});

		test("passes the node and getNode to the path resolver", async () => {
			const node = markdownNode();
			const { file, invoke } = await run(node);

			await invoke;

			expect(file.calls).toStrictEqual([{ node, getNode }]);
		});

		test("is still created when the hero download yields nothing", async () => {
			const { actions, file, invoke } = await run(markdownNode(), heroStub({ file: null }));

			await invoke;

			expect(file.calls).toHaveLength(1);
			expect(actions.fields).toHaveLength(1);
		});
	});

	describe("download failures", () => {
		test("propagates the error without creating any field", async () => {
			const { actions, file, invoke } = await run(markdownNode(), heroStub({ error: new Error("network down") }));

			await expect(invoke).rejects.toThrow("network down");
			expect(actions.fields).toHaveLength(0);
			expect(file.calls).toHaveLength(0);
		});
	});

	test("never creates nodes itself", async () => {
		const { actions, invoke } = await run(markdownNode());

		await invoke;

		expect(actions.nodes).toHaveLength(0);
	});
});
