import { Link } from "gatsby";
import React from "react";
import type { FunctionComponent } from "react";
import * as DateTime from "../../utils/datetime";
import { formatReadingTime } from "../../utils/helpers";
import Excerpt from "../post/excerpt";
import * as styles from "./article.module.scss";

interface ArticleCardProps {
	readonly title: string;
	readonly slug: string;
	readonly excerpt: string;
	readonly date: string;
	readonly timeToRead?: number;
	readonly location: Location;
}

interface ArticleViewProps {
	nodes: ReadonlyArray<Partial<Queries.MarkdownRemark>>;
	readonly location: Location;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ nodes, location }) => {
	return (
		<>
			<h2 className={styles.header}>Latest Articles</h2>
			<hr />
			<section className={styles.view}>
				{nodes.map((node) => {
					const slug = node.fields?.slug || "";
					const title = node.frontmatter?.title || "";
					const excerpt = node.excerpt || "";
					const timeToRead = node.timeToRead || 0;
					const date = DateTime.toDisplay(node.frontmatter?.date);

					return (
						<ArticleCard
							date={date}
							excerpt={excerpt}
							key={slug}
							location={location}
							slug={slug}
							timeToRead={timeToRead}
							title={title}
						/>
					);
				})}
			</section>
		</>
	);
};

export const ArticleCard: FunctionComponent<ArticleCardProps> = ({
	title,
	slug,
	excerpt,
	date,
	timeToRead,
	location,
}) => {
	return (
		<Link className={styles.card} data-testid="post-title" state={{ previous: location.pathname }} to={slug}>
			<ArticleTitle title={title} />
			<ArticleMetaData date={date} timeToRead={timeToRead || 0} />
			<Excerpt content={excerpt} />
		</Link>
	);
};

const ArticleTitle = ({ title }: { title: string }) => <h2 className={styles.title}>{title}</h2>;

const ArticleMetaData = ({ date, timeToRead }: { date: string; timeToRead: number }) => (
	<p>
		<span>{date} </span>
		{timeToRead > 0 && <span>{formatReadingTime(timeToRead)}</span>}
	</p>
);
