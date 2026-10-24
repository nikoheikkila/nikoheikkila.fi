import type { APIResponse, Page, Response } from "@playwright/test";

export const lookup = <T>(registry: Record<string, T>, name: string): T => {
	const entry = registry[name];

	if (entry === undefined) {
		throw new Error(`Unknown name "${name}". Known names: ${Object.keys(registry).join(", ")}`);
	}

	return entry;
};

const openers: Record<string, (page: Page) => Promise<void>> = {
	"home page": async (page) => {
		await page.goto("/", { waitUntil: "networkidle" });
	},
	"second index page": async (page) => {
		await page.goto("/2/", { waitUntil: "networkidle" });
	},
	"last index page": async (page) => {
		await page.goto("/", { waitUntil: "networkidle" });
		const nextPage = page.getByRole("link", { name: /Next Page/ });

		while (await nextPage.isVisible()) {
			const href = await nextPage.getAttribute("href");
			await page.goto(href ?? "/", { waitUntil: "networkidle" });
		}
	},
	"About page": async (page) => {
		await page.goto("/about/", { waitUntil: "networkidle" });
	},
	"Uses page": async (page) => {
		await page.goto("/uses/", { waitUntil: "networkidle" });
	},
	"middle post": async (page) => {
		await page.goto("/", { waitUntil: "networkidle" });
		const secondPostLink = page.getByRole("article").nth(1).getByRole("link").first();
		await Promise.all([page.waitForURL(/\/blog\//), secondPostLink.click()]);
	},
	"oldest post": async (page) => {
		await openers["last index page"]?.(page);
		const oldestPostLink = page.getByRole("article").last().getByRole("link").first();
		await Promise.all([page.waitForURL(/\/blog\//), oldestPostLink.click()]);
	},
	"latest post": async (page) => {
		await page.goto("/", { waitUntil: "networkidle" });
		const latestPostLink = page.getByRole("article").first().getByRole("link").first();
		await Promise.all([page.waitForURL(/\/blog\//), latestPostLink.click()]);
	},
};

export const openPage = async (page: Page, name: string): Promise<void> => lookup(openers, name)(page);

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
