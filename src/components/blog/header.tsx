import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import * as styles from "./header.module.scss";

interface HeaderProps {
	readonly title: string;
	readonly url?: string;
}

const BlogHeader: React.FunctionComponent<HeaderProps> = ({ title, url = "/" }) => (
	<header>
		<section className={styles.container}>
			<Link rel="home" to={url}>
				<StaticImage
					alt={title}
					className={styles.logo}
					height={256}
					placeholder="blurred"
					src="../../assets/profile.jpg"
					width={256}
				/>
			</Link>
		</section>
		<section className={styles.title}>
			<h1>{title}</h1>
		</section>
		<section className={styles.description}>
			<p>
				👋🏻 Hello, traveller! I’m a software craftsperson with a strong passion for making work and life better for
				software engineers. This blog contains insights related to modern software engineering practices. Read
				<Link to="/about"> the longer story of me</Link>, and if you liked what you read
				<Link to="/feed"> subscribe to my feed</Link>.
			</p>
		</section>
	</header>
);

export default BlogHeader;
