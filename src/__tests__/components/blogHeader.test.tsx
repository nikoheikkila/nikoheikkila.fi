import { describe, expect, test } from "bun:test";
import React from "react";
import BlogHeader from "../../components/blog/header";
import { render } from "./test-utils";

describe("BlogHeader Component", () => {
	test("renders blog title", () => {
		const title = "My Awesome Blog";
		const { container } = render(<BlogHeader title={title} />);

		const heading = container.querySelector("h1");
		expect(heading?.textContent).toBe(title);
	});

	test("renders profile image with correct alt text", () => {
		const title = "Test Blog";
		const { container } = render(<BlogHeader title={title} />);

		const image = container.querySelector(`img[alt="${title}"]`);
		expect(image).toBeDefined();
	});

	test("has home link with default url", () => {
		const { container } = render(<BlogHeader title="Blog" />);

		const homeLink = container.querySelector('a[rel="home"]');
		expect(homeLink?.getAttribute("href")).toBe("/");
	});

	test("uses custom URL when provided", () => {
		const customUrl = "/custom-home";
		const { container } = render(<BlogHeader title="Blog" url={customUrl} />);

		const homeLink = container.querySelector('a[rel="home"]');
		expect(homeLink?.getAttribute("href")).toBe(customUrl);
	});

	test("renders description with about link", () => {
		const { container } = render(<BlogHeader title="Blog" />);

		const aboutLink = container.querySelector('a[href="/about"]');
		expect(aboutLink).toBeDefined();
		expect(aboutLink?.textContent).toContain("the longer story of me");
	});

	test("renders subscribe to feed link", () => {
		const { container } = render(<BlogHeader title="Blog" />);

		const feedLink = container.querySelector('a[href="/feed"]');
		expect(feedLink).toBeDefined();
		expect(feedLink?.textContent).toContain("subscribe to my feed");
	});

	test("contains welcome message", () => {
		const { container } = render(<BlogHeader title="Blog" />);

		const description = container.querySelector("section p");
		expect(description?.textContent).toContain("Hello, traveller");
	});
});
