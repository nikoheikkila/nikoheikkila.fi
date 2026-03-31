import { graphql, useStaticQuery } from "gatsby";
import { useCallback, useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import type { SearchResultData } from "./searchResult";

interface SearchState {
	query: string;
	isModalOpen: boolean;
}

export const useSearch = () => {
	const { localSearchPosts } = useStaticQuery<{
		localSearchPosts: { index: string; store: Record<string, SearchResultData> };
	}>(graphql`
		query SearchIndex {
			localSearchPosts {
				index
				store
			}
		}
	`);

	const [state, setState] = useState<SearchState>({
		query: "",
		isModalOpen: false,
	});

	const results = useFlexSearch(state.query, localSearchPosts.index, localSearchPosts.store) as SearchResultData[];

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
