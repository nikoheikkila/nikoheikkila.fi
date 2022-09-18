import dayjs from "dayjs";
import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import { MarkdownRemarkEdge } from "../../types";
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
    edges: ReadonlyArray<MarkdownRemarkEdge>;
    readonly location: Location;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
    edges,
    location,
}) => {
    return (
        <>
            <h2 className={styles.header}>Latest Articles</h2>
            <hr></hr>
            <section className={styles.view}>
                {edges
                    .filter((edge) => edge.node.fields?.slug)
                    .map((edge) => {
                        const slug = edge.node.fields?.slug || "";

                        return (
                            <ArticleCard
                                key={slug}
                                slug={slug}
                                location={location}
                                title={edge.node.frontmatter?.title || ""}
                                categories={(
                                    edge.node.frontmatter?.categories || []
                                ).map(String)}
                                date={dayjs(edge.node.frontmatter?.date).format(
                                    "DD.MM.YYYY"
                                )}
                                excerpt={edge.node.excerpt || ""}
                                timeToRead={edge.node.timeToRead || 0}
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
        <Link
            className={styles.card}
            to={slug}
            state={{ previous: location.pathname }}
            data-testid="post-title"
        >
            <ArticleTitle title={title} />
            <ArticleMetaData date={date} timeToRead={timeToRead || 0} />
            <Content content={excerpt} />
            <TagList categories={categories} />
        </Link>
    );
};

const ArticleTitle = ({ title }: { title: string }) => (
    <h2 className={styles.title}>{title}</h2>
);

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
