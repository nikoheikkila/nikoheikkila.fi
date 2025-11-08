import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
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

	test("renders article title", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const heading = page.getByRole("heading");
		await expect.element(heading).toHaveTextContent(defaultProps.title);
	});

	test("renders article excerpt", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const excerpt = page.getByText(defaultProps.excerpt);
		await expect.element(excerpt).toBeInTheDocument();
	});

	test("renders article date", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const dateSpan = page.getByText(defaultProps.date);
		await expect.element(dateSpan).toBeInTheDocument();
	});

	test("renders reading time when provided", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const readingTime = page.getByText("5 minutes read", {
			exact: false,
		});
		await expect.element(readingTime).toBeInTheDocument();
	});

	test("does not render reading time when zero", async () => {
		await render(<ArticleCard {...defaultProps} timeToRead={0} />);

		const readingTime = page.getByText("5 minutes read", {
			exact: false,
		});
		await expect.element(readingTime).not.toBeInTheDocument();
	});

	test("renders all categories as tags", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const firstTag = page.getByText("#testing");
		const secondTag = page.getByText("#react");

		await expect.element(firstTag).toBeInTheDocument();
		await expect.element(secondTag).toBeInTheDocument();
	});

	test("links to correct article URL", async () => {
		await render(<ArticleCard {...defaultProps} />);

		const link = page.getByTestId("post-title");
		await expect.element(link).toHaveAttribute("href", defaultProps.slug);
	});
});

describe("ArticleView Component", () => {
	const mockLocation = createMockLocation("/");

	test("renders section header", async () => {
		await render(<ArticleView location={mockLocation} nodes={[]} />);

		const heading = page.getByRole("heading");
		await expect.element(heading).toHaveTextContent("Latest Articles");
	});

	test("renders multiple articles", async () => {
		const mockPosts = [
			{
				...createMockPost(),
				fields: { slug: "/blog/first" },
				frontmatter: {
					...createMockPost().frontmatter,
					title: "First Post",
				},
			},
			{
				...createMockPost(),
				fields: { slug: "/blog/second" },
				frontmatter: {
					...createMockPost().frontmatter,
					title: "Second Post",
				},
			},
			{
				...createMockPost(),
				fields: { slug: "/blog/third" },
				frontmatter: {
					...createMockPost().frontmatter,
					title: "Third Post",
				},
			},
		];

		await render(<ArticleView location={mockLocation} nodes={mockPosts} />);

		const firstPost = page.getByText("First Post");
		const secondPost = page.getByText("Second Post");
		const thirdPost = page.getByText("Third Post");

		await expect.element(firstPost).toBeInTheDocument();
		await expect.element(secondPost).toBeInTheDocument();
		await expect.element(thirdPost).toBeInTheDocument();
	});

	test("handles empty node list", async () => {
		await render(<ArticleView location={mockLocation} nodes={[]} />);

		const heading = page.getByRole("heading");
		await expect.element(heading).toHaveTextContent("Latest Articles");

		const articles = page.getByTestId("post-title");
		await expect.element(articles).not.toBeInTheDocument();
	});

	test("handles nodes with missing data gracefully", async () => {
		const incompletePost = {
			fields: { slug: "/test" },
			frontmatter: { title: "Incomplete Post" },
		};

		await render(<ArticleView location={mockLocation} nodes={[incompletePost]} />);

		const postTitle = page.getByText("Incomplete Post");
		await expect.element(postTitle).toBeInTheDocument();
	});
});
