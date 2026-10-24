import { expect } from "@playwright/test";
import { Then } from "../fixtures";

Then("the visitor sees the post title as the main heading", async ({ page }) => {
	const heading = page.getByRole("heading", { level: 1 });

	await expect(heading).toBeVisible();
	await expect.poll(() => page.title()).toContain(await heading.textContent());
});
