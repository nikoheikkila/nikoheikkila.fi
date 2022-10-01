import { IconName } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getFooterLinks } from "../../graphql/footer";
import { BlogLink } from "../elements";
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
                <BlogLink href={rss}>RSS</BlogLink>
            </span>

            {social.map(({ name, url }: SocialLink) => (
                <span key={name}>
                    <FontAwesomeIcon icon={["fab", name]} />
                    <BlogLink href={url}>{name}</BlogLink>
                </span>
            ))}
        </footer>
    );
};

export default Footer;
