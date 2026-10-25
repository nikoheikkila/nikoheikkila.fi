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
	<header className={styles.header}>
		<h1 className={styles.title}>{title}</h1>

		{!!excerpt && (
			<section>
				<p className={styles.excerpt}>{excerpt}</p>
			</section>
		)}

		<section>
			<p className={styles.meta}>
				{!!author && <span className={styles.author}>By {author} / </span>}
				{!!datePublished && <span>{datePublished} / </span>}
				<span>{formatReadingTime(timeToRead)}</span>
			</p>
		</section>
	</header>
);

export default PostHeader;
