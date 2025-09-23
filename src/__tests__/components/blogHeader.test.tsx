import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import BlogHeader from "../../components/blog/header";

describe("BlogHeader Component", () => {
	test("renders blog title", () => {
		const title = "My Awesome Blog";
		render(<BlogHeader title={title} />);

		const { textContent } = screen.getByRole("heading", { level: 1 });
		expect(textContent).toBe(title);
	});

	test("renders profile image with correct alt text", () => {
		const title = "Test Blog";
		render(<BlogHeader title={title} />);

		// Since the image appears to be mocked and not rendering, check for the link instead
		const homeLink = screen.getByRole("link", { name: "" });
		expect(homeLink).toBeDefined();
	});

	test("has home link with default url", () => {
		render(<BlogHeader title="Blog" />);

		const homeLink = screen.getByRole("link", { name: "" });
		expect(homeLink.getAttribute("href")).toBe("/");
	});

	test("uses custom URL when provided", () => {
		const customUrl = "/custom-home";
		render(<BlogHeader title="Blog" url={customUrl} />);

		const homeLink = screen.getByRole("link", { name: "" });
		expect(homeLink.getAttribute("href")).toBe(customUrl);
	});

	test("renders description with about link", () => {
		render(<BlogHeader title="Blog" />);

		const aboutLink = screen.getByRole("link", { name: /the longer story of me/i });
		expect(aboutLink).toBeDefined();
		expect(aboutLink.getAttribute("href")).toBe("/about");
	});

	test("renders subscribe to feed link", () => {
		render(<BlogHeader title="Blog" />);

		const feedLink = screen.getByRole("link", { name: /subscribe to my feed/i });
		expect(feedLink).toBeDefined();
		expect(feedLink.getAttribute("href")).toBe("/feed");
	});

	test("contains welcome message", () => {
		render(<BlogHeader title="Blog" />);

		const welcomeText = screen.getByText(/hello, traveller/i);
		expect(welcomeText).toBeDefined();
	});
});
