import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Hero from "../../components/hero";
import type { IGatsbyImageData } from "gatsby-plugin-image";

const createMockImage = (): IGatsbyImageData => ({
	height: 600,
	images: {
		fallback: {
			sizes: "(max-width: 800px) 100vw, 800px",
			src: "/test-image.jpg",
			srcSet: "/test-image.jpg",
		},
		sources: [],
	},
	layout: "fixed",
	width: 800,
});

describe("Hero Component", () => {
	const mockImageData = createMockImage();

	test("renders hero image with correct alt text", async () => {
		const altText = "Beautiful landscape photo";
		await render(<Hero alt={altText} data={mockImageData} />);

		const image = page.getByAltText(altText);
		await expect.element(image).toBeInTheDocument();
	});

	test("renders within a header element", async () => {
		await render(<Hero alt="Test image" data={mockImageData} />);

		const header = page.getByRole("banner");
		await expect.element(header).toBeInTheDocument();
	});

	test("applies correct loading strategy", async () => {
		await render(<Hero alt="Test image" data={mockImageData} />);

		const image = page.getByAltText("Test image");
		await expect.element(image).toHaveAttribute("loading", "eager");
	});

	test("renders GatsbyImage component", async () => {
		await render(<Hero alt="Styled image" data={mockImageData} />);

		// GatsbyImage mock renders a regular img tag
		const image = page.getByAltText("Styled image");
		await expect.element(image).toBeInTheDocument();
	});
});
