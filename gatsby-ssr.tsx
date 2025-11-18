import type { GatsbySSR } from "gatsby";
import * as React from "react";
import config from "./gatsby-config";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
	setHtmlAttributes,
	setHeadComponents,
}) => {
	configureHtml(setHtmlAttributes);
	configureFonts(setHeadComponents);
};

function configureHtml(setHtmlAttributes: (attributes: React.ClassAttributes<HTMLHtmlElement> & React.HTMLAttributes<HTMLHtmlElement>) => void) {
	const lang = String(config.siteMetadata?.language);

	setHtmlAttributes({ lang });
}

function configureFonts(setHeadComponents: (children: React.ReactNode[]) => void) {
	const fontUrl = "https://api.fontshare.com/v2/css?f[]=synonym@400,500&f[]=amulya@700&display=swap";

	setHeadComponents([
		<link
			key="preconnect-fontshare-api"
			rel="preconnect"
			href="https://api.fontshare.com"
			crossOrigin="anonymous" />,
		<link
			key="preconnect-fontshare-cdn"
			rel="preconnect"
			href="https://cdn.fontshare.com"
			crossOrigin="anonymous" />,
		<link
			key="fontshare-stylesheet"
			rel="stylesheet"
			href={fontUrl} />,
	]);
}
