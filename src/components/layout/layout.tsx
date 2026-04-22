import type { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import type { ReactNode } from "react";
import "../../styles/main.scss";
import SearchBar from "../../search/components/searchBar";
import SearchModal from "../../search/components/searchModal";
import { useSearch } from "../../search/components/useSearch";
import Hero from "../hero";
import { ListContainer, SinglePostContainer } from "./container";
import { Slice } from "gatsby";
import { LayoutType } from "./types";

interface LayoutProps {
	type: LayoutType;
	title: string;
	cover?: IGatsbyImageData;
	children: Array<ReactNode>;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ type, title, cover, children }) => {
	const { query, setQuery, results, isModalOpen, submitSearch, closeModal } = useSearch();

	return (
		<>
			<a className="skipLink" href="#main-content">
				Skip to main content
			</a>
			<Slice alias="sidebar" />
			<SearchBar onSubmit={submitSearch} query={query} setQuery={setQuery} />
			{cover && (
				<header style={{ textAlign: "center" }}>
					<Hero alt={title} data={cover} />
				</header>
			)}
			{type === LayoutType.LIST && (
				<ListContainer>
					<section>{children}</section>
					<Slice alias="footer" />
				</ListContainer>
			)}
			{type === LayoutType.SINGLE && (
				<SinglePostContainer>
					<section>{children}</section>
					<Slice alias="footer" />
				</SinglePostContainer>
			)}
			<SearchModal isModalOpen={isModalOpen} onClose={closeModal} query={query} results={results} />
		</>
	);
};

export default Layout;
