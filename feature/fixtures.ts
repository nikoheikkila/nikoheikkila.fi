import { test as base } from "playwright-bdd";
import { BasePage } from "./pages/BasePage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostPage } from "./pages/PostPage";

type Fixtures = {
	basePage: BasePage;
	homePage: HomePage;
	postPage: PostPage;
	notFoundPage: NotFoundPage;
};

export const test = base.extend<Fixtures>({
	basePage: async ({ page }, use) => {
		await use(new BasePage(page));
	},
	homePage: async ({ page }, use) => {
		await use(new HomePage(page));
	},
	postPage: async ({ page }, use) => {
		await use(new PostPage(page));
	},
	notFoundPage: async ({ page }, use) => {
		await use(new NotFoundPage(page));
	},
});
