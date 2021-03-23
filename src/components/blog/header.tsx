import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import ExternalLink from "../elements";
import * as styles from "./header.module.scss";

interface HeaderProps {
  readonly title: string;
}

const BlogHeader: React.FunctionComponent<HeaderProps> = ({ title }) => (
  <header className={styles.header}>
    <StaticImage
      src="../../assets/profile.png"
      alt={title}
      width={128}
      height={128}
      layout="fixed"
    />
    <section>
      <h1 className={styles.title}>{title}</h1>
      <p>
        A blog powered by coffee,{" "}
        <ExternalLink to="https://code.visualstudio.com">VS Code</ExternalLink>,
        and <ExternalLink to="https://gatsbyjs.org">Gatsby</ExternalLink>.
      </p>
    </section>
  </header>
);

export default BlogHeader;
