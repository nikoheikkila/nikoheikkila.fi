import React from "react";
import { graphql, HeadFC } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Layout, { LayoutType } from "../components/layout/layout";
import { useIcons } from "../components/hooks/useIcons";
import PostAttachments from "../components/post/attachments";
import Content from "../components/post/content";
import PostFooter from "../components/post/footer";
import PostHeader from "../components/post/header";
import PostNavigation from "../components/post/navigation";
import Subscribe from "../components/post/subscribe";
import SEO from "../components/seo";
import config from "../../gatsby-config";
import { Route } from "../gatsby";
import { MarkdownRemarkEdge, PageInfo, Query } from "../types";
import * as DateTime from "../utils/datetime";
import { combinePaths } from "../utils/helpers";

interface PostProps {
    data: Query;
    location: Route;
    pageContext: PageInfo & MarkdownRemarkEdge;
}

const Post: React.FC<PostProps> = ({ data, location, pageContext }) => {
    const slug = data.markdownRemark?.fields?.slug ?? "";
    const hero = data.markdownRemark?.hero;
    const body = data.markdownRemark?.rawMarkdownBody ?? "";
    const timeToRead = data.markdownRemark?.timeToRead ?? 0;

    const author = data.markdownRemark?.frontmatter?.author ?? "";
    const date = data.markdownRemark?.frontmatter?.date ?? "";
    const postTitle = data.markdownRemark?.frontmatter?.title ?? "";
    const excerpt = data.markdownRemark?.frontmatter?.excerpt ?? "";
    const categories = data.markdownRemark?.frontmatter?.categories ?? [];

    const repository = data.site?.siteMetadata?.repository ?? "";
    const title = data.site?.siteMetadata?.title ?? "";

    const previous = pageContext.previous;
    const next = pageContext.next;
    const datePublished = DateTime.toDisplay(date);
    const postSlug = slug.slice(1, slug.length - 1);
    const editUrl = `${repository}/edit/main/content/${postSlug}/index.md`;
    const historyUrl = `${repository}/commits/main/content/${postSlug}/index.md`;

    const cover = hero?.childImageSharp;
    const coverImage: IGatsbyImageData | undefined = cover?.gatsbyImageData;

    useIcons([fab]);

    return (
        <Layout type={LayoutType.SINGLE} title={title} cover={coverImage}>
            <PostHeader
                author={author}
                datePublished={datePublished}
                excerpt={excerpt}
                timeToRead={timeToRead}
                title={postTitle}
            />
            <Content content={body} />
            <Subscribe config={config} />
            <PostFooter categories={categories as string[]} />
            <PostAttachments
                previous={location.state?.previous}
                urls={{ edit: editUrl, history: historyUrl }}
            />

            <PostNavigation
                next={{
                    slug: next?.fields?.slug ?? "",
                    title: next?.frontmatter?.title ?? "",
                }}
                previous={{
                    slug: previous?.fields?.slug ?? "",
                    title: previous?.frontmatter?.title ?? "",
                }}
            />
        </Layout>
    );
};

export default Post;

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                siteUrl
                title
                author {
                    name
                }
                repository
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            fields {
                slug
            }
            excerpt(pruneLength: 160)
            rawMarkdownBody
            timeToRead
            hero {
                childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    original {
                        src
                        width
                        height
                    }
                }
            }
            frontmatter {
                lang
                title
                type
                date
                author
                excerpt
                categories
            }
        }
    }
`;

export const Head: HeadFC<Query, PageInfo & MarkdownRemarkEdge> = ({
    data,
}) => {
    const hero = data.markdownRemark?.hero;
    const excerpt = data.markdownRemark?.frontmatter?.excerpt ?? "";
    const lang = data.markdownRemark?.frontmatter?.lang ?? "en";
    const postTitle = data.markdownRemark?.frontmatter?.title ?? "";
    const cover = hero?.childImageSharp ?? undefined;
    const type = data.markdownRemark?.frontmatter?.type ?? "";
    const slug = data.markdownRemark?.fields?.slug ?? "";
    const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
    const postUrl = combinePaths(siteUrl, slug);
    const date = data.markdownRemark?.frontmatter?.date ?? "";
    const categories = data.markdownRemark?.frontmatter?.categories ?? [];

    return (
        <SEO
            title={postTitle}
            description={excerpt}
            lang={lang}
            image={cover}
            type={type}
            url={postUrl}
            datePublished={date}
            categories={categories.map(String)}
        />
    );
};
