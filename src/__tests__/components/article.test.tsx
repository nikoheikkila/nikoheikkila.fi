import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ArticleCard, ArticleView } from "../../components/blog/article";

const createMockLocation = (pathname = "/") => ({
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
});

const createMockPost = (overrides = {}) => ({
	excerpt: "This is a test post excerpt",
	fields: {
		slug: "/blog/test-post",
	},
	frontmatter: {
		author: "Test Author",
		categories: ["testing", "react"],
		date: "2024-01-01",
		lang: "en",
		title: "Test Post",
		...overrides,
	},
	html: "<p>Test post content</p>",
	timeToRead: 5,
});

describe("ArticleCard Component", () => {
	const mockLocation = createMockLocation("/blog");

	const defaultProps = {
		categories: ["testing", "react"],
		date: "January 1, 2024",
		excerpt: "This is a test excerpt",
		location: mockLocation,
		slug: "/blog/test-article",
		timeToRead: 5,
		title: "Test Article",
	};

	test("renders article title", () => {
		render(<ArticleCard {...defaultProps} />);

		const { textContent } = screen.getByRole("heading");

		expect(textContent).toBe(defaultProps.title);
	});

	test("renders article excerpt", () => {
		render(<ArticleCard {...defaultProps} />);

		const excerpt = screen.getByText(defaultProps.excerpt);

		expect(excerpt).toBeDefined();
	});

	test("renders article date", () => {
		render(<ArticleCard {...defaultProps} />);

		const dateSpan = screen.getByText(defaultProps.date);

		expect(dateSpan).toBeDefined();
	});

	test("renders reading time when provided", () => {
		render(<ArticleCard {...defaultProps} />);

		const readingTime = screen.getByText("5 minutes read", {
			exact: false,
		});

		expect(readingTime).toBeDefined();
	});

	test("does not render reading time when zero", () => {
		render(<ArticleCard {...defaultProps} timeToRead={0} />);

		const readingTime = screen.queryByText("5 minutes read", {
			exact: false,
		});

		expect(readingTime).toBeNull();
	});

	test("renders all categories as tags", () => {
		render(<ArticleCard {...defaultProps} />);

		const firstTag = screen.getByText("#testing");
		const secondTag = screen.getByText("#react");

		expect(firstTag).toBeDefined();
		expect(secondTag).toBeDefined();
	});

	test("links to correct article URL", () => {
		render(<ArticleCard {...defaultProps} />);

		const link = screen.getByTestId("post-title");

		expect(link.getAttribute("href")).toBe(defaultProps.slug);
	});
});

describe("ArticleView Component", () => {
	const mockLocation = createMockLocation("/");

	test("renders section header", () => {
		render(<ArticleView location={mockLocation} nodes={[]} />);

		const { textContent } = screen.getByRole("heading");

		expect(textContent).toBe("Latest Articles");
	});

	test("renders multiple articles", () => {
		const mockPosts = [
			{
				...createMockPost(),
				fields: { slug: "/blog/first" },
				frontmatter: { ...createMockPost().frontmatter, title: "First Post" },
			},
			{
				...createMockPost(),
				fields: { slug: "/blog/second" },
				frontmatter: { ...createMockPost().frontmatter, title: "Second Post" },
			},
			{
				...createMockPost(),
				fields: { slug: "/blog/third" },
				frontmatter: { ...createMockPost().frontmatter, title: "Third Post" },
			},
		];

		render(<ArticleView location={mockLocation} nodes={mockPosts} />);

		const titles = screen.getAllByRole("heading");
		const titleTexts = Array.from(titles).map((title) => title.textContent);

		expect(titleTexts).toContain("First Post");
		expect(titleTexts).toContain("Second Post");
		expect(titleTexts).toContain("Third Post");
	});

	test("handles empty node list", () => {
		render(<ArticleView location={mockLocation} nodes={[]} />);

		const { textContent } = screen.getByRole("heading");
		const articles = screen.queryAllByTestId("post-title");

		expect(textContent).toBe("Latest Articles");
		expect(articles.length).toBe(0);
	});

	test("handles nodes with missing data gracefully", () => {
		const incompletePost = {
			fields: { slug: "/test" },
			frontmatter: { title: "Incomplete Post" },
		};

		render(<ArticleView location={mockLocation} nodes={[incompletePost]} />);

		const titles = Array.from(screen.getAllByRole("heading")).map((title) => title.textContent);

		expect(titles).toContain("Incomplete Post");
	});
});
