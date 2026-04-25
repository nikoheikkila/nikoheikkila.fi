import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import { Cover } from "../../../components/blog/cover";

describe("Cover Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<Cover title="My Blog" url="/" />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("wrapping link has an accessible name from aria-label", async () => {
		await render(<Cover title="My Blog" url="/" />);

		const link = page.getByRole("link", { name: /my blog/i });
		await expect.element(link).toBeInTheDocument();
	});

	test("cover image renders inside a link", async () => {
		const { container } = await render(<Cover title="My Blog" url="/" />);

		const link = container.querySelector("a");
		expect(link).not.toBeNull();
		const img = link?.querySelector("img");
		expect(img).not.toBeNull();
	});
});
