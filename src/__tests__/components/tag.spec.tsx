import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import Tag from "../../components/tag";

test("should display with title", async ({ mount }) => {
	const component = await mount(<Tag title="development" />);

	await expect(component).toContainText("#development");
});

test("should display with custom prefix", async ({ mount }) => {
	const component = await mount(<Tag title="development" prefix="!" />);

	await expect(component).toContainText("!development");
});
