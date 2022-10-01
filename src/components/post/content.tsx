import React, { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import ExternalLink from "../elements";
import * as styles from "./content.module.scss";

import { Link } from "gatsby";
import "katex/dist/katex.min.css";

interface ContentProps {
    content: string;
}

const Content: React.FC<ContentProps> = ({ content }) => (
    <article className={styles.content}>
        <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
                img: ({ src, alt, ...props }) => {
                    if (!src) return <img {...props} />;
                    if (!alt || alt.length === 0)
                        console.warn(
                            `Alternative text not specified for image with URL: ${src}`
                        );

                    return (
                        <ExternalLink to={src}>
                            <img src={src} {...props} />
                        </ExternalLink>
                    );
                },
                a({ node, href, children, className, ...props }) {
                    if (!href) return <>{children}</>;
                    if (isInternalLink(href))
                        return (
                            <Link role="navigation" to={href}>
                                {children}
                            </Link>
                        );

                    return (
                        <ExternalLink to={href} {...props}>
                            {children}
                        </ExternalLink>
                    );
                },

                code({ node, inline, className, children, ...props }) {
                    if (inline)
                        return (
                            <InlineCode className={className} {...props}>
                                {children}
                            </InlineCode>
                        );

                    const match = /language-(\w+)/.exec(className || "");
                    if (match && match.length >= 2)
                        return (
                            <CodeBlock language={match[1]} {...props}>
                                {children}
                            </CodeBlock>
                        );

                    return <code {...props}>{children}</code>;
                },
            }}
        />
    </article>
);

const isInternalLink = (href: string): boolean => /^\/(?!\/)/.test(href);

interface CodeBlockProps {
    language: string;
    children: ReactNode[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    language,
    children,
    ...props
}) => {
    return (
        <SyntaxHighlighter
            children={String(children).replace(/\n$/, "")}
            style={nightOwl}
            customStyle={{ padding: 16, fontSize: "1.0rem" }}
            language={language}
            wrapLongLines
            {...props}
        />
    );
};

interface InlineCodeProps {
    className?: string;
    children: ReactNode[];
}

const InlineCode: React.FC<InlineCodeProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <code
            className={className}
            style={{ fontSize: "1.0rem", color: "#e12de1" }}
            {...props}
        >
            {children}
        </code>
    );
};

export default Content;
