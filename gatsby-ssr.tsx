import type { GatsbySSR } from "gatsby";
import * as React from "react";
import config from "./gatsby-config";

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHtmlAttributes, setHeadComponents }) => {
	configureHtml(setHtmlAttributes);
	configureFonts(setHeadComponents);
};

function configureHtml(
	setHtmlAttributes: (
		attributes: React.ClassAttributes<HTMLHtmlElement> & React.HTMLAttributes<HTMLHtmlElement>,
	) => void,
) {
	const lang = String(config.siteMetadata?.language);

	setHtmlAttributes({ lang });
}

function configureFonts(setHeadComponents: (children: React.ReactNode[]) => void) {
	const fontUrl = "https://api.fontshare.com/v2/css?f[]=synonym@400,500&f[]=amulya@700&display=swap";

	setHeadComponents([
		<link crossOrigin="anonymous" href="https://api.fontshare.com" key="preconnect-fontshare-api" rel="preconnect" />,
		<link crossOrigin="anonymous" href="https://cdn.fontshare.com" key="preconnect-fontshare-cdn" rel="preconnect" />,
		<link href={fontUrl} key="fontshare-stylesheet" rel="stylesheet" />,
	]);
}
