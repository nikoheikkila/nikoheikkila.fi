import { describe, expect, spyOn, test } from "bun:test";
import React from "react";
import Content from "../../components/post/content";
import { render } from "./test-utils";

describe("Content Component", () => {
	test("renders simple markdown content", () => {
		const markdown = "This is a simple paragraph";
		const { container } = render(<Content content={markdown} />);

		const article = container.querySelector("article");
		expect(article).toBeDefined();
		expect(article?.textContent).toContain("This is a simple paragraph");
	});

	test("renders headings correctly", () => {
		const markdown = "# Heading 1\n## Heading 2";
		const { container } = render(<Content content={markdown} />);

		const h1 = container.querySelector("h1");
		const h2 = container.querySelector("h2");

		expect(h1?.textContent).toBe("Heading 1");
		expect(h2?.textContent).toBe("Heading 2");
	});

	test("renders lists correctly", () => {
		const markdown = "- Item 1\n- Item 2\n- Item 3";
		const { container } = render(<Content content={markdown} />);

		const listItems = container.querySelectorAll("li");
		expect(listItems.length).toBe(3);
		expect(listItems[0].textContent).toBe("Item 1");
	});

	test("renders code blocks with syntax highlighting", () => {
		const markdown = "```javascript\nconst test = 'hello';\n```";
		const { container } = render(<Content content={markdown} />);

		// Check for the section element that wraps the code block
		const codeBlockSection = container.querySelector("section");
		expect(codeBlockSection).toBeDefined();

		// Check for language label - uses title case (JavaScript not Javascript)
		const languageSpan = codeBlockSection?.querySelector("span");
		expect(languageSpan).toBeDefined();
		expect(languageSpan?.textContent).toBe("JavaScript");

		// Check that syntax highlighter renders the code
		const codeContent = container.querySelector("pre");
		expect(codeContent).toBeDefined();
		expect(codeContent?.textContent).toContain("const test = 'hello';");
	});

	test("renders inline code", () => {
		const markdown = "This is `inline code` in text";
		const { container } = render(<Content content={markdown} />);

		const code = container.querySelector("code");
		expect(code).toBeDefined();
		expect(code?.textContent).toBe("inline code");
	});

	test("renders links correctly", () => {
		const markdown = "[Link text](https://example.com)";
		const { container } = render(<Content content={markdown} />);

		const link = container.querySelector("a");
		expect(link).toBeDefined();
		expect(link?.textContent).toBe("Link text");
		expect(link?.getAttribute("href")).toBe("https://example.com");
	});

	test("renders images with captions", () => {
		const markdown = "![Alt text](https://example.com/image.jpg)";
		const { container } = render(<Content content={markdown} />);

		// Images are wrapped in a link
		const photoframeLink = container.querySelector("a");
		expect(photoframeLink).toBeDefined();
		expect(photoframeLink?.getAttribute("href")).toBe("https://example.com/image.jpg");

		const img = container.querySelector("img");
		expect(img?.getAttribute("alt")).toBe("Alt text");
		expect(img?.getAttribute("src")).toBe("https://example.com/image.jpg");
		expect(img?.getAttribute("title")).toBe("Click for a larger version");

		// Caption span contains Picture: text and click instruction
		const _spans = photoframeLink?.querySelectorAll("span");
		const captionText = photoframeLink?.textContent;
		expect(captionText).toContain("Picture: Alt text");
		expect(captionText).toContain("Click for a larger version.");
	});

	test("handles images without alt text", () => {
		const consoleSpy = spyOn(console, "warn");
		const markdown = "![](https://example.com/image.jpg)";

		render(<Content content={markdown} />);

		expect(consoleSpy).toHaveBeenCalledWith(
			"Alternative text not specified for image with URL: https://example.com/image.jpg",
		);
	});

	test("renders iframes for videos", () => {
		const markdown = '<iframe src="https://youtube.com/embed/test"></iframe>';
		const { container } = render(<Content content={markdown} />);

		const videoSection = container.querySelector(".video");
		expect(videoSection).toBeDefined();

		const iframe = container.querySelector("iframe");
		expect(iframe).toBeDefined();
		expect(iframe?.getAttribute("src")).toBe("https://youtube.com/embed/test");
	});

	test("handles code block with diff syntax", () => {
		const markdown = "```diff-javascript\n+ const added = true;\n- const removed = false;\n```";
		const { container } = render(<Content content={markdown} />);

		// Check for the section element
		const codeBlockSection = container.querySelector("section");
		expect(codeBlockSection).toBeDefined();

		// Due to how React Markdown handles language classes, diff-javascript is treated as "diff"
		// The regex /language-(\w+)/ only matches word characters, stopping at the hyphen
		const languageSpan = codeBlockSection?.querySelector("span");
		expect(languageSpan).toBeDefined();
		expect(languageSpan?.textContent).toBe("Diff");

		// Check that the diff lines are rendered
		const codeContent = container.querySelector("pre");
		expect(codeContent?.textContent).toContain("+ const added = true;");
		expect(codeContent?.textContent).toContain("- const removed = false;");
	});

	test("renders tables using GFM", () => {
		const markdown = "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
		const { container } = render(<Content content={markdown} />);

		const table = container.querySelector("table");
		expect(table).toBeDefined();

		const headers = container.querySelectorAll("th");
		expect(headers.length).toBe(2);
		expect(headers[0].textContent).toBe("Header 1");
	});

	test("renders blockquotes", () => {
		const markdown = "> This is a quote";
		const { container } = render(<Content content={markdown} />);

		const blockquote = container.querySelector("blockquote");
		expect(blockquote).toBeDefined();
		expect(blockquote?.textContent?.trim()).toBe("This is a quote");
	});

	test("renders math equations with KaTeX", () => {
		const markdown = "$x^2 + y^2 = z^2$";
		const { container } = render(<Content content={markdown} />);

		// KaTeX will render the math content
		const article = container.querySelector("article");
		expect(article?.textContent).toContain("x");
	});

	test("handles empty content", () => {
		const { container } = render(<Content content="" />);

		const article = container.querySelector("article");
		expect(article).toBeDefined();
		expect(article?.textContent).toBe("");
	});

	test("renders code block without language", () => {
		const markdown = "```\nplain text code\n```";
		const { container } = render(<Content content={markdown} />);

		// Without language, it should render as inline code
		const code = container.querySelector("code");
		expect(code).toBeDefined();
		// The newline is included in textContent for code blocks without language
		expect(code?.textContent?.trim()).toBe("plain text code");
	});

	test("handles complex nested markdown", () => {
		const markdown = `
# Main Title

This is a paragraph with **bold** and *italic* text.

## Subsection

1. First item with \`code\`
2. Second item with [link](https://test.com)
3. Third item

> Quote with **emphasis**

\`\`\`python
def hello():
    print("world")
\`\`\`
`;
		const { container } = render(<Content content={markdown} />);

		const article = container.querySelector("article");
		expect(article).toBeDefined();

		const h1 = container.querySelector("h1");
		expect(h1?.textContent).toBe("Main Title");

		const strong = container.querySelector("strong");
		expect(strong).toBeDefined();

		const em = container.querySelector("em");
		expect(em).toBeDefined();

		const ol = container.querySelector("ol");
		expect(ol).toBeDefined();

		const blockquote = container.querySelector("blockquote");
		expect(blockquote).toBeDefined();
	});
});
