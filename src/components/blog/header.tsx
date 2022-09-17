import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import ExternalLink from "../elements";
import * as styles from "./header.module.scss";
import { Link } from "gatsby";

interface HeaderProps {
    readonly title: string;
    readonly url?: string;
}

const BlogHeader: React.FunctionComponent<HeaderProps> = ({
    title,
    url = "/",
}) => (
    <header>
        <section className={styles.grid}>
            <Link to={url} rel="home">
                <StaticImage
                    className={styles.logo}
                    src="../../assets/profile.png"
                    alt={title}
                    layout="fullWidth"
                />
            </Link>
            <section className={styles.title}>
                <h1>{title}</h1>
                <p>
                    A blog powered by coffee,{" "}
                    <ExternalLink to="https://code.visualstudio.com">
                        VS Code
                    </ExternalLink>
                    , and{" "}
                    <ExternalLink to="https://gatsbyjs.org">
                        Gatsby
                    </ExternalLink>
                    .
                </p>
            </section>
        </section>
        <section className={styles.description}>
            <p>
                👋🏻 Hello, traveller! I’m a software craftsperson with a strong
                passion for making work and life better for software engineers.
                This blog contains insights related to modern software
                engineering practices. Read
                <Link to="/about"> the longer story of me</Link>, and if you
                liked what you read
                <Link to="/rss.xml"> subscribe to my feed</Link>.
            </p>
        </section>
    </header>
);

export default BlogHeader;
