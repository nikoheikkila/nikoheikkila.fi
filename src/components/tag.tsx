import slugify from "@sindresorhus/slugify";
import React, { type CSSProperties, useEffect, useState } from "react";

import { foregroundColor, randomColor } from "../utils/colors";

interface Props {
	title: string;
	className?: string;
	prefix?: string;
}

const Tag: React.FunctionComponent<Props> = ({ title, className, prefix = "#" }) => {
	const text = slugify(title, { decamelize: false, separator: "" });

	const [style, setStyle] = useState<CSSProperties>({
		backgroundColor: "transparent",
		borderRadius: 50,
		color: "inherit",
		display: "inline-block",
		fontSize: "0.9rem",
		fontWeight: 500,
		margin: 4,
		padding: "4px 12px",
	});

	useEffect(() => {
		const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const useLightMode = !prefersDarkMode;

		const backgroundColor = randomColor(useLightMode);
		const color = foregroundColor(backgroundColor);

		setStyle((style) => ({
			...style,
			backgroundColor: useLightMode ? `${backgroundColor}20` : backgroundColor,
			border: useLightMode ? `1px solid ${backgroundColor}40` : "none",
			color: useLightMode ? backgroundColor : color,
		}));
	}, []);

	return (
		<span className={className} style={style}>
			{prefix + text}
		</span>
	);
};

export default Tag;
