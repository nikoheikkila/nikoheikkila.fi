import React, { type FunctionComponent, useState } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import { getStaticPages } from "../../graphql/pages";
import { BlogLink } from "../elements";

interface MenuProps {
	readonly className?: string;
}

const links = [
	{
		slug: "/",
		title: "Posts",
	},
	{
		slug: "https://linkedin.com/in/nikoheikkila",
		title: "Skills",
	},
];

const Menu: FunctionComponent<MenuProps> = () => {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const staticPages = getStaticPages();

	const allPages = [...links, ...staticPages].map(({ slug, title }) => (
		<BlogLink href={slug || ""} key={slug}>
			{title}
		</BlogLink>
	));

	return (
		<aside>
			<BurgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} onOpen={() => setMenuOpen(true)}>
				{allPages}
			</BurgerMenu>
		</aside>
	);
};

export default Menu;
