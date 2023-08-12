import { CreatePagesArgs } from "gatsby";
import path from "path";
import slices from "./slices";

interface CreatePagesData {
	allMarkdownRemark: Queries.MarkdownRemarkConnection;
}

const postsPerPage = 30;

const onCreatePages = async ({
	graphql,
	actions: { createPage, createSlice },
}: CreatePagesArgs) => {
	const blogIndex = path.resolve("./src/templates/list.tsx");
	const blogPost = path.resolve("./src/templates/post.tsx");

	const { data, errors } = await graphql<
		CreatePagesData,
		Record<string, unknown>
	>(`
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
		throw new Error(errors);
	}

	if (!data) {
		throw new Error("createPages() query returned no data");
	}

	/**
	 * Create reusable slices for common site components
	 */
	slices.forEach(({ id, component, context = {} }) => {
		createSlice({
			id,
			context,
			component: path.resolve("src", "components", "layout", component),
		});
	});

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

		const previous =
			index === edges.length - 1 ? null : edges[index + 1].node;
		const next = index === 0 ? null : edges[index - 1].node;

		createPage({
			path: slug,
			component: blogPost,
			defer: hasDSG() ? index > postsPerPage : false,
			context: { slug, previous, next },
		});
	});

	/**
	 * Create index page by filtering the actual blog posts from all page
	 * objects and creating an index-based array of those. Result will be
	 * a site structure where '/' is the first page and subsequent pages will
	 * be '/{2..m}' where m is the maximum number of posts.
	 */
	const posts = edges.filter(
		(page) => page.node.frontmatter?.type === "post",
	);
	const numberOfPages = Math.ceil(posts.length / postsPerPage);

	Array.from({ length: numberOfPages }).forEach((_, i) => {
		const currentPage = i + 1;

		createPage({
			path: i === 0 ? "/" : `/${currentPage}`,
			component: blogIndex,
			defer: hasDSG() ? currentPage > 1 : false,
			context: {
				limit: postsPerPage,
				skip: i * postsPerPage,
				numberOfPages,
				currentPage,
			},
		});
	});
};

const hasDSG = (): boolean => {
	return process.env.GATSBY_ENABLE_DSG === "true";
};

export default onCreatePages;
