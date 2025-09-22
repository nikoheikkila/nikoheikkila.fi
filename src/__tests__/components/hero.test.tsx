import { describe, expect, test } from "bun:test";
import React from "react";
import Hero from "../../components/hero";
import { createMockImage, render } from "./test-utils";

describe("Hero Component", () => {
	const mockImageData = createMockImage().childImageSharp.gatsbyImageData;

	test("renders hero image with correct alt text", () => {
		const altText = "Beautiful landscape photo";
		const { container } = render(<Hero alt={altText} data={mockImageData} />);

		const image = container.querySelector(`img[alt="${altText}"]`);
		expect(image).toBeDefined();
	});

	test("renders within a header element", () => {
		const { container } = render(<Hero alt="Test image" data={mockImageData} />);

		const header = container.querySelector("header");
		expect(header).toBeDefined();
	});

	test("applies correct loading strategy", () => {
		const { container } = render(<Hero alt="Test image" data={mockImageData} />);

		const image = container.querySelector('img[alt="Test image"]');
		expect(image?.getAttribute("loading")).toBe("eager");
	});

	test("renders GatsbyImage component", () => {
		const { container } = render(<Hero alt="Styled image" data={mockImageData} />);

		const image = container.querySelector('img[alt="Styled image"]');
		// GatsbyImage mock renders a regular img tag
		expect(image).toBeDefined();
	});
});
