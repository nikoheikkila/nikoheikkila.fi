import { describe, expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Layout from "../../../components/layout/layout";
import { LayoutType } from "../../../components/layout/types";

vi.mock("../../../search/components/useSearch", () => ({
	useSearch: () => ({
		query: "",
		setQuery: vi.fn(),
		results: [],
		isModalOpen: false,
		submitSearch: vi.fn(),
		closeModal: vi.fn(),
	}),
}));

describe("Layout Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(
			<Layout title="Test page" type={LayoutType.LIST}>
				{[<p key="1">Content</p>]}
			</Layout>,
		);

		await expect(container).toHaveNoA11yViolations();
	});

	test("skip link targets main-content anchor", async () => {
		await render(
			<Layout title="Test page" type={LayoutType.LIST}>
				{[<p key="1">Content</p>]}
			</Layout>,
		);

		const skipLink = page.getByRole("link", { name: /skip to main content/i });
		await expect.element(skipLink).toHaveAttribute("href", "#main-content");
	});

	test("main landmark has id main-content", async () => {
		const { container } = await render(
			<Layout title="Test page" type={LayoutType.LIST}>
				{[<p key="1">Content</p>]}
			</Layout>,
		);

		const main = container.querySelector("main#main-content");
		expect(main).not.toBeNull();
	});

	test("skip link is the first focusable element in the DOM", async () => {
		const { container } = await render(
			<Layout title="Test page" type={LayoutType.LIST}>
				{[<p key="1">Content</p>]}
			</Layout>,
		);

		const focusable = container.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
		);
		expect(focusable[0]).toHaveProperty("href", expect.stringMatching(/#main-content$/));
	});
});
