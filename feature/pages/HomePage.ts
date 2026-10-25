import { expect } from "@playwright/test";
import { Fixture, Then } from "playwright-bdd/decorators";
import type { test } from "../fixtures";
import { BasePage } from "./BasePage";

@Fixture<typeof test>("homePage")
export class HomePage extends BasePage {
	@Then("the visitor sees {int} posts")
	public async expectPostCount(count: number): Promise<void> {
		await expect(this.articles).toHaveCount(count);
	}

	@Then("each listed post shows its publication date and reading time")
	public async expectPublicationDateAndReadingTime(): Promise<void> {
		await expect(this.articles.first()).toBeVisible();
		await expect(this.articles.filter({ hasNotText: /\w+ \d{1,2}, \d{4}[\s\S]*\d+ minutes? read/ })).toHaveCount(0);
	}
}
