import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Content from "../../components/post/content";

describe("Content Component", () => {
	test("renders simple markdown content", async () => {
		const markdown = "This is a simple paragraph";
		await render(<Content content={markdown} />);

		const article = page.getByRole("article");
		await expect.element(article).toBeInTheDocument();

		const paragraph = page.getByText("This is a simple paragraph");
		await expect.element(paragraph).toBeInTheDocument();
	});

	test("renders headings correctly", async () => {
		const markdown = "# Heading 1\n## Heading 2";
		await render(<Content content={markdown} />);

		const h1 = page.getByRole("heading", { level: 1 });
		const h2 = page.getByRole("heading", { level: 2 });

		await expect.element(h1).toHaveTextContent("Heading 1");
		await expect.element(h2).toHaveTextContent("Heading 2");
	});

	test("renders lists correctly", async () => {
		const markdown = "- Item 1\n- Item 2\n- Item 3";
		await render(<Content content={markdown} />);

		const listItems = page.getByRole("listitem").all();
		expect(listItems).toHaveLength(3);

		const firstItem = page.getByText("Item 1");
		await expect.element(firstItem).toBeInTheDocument();
	});

	test("renders code blocks with syntax highlighting", async () => {
		const markdown = "```javascript\nconst test = 'hello';\n```";
		await render(<Content content={markdown} />);

		// Check for language label
		const languageLabel = page.getByText("JavaScript");
		await expect.element(languageLabel).toBeInTheDocument();

		// Check that syntax highlighter renders the code
		const constKeyword = page.getByText("const");
		const helloString = page.getByText("'hello'");

		await expect.element(constKeyword).toBeInTheDocument();
		await expect.element(helloString).toBeInTheDocument();
	});

	test("renders inline code", async () => {
		const markdown = "This is `inline code` in text";
		await render(<Content content={markdown} />);

		const inlineCode = page.getByText("inline code");
		await expect.element(inlineCode).toBeInTheDocument();
	});

	test("renders links correctly", async () => {
		const markdown = "[Link text](https://example.com)";
		await render(<Content content={markdown} />);

		const link = page.getByRole("link", { name: "Link text" });
		await expect.element(link).toBeInTheDocument();
		await expect.element(link).toHaveAttribute("href", "https://example.com");
	});

	test("renders images with captions", async () => {
		const markdown = "![Alt text](https://example.com/image.jpg)";
		await render(<Content content={markdown} />);

		// Images are wrapped in a link
		const photoframeLink = page.getByRole("link");
		await expect.element(photoframeLink).toBeInTheDocument();
		await expect.element(photoframeLink).toHaveAttribute("href", "https://example.com/image.jpg");

		const img = page.getByAltText("Alt text");
		await expect.element(img).toHaveAttribute("src", "https://example.com/image.jpg");
		await expect.element(img).toHaveAttribute("title", "Click for a larger version");

		// Caption contains Picture: text and click instruction
		const pictureLabel = page.getByText("Picture:");
		const altTextLabel = page.getByText("Alt text");
		const clickInstruction = page.getByText("Click for a larger version.");

		await expect.element(pictureLabel).toBeInTheDocument();
		await expect.element(altTextLabel).toBeInTheDocument();
		await expect.element(clickInstruction).toBeInTheDocument();
	});

	test("handles images without alt text", async () => {
		const consoleSpy = vi.spyOn(console, "warn");
		const markdown = "![](https://example.com/image.jpg)";

		await render(<Content content={markdown} />);

		expect(consoleSpy).toHaveBeenCalledWith(
			"Alternative text not specified for image with URL: https://example.com/image.jpg",
		);
	});

	test("renders iframes for videos", async () => {
		const markdown = '<iframe src="https://youtube.com/embed/test"></iframe>';
		await render(<Content content={markdown} />);

		// Check that iframe exists with correct src
		const article = page.getByRole("article");
		const articleElement = article.element();
		const iframe = articleElement.querySelector("iframe");

		expect(iframe).toBeDefined();
		expect(iframe?.getAttribute("src")).toBe("https://youtube.com/embed/test");
	});

	test("handles code block with diff syntax", async () => {
		const markdown = "```diff-javascript\n+ const added = true;\n- const removed = false;\n```";
		await render(<Content content={markdown} />);

		// Check for language label
		const diffLabel = page.getByText("Diff");
		await expect.element(diffLabel).toBeInTheDocument();

		// Check that the diff lines are rendered
		const addedLine = page.getByText(/\+ const added = true;/);
		const removedLine = page.getByText(/- const removed = false;/);

		await expect.element(addedLine).toBeInTheDocument();
		await expect.element(removedLine).toBeInTheDocument();
	});

	test("renders tables using GFM", async () => {
		const markdown = "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
		await render(<Content content={markdown} />);

		// Just verify table exists - the markdown library handles table rendering
		const article = page.getByRole("article");
		await expect.element(article).toBeInTheDocument();

		// Check for table content as text since GFM table rendering might be async
		const headerText = page.getByText("Header 1");
		await expect.element(headerText).toBeInTheDocument();
	});

	test("renders blockquotes", async () => {
		const markdown = "> This is a quote";
		await render(<Content content={markdown} />);

		const quote = page.getByText("This is a quote");
		await expect.element(quote).toBeInTheDocument();
	});

	test("renders math equations with KaTeX", async () => {
		const markdown = "$x^2 + y^2 = z^2$";
		await render(<Content content={markdown} />);

		// KaTeX will render the math content
		const article = page.getByRole("article");
		await expect.element(article).toBeInTheDocument();

		const articleElement = article.element();
		expect(articleElement.textContent).toContain("x");
	});

	test("handles empty content", async () => {
		await render(<Content content="" />);

		const article = page.getByRole("article");
		await expect.element(article).toBeInTheDocument();

		const articleElement = article.element();
		expect(articleElement.textContent).toBe("");
	});

	test("renders code block without language", async () => {
		const markdown = "```\nplain text code\n```";
		await render(<Content content={markdown} />);

		// Without language, it should render as inline code
		const codeText = page.getByText(/plain text code/);
		await expect.element(codeText).toBeInTheDocument();
	});

	test("handles complex nested markdown", async () => {
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
		await render(<Content content={markdown} />);

		const article = page.getByRole("article");
		await expect.element(article).toBeInTheDocument();

		const h1 = page.getByRole("heading", { level: 1 });
		await expect.element(h1).toHaveTextContent("Main Title");

		const boldText = page.getByText("bold");
		const italicText = page.getByText("italic");

		await expect.element(boldText).toBeInTheDocument();
		await expect.element(italicText).toBeInTheDocument();

		const list = page.getByRole("list");
		await expect.element(list).toBeInTheDocument();

		const quoteText = page.getByText(/Quote with/);
		await expect.element(quoteText).toBeInTheDocument();
	});
});
