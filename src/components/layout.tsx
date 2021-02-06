import React from "react";
import Hero from "./hero";
import Footer from "./footer";
import { LayoutProps } from "../types";
import { isIndex } from "../utils/helpers";
import "../styles/main.scss";
import Menu from "./menu";
import ThemeToggle from "./theme";

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
            {cover && <Hero data={cover} alt={title} />}
          </section>
        </header>
        <section>{children}</section>
        <Footer />
      </section>
    </main>
  );
};

export default Layout;
