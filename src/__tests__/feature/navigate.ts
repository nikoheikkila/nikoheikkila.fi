import { Page } from "@playwright/test";
import { Locator } from "@playwright/test";

export const toExternalSiteByClicking = async (
	page: Page,
	locator: Locator
): Promise<Page> => {
	const popupPromise = page.waitForEvent("popup");
	await locator.click();
	const popup = await popupPromise;
	await popup.waitForLoadState("load");

	return popup;
};

export const toInternalPageByClicking = async (
	page: Page,
	locator: Locator
): Promise<void> => {
	await Promise.all([page.waitForURL(/\//), locator.click()]);
};
