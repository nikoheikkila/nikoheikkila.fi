import { graphql, useStaticQuery } from "gatsby";
import { useCallback, useMemo, useState } from "react";
import { createSearchIndex, type SearchData, searchNormalizer } from "..";
import type { SearchResultData } from "./searchResult";

interface SearchState {
	query: string;
	isModalOpen: boolean;
}

export const useSearch = () => {
	const data = useStaticQuery<SearchData>(graphql`
		query SearchIndex {
			allMarkdownRemark(sort: { frontmatter: { date: DESC } }, filter: { frontmatter: { type: { ne: "page" } } }) {
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
		}
	`);

	const search = useMemo(() => createSearchIndex(searchNormalizer({ data })), [data]);

	const [state, setState] = useState<SearchState>({
		query: "",
		isModalOpen: false,
	});

	const results: SearchResultData[] = useMemo(() => search(state.query), [search, state.query]);

	const setQuery = useCallback((query: string) => {
		setState((prev) => ({ ...prev, query }));
	}, []);

	const submitSearch = useCallback(() => {
		setState((prev) => (prev.query.trim() ? { ...prev, isModalOpen: true } : prev));
	}, []);

	const closeModal = useCallback(() => {
		setState((prev) => ({ ...prev, isModalOpen: false }));
	}, []);

	return {
		query: state.query,
		setQuery,
		results,
		isModalOpen: state.isModalOpen,
		submitSearch,
		closeModal,
	};
};
