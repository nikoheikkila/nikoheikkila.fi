import { describe, expect, test } from "vitest";
import { render } from "vitest-browser-react";
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
		const { container } = await render(<Hero data={createMockImage()} />);

		await expect(container).toHaveNoA11yViolations();
	});

	test("image is decorative and exposes no accessible name", async () => {
		const { container } = await render(<Hero data={createMockImage()} />);

		const image = container.querySelector("img");

		expect(image).not.toBeNull();
		expect(image).toHaveAttribute("alt", "");
		expect(image).not.toHaveAccessibleName();
	});
});
