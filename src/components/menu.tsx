import { Link } from "gatsby";
import { getStaticPages } from "../graphql/pages";
import React, { FunctionComponent, useState } from "react";
import { stack as BurgerMenu } from "react-burger-menu";
import { ContentLink } from "types";
import ExternalLink from "./elements";

interface MenuProps {
  readonly pageWrapId: string;
  readonly outerContainerId: string;
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

const SidebarLink: FunctionComponent<ContentLink> = ({ slug, title }) => {
  if (slug.startsWith("/")) {
    return <Link to={slug}>{title}</Link>;
  }

  return <ExternalLink to={slug}>{title}</ExternalLink>;
};

const Menu: FunctionComponent<MenuProps> = ({
  pageWrapId,
  outerContainerId,
  className,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const staticPages = getStaticPages();
  const allPages = [...links, ...staticPages].map(({ slug, title }) => (
    <SidebarLink key={slug} slug={slug} title={title} />
  ));

  return (
    <BurgerMenu
      className={className || "site-menu"}
      pageWrapId={pageWrapId}
      outerContainerId={outerContainerId}
      isOpen={menuOpen}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
    >
      {menuOpen ? allPages : null}
    </BurgerMenu>
  );
};

export default Menu;
