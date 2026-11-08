/* Custom types to support Gatsby internals */

import type { GatsbyLinkProps } from "gatsby";

export interface State {
	previous?: string;
	next?: string;
}

export type Route = Location & GatsbyLinkProps<State>;
