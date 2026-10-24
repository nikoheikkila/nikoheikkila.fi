import { expect, type Page } from "@playwright/test";
import { Then } from "../fixtures";

const coverImage = (page: Page) => page.getByRole("banner").getByRole("presentation");

Then("the visitor sees the cover image", async ({ page }) => {
	await expect(coverImage(page)).toBeVisible();
});

Then("the cover image is hidden from screen readers", async ({ page }) => {
	await expect(coverImage(page)).toHaveAttribute("alt", "");
});

Then("the cover image is loaded", async ({ page }) => {
	await expect(coverImage(page)).toHaveJSProperty("complete", true);
});
