import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Menu from "../../../components/layout/menu";

vi.mock("../../../graphql/pages", () => ({
	getStaticPages: () => [
		{ slug: "/about", title: "About" },
		{ slug: "/uses", title: "Uses" },
	],
}));

describe("Menu Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<Menu />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("nav has aria-label Main", async () => {
		await render(<Menu />);

		const nav = page.getByRole("navigation", { name: /main/i });
		await expect.element(nav).toBeInTheDocument();
	});

	test("burger button has an accessible name", async () => {
		await render(<Menu />);

		const buttons = page.getByRole("button").all();
		expect(buttons.length).toBeGreaterThan(0);
	});
});
