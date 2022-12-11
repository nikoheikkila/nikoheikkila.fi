import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { ReactNode } from "react";
import Hero from "../hero";
import { ListContainer, SinglePostContainer } from "./container";
import Footer from "./footer";
import "../../styles/main.scss";
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
                    <Footer />
                </ListContainer>
            )}
            {type === LayoutType.SINGLE && (
                <SinglePostContainer>
                    <section>{children}</section>
                    <Footer />
                </SinglePostContainer>
            )}
        </>
    );
};

export default Layout;
