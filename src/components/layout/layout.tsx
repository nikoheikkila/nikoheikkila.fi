import type { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import type { ReactNode } from "react";
import "../../styles/main.scss";
import Hero from "../hero";
import { ListContainer, SinglePostContainer } from "./container";
import { Slice } from "gatsby";
import { LayoutType } from "./types";

interface LayoutProps {
	type: LayoutType;
	title: string;
	cover?: IGatsbyImageData;
	children: Array<ReactNode>;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ type, title, cover, children }) => {
	return (
		<>
			<Slice alias="sidebar" />
			{cover && (
				<header>
					<Hero alt={title} data={cover} />
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
