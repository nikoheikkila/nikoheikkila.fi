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
}
