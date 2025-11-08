import { Link } from "gatsby";
import React from "react";
import type { ReactNode } from "react";

interface BlogLinkProps {
	href?: string | null;
	className?: string;
	children: ReactNode | ReactNode[];
}

export const BlogLink: React.FC<BlogLinkProps> = ({ href, children, ...props }) => {
	if (!href) return <a {...props}>{children}</a>;

	if (isInternalLink(href))
		return (
			<Link to={href} {...props}>
				{children}
			</Link>
		);

	return (
		<a href={href} rel="noopener noreferrer" target="_blank" {...props}>
			{children}
		</a>
	);
};

const isInternalLink = (href: string): boolean => /^[#/](?!\/)/.test(href);
