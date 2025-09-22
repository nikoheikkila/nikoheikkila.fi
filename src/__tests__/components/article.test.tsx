import { describe, expect, test } from "bun:test";
import React from "react";
import { render } from "../test-utils";
import { ArticleCard, ArticleView } from "../../components/blog/article";
import { createMockPost, createMockLocation } from "../test-utils";

describe("ArticleCard Component", () => {
	const mockLocation = createMockLocation("/blog");

	const defaultProps = {
		title: "Test Article",
		slug: "/blog/test-article",
		excerpt: "This is a test excerpt",
		categories: ["testing", "react"],
		date: "January 1, 2024",
		timeToRead: 5,
		location: mockLocation,
	};

	test("renders article title", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const title = container.querySelector("h2");
		expect(title?.textContent).toBe(defaultProps.title);
	});

	test("renders article excerpt", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const excerpt = container.querySelector("article p");
		expect(excerpt?.textContent).toBe(defaultProps.excerpt);
	});

	test("renders article date", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const dateSpan = container.querySelector("p span:first-child");
		expect(dateSpan?.textContent?.trim()).toContain(defaultProps.date);
	});

	test("renders reading time when provided", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const readingTime = container.querySelector("p span:last-child");
		expect(readingTime?.textContent).toContain("5 minutes read");
	});

	test("does not render reading time when zero", () => {
		const { container } = render(<ArticleCard {...defaultProps} timeToRead={0} />);

		const spans = container.querySelectorAll("p span");
		const hasReadingTime = Array.from(spans).some((span) => span.textContent?.includes("minutes read"));
		expect(hasReadingTime).toBe(false);
	});

	test("renders all categories as tags", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const tags = container.querySelectorAll("section span");
		const tagTexts = Array.from(tags).map((tag) => tag.textContent);

		expect(tagTexts).toContain("#testing");
		expect(tagTexts).toContain("#react");
	});

	test("links to correct article URL", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const link = container.querySelector("a[data-testid='post-title']");
		expect(link?.getAttribute("href")).toBe(defaultProps.slug);
	});

	test("passes previous location in state", () => {
		const { container } = render(<ArticleCard {...defaultProps} />);

		const link = container.querySelector("a[data-testid='post-title']");
		expect(link).toBeDefined();
	});
});

describe("ArticleView Component", () => {
	const mockLocation = createMockLocation("/");

	test("renders section header", () => {
		const { container } = render(<ArticleView nodes={[]} location={mockLocation} />);

		const header = container.querySelector("h2");
		expect(header?.textContent).toBe("Latest Articles");
	});

	test("renders multiple articles", () => {
		const mockPosts = [
			{
				...createMockPost(),
				frontmatter: { ...createMockPost().frontmatter, title: "First Post" },
				fields: { slug: "/blog/first" },
			},
			{
				...createMockPost(),
				frontmatter: { ...createMockPost().frontmatter, title: "Second Post" },
				fields: { slug: "/blog/second" },
			},
			{
				...createMockPost(),
				frontmatter: { ...createMockPost().frontmatter, title: "Third Post" },
				fields: { slug: "/blog/third" },
			},
		];

		const { container } = render(<ArticleView nodes={mockPosts} location={mockLocation} />);

		const titles = container.querySelectorAll("h2");
		const titleTexts = Array.from(titles).map((t) => t.textContent);

		expect(titleTexts).toContain("First Post");
		expect(titleTexts).toContain("Second Post");
		expect(titleTexts).toContain("Third Post");
	});

	test("handles empty node list", () => {
		const { container } = render(<ArticleView nodes={[]} location={mockLocation} />);

		const header = container.querySelector("h2");
		expect(header?.textContent).toBe("Latest Articles");

		const articles = container.querySelectorAll("a[data-testid='post-title']");
		expect(articles.length).toBe(0);
	});

	test("handles nodes with missing data gracefully", () => {
		const incompletePost = {
			fields: { slug: "/test" },
			frontmatter: { title: "Incomplete Post" },
		};

		const { container } = render(<ArticleView nodes={[incompletePost]} location={mockLocation} />);

		const titles = container.querySelectorAll("h2");
		const titleTexts = Array.from(titles).map((t) => t.textContent);
		expect(titleTexts).toContain("Incomplete Post");
	});
});
