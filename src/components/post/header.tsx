import React, { type FunctionComponent } from "react";
import { formatReadingTime } from "../../utils/helpers";
import * as styles from "./header.module.scss";

interface HeaderProps {
	readonly title: string;
	readonly excerpt: string;
	readonly author: string;
	readonly datePublished: string;
	readonly timeToRead: number;
}

const PostHeader: FunctionComponent<HeaderProps> = ({ title, excerpt, author, datePublished, timeToRead }) => (
	<header className={styles.header} data-testid="post-header">
		<h1 className={styles.title}>{title}</h1>

		{excerpt && (
			<section data-testid="post-excerpt">
				<p className={styles.excerpt}>{excerpt}</p>
			</section>
		)}

		<section>
			<p className={styles.meta}>
				{author && (
					<span className={styles.author} data-testid="post-author">
						By {author} /{" "}
					</span>
				)}
				{datePublished && <span data-testid="post-date">{datePublished} / </span>}
				<span data-testid="post-ttr">{formatReadingTime(timeToRead)}</span>
			</p>
		</section>
	</header>
);

export default PostHeader;
