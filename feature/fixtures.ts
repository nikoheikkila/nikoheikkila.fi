import type { APIResponse, Page, Response } from "@playwright/test";
import { createBdd, test as base } from "playwright-bdd";
import { Remembered } from "./support";

type Fixtures = {
	popup: Remembered<Page>;
	fetched: Remembered<APIResponse>;
	destination: Remembered<string>;
	visit: Remembered<Response | null>;
};

export const test = base.extend<Fixtures>({
	popup: async ({}, use) => {
		await use(new Remembered("new tab"));
	},
	fetched: async ({}, use) => {
		await use(new Remembered("fetched response"));
	},
	destination: async ({}, use) => {
		await use(new Remembered("destination"));
	},
	visit: async ({}, use) => {
		await use(new Remembered("visited page"));
	},
});

export const { Given, When, Then } = createBdd(test);
