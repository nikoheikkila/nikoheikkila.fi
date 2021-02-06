import React, { ReactNode } from "react";
import Hero from "./hero";
import Footer from "./footer";
import { FluidImage, RouteLocation } from "../types";
import { isIndex } from "../utils/helpers";
import "../styles/main.scss";
import Menu from "./menu";
import ThemeToggle from "./theme";

interface LayoutProps {
  location: RouteLocation;
  title: string;
  cover?: FluidImage | undefined;
  children: Array<ReactNode>;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  location,
  title,
  cover,
  children,
}) => {
  return (
    <main id="container">
      <ThemeToggle />
      <Menu
        className="site-menu"
        pageWrapId="content"
        outerContainerId="container"
      />
      <section id="content">
        <header>
          <section
            style={{
              maxWidth: isIndex(location) ? "720px" : "100%",
              margin: "0 auto",
            }}
          >
            {cover ? <Hero data={cover} alt={title} /> : null}
          </section>
        </header>
        <section>{children}</section>
        <Footer />
      </section>
    </main>
  );
};

export default Layout;
