import { describe, expect, test } from "bun:test";
import { render, screen } from "@testing-library/react";
import React from "react";
import Hero from "../../components/hero";

const createMockImage = () => ({
	childImageSharp: {
		gatsbyImageData: {
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
		},
	},
	original: {
		height: 600,
		src: "/test-image.jpg",
		width: 800,
	},
});

describe("Hero Component", () => {
	const mockImageData = createMockImage().childImageSharp.gatsbyImageData;

	test("renders hero image with correct alt text", () => {
		const altText = "Beautiful landscape photo";
		render(<Hero alt={altText} data={mockImageData} />);

		const image = screen.getByAltText(altText);
		expect(image).toBeDefined();
	});

	test("renders within a header element", () => {
		render(<Hero alt="Test image" data={mockImageData} />);

		const header = screen.getByRole("banner");
		expect(header).toBeDefined();
	});

	test("applies correct loading strategy", () => {
		render(<Hero alt="Test image" data={mockImageData} />);

		const image = screen.getByAltText("Test image");
		expect(image.getAttribute("loading")).toBe("eager");
	});

	test("renders GatsbyImage component", () => {
		render(<Hero alt="Styled image" data={mockImageData} />);

		// GatsbyImage mock renders a regular img tag
		const image = screen.getByAltText("Styled image");
		expect(image).toBeDefined();
	});
});
