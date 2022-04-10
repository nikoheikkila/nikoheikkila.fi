import { fab } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";
import { graphql } from "gatsby";
import React from "react";
import { ImageSharp, MarkdownRemarkEdge, PageInfo, Query } from "../types";
import { useIcons } from "../components/hooks/useIcons";
import Layout from "../components/layout/layout";
import PostAttachments from "../components/post/attachments";
import Content from "../components/post/content";
import PostFooter from "../components/post/footer";
import PostHeader from "../components/post/header";
import PostNavigation from "../components/post/navigation";
import SEO from "../components/seo";
import { combinePaths } from "../utils/helpers";
import { Route } from "../gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import Subscribe from "../components/post/subscribe";

interface PostProps {
    data: Query;
    location: Route;
    pageContext: PageInfo & MarkdownRemarkEdge;
}

const Post: React.FC<PostProps> = ({ data, location, pageContext }) => {
    const slug = data.markdownRemark?.fields?.slug ?? "";
    const hero = data.markdownRemark?.hero;
    const html = data.markdownRemark?.html ?? "";
    const timeToRead = data.markdownRemark?.timeToRead ?? 0;

    const author = data.markdownRemark?.frontmatter?.author ?? "";
    const date = data.markdownRemark?.frontmatter?.date ?? "";
    const lang = data.markdownRemark?.frontmatter?.lang ?? "en";
    const postTitle = data.markdownRemark?.frontmatter?.title ?? "";
    const excerpt = data.markdownRemark?.frontmatter?.excerpt ?? "";
    const categories = data.markdownRemark?.frontmatter?.categories ?? [];
    const type = data.markdownRemark?.frontmatter?.type ?? "";

    const siteUrl = data.site?.siteMetadata?.siteUrl ?? "";
    const repository = data.site?.siteMetadata?.repository ?? "";
    const title = data.site?.siteMetadata?.title ?? "";
    const disqus = data.site?.siteMetadata?.disqus ?? "";

    const previous = pageContext.previous;
    const next = pageContext.next;
    const postUrl = combinePaths(siteUrl, slug);
    const datePublished = dayjs(date).format("DD.MM.YYYY");
    const postSlug = slug.slice(1, slug.length - 1);
    const editUrl = `${repository}/edit/main/content/${postSlug}/index.md`;
    const historyUrl = `${repository}/commits/main/content/${postSlug}/index.md`;

    const cover = hero?.childImageSharp;
    const coverImage: IGatsbyImageData | undefined = cover?.gatsbyImageData;
    const coverPath = cover?.original?.src ?? "";

    useIcons([fab]);

    return (
        <Layout title={title} cover={coverImage}>
            <SEO
                description={excerpt}
                lang={lang}
                keywords={categories as string[]}
                title={postTitle}
                image={coverPath}
                type={type}
                url={postUrl}
                datePublished={date}
            />
            <PostHeader
                author={author}
                datePublished={datePublished}
                excerpt={excerpt}
                timeToRead={timeToRead}
                title={postTitle}
            />
            <Content content={html} />
            <Subscribe />
            <PostFooter categories={categories as string[]} />
            <PostAttachments
                location={location}
                urls={{ edit: editUrl, history: historyUrl }}
                disqusId={disqus}
                disqusConfiguration={{
                    url: postUrl,
                    identifier: slug,
                    title,
                }}
            />

            <PostNavigation
                next={next ?? undefined}
                previous={previous ?? undefined}
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
                disqus
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            fields {
                slug
            }
            excerpt(pruneLength: 160)
            html
            timeToRead
            hero {
                childImageSharp {
                    gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    original {
                        src
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
