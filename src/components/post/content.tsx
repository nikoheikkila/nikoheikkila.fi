import type { CSSProperties, ReactNode } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
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
			remarkPlugins={[remarkGfm, remarkMath]}
			// @ts-expect-error "rehype-raw does not have valid typings"
			rehypePlugins={[rehypeRaw, rehypeKatex]}
			components={{
				iframe: ({ ...props }) => {
					// Wrapper around iframe videos to make them responsive
					return (
						<section className={styles.video}>
							<iframe {...props} />
						</section>
					);
				},
				img: ({ src, alt, ...props }) => {
					if (!src) return null;
					if (!alt || alt.length === 0) console.warn(`Alternative text not specified for image with URL: ${src}`);

					return (
						<BlogLink className={styles.photoframe} href={src}>
							<img
								className={styles.image}
								src={src}
								alt={alt}
								title="Click for a larger version"
								loading="lazy"
								{...props}
							/>
							<span className={styles.caption}>
								<span>
									<strong>Picture:</strong> {alt}
								</span>
								<br />
								<span>
									<strong>Click for a larger version.</strong>
								</span>
							</span>
						</BlogLink>
					);
				},
				a({ children, ...props }) {
					return <BlogLink {...props}>{children}</BlogLink>;
				},
				code({ inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || "");
					const [, language] = Array.from(match || []);

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
		>
			{content}
		</ReactMarkdown>
	</article>
);

const extractAddedLineNumber = (line: string, index: number) => (line.startsWith("+") ? index + 1 : 0);
const extractRemovedLineNumber = (line: string, index: number) => (line.startsWith("-") ? index + 1 : 0);

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
			>
				{children.toString().replace(/\n$/, "")}
			</SyntaxHighlighter>
		</section>
	);
};

interface InlineCodeProps {
	className?: string;
	children: ReactNode[];
}

const InlineCode: React.FC<InlineCodeProps> = ({ className, children, ...props }) => {
	return (
		<code className={className} {...props}>
			{children}
		</code>
	);
};

export default Content;
