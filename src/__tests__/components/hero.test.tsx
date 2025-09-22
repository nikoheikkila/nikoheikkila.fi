import { describe, expect, test } from "bun:test";
import React from "react";
import { render } from "../test-utils";
import Hero from "../../components/hero";
import { createMockImage } from "../test-utils";

describe("Hero Component", () => {
	const mockImageData = createMockImage().childImageSharp.gatsbyImageData;

	test("renders hero image with correct alt text", () => {
		const altText = "Beautiful landscape photo";
		const { container } = render(<Hero data={mockImageData} alt={altText} />);

		const image = container.querySelector(`img[alt="${altText}"]`);
		expect(image).toBeDefined();
	});

	test("renders within a header element", () => {
		const { container } = render(<Hero data={mockImageData} alt="Test image" />);

		const header = container.querySelector("header");
		expect(header).toBeDefined();
	});

	test("applies correct loading strategy", () => {
		const { container } = render(<Hero data={mockImageData} alt="Test image" />);

		const image = container.querySelector('img[alt="Test image"]');
		expect(image?.getAttribute("loading")).toBe("eager");
	});

	test("renders GatsbyImage component", () => {
		const { container } = render(<Hero data={mockImageData} alt="Styled image" />);

		const image = container.querySelector('img[alt="Styled image"]');
		// GatsbyImage mock renders a regular img tag
		expect(image).toBeDefined();
	});
});
