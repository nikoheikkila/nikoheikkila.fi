import React, { ReactNode } from "react";
import Hero from "../hero";
import Footer from "./footer";
import "../../styles/main.scss";
import Menu from "./menu";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { ListContainer, SinglePostContainer } from "./container";

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
            <aside>
                <Menu />
            </aside>
            {type === LayoutType.LIST && (
                <ListContainer>
                    {cover && (
                        <header>
                            <Hero data={cover} alt={title} />
                        </header>
                    )}
                    <section>{children}</section>
                    <Footer />
                </ListContainer>
            )}
            {type === LayoutType.SINGLE && (
                <SinglePostContainer>
                    {cover && (
                        <header>
                            <Hero data={cover} alt={title} />
                        </header>
                    )}
                    <section>{children}</section>
                    <Footer />
                </SinglePostContainer>
            )}
        </>
    );
};

export default Layout;
