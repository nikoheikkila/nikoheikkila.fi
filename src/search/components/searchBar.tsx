import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useIcons } from "../../components/hooks/useIcons";
import * as styles from "./search.module.scss";

interface SearchBarProps {
	query: string;
	setQuery: (query: string) => void;
	onSubmit: () => void;
}

const SearchBar: React.FunctionComponent<SearchBarProps> = ({ query, setQuery, onSubmit }) => {
	useIcons([faMagnifyingGlass]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit();
	};

	return (
		<search>
			<form className={styles.searchForm} onSubmit={handleSubmit}>
				<FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
				<input
					aria-label="Search posts"
					className={styles.searchInput}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search..."
					type="search"
					value={query}
				/>
			</form>
		</search>
	);
};

export default SearchBar;
