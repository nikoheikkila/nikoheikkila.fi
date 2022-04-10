import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Maybe } from "purify-ts";
import React from "react";
import config from "../../../gatsby-config";
import * as styles from "./subscribe.module.scss";

const Subscribe = () => {
    return Maybe.fromNullable(config.siteMetadata)
        .chainNullable((meta) => meta.rss)
        .map(String)
        .caseOf({
            Nothing: () => <Error />,
            Just: (url) => <FeedLink url={url} />,
        });
};

const Error = () => (
    <section className={styles.error}>
        <p>
            <strong>Error: </strong>No RSS feed configured for this site.
        </p>
    </section>
);

const FeedLink: React.FC<{ url: string }> = ({ url }) => (
    <section className={styles.subscribe}>
        <p>
            <FontAwesomeIcon icon={faRss} /> Enjoyed what you read? Why not keep
            yourself updated and grab the <a href={url}>RSS feed</a>.
        </p>
    </section>
);

export default Subscribe;
