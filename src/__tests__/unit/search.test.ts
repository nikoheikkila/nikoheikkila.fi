import { describe, expect, test } from "vitest";
import { createSearchIndex, searchNormalizer } from "../../search";

interface NodeInit {
	id?: string;
	slug?: string;
	excerpt?: string;
	title?: string;
	date?: string;
	author?: string;
	frontmatterExcerpt?: string | null;
}

const node = ({
	id = "1",
	slug = "/blog/post/",
	excerpt = "Pruned excerpt",
	title = "Post",
	date = "2024-01-01",
	author = "Niko Heikkilä",
	frontmatterExcerpt = null,
}: NodeInit = {}) => ({
	id,
	fields: { slug },
	excerpt,
	frontmatter: { title, date, author, excerpt: frontmatterExcerpt },
});

const normalize = (nodes: ReturnType<typeof node>[]) => searchNormalizer({ data: { allMarkdownRemark: { nodes } } });

describe("searchNormalizer", () => {
	test("returns no documents for an empty result", () => {
		expect(normalize([])).toStrictEqual([]);
	});

	test("maps a node to the indexed document shape", () => {
		expect(normalize([node()])).toStrictEqual([
			{ id: "1", slug: "/blog/post/", title: "Post", excerpt: "Pruned excerpt", date: "2024-01-01" },
		]);
	});

	test("does not leak the author into the index", () => {
		const [document] = normalize([node({ author: "Someone Else" })]);

		expect(document).not.toHaveProperty("author");
	});

	test("preserves the order and identity of multiple nodes", () => {
		const documents = normalize([
			node({ id: "1", slug: "/a/", title: "A", date: "2024-03-01" }),
			node({ id: "2", slug: "/b/", title: "B", date: "2024-02-01" }),
			node({ id: "3", slug: "/c/", title: "C", date: "2024-01-01" }),
		]);

		expect(documents.map((document) => [document.id, document.slug, document.title, document.date])).toStrictEqual([
			["1", "/a/", "A", "2024-03-01"],
			["2", "/b/", "B", "2024-02-01"],
			["3", "/c/", "C", "2024-01-01"],
		]);
	});

	describe("excerpt", () => {
		test("prefers a hand-written frontmatter excerpt", () => {
			const [document] = normalize([node({ frontmatterExcerpt: "Hand written" })]);

			expect(document.excerpt).toBe("Hand written");
		});

		test.each([
			["null", null],
			["empty", ""],
		])("falls back to the pruned excerpt when the frontmatter excerpt is %s", (_description, frontmatterExcerpt) => {
			const [document] = normalize([node({ frontmatterExcerpt, excerpt: "Pruned" })]);

			expect(document.excerpt).toBe("Pruned");
		});
	});

	test("does not mutate the queried nodes", () => {
		const nodes = [node()];
		const snapshot = structuredClone(nodes);

		normalize(nodes);

		expect(nodes).toStrictEqual(snapshot);
	});
});

describe("createSearchIndex", () => {
	test("finds a document by a title prefix", () => {
		const [react, vitest] = normalize([
			node({ id: "1", title: "Understanding React", excerpt: "Components" }),
			node({ id: "2", title: "Testing with Vitest", excerpt: "Assertions" }),
		]);
		const search = createSearchIndex([react, vitest]);

		const results = search("Underst");

		expect(results).toStrictEqual([react]);
	});

	test("finds a document by a term present only in the excerpt", () => {
		const [react, vitest] = normalize([
			node({ id: "1", title: "Understanding React", excerpt: "Components" }),
			node({ id: "2", title: "Testing with Vitest", excerpt: "Assertions" }),
		]);
		const search = createSearchIndex([react, vitest]);

		const results = search("Assertions");

		expect(results).toStrictEqual([vitest]);
	});

	test("returns no results when nothing matches", () => {
		const search = createSearchIndex(normalize([node({ title: "Understanding React", excerpt: "Components" })]));

		expect(search("Kubernetes")).toStrictEqual([]);
	});

	test.each([
		["empty", ""],
		["whitespace-only", "   "],
	])("returns no results for an %s query", (_description, query) => {
		const search = createSearchIndex(normalize([node({ title: "Understanding React", excerpt: "Components" })]));

		expect(search(query)).toStrictEqual([]);
	});
});
