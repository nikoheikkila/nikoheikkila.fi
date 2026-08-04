import path from "node:path";
import type { CreatePagesArgs } from "gatsby";
import slices from "./slices";
import { documentUriFor, publicationUriFor, type StandardSiteManifest } from "../src/utils/standardSite";

interface CreatePagesData {
	allMarkdownRemark: Queries.MarkdownRemarkConnection;
}

const postsPerPage = 30;
const emptyManifest: StandardSiteManifest = { did: "", publication: "", documents: {} };

const onCreatePages = async ({ graphql, reporter, cache, actions: { createPage, createSlice } }: CreatePagesArgs) => {
	const blogIndex = path.resolve("./src/templates/list.tsx");
	const blogPost = path.resolve("./src/templates/post.tsx");
	const manifest = ((await cache.get("standardSite")) as StandardSiteManifest | undefined) ?? emptyManifest;
	const publicationUri = publicationUriFor(manifest);

	const { data, errors } = await graphql<CreatePagesData, Record<string, unknown>>(`
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
		return reporter.panicOnBuild("Error while running GraphQL query in createPages.");
	}

	if (!data) {
		return reporter.panicOnBuild("createPages() query returned no data");
	}

	for (const { id, component, context = {} } of slices) {
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
		const documentUri = documentUriFor(manifest, slug);

		if (post.node.frontmatter?.type === "post" && publicationUri && !documentUri) {
			reporter.warn(`standard.site: no document record found for post at ${slug}`);
		}

		createPage({
			path: slug,
			component: blogPost,
			context: { slug, previous, next, standardSite: { publicationUri, documentUri } },
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
				standardSite: { publicationUri },
			},
		});
	});
};

export default onCreatePages;
