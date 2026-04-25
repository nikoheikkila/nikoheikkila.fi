import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import React from "react";
import Content from "../../../components/post/content";

describe("Content Accessibility", () => {
	test("passes axe scan for simple markdown", async () => {
		const { container } = await render(<Content content="A simple paragraph." />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("passes axe scan when headings are in correct order", async () => {
		const markdown = "# Heading 1\n\n## Heading 2\n\n### Heading 3\n\nSome content.";
		const { container } = await render(<Content content={markdown} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("passes axe scan for code block with language label", async () => {
		const markdown = "```typescript\nconst x: number = 42;\n```";
		const { container } = await render(<Content content={markdown} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("passes axe scan for image with alt text", async () => {
		const markdown = "![A descriptive alt text](https://example.com/image.jpg)";
		const { container } = await render(<Content content={markdown} />);

		// color-contrast is suppressed: the photoframe's dark background requires
		// global CSS (main.scss) to set a light foreground color. E2E covers this.
		await expect(container).toHaveNoA11yViolations({
			rules: { "color-contrast": { enabled: false } },
		});
	});
});
