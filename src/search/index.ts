export const searchQuery = `{
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {type: {ne: "page"}}}
  ) {
    nodes {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 200)
      frontmatter {
        title
        date
        author
        excerpt
      }
    }
  }
}`;

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

interface SearchQueryResult {
	data: {
		allMarkdownRemark: {
			nodes: SearchNode[];
		};
	};
}

export const searchNormalizer = ({ data }: SearchQueryResult) =>
	data.allMarkdownRemark.nodes.map((node) => ({
		id: node.id,
		slug: node.fields.slug,
		title: node.frontmatter.title,
		excerpt: node.frontmatter.excerpt || node.excerpt,
		date: node.frontmatter.date,
	}));
