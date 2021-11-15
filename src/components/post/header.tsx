import React, { FunctionComponent } from "react";
import { formatReadingTime } from "../../utils/helpers";

import * as styles from "./header.module.scss";

interface HeaderProps {
    readonly title: string;
    readonly excerpt: string;
    readonly author: string;
    readonly datePublished: string;
    readonly timeToRead: number;
}

const PostHeader: FunctionComponent<HeaderProps> = ({
    title,
    excerpt,
    author,
    datePublished,
    timeToRead,
}) => (
    <header className={styles.header} data-testid="post-header">
        <h1>{title}</h1>

        {excerpt && (
            <section className={styles.excerpt}>
                <p>{excerpt}</p>
            </section>
        )}

        <section className={styles.meta}>
            <p>
                <span>{author} / </span>
                <span>{datePublished} / </span>
                <span>{formatReadingTime(timeToRead)}</span>
            </p>
        </section>
    </header>
);

export default PostHeader;
