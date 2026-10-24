import { createBdd, test as base } from "playwright-bdd";
import { Tabs } from "./support";

export const test = base.extend<{ tabs: Tabs }>({
	// biome-ignore lint/correctness/noEmptyPattern: Playwright requires a destructured first argument
	tabs: async ({}, use) => {
		await use(new Tabs());
	},
});

export const { Given, When, Then } = createBdd(test);
