import slugify from "@sindresorhus/slugify";
import { ExecutionContext, Macro } from "ava";
import { resolve } from "path";
import playwright, { Browser, LaunchOptions, Page } from "playwright";

type Callback = (t: ExecutionContext, page: Page) => Promise<void>;

const browserName = process.env.BROWSER || "chromium";

const addHandlers = (page: Page) => {
  page.on("requestfailed", (request) =>
    console.error(`Request failed: ${request.failure()?.errorText}`)
  );
  page.on("pageerror", (exception) =>
    console.error(`Uncaught Exception: "${exception}"`)
  );
};

export const getBrowser = (): Promise<Browser> => {
  const options: LaunchOptions = {
    headless: true,
  };

  if (browserName === "chromium") return playwright.chromium.launch(options);
  if (browserName === "firefox") return playwright.firefox.launch(options);
  if (browserName === "webkit") return playwright.webkit.launch(options);

  throw new Error(`Unsupported browser type ${browserName}`);
};

export const captureScreenshot: Callback = async (t, page) => {
  const path = resolve(
    __dirname,
    `screenshots/${slugify(t.title)}-${browserName}.png`
  );
  await page.screenshot({ path });

  console.log(`Saved screenshot to ${path}`);
};

/**
 * AVA macro to share page context between tests.
 * @param t
 * @param callback
 */
export const withBrowser: Macro<[Callback]> = async (t, callback) => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  addHandlers(page);

  try {
    await callback(t, page);
  } finally {
    if (!t.passed) {
      await captureScreenshot(t, page);
    }

    await page.close();
  }
};

export const getPageContents = async (
  page: Page,
  url: string
): Promise<string> => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.goto(url),
  ]);

  if (!response) throw new Error(`Response to ${url} failed.`);
  const body = await response.text();

  return body;
};
