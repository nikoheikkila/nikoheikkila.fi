import { GatsbySSR } from "gatsby";
import config from "./gatsby-config";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
	setHtmlAttributes,
}) => {
	const lang = String(config.siteMetadata?.language);

	setHtmlAttributes({ lang });
};
