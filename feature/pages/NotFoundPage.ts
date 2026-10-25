import { expect, type Response } from "@playwright/test";
import { Fixture, Given, Then, When } from "playwright-bdd/decorators";
import type { test } from "../fixtures";
import { Remembered } from "../support";
import { BasePage } from "./BasePage";

@Fixture<typeof test>("notFoundPage")
export class NotFoundPage extends BasePage {
	private readonly visit = new Remembered<Response | null>("visited page");

	@Given("the visitor is on a page that does not exist")
	@When("the visitor opens a page that does not exist")
	public async openMissingPage(): Promise<void> {
		this.visit.remember(await this.goto("/this-page-does-not-exist/"));
	}

	@Then("search engines are told the page does not exist")
	public async expectNotFoundStatus(): Promise<void> {
		expect(this.visit.value?.status()).toBe(404);
	}

	@Then("the page title is {string}")
	public async expectTitle(title: string): Promise<void> {
		await expect(this.page).toHaveTitle(title);
	}

	@Then("the visitor sees a heading {string}")
	public async expectHeading(heading: string): Promise<void> {
		await expect(this.page.getByRole("heading", { name: heading })).toBeVisible();
	}

	@Then("the visitor sees that the content was not found")
	public async expectContentNotFoundReason(): Promise<void> {
		await expect(this.page.getByText("ERR_CONTENT_NOT_FOUND")).toBeVisible();
	}
}
