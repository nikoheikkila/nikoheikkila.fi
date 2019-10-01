declare module '*.png' {
    var _: string
    export default _
}

import { ReactNode } from "react";

export interface Location {
    pathname: string
    state: {
        previous: string
    }
}

export interface LayoutProps {
    location: Location,
    title: string,
    cover?: string,
    children: Array<ReactNode>
}

export interface Page {
    /* Data queried from GraphQL - can be anything! */
    data: any
    location: Location
    pageContext: {
        currentPage: number
        numberOfPages: number
        previous: any
        next: any
    }
}

export interface MarkdownRemark {
    edges: Array<{
        node: {
            id: string
            fields: {
                slug: string
            }
            excerpt: string
            frontmatter: {
                title: string
                date: string
                excerpt: string
                categories: Array<string>
            }
            timeToRead: number
        }
    }>
}
