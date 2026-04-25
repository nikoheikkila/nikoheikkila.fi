import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import { ArticleCard } from "../../../components/blog/article";

const createMockLocation = (pathname = "/"): Location =>
	({
		hash: "",
		host: "example.com",
		hostname: "example.com",
		href: `https://example.com${pathname}`,
		key: "default",
		origin: "https://example.com",
		pathname,
		port: "",
		protocol: "https:",
		search: "",
		state: null,
		ancestorOrigins: {} as DOMStringList,
		assign: () => {},
		reload: () => {},
		replace: () => {},
	}) as Location;

const defaultProps = {
	date: "January 1, 2024",
	excerpt: "This is a test excerpt",
	location: createMockLocation("/blog"),
	slug: "/blog/test-article",
	timeToRead: 5,
	title: "Test Article Title",
};

describe("ArticleCard Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<ArticleCard {...defaultProps} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("article contains a heading", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const heading = page.getByRole("heading");
		await expect.element(heading).toBeInTheDocument();
	});

	test("title link has an accessible name including the post title", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const link = page.getByRole("link", { name: defaultProps.title });
		await expect.element(link).toBeInTheDocument();
	});
});
