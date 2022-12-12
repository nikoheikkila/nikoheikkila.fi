import React, { FunctionComponent, useState } from "react";
import { slide as BurgerMenu } from "react-burger-menu";
import { getStaticPages } from "../../graphql/pages";
import { BlogLink } from "../elements";
import "../../styles/menu.scss";

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
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const staticPages = getStaticPages();

    const allPages = [...links, ...staticPages].map(({ slug, title }) => (
        <BlogLink key={slug} href={slug || ""}>
            {title}
        </BlogLink>
    ));

    return (
        <aside>
            <BurgerMenu
                isOpen={menuOpen}
                onOpen={() => setMenuOpen(true)}
                onClose={() => setMenuOpen(false)}
            >
                {menuOpen ? allPages : null}
            </BurgerMenu>
        </aside>
    );
};

export default Menu;
