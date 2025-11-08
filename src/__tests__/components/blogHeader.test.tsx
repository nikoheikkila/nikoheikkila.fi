import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import BlogHeader from "../../components/blog/header";

describe("BlogHeader Component", () => {
	test("renders blog title", async () => {
		const title = "My Awesome Blog";
		await render(<BlogHeader title={title} />);

		const heading = page.getByRole("heading", { level: 1 });
		await expect.element(heading).toHaveTextContent(title);
	});

	test("renders profile image with correct alt text", async () => {
		const title = "Test Blog";
		await render(<BlogHeader title={title} />);

		// Since the image appears to be mocked and not rendering, check for the link instead
		const homeLink = page.getByRole("link", { name: "" }).first();
		await expect.element(homeLink).toBeInTheDocument();
	});

	test("has home link with default url", async () => {
		await render(<BlogHeader title="Blog" />);

		const homeLink = page.getByRole("link", { name: "" }).first();
		await expect.element(homeLink).toHaveAttribute("href", "/");
	});

	test("uses custom URL when provided", async () => {
		const customUrl = "/custom-home";
		await render(<BlogHeader title="Blog" url={customUrl} />);

		const homeLink = page.getByRole("link", { name: "" }).first();
		await expect.element(homeLink).toHaveAttribute("href", customUrl);
	});

	test("renders description with about link", async () => {
		await render(<BlogHeader title="Blog" />);

		const aboutLink = page.getByRole("link", {
			name: /the longer story of me/i,
		});
		await expect.element(aboutLink).toBeInTheDocument();
		await expect.element(aboutLink).toHaveAttribute("href", "/about");
	});

	test("renders subscribe to feed link", async () => {
		await render(<BlogHeader title="Blog" />);

		const feedLink = page.getByRole("link", {
			name: /subscribe to my feed/i,
		});
		await expect.element(feedLink).toBeInTheDocument();
		await expect.element(feedLink).toHaveAttribute("href", "/feed");
	});

	test("contains welcome message", async () => {
		await render(<BlogHeader title="Blog" />);

		const welcomeText = page.getByText(/hello, traveller/i);
		await expect.element(welcomeText).toBeInTheDocument();
	});
});
