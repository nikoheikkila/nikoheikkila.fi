import React, { FunctionComponent, useState } from "react";
import { stack as BurgerMenu } from "react-burger-menu";
import { getStaticPages } from "../../graphql/pages";
import { BlogLink } from "../elements";

import "../../styles/menu.scss";

interface MenuProps {
    readonly className?: string;
}

const links = [
    {
        slug: "/",
        title: "Blog",
    },
    {
        slug: "https://cv.nikoheikkila.fi",
        title: "Skills",
    },
];

interface SidebarLinkProps {
    readonly slug: string;
    readonly title: string;
}

const Menu: FunctionComponent<MenuProps> = () => {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    const staticPages = getStaticPages();
    const allPages = [...links, ...staticPages].map(({ slug, title }) => (
        <BlogLink key={slug} href={slug || ""}>
            {title}
        </BlogLink>
    ));

    return (
        <BurgerMenu
            isOpen={menuOpen}
            onOpen={() => setMenuOpen(true)}
            onClose={() => setMenuOpen(false)}
        >
            {menuOpen ? allPages : null}
        </BurgerMenu>
    );
};

export default Menu;
