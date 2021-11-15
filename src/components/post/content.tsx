import React from "react";
import * as styles from "./content.module.scss";

interface Props {
    content: string;
}

const Content = ({ content }: Props) => (
    <article
        className={styles.content}
        dangerouslySetInnerHTML={{
            __html: content,
        }}
    />
);

export default Content;
