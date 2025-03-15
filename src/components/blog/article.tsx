import { Link } from "gatsby";
import React from "react";
import type { FunctionComponent } from "react";
import * as DateTime from "../../utils/datetime";
import { formatReadingTime } from "../../utils/helpers";
import Content from "../post/content";
import Tag from "../tag";
import * as styles from "./article.module.scss";

interface ArticleCardProps {
	readonly title: string;
	readonly slug: string;
	readonly excerpt: string;
	categories: string[];
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
					const categories = (node.frontmatter?.categories || []).map(String);
					const date = DateTime.toDisplay(node.frontmatter?.date);

					return (
						<ArticleCard
							key={slug}
							slug={slug}
							location={location}
							title={title}
							categories={categories}
							date={date}
							excerpt={excerpt}
							timeToRead={timeToRead}
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
	categories,
	date,
	timeToRead,
	location,
}) => {
	return (
		<Link className={styles.card} to={slug} state={{ previous: location.pathname }} data-testid="post-title">
			<ArticleTitle title={title} />
			<ArticleMetaData date={date} timeToRead={timeToRead || 0} />
			<Content content={excerpt} />
			<TagList categories={categories} />
		</Link>
	);
};

const ArticleTitle = ({ title }: { title: string }) => <h2 className={styles.title}>{title}</h2>;

const TagList = ({ categories }: { categories: ReadonlyArray<string> }) => (
	<section className={styles.tags}>
		{categories.map((category) => (
			<Tag key={category} title={category} />
		))}
	</section>
);

const ArticleMetaData = ({
	date,
	timeToRead,
}: {
	date: string;
	timeToRead: number;
}) => (
	<p>
		<span>{date} </span>
		{timeToRead > 0 && <span>{formatReadingTime(timeToRead)}</span>}
	</p>
);
