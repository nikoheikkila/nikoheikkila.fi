import type { Page } from "@playwright/test";
import type { Locator } from "@playwright/test";

export const toExternalSiteByClicking = async (page: Page, locator: Locator): Promise<Page> => {
	const popupPromise = page.waitForEvent("popup");
	await locator.click();
	const popup = await popupPromise;
	await popup.waitForLoadState("load");

	return popup;
};

export const toInternalPageByClicking = async (page: Page, locator: Locator): Promise<void> => {
	await Promise.all([page.waitForURL(/\//), locator.click()]);
};

export const openBurgerMenu = async (page: Page): Promise<void> => {
	const nav = page.getByRole("navigation", { name: /main/i });
	await nav.getByRole("button", { name: /open menu/i }).click();
};

export const searchInput = (page: Page): Locator => {
	const searchForm = page.getByRole("search");
	return searchForm.getByRole("searchbox", { name: /search posts/i });
};
