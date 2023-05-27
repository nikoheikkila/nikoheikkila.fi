/* Custom types to support Gatsby internals */

import { GatsbyLinkProps } from "gatsby-link";

export type State = {
	previous?: string;
	next?: string;
};

export type Route = Location & GatsbyLinkProps<State>;
