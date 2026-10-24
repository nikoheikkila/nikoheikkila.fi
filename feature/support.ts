import type { APIResponse, Page } from "@playwright/test";

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
	"About page": async (page) => {
		await page.goto("/about/", { waitUntil: "networkidle" });
	},
	"Uses page": async (page) => {
		await page.goto("/uses/", { waitUntil: "networkidle" });
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
