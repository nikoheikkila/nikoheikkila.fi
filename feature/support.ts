import type { Locator, Page, Response } from "@playwright/test";

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

export const goto = (page: Page, path: string): Promise<Response | null> =>
	page.goto(path, { waitUntil: "networkidle" });

const links: Record<string, (page: Page) => Locator> = {
	Home: (page) => page.getByRole("link", { name: "Home" }),
	"next index page": (page) => page.getByRole("link", { name: /Next Page/ }),
	"previous index page": (page) => page.getByRole("link", { name: /Previous Page/ }),
	"older post": (page) => page.locator('a[rel="prev"]'),
	"newer post": (page) => page.locator('a[rel="next"]'),
	"RSS feed": (page) => page.getByRole("link", { name: "RSS feed" }),
	"footer RSS": (page) => page.getByRole("contentinfo").getByRole("link", { name: "RSS" }),
};

export const link = (page: Page, name: string): Locator => lookup(links, name)(page);

const gotoLastIndexPage = async (page: Page): Promise<void> => {
	await goto(page, "/");
	const nextPage = link(page, "next index page");

	while (await nextPage.isVisible()) {
		await goto(page, (await nextPage.getAttribute("href")) ?? "/");
	}
};

const openPost = async (page: Page, article: Locator): Promise<void> => {
	await Promise.all([page.waitForURL(/\/blog\//), article.getByRole("link").first().click()]);
};

const openers: Record<string, (page: Page) => Promise<unknown>> = {
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

export const openPage = async (page: Page, name: string): Promise<void> => {
	await lookup(openers, name)(page);
};

export const sidebarMenu = (page: Page) => page.getByRole("navigation", { name: "Main" }).getByRole("link").first();

export const toggleSidebarMenu = async (page: Page): Promise<void> => {
	await page.getByRole("button", { name: /(Open|Close) menu/ }).click();
};

export class Remembered<T> {
	private remembered: { value: T } | undefined;

	public constructor(private readonly description: string) {}

	public remember(value: T): void {
		this.remembered = { value };
	}

	public get value(): T {
		if (this.remembered === undefined) {
			throw new Error(`No ${this.description} has been remembered`);
		}

		return this.remembered.value;
	}
}
