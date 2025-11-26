import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import React from "react";

interface CoverProps {
	readonly title: string;
	readonly url: string;
}

// biome-ignore lint/style/useComponentExportOnlyModules: StaticImage requires this
export const src = "https://r2.nikoheikkila.fi/cover.png";

export const Cover: React.FunctionComponent<CoverProps> = ({ title, url }) => {
	return (
		<Link rel="home" to={url}>
			<StaticImage alt={title} height={630} placeholder="blurred" src={src} width={1200} />
		</Link>
	);
};
