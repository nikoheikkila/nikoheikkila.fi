import { Page } from "playwright";

export const toExternalSiteByClicking = async (
    page: Page,
    selector: string
): Promise<Page> => {
    const [newPage] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator(selector).click(),
    ]);

    return newPage;
};

export const toInternalPageByClicking = async (
    page: Page,
    selector: string
): Promise<void> => {
    await Promise.all([page.waitForNavigation(), page.click(selector)]);
};
