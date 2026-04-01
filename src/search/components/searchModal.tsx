import { navigate } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import SearchResult, { type SearchResultData } from "./searchResult";
import * as styles from "./search.module.scss";

interface SearchModalProps {
	isModalOpen: boolean;
	results: SearchResultData[];
	query: string;
	onClose: () => void;
}

type ModalHeaderProps = {
	query: string;
	resultCount: number;
	onClose: () => void;
};

const ModalHeader: React.FC<ModalHeaderProps> = ({ query, resultCount, onClose }) => (
	<div className={styles.modalHeader}>
		<span>
			{resultCount} result{resultCount !== 1 && "s"} for &ldquo;{query}&rdquo;
		</span>
		<button aria-label="Close search results" className={styles.closeButton} onClick={onClose} type="button">
			&times;
		</button>
	</div>
);

type ResultListProps = {
	results: SearchResultData[];
	query: string;
	activeIndex: number;
	activeRef: React.Ref<HTMLDivElement>;
};

const ResultList: React.FC<ResultListProps> = ({ results, query, activeIndex, activeRef }) =>
	results.length > 0 ? (
		<div>
			{results.map((result, index) => (
				<div key={result.id} ref={index === activeIndex ? activeRef : undefined}>
					<SearchResult isActive={index === activeIndex} result={result} />
				</div>
			))}
		</div>
	) : (
		<p className={styles.emptyState}>No results found for &ldquo;{query}&rdquo;</p>
	);

const SearchModal: React.FunctionComponent<SearchModalProps> = ({ isModalOpen, results, query, onClose }) => {
	const [activeIndex, setActiveIndex] = useState(-1);
	const activeRef = useRef<HTMLDivElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: reset active index when results change
	useEffect(() => {
		setActiveIndex(-1);
	}, [results]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: scroll active result into view when index changes
	useEffect(() => {
		activeRef.current?.scrollIntoView({ block: "nearest" });
	}, [activeIndex]);

	useEffect(() => {
		if (!isModalOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "Escape":
					onClose();
					break;
				case "ArrowDown":
					e.preventDefault();
					setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
					break;
				case "ArrowUp":
					e.preventDefault();
					setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
					break;
				case "Enter":
					if (activeIndex >= 0 && activeIndex < results.length) {
						e.preventDefault();
						navigate(results[activeIndex].slug);
					}
					break;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isModalOpen, onClose, results, activeIndex]);

	if (!isModalOpen) return null;

	return (
		<>
			<button
				aria-label="Dismiss search results"
				className={styles.backdrop}
				onClick={onClose}
				tabIndex={-1}
				type="button"
			/>
			<div aria-label="Search results" aria-modal="true" className={styles.modal} role="dialog">
				<ModalHeader onClose={onClose} query={query} resultCount={results.length} />
				<ResultList activeIndex={activeIndex} activeRef={activeRef} query={query} results={results} />
			</div>
		</>
	);
};

export default SearchModal;
