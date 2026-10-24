import { createBdd, test as base } from "playwright-bdd";
import { Responses, Tabs } from "./support";

export const test = base.extend<{ tabs: Tabs; responses: Responses }>({
	tabs: async ({}, use) => {
		await use(new Tabs());
	},
	responses: async ({}, use) => {
		await use(new Responses());
	},
});

export const { Given, When, Then } = createBdd(test);
