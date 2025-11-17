import React from "react";
import * as styles from "./content.module.scss";

interface ExcerptProps {
	content: string;
}

/**
 * Lightweight component for rendering article excerpts without heavy dependencies
 * like react-markdown, syntax highlighting, and math rendering.
 */
const Excerpt: React.FC<ExcerptProps> = ({ content }) => (
	<article className={styles.content}>
		<p>{content}</p>
	</article>
);

export default Excerpt;
