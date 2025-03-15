import { fab } from "@fortawesome/free-brands-svg-icons";
import { faRss, type IconName } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { getFooterLinks } from "../../graphql/footer";
import { BlogLink } from "../elements";
import { useIcons } from "../hooks/useIcons";
import * as styles from "./footer.module.scss";

const Footer: React.FunctionComponent = () => {
	useIcons([fab]);

	const links = getFooterLinks();
	const rss = links.site?.siteMetadata?.rss;
	const social = links.site?.siteMetadata?.social || [];

	return (
		<footer className={styles.footer}>
			<span className={styles.feed}>
				<FontAwesomeIcon icon={faRss} />
				<BlogLink href={rss}>RSS</BlogLink>
			</span>

			{social.map((link) => {
				if (!link?.name || !link?.url) return null;

				return (
					<span key={link.name}>
						<FontAwesomeIcon icon={["fab", link.name as IconName]} />
						<BlogLink href={link.url}>{link.name}</BlogLink>
					</span>
				);
			})}
		</footer>
	);
};

export default Footer;
