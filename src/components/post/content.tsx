import React, { CSSProperties, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import makeTitleCase from "title";
import { BlogLink } from "../elements";
import * as styles from "./content.module.scss";

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
                        <BlogLink className={styles.photoframe} href={src}>
                            <img
                                className={styles.image}
                                src={src}
                                alt={alt}
                                title="Click for a larger version"
                                loading="lazy"
                            />
                            <p className={styles.caption}>
                                <span>Picture: {alt}</span>
                                <span>Click for a larger version</span>
                            </p>
                        </BlogLink>
                    );
                },
                a({ children, ...props }) {
                    return <BlogLink {...props}>{children}</BlogLink>;
                },
                code({ inline, className, children, ...props }) {
                    const match = /language-([a-z-]+)/.exec(className || "");
                    const [_, language] = Array.from(match || []);

                    if (inline || !language) {
                        return (
                            <InlineCode className={className} {...props}>
                                {children}
                            </InlineCode>
                        );
                    }

                    const lines = children.toString().split("\n");

                    return (
                        <CodeBlock
                            language={language.replace("diff-", "")}
                            addedLines={lines.map(extractAddedLineNumber)}
                            removedLines={lines.map(extractRemovedLineNumber)}
                            {...props}
                        >
                            {children}
                        </CodeBlock>
                    );
                },
            }}
        />
    </article>
);

const extractAddedLineNumber = (line: string, index: number) =>
    line.startsWith("+") ? index + 1 : 0;
const extractRemovedLineNumber = (line: string, index: number) =>
    line.startsWith("-") ? index + 1 : 0;

interface CodeBlockProps {
    language: string;
    addedLines?: number[];
    removedLines?: number[];
    children?: ReactNode[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({
    language,
    addedLines = [],
    removedLines = [],
    children = [],
    ...props
}) => {
    return (
        <section className={styles.codeblock}>
            <span className={styles.language}>{makeTitleCase(language)}</span>
            <SyntaxHighlighter
                children={children.toString().replace(/\n$/, "")}
                style={nightOwl}
                customStyle={{
                    padding: 0,
                    fontSize: "1.0rem",
                    lineHeight: "2.0rem",
                }}
                language={language}
                lineProps={(lineNumber) => {
                    const style: CSSProperties = {
                        display: "block",
                        width: "fit-content",
                        paddingRight: 10,
                    };

                    if (addedLines.includes(lineNumber)) {
                        return {
                            style: {
                                ...style,
                                backgroundColor: "rgba(0, 255, 0, 0.2)",
                            },
                        };
                    }

                    if (removedLines.includes(lineNumber)) {
                        return {
                            style: {
                                ...style,
                                backgroundColor: "rgba(255, 0, 0, 0.3)",
                            },
                        };
                    }

                    return { style };
                }}
                showLineNumbers
                wrapLines
                {...props}
            />
        </section>
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
