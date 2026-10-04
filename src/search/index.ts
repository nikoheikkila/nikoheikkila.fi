import { Index } from "flexsearch";

interface SearchNode {
	id: string;
	fields: { slug: string };
	excerpt: string;
	frontmatter: {
		title: string;
		date: string;
		author: string;
		excerpt: string | null;
	};
}

export interface SearchData {
	allMarkdownRemark: {
		nodes: SearchNode[];
	};
}

export const searchNormalizer = ({ data }: { data: SearchData }) =>
	data.allMarkdownRemark.nodes.map((node) => ({
		id: node.id,
		slug: node.fields.slug,
		title: node.frontmatter.title,
		excerpt: node.frontmatter.excerpt || node.excerpt,
		date: node.frontmatter.date,
	}));

export type SearchDoc = ReturnType<typeof searchNormalizer>[number];

export const createSearchIndex = (documents: SearchDoc[]) => {
	const index = new Index({ tokenize: "forward" });
	documents.forEach(({ title, excerpt }, id) => {
		index.add(id, `${title} ${excerpt}`);
	});
	return (query: string): SearchDoc[] => index.search(query).map((id) => documents[Number(id)]);
};
