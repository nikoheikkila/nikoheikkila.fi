import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// Provider wrapper for tests
interface AllTheProvidersProps {
	children: React.ReactNode;
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
	return <>{children}</>;
};

// Custom render function
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from React Testing Library
export * from "@testing-library/react";
export { customRender as render };

// Helper to create mock GraphQL data
export const createMockSiteMetadata = () => ({
	site: {
		siteMetadata: {
			title: "Test Blog",
			description: "Test blog description",
			siteUrl: "https://example.com",
			author: {
				name: "Test Author",
			},
			rss: "/feed",
			social: [
				{ name: "github", url: "https://github.com/test" },
				{ name: "twitter", url: "https://twitter.com/test" },
			],
		},
	},
});

// Helper to create mock post data
export const createMockPost = (overrides = {}) => ({
	fields: {
		slug: "/blog/test-post",
	},
	frontmatter: {
		title: "Test Post",
		date: "2024-01-01",
		categories: ["testing", "react"],
		author: "Test Author",
		lang: "en",
		...overrides,
	},
	excerpt: "This is a test post excerpt",
	timeToRead: 5,
	html: "<p>Test post content</p>",
});

// Helper to create mock image data
export const createMockImage = () => ({
	original: {
		src: "/test-image.jpg",
		width: 800,
		height: 600,
	},
	childImageSharp: {
		gatsbyImageData: {
			layout: "fixed",
			width: 800,
			height: 600,
			images: {
				sources: [],
				fallback: {
					src: "/test-image.jpg",
					srcSet: "/test-image.jpg",
					sizes: "(max-width: 800px) 100vw, 800px",
				},
			},
		},
	},
});

// Helper to create mock location
export const createMockLocation = (pathname = "/") => ({
	pathname,
	search: "",
	hash: "",
	href: `https://example.com${pathname}`,
	origin: "https://example.com",
	protocol: "https:",
	host: "example.com",
	hostname: "example.com",
	port: "",
	state: null,
	key: "default",
});
