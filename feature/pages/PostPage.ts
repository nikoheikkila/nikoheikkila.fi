import { expect } from "@playwright/test";
import { Fixture, Then } from "playwright-bdd/decorators";
import type { test } from "../fixtures";
import { BasePage } from "./BasePage";

type StructuredDataEntry = {
	"@type": string;
	url?: string;
	itemListElement?: unknown[];
};

@Fixture<typeof test>("postPage")
export class PostPage extends BasePage {
	@Then("the visitor sees the post title as the main heading")
	public async expectTitleAsMainHeading(): Promise<void> {
		const heading = this.page.getByRole("heading", { level: 1 });

		await expect(heading).toBeVisible();
		await expect.poll(() => this.page.title()).toContain(await heading.textContent());
	}

	@Then("the visitor is on a post page")
	@Then("the latest post is open in the original tab")
	public async expectPostPage(): Promise<void> {
		await expect(this.page).toHaveURL(/\/blog\//);
	}

	@Then("the search description matches the post excerpt")
	public async expectSearchDescriptionMatchesExcerpt(): Promise<void> {
		const excerpt = (await this.page.getByTestId("post-excerpt").textContent()) ?? "";

		await expect(this.metaTag("description")).toHaveAttribute("content", excerpt);
	}

	@Then("the link preview title matches the post heading")
	public async expectLinkPreviewTitleMatchesHeading(): Promise<void> {
		const heading = (await this.page.getByRole("heading", { level: 1 }).textContent()) ?? "";

		await expect(this.metaTag("og:title")).toHaveAttribute("content", heading);
	}

	@Then("the link preview address matches the post address")
	public async expectLinkPreviewAddressMatchesPost(): Promise<void> {
		const address = async () => this.pathOf((await this.metaTag("og:url").getAttribute("content")) ?? "");

		await expect.poll(address).toBe(this.pathOf(this.page.url()));
	}

	@Then("the link preview type is {string}")
	public async expectLinkPreviewType(type: string): Promise<void> {
		await expect(this.metaTag("og:type")).toHaveAttribute("content", type);
	}

	@Then("the link preview author is {string}")
	public async expectLinkPreviewAuthor(author: string): Promise<void> {
		await expect(this.metaTag("article:author")).toHaveAttribute("content", author);
	}

	@Then("the link preview image is served over HTTPS")
	public async expectLinkPreviewImageOverHttps(): Promise<void> {
		await expect(this.metaTag("og:image")).toHaveAttribute("content", /^https:\/\//);
	}

	@Then("the structured data names the website at the post address")
	public async expectWebsiteStructuredData(): Promise<void> {
		await expect(async () => {
			const website = await this.findStructuredData("WebSite");

			expect(this.pathOf(website?.url ?? "")).toBe(this.pathOf(this.page.url()));
		}).toPass();
	}

	@Then("the structured data includes a breadcrumb trail")
	public async expectBreadcrumbStructuredData(): Promise<void> {
		await expect(async () => {
			const breadcrumbs = await this.findStructuredData("BreadcrumbList");

			expect(breadcrumbs?.itemListElement?.length).toBeGreaterThan(0);
		}).toPass();
	}

	private pathOf(address: string): string {
		return new URL(address).pathname;
	}

	// The schema script is injected with ScriptStrategy.idle, so it can lag behind client-side navigation.
	private async findStructuredData(type: string): Promise<StructuredDataEntry | undefined> {
		const raw = await this.page.locator("script[type='application/ld+json']").first().textContent();
		const entries: StructuredDataEntry[] = JSON.parse(raw ?? "[]");

		return entries.find((entry) => entry["@type"] === type);
	}
}
