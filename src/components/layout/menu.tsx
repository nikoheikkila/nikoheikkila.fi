import React, { type FunctionComponent, useId } from "react";
import { getStaticPages } from "../../graphql/pages";
import { BlogLink } from "../elements";
import useToggle from "../hooks/useToggle";
import * as styles from "./menu.module.scss";

interface MenuProps {
	readonly className?: string;
}

const links = [
	{
		slug: "/",
		title: "Posts",
	},
	{
		slug: "https://cv.nikoheikkila.fi",
		title: "Skills",
	},
];

const Menu: FunctionComponent<MenuProps> = () => {
	const menuId = useId();
	const [isOpen, toggle] = useToggle(false);
	const staticPages = getStaticPages();

	const allPages = [...links, ...staticPages].map(({ slug, title }) => (
		<BlogLink href={slug || ""} key={slug}>
			{title}
		</BlogLink>
	));

	return (
		<nav aria-label="Main">
			<button
				aria-controls={menuId}
				aria-expanded={isOpen}
				aria-label={isOpen ? "Close menu" : "Open menu"}
				className={styles.burger}
				onClick={toggle}
				type="button"
			>
				<span aria-hidden="true" className={styles.burgerBar} />
				<span aria-hidden="true" className={styles.burgerBar} />
				<span aria-hidden="true" className={styles.burgerBar} />
			</button>
			{isOpen && <div aria-hidden="true" className={styles.overlay} onClick={toggle} />}
			<div className={isOpen ? `${styles.menu} ${styles.menuOpen}` : styles.menu} id={menuId}>
				{allPages}
			</div>
		</nav>
	);
};

export default Menu;
