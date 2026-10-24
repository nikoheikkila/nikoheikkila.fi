import { createBdd, test as base } from "playwright-bdd";
import { Destination, Responses, Tabs, Visit } from "./support";

export const test = base.extend<{ tabs: Tabs; responses: Responses; destination: Destination; visit: Visit }>({
	tabs: async ({}, use) => {
		await use(new Tabs());
	},
	destination: async ({}, use) => {
		await use(new Destination());
	},
	visit: async ({}, use) => {
		await use(new Visit());
	},
	responses: async ({}, use) => {
		await use(new Responses());
	},
});

export const { Given, When, Then } = createBdd(test);
