import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
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

	// GatsbyImage mock renders a regular img tag; a decorative image has no
	// accessible name to query by, so reach for it through the container.
	test("renders the hero image as decorative with an empty alt attribute", async () => {
		const { container } = await render(<Hero data={mockImageData} />);

		const image = container.querySelector("img");

		expect(image).not.toBeNull();
		expect(image).toHaveAttribute("alt", "");
	});

	test("applies correct loading strategy", async () => {
		const { container } = await render(<Hero data={mockImageData} />);

		const image = container.querySelector("img");

		expect(image).toHaveAttribute("loading", "eager");
	});
});
