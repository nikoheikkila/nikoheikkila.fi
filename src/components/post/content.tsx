import type { CSSProperties, ReactNode } from "react";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

// Register only languages used in blog posts to reduce bundle size
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import diff from "react-syntax-highlighter/dist/esm/languages/hljs/diff";
import dockerfile from "react-syntax-highlighter/dist/esm/languages/hljs/dockerfile";
import gherkin from "react-syntax-highlighter/dist/esm/languages/hljs/gherkin";
import go from "react-syntax-highlighter/dist/esm/languages/hljs/go";
import haskell from "react-syntax-highlighter/dist/esm/languages/hljs/haskell";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import markdown from "react-syntax-highlighter/dist/esm/languages/hljs/markdown";
import php from "react-syntax-highlighter/dist/esm/languages/hljs/php";
import plaintext from "react-syntax-highlighter/dist/esm/languages/hljs/plaintext";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import yaml from "react-syntax-highlighter/dist/esm/languages/hljs/yaml";

SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("diff", diff);
SyntaxHighlighter.registerLanguage("dockerfile", dockerfile);
SyntaxHighlighter.registerLanguage("gherkin", gherkin);
SyntaxHighlighter.registerLanguage("go", go);
SyntaxHighlighter.registerLanguage("haskell", haskell);
SyntaxHighlighter.registerLanguage("html", xml);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("plain", plaintext);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("svelte", xml); // Use XML for Svelte (similar to HTML)
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("yaml", yaml);
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
								alt={alt}
								className={styles.image}
								loading="lazy"
								src={src}
								title="Click for a larger version"
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
				code({ className, children, ...props }) {
					// Check if it's inline code by looking at the node type
					const match = /language-(\w+)/.exec(className || "");
					const [, language] = Array.from(match || []);
					const childrenArray = Array.isArray(children) ? children : [children];

					// If there's no language specified, treat as inline code
					if (!language) {
						return (
							<InlineCode className={className} {...props}>
								{childrenArray}
							</InlineCode>
						);
					}

					const childString = convertChildrenToString(children);
					const lines = childString.split("\n");

					return (
						<CodeBlock
							addedLines={lines.map(extractAddedLineNumber)}
							language={language.replace("diff-", "")}
							removedLines={lines.map(extractRemovedLineNumber)}
							{...props}
						>
							{childrenArray}
						</CodeBlock>
					);
				},
			}}
			rehypePlugins={[rehypeRaw, rehypeKatex]}
			remarkPlugins={[remarkGfm, remarkMath]}
		>
			{content}
		</ReactMarkdown>
	</article>
);

const extractAddedLineNumber = (line: string, index: number) => (line.startsWith("+") ? index + 1 : 0);
const extractRemovedLineNumber = (line: string, index: number) => (line.startsWith("-") ? index + 1 : 0);

const convertChildrenToString = (children: ReactNode): string => {
	if (typeof children === "string") {
		return children;
	}
	if (typeof children === "number" || typeof children === "boolean") {
		return String(children);
	}
	return "";
};

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
	// Convert children to string safely
	const childString = Array.isArray(children)
		? children.map(convertChildrenToString).join("")
		: convertChildrenToString(children);

	return (
		<section className={styles.codeblock}>
			<span className={styles.language}>{makeTitleCase(language)}</span>
			<SyntaxHighlighter
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
				style={nightOwl}
				wrapLines
				{...props}
			>
				{childString.replace(/\n$/, "")}
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
