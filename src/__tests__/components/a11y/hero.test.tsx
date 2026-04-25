import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import React from "react";
import Hero from "../../../components/hero";
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

describe("Hero Accessibility", () => {
	test("passes axe scan", async () => {
		const { container } = await render(<Hero alt="A beautiful landscape" data={createMockImage()} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("image has alt text matching the alt prop", async () => {
		const altText = "A beautiful landscape photo";
		await render(<Hero alt={altText} data={createMockImage()} />);

		const image = page.getByAltText(altText);
		await expect.element(image).toBeInTheDocument();
	});
});
