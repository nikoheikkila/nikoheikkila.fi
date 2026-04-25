import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import BlogHeader from "../../../components/blog/header";

describe("BlogHeader Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<BlogHeader />);

		await expect(container).toHaveNoA11yViolations();
	});

	test.each([" the longer story of me", " subscribe to my feed"])("link %j has an accessible name", async (name) => {
		await render(<BlogHeader />);

		const link = page.getByRole("link", { name });
		await expect.element(link).toBeInTheDocument();
	});
});
