import { expect, type Response } from "@playwright/test";
import { Fixture, Given, Then, When } from "playwright-bdd/decorators";
import type { test } from "../fixtures";
import { Remembered } from "../support";
import { BasePage } from "./BasePage";

@Fixture<typeof test>("notFoundPage")
export class NotFoundPage extends BasePage {
	private readonly visit = new Remembered<Response | null>("visited page");

	@Given("the visitor is on {string}")
	@When("the visitor lands on {string}")
	public async navigateTo(path: string): Promise<void> {
		this.visit.remember(await this.goto(path));
	}

	@Then("the response status is {int}")
	public async expectStatus(status: number): Promise<void> {
		expect(this.visit.value?.status()).toBe(status);
	}

	@Then("the page title is {string}")
	public async expectTitle(title: string): Promise<void> {
		await expect(this.page).toHaveTitle(title);
	}

	@Then("the visitor sees a heading {string}")
	public async expectHeading(heading: string): Promise<void> {
		await expect(this.page.getByRole("heading", { name: heading })).toBeVisible();
	}

	@Then("the visitor sees a text {string}")
	public async expectText(text: string): Promise<void> {
		await expect(this.page.getByText(text)).toBeVisible();
	}
}
