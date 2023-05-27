import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import * as styles from "./header.module.scss";

interface HeaderProps {
    readonly title: string;
    readonly url?: string;
}

const BlogHeader: React.FunctionComponent<HeaderProps> = ({
    title,
    url = "/",
}) => (
    <header>
        <section className={styles.container}>
            <Link to={url} rel="home">
                <StaticImage
                    className={styles.logo}
                    src="../../assets/profile.jpg"
                    alt={title}
                    height={256}
                    width={256}
                    placeholder="blurred"
                />
            </Link>
        </section>
        <section className={styles.title}>
            <h1>{title}</h1>
        </section>
        <section className={styles.description}>
            <p>
                👋🏻 Hello, traveller! I’m a software craftsperson with a strong
                passion for making work and life better for software engineers.
                This blog contains insights related to modern software
                engineering practices. Read
                <Link to="/about"> the longer story of me</Link>, and if you
                liked what you read
                <Link to="/feed"> subscribe to my feed</Link>.
            </p>
        </section>
    </header>
);

export default BlogHeader;
