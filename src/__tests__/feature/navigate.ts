import { Page } from "playwright";
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
    await Promise.all([page.waitForNavigation(), locator.click()]);
};