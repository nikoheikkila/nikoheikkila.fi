import { createBdd, test as base } from "playwright-bdd";
import { Destination, Responses, Tabs } from "./support";

export const test = base.extend<{ tabs: Tabs; responses: Responses; destination: Destination }>({
	tabs: async ({}, use) => {
		await use(new Tabs());
	},
	destination: async ({}, use) => {
		await use(new Destination());
	},
	responses: async ({}, use) => {
		await use(new Responses());
	},
});

export const { Given, When, Then } = createBdd(test);
