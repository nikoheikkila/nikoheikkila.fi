import { Link } from "gatsby";
import React from "react";
import * as styles from "./header.module.scss";

const BlogHeader: React.FunctionComponent = () => (
	<header>
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
