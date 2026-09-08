import path from "node:path";
import type { CreatePagesArgs, SliceInput } from "gatsby";
import slices from "./slices";

interface PageNode {
	fields: { slug: string | null } | null;
	frontmatter: { title: string | null; type: string | null } | null;
}

interface PageEdge {
	node: PageNode;
}

export interface PageQueryResult {
	errors?: unknown;
	data?: {
		allMarkdownRemark: {
			edges?: PageEdge[];
		};
	};
}

/**
 * Query-specific view of Gatsby's generic `graphql()` helper. Gatsby's own
 * signature promises an arbitrary result type, which a fixed-result test stub
 * cannot honestly implement.
 */
export type PageQuery = (query: string) => Promise<PageQueryResult>;

export interface PageReporter {
	panicOnBuild: (message: string) => unknown;
}

export interface PagesArgs {
	graphql: PageQuery;
	reporter: PageReporter;
	actions: Pick<CreatePagesArgs["actions"], "createPage" | "createSlice">;
}

const postsPerPage = 30;

export const createOnCreatePages =
	(sliceDefinitions: SliceInput[]) =>
	async ({ graphql, reporter, actions: { createPage, createSlice } }: PagesArgs) => {
		const blogIndex = path.resolve("./src/templates/list.tsx");
		const blogPost = path.resolve("./src/templates/post.tsx");

		const { data, errors } = await graphql(`
		{
			allMarkdownRemark(
				sort: { frontmatter: { date: DESC } }
				limit: 1000
			) {
				edges {
					node {
						fields {
							slug
						}
						frontmatter {
							title
							type
						}
					}
				}
			}
		}
	`);

		if (errors) {
			reporter.panicOnBuild("Error while running GraphQL query in createPages.");
			return;
		}

		if (!data) {
			reporter.panicOnBuild("createPages() query returned no data");
			return;
		}

		for (const { id, component, context = {} } of sliceDefinitions) {
			createSlice({
				id,
				context,
				component: path.resolve("src", "components", "layout", component),
			});
		}

		/**
		 * Create blog posts by first querying all page objects from GraphQL
		 * and then looping them to the createPage() function.
		 */
		const { edges = [] } = data.allMarkdownRemark;

		edges.forEach((post, index) => {
			const slug = post.node.fields?.slug;

			if (!slug || slug.length === 0) {
				return;
			}

			const previous = index === edges.length - 1 ? null : edges[index + 1].node;
			const next = index === 0 ? null : edges[index - 1].node;

			createPage({
				path: slug,
				component: blogPost,
				context: { slug, previous, next },
			});
		});

		/**
		 * Create index page by filtering the actual blog posts from all page
		 * objects and creating an index-based array of those. Result will be
		 * a site structure where '/' is the first page and subsequent pages will
		 * be '/{2...m}' where m is the maximum number of posts.
		 */
		const posts = edges.filter((page) => page.node.frontmatter?.type === "post");
		const numberOfPages = Math.ceil(posts.length / postsPerPage);

		Array.from({ length: numberOfPages }).forEach((_, i) => {
			const currentPage = i + 1;

			createPage({
				path: i === 0 ? "/" : `/${currentPage}`,
				component: blogIndex,
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					numberOfPages,
					currentPage,
				},
			});
		});
	};

const onCreatePages = createOnCreatePages(slices);

export default onCreatePages;
