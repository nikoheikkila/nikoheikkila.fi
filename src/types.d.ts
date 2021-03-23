import { ReactNode } from "react";
import { FluidObject, GatsbyImageProps } from "gatsby-plugin-image";

export interface RouteLocation {
  pathname: string;
  state?: {
    previous: string;
  };
}

export interface PageProps {
  links: Array<{
    slug: string;
    title: string;
  }>;
}

export interface Page {
  /* Data queried from GraphQL - can be anything! */
  data: any;
  location: Location;
  pageContext: {
    currentPage: number;
    numberOfPages: number;
    previous: any;
    next: any;
  };
}

export interface MarkdownRemark {
  edges: Array<{
    node: {
      id: string;
      fields: {
        slug: string;
      };
      excerpt: string;
      frontmatter: {
        title: string;
        date: string;
        excerpt: string;
        categories: Array<string>;
      };
      timeToRead: number;
    };
  }>;
}

export interface ContentLink {
  slug: string;
  title: string;
}
