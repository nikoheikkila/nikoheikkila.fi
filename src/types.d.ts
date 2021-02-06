import { ReactNode } from "react";
import { FluidObject, GatsbyImageProps } from "gatsby-image";

declare module "*.png" {
  var _: string;
  export default _;
}

export interface FluidImage extends FluidObject {
  presentationHeight: number;
  presentationWidth: number;
}

export interface ImageProps extends GatsbyImageProps {
  fluid: FluidImage;
  style?: CSSProperties;
  alt?: string;
}

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
