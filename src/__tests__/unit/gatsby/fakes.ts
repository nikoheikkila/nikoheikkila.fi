import type { Actions, Node, NodeInput, Page, SliceInput } from "gatsby";

/**
 * Hand-written recording fakes for the Gatsby actions and reporter members the
 * build hooks consume. Each fake stores the payloads it received so tests can
 * assert on them without Vitest mocks or spies.
 */

export interface NodeFieldCall {
	node: Node;
	name?: string;
	value: unknown;
}

export class PageActions {
	public readonly pages: Page<unknown>[] = [];
	public readonly slices: SliceInput<unknown>[] = [];

	public readonly createPage = <TContext = Record<string, unknown>>(args: Page<TContext>): void => {
		this.pages.push(args);
	};

	public readonly createSlice = <TContext = Record<string, unknown>>(args: SliceInput<TContext>): void => {
		this.slices.push(args);
	};

	public pathsFor(component: string): string[] {
		return this.pages.filter((page) => page.component === component).map((page) => page.path);
	}
}

export class NodeActions {
	public readonly nodes: NodeInput[] = [];
	public readonly fields: NodeFieldCall[] = [];

	public readonly createNode = (node: NodeInput): void => {
		this.nodes.push(node);
	};

	public readonly createNodeField = (args: NodeFieldCall): void => {
		this.fields.push(args);
	};

	public fieldNames(): (string | undefined)[] {
		return this.fields.map((field) => field.name);
	}
}

export class Reporter {
	public readonly panics: unknown[] = [];

	public readonly panicOnBuild = (errorMeta: string | object): void => {
		this.panics.push(errorMeta);
	};
}

export class SchemaActions {
	public readonly types: unknown[] = [];

	public readonly createTypes: Actions["createTypes"] = (types): void => {
		this.types.push(types);
	};
}

export class WebpackActions {
	public readonly configs: object[] = [];

	public readonly setWebpackConfig = (config: object): void => {
		this.configs.push(config);
	};
}
