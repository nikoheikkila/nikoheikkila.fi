import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import {
	createOnCreateResolvers,
	type MarkdownSource,
	resolverDependencies,
} from "../../../../gatsby/onCreateResolvers";
import { ResolverActions } from "./fakes";

const fence = "```";
const filePath = "/site/content/blog/x.md";

const body = [
	"# A post",
	"",
	`${fence}mermaid`,
	"flowchart TD",
	"  accTitle: Login flow",
	"  accDescr: How a reader signs in",
	"  A[Start] --> B[End]",
	fence,
	"",
	"Some closing text.",
].join("\n");

const file = ["---", "title: A post", "---", body].join("\n");

const run = () => {
	const actions = new ResolverActions();
	const onCreateResolvers = createOnCreateResolvers({ readFile: () => file });

	onCreateResolvers({ createResolvers: actions.createResolvers });

	return actions;
};

describe("onCreateResolvers", () => {
	test("registers the renderedBody resolver on MarkdownRemark exactly once", () => {
		const actions = run();

		expect(actions.resolvers).toHaveLength(1);
		expect(actions.resolvers[0]?.MarkdownRemark.renderedBody.type).toBe("String");
	});

	test("resolves renderedBody with Mermaid diagrams replaced by inline SVG", () => {
		const source: MarkdownSource = { fileAbsolutePath: filePath, rawMarkdownBody: body };

		const rendered = run().resolvers[0]?.MarkdownRemark.renderedBody.resolve(source);

		expect(String(rendered)).toContain("<svg");
		expect(String(rendered)).not.toContain(`${fence}mermaid`);
	});

	test("reads the post file as UTF-8 text", () => {
		const reads: [string, BufferEncoding][] = [];
		const actions = new ResolverActions();
		createOnCreateResolvers({
			readFile: (path, encoding) => {
				reads.push([path, encoding]);
				return file;
			},
		})({ createResolvers: actions.createResolvers });

		actions.resolvers[0]?.MarkdownRemark.renderedBody.resolve({ fileAbsolutePath: filePath, rawMarkdownBody: body });

		expect(reads).toStrictEqual([[filePath, "utf8"]]);
	});

	test("the default hook reads posts from the file system", () => {
		expect(resolverDependencies).toStrictEqual({ readFile: readFileSync });
	});

	test("reports a syntax error at its line in the post file, counting the frontmatter lines", () => {
		const frontmatter = "---\ntitle: A post\n---\n";
		const rawMarkdownBody = [
			"",
			"# A post",
			"",
			`${fence}mermaid`,
			"flowchart TD",
			"  accTitle: Login flow",
			"  accDescr: How a reader signs in",
			"  A -->",
			fence,
			"",
		].join("\n");
		const postFile = frontmatter + rawMarkdownBody;
		const source: MarkdownSource = { fileAbsolutePath: filePath, rawMarkdownBody };
		const actions = new ResolverActions();
		createOnCreateResolvers({ readFile: () => postFile })({ createResolvers: actions.createResolvers });
		const closingFenceLine = postFile.split("\n").lastIndexOf(fence) + 1;

		const resolve = () => actions.resolvers[0]?.MarkdownRemark.renderedBody.resolve(source);

		expect(resolve).toThrow(`${filePath}:${closingFenceLine}:`);
	});

	test("reports a syntax error at its file line when the post has no frontmatter", () => {
		const postFile = [
			"# A post",
			"",
			`${fence}mermaid`,
			"flowchart TD",
			"  accTitle: Login flow",
			"  accDescr: How a reader signs in",
			"  A -->",
			fence,
			"",
		].join("\n");
		const source: MarkdownSource = { fileAbsolutePath: filePath, rawMarkdownBody: postFile };
		const actions = new ResolverActions();
		createOnCreateResolvers({ readFile: () => postFile })({ createResolvers: actions.createResolvers });
		const closingFenceLine = postFile.split("\n").lastIndexOf(fence) + 1;

		const resolve = () => actions.resolvers[0]?.MarkdownRemark.renderedBody.resolve(source);

		expect(resolve).toThrow(`${filePath}:${closingFenceLine}:`);
	});

	test("reports a syntax error at its file line when the post uses CRLF line endings", () => {
		const frontmatter = "---\r\ntitle: A post\r\n---\r\n";
		const rawMarkdownBody = [
			"",
			"# A post",
			"",
			`${fence}mermaid`,
			"flowchart TD",
			"  accTitle: Login flow",
			"  accDescr: How a reader signs in",
			"  A -->",
			fence,
			"",
		].join("\r\n");
		const postFile = frontmatter + rawMarkdownBody;
		const source: MarkdownSource = { fileAbsolutePath: filePath, rawMarkdownBody };
		const actions = new ResolverActions();
		createOnCreateResolvers({ readFile: () => postFile })({ createResolvers: actions.createResolvers });
		const closingFenceLine =
			postFile
				.split("\n")
				.map((line) => line.replace(/\r$/, ""))
				.lastIndexOf(fence) + 1;

		const resolve = () => actions.resolvers[0]?.MarkdownRemark.renderedBody.resolve(source);

		expect(resolve).toThrow(`${filePath}:${closingFenceLine}:`);
	});
});
