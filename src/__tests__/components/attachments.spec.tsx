import React from "react";
import PostAttachments from "../../components/post/attachments";
import { expect, test } from "@playwright/experimental-ct-react";

const BASE_URL = "https://localhost:8000";

test("should display link back to posts catalog", async ({ mount }) => {
	const previousUrl = BASE_URL + "/1";

	const component = await mount(
		<PostAttachments
			previous={previousUrl}
			urls={{
				edit: "",
				history: "",
			}}
		/>,
	);

	const backLink = component.locator('a[rel="back"]');

	await expect(backLink).toHaveText("Back to posts");
	await expect(backLink).toHaveAttribute("href", previousUrl);
});

test("should display link for editing the page", async ({ mount }) => {
	const editURL = BASE_URL + "/slug/edit";

	const component = await mount(
		<PostAttachments
			previous=""
			urls={{
				edit: editURL,
				history: "",
			}}
		/>,
	);

	const editLink = component.locator("text=Edit Page");

	await expect(editLink).toBeVisible();
	await expect(editLink).toHaveAttribute("href", editURL);
});

test("should display link for viewing page history", async ({ mount }) => {
	const historyURL = BASE_URL + "/slug/history";

	const component = await mount(
		<PostAttachments
			previous=""
			urls={{
				edit: "",
				history: historyURL,
			}}
		/>,
	);

	const historyLink = component.locator("text=View History");

	await expect(historyLink).toBeVisible();
	await expect(historyLink).toHaveAttribute("href", historyURL);
});
