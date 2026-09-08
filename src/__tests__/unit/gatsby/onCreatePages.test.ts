import path from "node:path";
import type { SliceInput } from "gatsby";
import { describe, expect, test } from "vitest";
import onCreatePages, {
	createOnCreatePages,
	type PageQuery,
	type PageQueryResult,
} from "../../../../gatsby/onCreatePages";
import realSlices from "../../../../gatsby/slices";
import { PageActions, Reporter } from "./fakes";

const blogPost = path.resolve("./src/templates/post.tsx");
const blogIndex = path.resolve("./src/templates/list.tsx");

interface EdgeInit {
	slug?: string | null;
	type?: string | null;
	title?: string | null;
}

const edge = ({ slug = "/blog/post/", type = "post", title = "Post" }: EdgeInit = {}) => ({
	node: {
		fields: slug === null ? null : { slug },
		frontmatter: { title, type },
	},
});

const posts = (count: number) =>
	Array.from({ length: count }, (_, index) => edge({ slug: `/blog/post-${index}/`, title: `Post ${index}` }));

const resultOf = (edges: ReturnType<typeof edge>[]): PageQueryResult => ({
	data: { allMarkdownRemark: { edges } },
});

const queryStub = (result: PageQueryResult) => {
	const queries: string[] = [];
	const graphql: PageQuery = async (query) => {
		queries.push(query);
		return result;
	};

	return { graphql, queries };
};

const run = async (result: PageQueryResult, slices: SliceInput[] = realSlices) => {
	const actions = new PageActions();
	const reporter = new Reporter();
	const { graphql, queries } = queryStub(result);

	await createOnCreatePages(slices)({ graphql, reporter, actions });

	return { actions, reporter, queries };
};

describe("onCreatePages", () => {
	describe("query failures", () => {
		test("panics and creates nothing when the query reports errors", async () => {
			const { actions, reporter } = await run({ errors: [{ message: "boom" }], data: resultOf([]).data });

			expect(reporter.panics).toStrictEqual(["Error while running GraphQL query in createPages."]);
			expect(actions.pages).toHaveLength(0);
			expect(actions.slices).toHaveLength(0);
		});

		test("panics and creates nothing when the query returns no data", async () => {
			const { actions, reporter } = await run({});

			expect(reporter.panics).toStrictEqual(["createPages() query returned no data"]);
			expect(actions.pages).toHaveLength(0);
			expect(actions.slices).toHaveLength(0);
		});
	});

	describe("slices", () => {
		test("registers the real sidebar and footer slices before creating pages", async () => {
			const { actions, reporter } = await run(resultOf([]));

			expect(reporter.panics).toHaveLength(0);
			expect(actions.slices).toStrictEqual([
				{ id: "sidebar", context: {}, component: path.resolve("src", "components", "layout", "menu.tsx") },
				{ id: "footer", context: {}, component: path.resolve("src", "components", "layout", "footer.tsx") },
			]);
		});

		test("passes an explicit slice context through unchanged", async () => {
			const { actions } = await run(resultOf([]), [
				{ id: "banner", component: "banner.tsx", context: { theme: "dark" } },
			]);

			expect(actions.slices).toStrictEqual([
				{
					id: "banner",
					context: { theme: "dark" },
					component: path.resolve("src", "components", "layout", "banner.tsx"),
				},
			]);
		});
	});

	describe("post pages", () => {
		test("creates no pages when the connection has no edges at all", async () => {
			const { actions, reporter } = await run({ data: { allMarkdownRemark: {} } });

			expect(reporter.panics).toHaveLength(0);
			expect(actions.pages).toHaveLength(0);
			expect(actions.slices).toHaveLength(2);
		});

		test("creates a post page for each slug", async () => {
			const { actions } = await run(resultOf([edge({ slug: "/a/" }), edge({ slug: "/b/" })]));

			expect(actions.pathsFor(blogPost)).toStrictEqual(["/a/", "/b/"]);
		});

		test.each([
			["a null fields object", null],
			["an empty slug", ""],
		])("skips a node with %s", async (_description, slug) => {
			const { actions } = await run(resultOf([edge({ slug }), edge({ slug: "/kept/" })]));

			expect(actions.pathsFor(blogPost)).toStrictEqual(["/kept/"]);
		});

		test("gives the only post no neighbours", async () => {
			const { actions } = await run(resultOf([edge({ slug: "/only/", title: "Only" })]));

			expect(actions.pages[0].context).toStrictEqual({ slug: "/only/", previous: null, next: null });
		});

		test("links neighbours for the first, middle and last posts", async () => {
			const edges = [edge({ slug: "/first/" }), edge({ slug: "/middle/" }), edge({ slug: "/last/" })];
			const { actions } = await run(resultOf(edges));

			expect(actions.pages.slice(0, 3).map((page) => page.context)).toStrictEqual([
				{ slug: "/first/", previous: edges[1].node, next: null },
				{ slug: "/middle/", previous: edges[2].node, next: edges[0].node },
				{ slug: "/last/", previous: null, next: edges[1].node },
			]);
		});

		test("keeps skipped nodes as neighbours of the surrounding posts", async () => {
			const edges = [edge({ slug: "/first/" }), edge({ slug: "" }), edge({ slug: "/last/" })];
			const { actions } = await run(resultOf(edges));

			expect(actions.pathsFor(blogPost)).toStrictEqual(["/first/", "/last/"]);
			expect(actions.pages[0].context).toStrictEqual({ slug: "/first/", previous: edges[1].node, next: null });
		});

		test("creates detail pages for non-post content too", async () => {
			const { actions } = await run(resultOf([edge({ slug: "/about/", type: "page" })]));

			expect(actions.pathsFor(blogPost)).toStrictEqual(["/about/"]);
		});
	});

	describe("index pagination", () => {
		test.each([
			[0, []],
			[1, ["/"]],
			[30, ["/"]],
			[31, ["/", "/2"]],
			[60, ["/", "/2"]],
			[61, ["/", "/2", "/3"]],
		])("creates index routes for %i posts", async (count, expected) => {
			const { actions } = await run(resultOf(posts(count)));

			expect(actions.pathsFor(blogIndex)).toStrictEqual(expected);
		});

		test("passes limit, skip, page count and current page to each index page", async () => {
			const { actions } = await run(resultOf(posts(31)));

			expect(actions.pages.filter((page) => page.component === blogIndex).map((page) => page.context)).toStrictEqual([
				{ limit: 30, skip: 0, numberOfPages: 2, currentPage: 1 },
				{ limit: 30, skip: 30, numberOfPages: 2, currentPage: 2 },
			]);
		});

		test("counts only posts towards pagination", async () => {
			const mixed = [...posts(30), edge({ slug: "/about/", type: "page" }), edge({ slug: "/cv/", type: null })];
			const { actions } = await run(resultOf(mixed));

			expect(actions.pathsFor(blogIndex)).toStrictEqual(["/"]);
			expect(actions.pathsFor(blogPost)).toHaveLength(32);
		});

		test("paginates posts whose slugs were skipped for detail pages", async () => {
			const { actions } = await run(resultOf(Array.from({ length: 31 }, () => edge({ slug: "" }))));

			expect(actions.pathsFor(blogPost)).toHaveLength(0);
			expect(actions.pathsFor(blogIndex)).toStrictEqual(["/", "/2"]);
		});
	});

	describe("query", () => {
		test("requests slugs, titles and types from allMarkdownRemark once", async () => {
			const { queries } = await run(resultOf([]));

			expect(queries).toHaveLength(1);
			expect(queries[0]).toContain("allMarkdownRemark");
			expect(queries[0]).toContain("slug");
			expect(queries[0]).toContain("type");
		});
	});

	test("the default hook is composed with the real slices", async () => {
		const actions = new PageActions();
		const reporter = new Reporter();

		await onCreatePages({ graphql: queryStub(resultOf([])).graphql, reporter, actions });

		expect(actions.slices.map((slice) => slice.id)).toStrictEqual(realSlices.map((slice) => slice.id));
	});
});
