import type { APIResponse, Locator, Page, Response } from "@playwright/test";

export const lookup = <T>(registry: Record<string, T>, name: string): T => {
	const entry = registry[name];

	if (entry === undefined) {
		throw new Error(`Unknown name "${name}". Known names: ${Object.keys(registry).join(", ")}`);
	}

	return entry;
};

export const viewports: Record<string, { width: number; height: number }> = {
	desktop: { width: 1280, height: 800 },
	phone: { width: 375, height: 667 },
};

const goto = async (page: Page, path: string): Promise<void> => {
	await page.goto(path, { waitUntil: "networkidle" });
};

const gotoLastIndexPage = async (page: Page): Promise<void> => {
	await goto(page, "/");
	const nextPage = page.getByRole("link", { name: /Next Page/ });

	while (await nextPage.isVisible()) {
		await goto(page, (await nextPage.getAttribute("href")) ?? "/");
	}
};

const openPost = async (page: Page, article: Locator): Promise<void> => {
	await Promise.all([page.waitForURL(/\/blog\//), article.getByRole("link").first().click()]);
};

const openers: Record<string, (page: Page) => Promise<void>> = {
	"home page": (page) => goto(page, "/"),
	"second index page": (page) => goto(page, "/2/"),
	"last index page": gotoLastIndexPage,
	"About page": (page) => goto(page, "/about/"),
	"Uses page": (page) => goto(page, "/uses/"),
	"latest post": async (page) => {
		await goto(page, "/");
		await openPost(page, page.getByRole("article").first());
	},
	"middle post": async (page) => {
		await goto(page, "/");
		await openPost(page, page.getByRole("article").nth(1));
	},
	"oldest post": async (page) => {
		await gotoLastIndexPage(page);
		await openPost(page, page.getByRole("article").last());
	},
};

export const openPage = async (page: Page, name: string): Promise<void> => lookup(openers, name)(page);

export const sidebarMenu = (page: Page) => page.getByRole("navigation", { name: "Main" }).getByRole("link").first();

export const toggleSidebarMenu = async (page: Page): Promise<void> => {
	await page.getByRole("button", { name: /(Open|Close) menu/ }).click();
};

export class Tabs {
	private popup: Page | undefined;

	public remember(page: Page): void {
		this.popup = page;
	}

	public get opened(): Page {
		if (this.popup === undefined) {
			throw new Error("No new tab has been opened");
		}

		return this.popup;
	}
}

export class Responses {
	private response: APIResponse | undefined;

	public remember(response: APIResponse): void {
		this.response = response;
	}

	public get received(): APIResponse {
		if (this.response === undefined) {
			throw new Error("No response has been fetched");
		}

		return this.response;
	}
}

export class Destination {
	private href: string | undefined;

	public remember(href: string): void {
		this.href = href;
	}

	public get expected(): string {
		if (this.href === undefined) {
			throw new Error("No destination has been remembered");
		}

		return this.href;
	}
}

export class Visit {
	private response: Response | null | undefined;

	public remember(response: Response | null): void {
		this.response = response;
	}

	public get status(): number {
		if (this.response === undefined || this.response === null) {
			throw new Error("No page has been visited");
		}

		return this.response.status();
	}
}
