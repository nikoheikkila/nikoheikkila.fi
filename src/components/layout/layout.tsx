import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { ReactNode } from "react";
import Hero from "../hero";
import { ListContainer, SinglePostContainer } from "./container";
import { Slice } from "gatsby";

export enum LayoutType {
	LIST = "list",
	SINGLE = "single",
}

interface LayoutProps {
	type: LayoutType;
	title: string;
	cover?: IGatsbyImageData;
	children: Array<ReactNode>;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
	type,
	title,
	cover,
	children,
}) => {
	return (
		<>
			<Slice alias="sidebar" />
			{cover && (
				<header>
					<Hero data={cover} alt={title} />
				</header>
			)}
			{type === LayoutType.LIST && (
				<ListContainer>
					<section>{children}</section>
					<Slice alias="footer" />
				</ListContainer>
			)}
			{type === LayoutType.SINGLE && (
				<SinglePostContainer>
					<section>{children}</section>
					<Slice alias="footer" />
				</SinglePostContainer>
			)}
		</>
	);
};

export default Layout;
