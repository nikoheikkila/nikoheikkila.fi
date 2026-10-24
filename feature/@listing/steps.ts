import { expect } from "@playwright/test";
import { Then } from "../fixtures";

Then("the visitor sees {int} posts", async ({ page }, count: number) => {
	await expect(page.getByRole("article")).toHaveCount(count);
});
