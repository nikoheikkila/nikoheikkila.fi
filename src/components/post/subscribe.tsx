import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { GatsbyConfig } from "gatsby";
import React from "react";
import { BlogLink } from "../elements";
import * as styles from "./subscribe.module.scss";

interface SubscribeProps {
	config: GatsbyConfig;
}

const Subscribe: React.FC<SubscribeProps> = ({ config }) => {
	const url = config.siteMetadata?.rss;

	if (!url) {
		return <RSSError />;
	}

	return <FeedLink url={url.toString()} />;
};

const RSSError = () => (
	<section className={styles.error}>
		<p>
			<strong>Error: </strong>No RSS feed configured for this site.
		</p>
	</section>
);

const FeedLink: React.FC<{ url: string }> = ({ url }) => (
	<section className={styles.subscribe} data-test-id="rss-subscribe">
		<p>
			<FontAwesomeIcon icon={faRss} /> Enjoyed what you read? Why not keep yourself updated and grab the{" "}
			<BlogLink href={url}>RSS feed</BlogLink>.
		</p>
	</section>
);

export default Subscribe;
