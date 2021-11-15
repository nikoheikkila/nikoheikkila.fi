import React, { ReactNode } from "react";
import Hero from "../hero";
import Footer from "./footer";
import "../../styles/main.scss";
import Menu from "./menu";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Container from "./container";

interface LayoutProps {
    title: string;
    cover?: IGatsbyImageData;
    children: Array<ReactNode>;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
    title,
    cover,
    children,
}) => {
    return (
        <>
            <aside>
                <Menu />
            </aside>
            <Container>
                {cover && (
                    <header>
                        <Hero data={cover} alt={title} />
                    </header>
                )}
                <section>{children}</section>
                <Footer />
            </Container>
        </>
    );
};

export default Layout;
