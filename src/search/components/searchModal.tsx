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
		// biome-ignore lint/a11y/noStaticElementInteractions: backdrop dismiss pattern - ESC key handled globally via useEffect
		// biome-ignore lint/a11y/useKeyWithClickEvents: ESC key handler is registered globally via useEffect
		<div className={styles.backdrop} data-testid="search-backdrop" onClick={onClose}>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation prevents backdrop click from closing modal */}
			<div
				aria-label="Search results"
				aria-modal="true"
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
			>
				<div className={styles.modalHeader}>
					<span>
						{results.length} result{results.length !== 1 && "s"} for &ldquo;{query}&rdquo;
					</span>
					<button aria-label="Close search results" className={styles.closeButton} onClick={onClose} type="button">
						&times;
					</button>
				</div>
				{results.length > 0 ? (
					results.map((result, index) => (
						<div key={result.id} ref={index === activeIndex ? activeRef : undefined}>
							<SearchResult isActive={index === activeIndex} result={result} />
						</div>
					))
				) : (
					<p className={styles.emptyState}>No results found for &ldquo;{query}&rdquo;</p>
				)}
			</div>
		</div>
	);
};

export default SearchModal;
