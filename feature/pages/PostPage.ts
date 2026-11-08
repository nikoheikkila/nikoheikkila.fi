import { expect, type Locator } from "@playwright/test";
import { Fixture, Then } from "playwright-bdd/decorators";
import type { test } from "../fixtures";
import { BasePage } from "./BasePage";

interface StructuredDataEntry {
	"@type": string;
	url?: string;
	itemListElement?: unknown[];
}

const pathOf = (address: string): string => new URL(address).pathname;

@Fixture<typeof test>("postPage")
export class PostPage extends BasePage {
	@Then("the visitor sees the post title as the main heading")
	public async expectTitleAsMainHeading(): Promise<void> {
		const heading = this.page.getByRole("heading", { level: 1 });

		await expect(heading).toBeVisible();
		await expect.poll(() => this.page.title()).toContain(await heading.textContent());
	}

	@Then("the visitor sees who wrote the post, when, and how long it takes to read")
	public async expectAuthorDateAndReadingTime(): Promise<void> {
		const byline = this.paragraphs.filter({ hasText: /^By .+ minutes? read$/u });

		await expect.soft(byline).toHaveText(/^By \S/u);
		await expect.soft(byline).toHaveText(/\w+ \d{1,2}, \d{4}/u);
		await expect.soft(byline).toHaveText(/\d+ minutes? read$/u);
	}

	@Then("the visitor is on a post page")
	@Then("the latest post is open in the original tab")
	public async expectPostPage(): Promise<void> {
		await expect(this.page).toHaveURL(/\/blog\//u);
	}

	@Then("the search description matches the post excerpt")
	public async expectSearchDescriptionMatchesExcerpt(): Promise<void> {
		const description = (await this.metaTag("description").getAttribute("content")) ?? "";

		expect(description).not.toBe("");
		await expect(this.main.getByText(description, { exact: true })).toBeVisible();
	}

	@Then("the link preview title matches the post heading")
	public async expectLinkPreviewTitleMatchesHeading(): Promise<void> {
		const heading = (await this.page.getByRole("heading", { level: 1 }).textContent()) ?? "";

		await expect(this.metaTag("og:title")).toHaveAttribute("content", heading);
	}

	@Then("the link preview address matches the post address")
	public async expectLinkPreviewAddressMatchesPost(): Promise<void> {
		const address = async () => pathOf((await this.metaTag("og:url").getAttribute("content")) ?? "");

		await expect.poll(address).toBe(pathOf(this.page.url()));
	}

	@Then("the link preview presents the post as an article")
	public async expectLinkPreviewArticle(): Promise<void> {
		await expect(this.metaTag("og:type")).toHaveAttribute("content", "article");
	}

	@Then("the link preview presents the page as a website")
	public async expectLinkPreviewWebsite(): Promise<void> {
		await expect(this.metaTag("og:type")).toHaveAttribute("content", "website");
	}

	@Then("the link preview author is {string}")
	public async expectLinkPreviewAuthor(author: string): Promise<void> {
		await expect(this.metaTag("article:author")).toHaveAttribute("content", author);
	}

	@Then("the link preview image is served securely")
	public async expectLinkPreviewImageOverHttps(): Promise<void> {
		await expect(this.metaTag("og:image")).toHaveAttribute("content", /^https:\/\//u);
	}

	@Then("search engines see the post as part of the website")
	public async expectWebsiteStructuredData(): Promise<void> {
		await expect(async () => {
			const website = await this.findStructuredData("WebSite");

			expect(pathOf(website?.url ?? "")).toBe(pathOf(this.page.url()));
		}).toPass();
	}

	@Then("search engines see a breadcrumb trail to the post")
	public async expectBreadcrumbStructuredData(): Promise<void> {
		await expect(async () => {
			const breadcrumbs = await this.findStructuredData("BreadcrumbList");

			expect(breadcrumbs?.itemListElement?.length).toBeGreaterThan(0);
		}).toPass();
	}

	private get main(): Locator {
		return this.page.getByRole("main");
	}

	private get paragraphs(): Locator {
		return this.main.getByRole("paragraph");
	}

	// The schema script is injected with ScriptStrategy.idle, so it can lag behind client-side navigation.
	private async findStructuredData(type: string): Promise<StructuredDataEntry | undefined> {
		const scripts = await this.page.locator("script[type='application/ld+json']").allTextContents();
		const entries = scripts.flatMap((raw) => {
			const parsed: StructuredDataEntry[] = JSON.parse(raw);
			return parsed;
		});

		return entries.find((entry) => entry["@type"] === type);
	}
}
