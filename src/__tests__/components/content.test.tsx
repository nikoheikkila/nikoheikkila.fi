import { describe, expect, spyOn, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import Content from "../../components/post/content";

describe("Content Component", () => {
	test("renders simple markdown content", () => {
		const markdown = "This is a simple paragraph";
		render(<Content content={markdown} />);

		const article = screen.getByRole("article");
		expect(article).toBeDefined();
		expect(screen.getByText("This is a simple paragraph")).toBeDefined();
	});

	test("renders headings correctly", () => {
		const markdown = "# Heading 1\n## Heading 2";
		render(<Content content={markdown} />);

		const h1 = screen.getByRole("heading", { level: 1 });
		const h2 = screen.getByRole("heading", { level: 2 });

		expect(h1.textContent).toBe("Heading 1");
		expect(h2.textContent).toBe("Heading 2");
	});

	test("renders lists correctly", () => {
		const markdown = "- Item 1\n- Item 2\n- Item 3";
		render(<Content content={markdown} />);

		const listItems = screen.getAllByRole("listitem");
		expect(listItems.length).toBe(3);
		expect(listItems[0].textContent).toBe("Item 1");
	});

	test("renders code blocks with syntax highlighting", () => {
		const markdown = "```javascript\nconst test = 'hello';\n```";
		render(<Content content={markdown} />);

		// Check for language label
		expect(screen.getByText("JavaScript")).toBeDefined();

		// Check that syntax highlighter renders the code
		expect(screen.getByText("const")).toBeDefined();
		expect(screen.getByText("'hello'")).toBeDefined();
	});

	test("renders inline code", () => {
		const markdown = "This is `inline code` in text";
		render(<Content content={markdown} />);

		expect(screen.getByText("inline code")).toBeDefined();
	});

	test("renders links correctly", () => {
		const markdown = "[Link text](https://example.com)";
		render(<Content content={markdown} />);

		const link = screen.getByRole("link", { name: "Link text" });
		expect(link).toBeDefined();
		expect(link.getAttribute("href")).toBe("https://example.com");
	});

	test("renders images with captions", () => {
		const markdown = "![Alt text](https://example.com/image.jpg)";
		render(<Content content={markdown} />);

		// Images are wrapped in a link
		const photoframeLink = screen.getByRole("link");
		expect(photoframeLink).toBeDefined();
		expect(photoframeLink.getAttribute("href")).toBe("https://example.com/image.jpg");

		const img = screen.getByAltText("Alt text");
		expect(img.getAttribute("src")).toBe("https://example.com/image.jpg");
		expect(img.getAttribute("title")).toBe("Click for a larger version");

		// Caption contains Picture: text and click instruction
		expect(screen.getByText("Picture:")).toBeDefined();
		expect(screen.getByText("Alt text")).toBeDefined();
		expect(screen.getByText("Click for a larger version.")).toBeDefined();
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
		render(<Content content={markdown} />);

		// Check that iframe exists with correct src - using document.querySelector as fallback since iframe may not have accessible text
		const iframe = document.querySelector("iframe");
		expect(iframe).toBeDefined();
		expect(iframe?.getAttribute("src")).toBe("https://youtube.com/embed/test");
	});

	test("handles code block with diff syntax", () => {
		const markdown = "```diff-javascript\n+ const added = true;\n- const removed = false;\n```";
		render(<Content content={markdown} />);

		// Check for language label
		expect(screen.getByText("Diff")).toBeDefined();

		// Check that the diff lines are rendered
		expect(screen.getByText(/\+ const added = true;/)).toBeDefined();
		expect(screen.getByText(/- const removed = false;/)).toBeDefined();
	});

	test("renders tables using GFM", () => {
		const markdown = "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
		render(<Content content={markdown} />);

		const table = screen.getByRole("table");
		expect(table).toBeDefined();

		const headers = screen.getAllByRole("columnheader");
		expect(headers.length).toBe(2);
		expect(headers[0].textContent).toBe("Header 1");
	});

	test("renders blockquotes", () => {
		const markdown = "> This is a quote";
		render(<Content content={markdown} />);

		expect(screen.getByText("This is a quote")).toBeDefined();
	});

	test("renders math equations with KaTeX", () => {
		const markdown = "$x^2 + y^2 = z^2$";
		render(<Content content={markdown} />);

		// KaTeX will render the math content
		const article = screen.getByRole("article");
		expect(article.textContent).toContain("x");
	});

	test("handles empty content", () => {
		render(<Content content="" />);

		const article = screen.getByRole("article");
		expect(article).toBeDefined();
		expect(article.textContent).toBe("");
	});

	test("renders code block without language", () => {
		const markdown = "```\nplain text code\n```";
		render(<Content content={markdown} />);

		// Without language, it should render as inline code
		expect(screen.getByText(/plain text code/)).toBeDefined();
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
		render(<Content content={markdown} />);

		const article = screen.getByRole("article");
		expect(article).toBeDefined();

		const h1 = screen.getByRole("heading", { level: 1 });
		expect(h1.textContent).toBe("Main Title");

		expect(screen.getByText("bold")).toBeDefined();
		expect(screen.getByText("italic")).toBeDefined();

		const list = screen.getByRole("list");
		expect(list).toBeDefined();

		expect(screen.getByText(/Quote with/)).toBeDefined();
	});
});
