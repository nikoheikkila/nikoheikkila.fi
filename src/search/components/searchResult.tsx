import React from "react";
import { BlogLink } from "../../components/elements";
import * as styles from "./search.module.scss";

export interface SearchResultData {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	date: string;
}

interface SearchResultProps {
	result: SearchResultData;
	isActive: boolean;
}

const SearchResult: React.FunctionComponent<SearchResultProps> = ({ result, isActive }) => (
	<article className={`${styles.resultItem} ${isActive ? styles.resultItemActive : ""}`}>
		<BlogLink className={styles.resultTitle} href={result.slug}>
			{result.title}
		</BlogLink>
		<p className={styles.resultExcerpt}>{result.excerpt}</p>
	</article>
);

export default SearchResult;
