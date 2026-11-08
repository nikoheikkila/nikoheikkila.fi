import { AxeBuilder } from "@axe-core/playwright";
import { type APIResponse, expect, type Locator, type Page, type Response } from "@playwright/test";
import { Fixture, Given, Then, When } from "playwright-bdd/decorators";
import { socialLinks } from "../../src/utils/social";
import type { test } from "../fixtures";
import { Remembered, viewports } from "../support";

/** Posts are listed newest first and search results in rank order, so some steps assert on position. */
const FIRST = 0;
const SECOND = 1;
const LAST = -1;

const atPosition = (list: Locator, index: number): Locator =>
	// biome-ignore lint/nursery/noPlaywrightNthMethods: the position in the list is the behaviour under test
	list.nth(index);

@Fixture<typeof test>("basePage")
export class BasePage {
	private readonly destination = new Remembered<string>("destination");
	private readonly popup = new Remembered<Page>("new tab");
	private readonly fetched = new Remembered<APIResponse>("fetched response");

	protected readonly page: Page;

	public constructor(page: Page) {
		this.page = page;
	}

	public get articles(): Locator {
		return this.page.getByRole("article");
	}

	/**
	 * Waits until the page is hydrated and Gatsby's post-hydration idle work has run:
	 * - Gatsby marks `onInitialClientRender` from its root component's effect, which React runs only after
	 *   hydration has attached every event handler.
	 * - The JSON-LD script uses `ScriptStrategy.idle`, so Gatsby injects it only once the browser is idle after
	 *   hydration. Navigating away before that point lets WebKit interrupt the next `goto()`.
	 */
	public async goto(path: string): Promise<Response | null> {
		const response = await this.page.goto(path);

		await this.page.waitForFunction(() => performance.getEntriesByName("onInitialClientRender", "mark").length > 0);
		await this.page.locator("script[type='application/ld+json']").waitFor({ state: "attached" });

		return response;
	}

	public async gotoLastIndexPage(): Promise<void> {
		await this.goto("/");

		const lastPage = /\/(?<page>\d+)\)/u.exec((await this.nextIndexPageLink.textContent()) ?? "")?.groups?.page;

		await this.goto(`/${lastPage}/`);
	}

	public async openPost(article: Locator): Promise<void> {
		const title = (await article.getByRole("heading").textContent()) ?? "";

		await article.getByRole("heading").getByRole("link").click();
		await expect(this.page).toHaveURL(/\/blog\//u);
		await expect(this.page.getByRole("heading", { level: 1, name: title.trim() })).toBeVisible();
	}

	@Given("the visitor is browsing on a desktop")
	public async browseOnDesktop(): Promise<void> {
		await this.page.setViewportSize(viewports.desktop);
	}

	@Given("the visitor is browsing on a phone")
	public async browseOnPhone(): Promise<void> {
		await this.page.setViewportSize(viewports.phone);
	}

	@Given("the visitor is on the home page")
	@When("the visitor opens the home page")
	public async openHomePage(): Promise<void> {
		await this.goto("/");
	}

	@Given("the visitor is on the second index page")
	@When("the visitor opens the second index page")
	public async openSecondIndexPage(): Promise<void> {
		await this.goto("/2/");
	}

	@Given("the visitor is on the last index page")
	@When("the visitor opens the last index page")
	public async openLastIndexPage(): Promise<void> {
		await this.gotoLastIndexPage();
	}

	@Given("the visitor is on the About page")
	@When("the visitor opens the About page")
	public async openAboutPage(): Promise<void> {
		await this.goto("/about/");
	}

	@Given("the visitor is on the Uses page")
	@When("the visitor opens the Uses page")
	public async openUsesPage(): Promise<void> {
		await this.goto("/uses/");
	}

	@Given("the visitor is on the Now page")
	@When("the visitor opens the Now page")
	public async openNowPage(): Promise<void> {
		await this.goto("/now/");
	}

	@Given("the visitor is on the Testimonials page")
	@When("the visitor opens the Testimonials page")
	public async openTestimonialsPage(): Promise<void> {
		await this.goto("/testimonials/");
	}

	@Given("the visitor is on the latest post")
	@When("the visitor opens the latest post")
	public async openLatestPost(): Promise<void> {
		await this.goto("/");
		await this.openPost(atPosition(this.articles, FIRST));
	}

	@Given("the visitor is on the middle post")
	@When("the visitor opens the middle post")
	public async openMiddlePost(): Promise<void> {
		await this.goto("/");
		await this.openPost(atPosition(this.articles, SECOND));
	}

	@Given("the visitor is on the oldest post")
	@When("the visitor opens the oldest post")
	public async openOldestPost(): Promise<void> {
		await this.gotoLastIndexPage();
		await this.openPost(atPosition(this.articles, LAST));
	}

	@Given("the visitor opens the first post on the page")
	public async openFirstPostOnPage(): Promise<void> {
		await this.openPost(atPosition(this.articles, FIRST));
	}

	@Given("the visitor has the sidebar menu open")
	public async haveSidebarMenuOpen(): Promise<void> {
		await this.openHomePage();
		await this.toggleSidebarMenu();
		await expect(this.sidebarMenu).toBeVisible();
	}

	@Given("the visitor has searched for {string}")
	public async haveSearchedFor(term: string): Promise<void> {
		await this.openHomePage();
		await this.search(term);
		await this.expectSearchResults();
	}

	@Given("the first search result is focused")
	public async focusFirstSearchResult(): Promise<void> {
		await this.page.keyboard.press("ArrowDown");
		await expect(atPosition(this.searchResults, FIRST)).toHaveAttribute("aria-current", "true");
	}

	@Given("the skip link is focused")
	public async focusSkipLink(): Promise<void> {
		await this.skipLink.focus();
	}

	@When("the visitor presses {string}")
	public async press(key: string): Promise<void> {
		await this.page.keyboard.press(key);
	}

	@When("the visitor follows the link to the next index page")
	public async followNextIndexPageLink(): Promise<void> {
		await this.follow(this.nextIndexPageLink);
	}

	@When("the visitor follows the link to the previous index page")
	public async followPreviousIndexPageLink(): Promise<void> {
		await this.follow(this.previousIndexPageLink);
	}

	@When("the visitor follows the link to the older post")
	public async followOlderPostLink(): Promise<void> {
		await this.follow(this.olderPostLink);
	}

	@When("the visitor follows the link to the newer post")
	public async followNewerPostLink(): Promise<void> {
		await this.follow(this.newerPostLink);
	}

	@When("the visitor follows the link to the home page")
	public async followHomeLink(): Promise<void> {
		await this.follow(this.homeLink);
	}

	@When("the visitor follows the RSS feed link")
	public async followRssFeedLink(): Promise<void> {
		await this.follow(this.rssFeedLink);
	}

	@When("the visitor follows the RSS link in the footer")
	public async followFooterRssLink(): Promise<void> {
		await this.follow(this.footerRssLink);
	}

	@When("the visitor follows the cover image link")
	public async followCoverImageLink(): Promise<void> {
		await this.follow(this.page.getByRole("link", { name: /— Home$/u }));
	}

	@When("the visitor follows the link to the author's story")
	public async followAuthorStoryLink(): Promise<void> {
		await this.follow(this.page.getByRole("link", { name: "the longer story of me" }));
	}

	@When("the visitor follows the link back to the posts")
	public async followBackToPostsLink(): Promise<void> {
		await this.follow(this.page.getByRole("link", { name: "Back to posts" }));
	}

	@When("the visitor follows the {string} link in the sidebar menu")
	public async followSidebarMenuLink(name: string): Promise<void> {
		await this.follow(this.page.getByRole("navigation", { name: "Main" }).getByRole("link", { name }));
	}

	@When("the visitor follows the external {string} link")
	public async followExternalLink(name: string): Promise<void> {
		const externalSites = /^https:\/\/(?:github\.com|(?:www\.)?linkedin\.com)\//u;

		await this.page.context().route(externalSites, (route) => route.fulfill({ body: "" }));
		const [tab] = await Promise.all([
			this.page.waitForEvent("popup"),
			this.page.getByRole("link", { name: new RegExp(`${name}$`, "u") }).click(),
		]);

		this.popup.remember(tab);
	}

	@When("the visitor opens the sidebar menu")
	public async openSidebarMenu(): Promise<void> {
		await this.toggleSidebarMenu();
	}

	@When("the visitor closes the sidebar menu")
	public async closeSidebarMenu(): Promise<void> {
		await this.toggleSidebarMenu();
	}

	@When("the visitor clicks outside the sidebar menu")
	public async clickOutsideSidebarMenu(): Promise<void> {
		const { width, height } = this.page.viewportSize() ?? viewports.desktop;

		await this.page.mouse.click(width - 5, height / 2);
	}

	@When("the visitor scrolls to the footer")
	public async scrollToFooter(): Promise<void> {
		await this.footer.scrollIntoViewIfNeeded();
	}

	@When("the visitor searches for {string}")
	public async searchFor(term: string): Promise<void> {
		await this.search(term);
	}

	@When("the visitor submits an empty search")
	public async submitEmptySearch(): Promise<void> {
		await this.search("");
	}

	@When("the visitor follows the first search result link")
	public async followFirstSearchResult(): Promise<void> {
		await atPosition(this.searchResults, FIRST).getByRole("link").click();
	}

	@When("the visitor dismisses the search results by pressing Escape")
	public async dismissSearchResultsByEscape(): Promise<void> {
		await this.page.keyboard.press("Escape");
	}

	@When("the visitor dismisses the search results by clicking outside focus")
	public async dismissSearchResultsByClickingOutside(): Promise<void> {
		await this.page.getByRole("button", { name: /dismiss search results/iu }).click({ position: { x: 10, y: 10 } });
	}

	@When("the visitor dismisses the search results by clicking the close button")
	public async dismissSearchResultsByCloseButton(): Promise<void> {
		await this.searchResultsDialog.getByRole("button", { name: "Close search results" }).click();
	}

	@When("a feed reader fetches the RSS feed")
	public async fetchRssFeed(): Promise<void> {
		await this.fetch("/rss.xml");
	}

	@When("a search engine fetches the sitemap")
	public async fetchSitemap(): Promise<void> {
		await this.fetch("/sitemap-index.xml");
	}

	@When("a crawler fetches the crawler rules")
	public async fetchCrawlerRules(): Promise<void> {
		await this.fetch("/robots.txt");
	}

	@Then("the visitor sees a link to the next index page")
	public async expectNextIndexPageLink(): Promise<void> {
		await expect(this.nextIndexPageLink).toBeVisible();
	}

	@Then("the visitor sees no link to the next index page")
	public async expectNoNextIndexPageLink(): Promise<void> {
		await expect(this.nextIndexPageLink).toHaveCount(0);
	}

	@Then("the visitor sees a link to the previous index page")
	public async expectPreviousIndexPageLink(): Promise<void> {
		await expect(this.previousIndexPageLink).toBeVisible();
	}

	@Then("the visitor sees no link to the previous index page")
	public async expectNoPreviousIndexPageLink(): Promise<void> {
		await expect(this.previousIndexPageLink).toHaveCount(0);
	}

	@Then("the visitor sees a link to the older post")
	public async expectOlderPostLink(): Promise<void> {
		await expect(this.olderPostLink).toBeVisible();
	}

	@Then("the visitor sees no link to the older post")
	public async expectNoOlderPostLink(): Promise<void> {
		await expect(this.olderPostLink).toHaveCount(0);
	}

	@Then("the visitor sees a link to the newer post")
	public async expectNewerPostLink(): Promise<void> {
		await expect(this.newerPostLink).toBeVisible();
	}

	@Then("the visitor sees no link to the newer post")
	public async expectNoNewerPostLink(): Promise<void> {
		await expect(this.newerPostLink).toHaveCount(0);
	}

	@Then("the visitor is at the home page")
	@Then("the home page is open in the original tab")
	public async expectHomePage(): Promise<void> {
		await expect(this.page).toHaveURL("/");
	}

	@Then("the visitor is at the second index page")
	public async expectSecondIndexPage(): Promise<void> {
		await expect(this.page).toHaveURL("/2/");
	}

	@Then("the visitor is at the About page")
	public async expectAboutPage(): Promise<void> {
		await expect(this.page).toHaveURL("/about/");
	}

	@Then("the visitor arrives at the linked page")
	public async expectLinkedPage(): Promise<void> {
		await expect(this.page).toHaveURL(this.destination.value);
	}

	@Then("the visitor sees the sidebar menu")
	public async expectSidebarMenuVisible(): Promise<void> {
		await expect(this.sidebarMenu).toBeVisible();
	}

	@Then("the sidebar menu is closed")
	public async expectSidebarMenuClosed(): Promise<void> {
		await expect(this.sidebarMenu).toBeHidden();
	}

	@Then("the visitor sees the social profile links")
	public async expectSocialProfileLinks(): Promise<void> {
		await Promise.all(
			socialLinks.map(({ name }) => expect(this.footer.getByRole("link", { name, exact: true })).toBeVisible()),
		);
	}

	@Then("the visitor sees the search results")
	public async expectSearchResultsVisible(): Promise<void> {
		await this.expectSearchResults();
	}

	@Then("the visitor sees a no results message")
	public async expectNoResultsMessage(): Promise<void> {
		await expect(this.searchResultsDialog.getByText(/no results/iu)).toBeVisible();
	}

	@Then("the search results are hidden")
	public async expectSearchResultsHidden(): Promise<void> {
		await expect(this.searchResultsDialog).toBeHidden();
	}

	@Then("the search box is focused")
	public async expectSearchBoxFocused(): Promise<void> {
		await expect(this.searchBox).toBeFocused();
	}

	@Then("focus stays within the search results")
	public async expectFocusWithinSearchResults(): Promise<void> {
		await expect(this.searchResultsDialog.locator(":focus")).toHaveCount(1);
	}

	@Then("the page has no accessibility violations")
	public async expectNoAccessibilityViolations(): Promise<void> {
		const results = await this.axe.analyze();

		expect(results.violations).toStrictEqual([]);
	}

	private get axe() {
		const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
		return new AxeBuilder({ page: this.page }).withTags(tags);
	}

	@Then("the skip link is focused")
	public async expectSkipLinkFocused(): Promise<void> {
		await expect(this.skipLink).toBeFocused();
	}

	@Then("the main content is in view")
	public async expectMainContentInView(): Promise<void> {
		await expect(this.page.getByRole("main")).toBeInViewport();
	}

	@Then("the page address points to the main content")
	public async expectMainContentAddress(): Promise<void> {
		await expect(this.page).toHaveURL(/#main-content$/u);
	}

	@Then("the visitor sees the cover image")
	public async expectCoverImageVisible(): Promise<void> {
		await expect(this.coverImage).toBeVisible();
	}

	@Then("the cover image is hidden from screen readers")
	public async expectCoverImageDecorative(): Promise<void> {
		await expect(this.coverImage).toHaveAttribute("alt", "");
	}

	@Then("the cover image is loaded")
	public async expectCoverImageLoaded(): Promise<void> {
		await expect(this.coverImage).toHaveJSProperty("complete", true);
	}

	@Then("the GitHub text editor opens in a new tab")
	public async expectGitHubEditor(): Promise<void> {
		await expect(this.popup.value).toHaveURL(/^https:\/\/github\.com\/.*\/edit\/main\/content\//u);
	}

	@Then("the GitHub commits listing opens in a new tab")
	public async expectGitHubCommits(): Promise<void> {
		await expect(this.popup.value).toHaveURL(/^https:\/\/github\.com\/.*\/commits\/main\/content\//u);
	}

	@Then("the author's GitHub profile opens in a new tab")
	public async expectGitHubProfile(): Promise<void> {
		await expect(this.popup.value).toHaveURL(/^https:\/\/github\.com\/nikoheikkila\/?$/u);
	}

	@Then("LinkedIn opens in a new tab")
	public async expectLinkedIn(): Promise<void> {
		await expect(this.popup.value).toHaveURL(/^https:\/\/(?:www\.)?linkedin\.com\//u);
	}

	@Then("the RSS feed is well-formed")
	@Then("the sitemap is well-formed")
	public async expectXmlDocument(): Promise<void> {
		expect(await this.fetched.value.text()).toMatch(/^<\?xml version="1.0" encoding="UTF-8"\?>/u);
	}

	@Then("the response matches the approved version")
	public async expectApprovedResponse(): Promise<void> {
		expect(await this.fetched.value.text()).toMatchSnapshot("robots.txt");
	}

	@Then("the newest item in the feed is the latest post")
	public async expectLatestPostInFeed(): Promise<void> {
		const newestTitle =
			/<item><title><!\[CDATA\[(?<title>.*?)\]\]>/u.exec(await this.fetched.value.text())?.groups?.title ?? "";

		await this.goto("/");
		await expect(atPosition(this.articles, FIRST).getByRole("heading")).toHaveText(newestTitle);
	}

	@Then("the page title is not empty")
	public async expectTitleNotEmpty(): Promise<void> {
		await expect(this.page).toHaveTitle(/\S/u);
	}

	@Then("the search description is not empty")
	public async expectSearchDescriptionNotEmpty(): Promise<void> {
		await expect(this.metaTag("description")).toHaveAttribute("content", /\S/u);
	}

	protected metaTag(name: string): Locator {
		return this.page.locator(`meta[name='${name}']`);
	}

	private get nextIndexPageLink(): Locator {
		return this.page.getByRole("link", { name: /Next Page/u });
	}

	private get previousIndexPageLink(): Locator {
		return this.page.getByRole("link", { name: /Previous Page/u });
	}

	private get olderPostLink(): Locator {
		return this.page.locator('a[rel="prev"]');
	}

	private get newerPostLink(): Locator {
		return this.page.locator('a[rel="next"]');
	}

	private get homeLink(): Locator {
		return this.page.getByRole("link", { name: "Home" });
	}

	private get rssFeedLink(): Locator {
		return this.page.getByRole("link", { name: "RSS feed" });
	}

	private get footerRssLink(): Locator {
		return this.footer.getByRole("link", { name: "RSS" });
	}

	private get sidebarMenu(): Locator {
		return this.page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: /\bPosts$/u });
	}

	private get footer(): Locator {
		return this.page.getByRole("contentinfo");
	}

	private get skipLink(): Locator {
		return this.page.getByRole("link", { name: /skip to main content/iu });
	}

	private get coverImage(): Locator {
		return this.page.getByRole("banner").getByRole("presentation");
	}

	private get searchResultsDialog(): Locator {
		return this.page.getByRole("dialog", { name: /search results/iu });
	}

	private get searchResults(): Locator {
		return this.searchResultsDialog.getByRole("article");
	}

	private get searchBox(): Locator {
		return this.page.getByRole("search").getByRole("searchbox", { name: /search posts/iu });
	}

	private async fetch(path: string): Promise<void> {
		const response = await this.page.request.get(path);

		await expect(response).toBeOK();
		this.fetched.remember(response);
	}

	private async follow(link: Locator): Promise<void> {
		this.destination.remember((await link.getAttribute("href")) ?? "");
		await link.click();
	}

	private async toggleSidebarMenu(): Promise<void> {
		await this.page.getByRole("button", { name: /(?:Open|Close) menu/u }).click();
	}

	private async search(term: string): Promise<void> {
		await this.searchBox.fill(term);
		await this.searchBox.press("Enter");
	}

	private async expectSearchResults(): Promise<void> {
		await expect(this.searchResultsDialog).toBeVisible();
		await expect(this.searchResults).not.toHaveCount(0);
	}
}
