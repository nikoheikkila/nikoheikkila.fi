import { IconName } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getFooterLinks } from "../../graphql/footer";
import ExternalLink from "../elements";
import { useIcons } from "../hooks/useIcons";
import * as styles from "./footer.module.scss";

interface SocialLink {
    name: IconName;
    url: string;
}

const Footer: React.FunctionComponent = () => {
    const {
        site: {
            siteMetadata: { social, rss },
        },
    } = getFooterLinks();

    useIcons([fab]);

    return (
        <footer className={styles.footer}>
            <span className={styles.feed}>
                <FontAwesomeIcon icon={faRss} />
                <ExternalLink to={rss}>RSS</ExternalLink>
            </span>

            {social.map(({ name, url }: SocialLink) => (
                <span key={name}>
                    <FontAwesomeIcon icon={["fab", name]} />
                    <ExternalLink to={url}>{name}</ExternalLink>
                </span>
            ))}
        </footer>
    );
};

export default Footer;
