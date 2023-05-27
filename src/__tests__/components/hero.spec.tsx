import { expect, test } from "@playwright/experimental-ct-react";
import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import Hero from "../../components/hero";

test("should display image with passed properties", async ({ mount }) => {
	const imageData: IGatsbyImageData = {
		layout: "fixed",
		width: 500,
		height: 500,
		images: {},
	};

	const component = await mount(<Hero data={imageData} alt="Cover Image" />);
	const image = component.locator('img[alt="Cover Image"]');

	await expect(image).toBeVisible();
	await expect(image).toHaveAttribute("alt", "Cover Image");
	await expect(image).toHaveAttribute("width", "500");
	await expect(image).toHaveAttribute("height", "500");
});
