import { readFileSync } from "node:fs";
import type { CreateResolversArgs } from "gatsby";
import { renderMermaid } from "../src/mermaid";

export interface MarkdownSource {
	fileAbsolutePath: string;
	rawMarkdownBody: string;
}

export interface MarkdownResolvers {
	MarkdownRemark: {
		renderedBody: {
			type: string;
			resolve: (source: MarkdownSource) => string;
		};
	};
}

export interface ResolverDependencies {
	readFile: (filePath: string, encoding: BufferEncoding) => string;
}

const linesBeforeBody = (content: string, body: string): number =>
	content.slice(0, content.length - body.length).split("\n").length - 1;

export const createOnCreateResolvers =
	(dependencies: ResolverDependencies) =>
	({ createResolvers }: Pick<CreateResolversArgs, "createResolvers">): void => {
		createResolvers({
			MarkdownRemark: {
				renderedBody: {
					type: "String",
					resolve: (source: MarkdownSource) => {
						const content = dependencies.readFile(source.fileAbsolutePath, "utf8");
						const lineOffset = linesBeforeBody(content, source.rawMarkdownBody);
						return renderMermaid(source.rawMarkdownBody, { filePath: source.fileAbsolutePath, lineOffset });
					},
				},
			},
		});
	};

export const resolverDependencies: ResolverDependencies = { readFile: readFileSync };

const onCreateResolvers = createOnCreateResolvers(resolverDependencies);

export default onCreateResolvers;
