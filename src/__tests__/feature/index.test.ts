import test from "ava";
import { getPageContents, withBrowser } from "./helpers";

const isPipeline = !!process.env.CI;
const testIf = (condition: boolean) => (condition ? test : test.skip);

const baseURL = process.env.APP_URL || "http://localhost:8000";
const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

/**
 * @Given I'm on the index page
 * @When I query all the post titles
 * @Then their count should be exactly 9
 */
test("index page contains an index of posts", withBrowser, async (t, page) => {
  await page.goto(baseURL);
  const posts = await page.locator('[data-testid="post-title"]').count();

  t.is(posts, 9);
});

/**
 * @Given I'm on the index page
 * @When I click the 'Next' link
 * @Then I should be on the second page
 * @Given I'm on the second page
 * @When I click on the 'Previous' link
 * @Then I should be back on the first page
 */
test("index page has a working pagination", withBrowser, async (t, page) => {
  await page.goto(baseURL);

  await Promise.all([page.waitForNavigation(), page.click('a[rel="next"]')]);
  t.is(page.url(), `${baseURL}/2`);

  await Promise.all([page.waitForNavigation(), page.click('a[rel="prev"]')]);
  t.is(page.url(), `${baseURL}/`);
});

/**
 * @Given I'm on the index page
 * @When I click the first post title
 * @Then I should be on that post's page
 * @And the post should have valid content
 * @Given I'm on the post page
 * @When I click on the 'Back' link
 * @Then I should be back on the index page
 */
test("single blog post renders correctly", withBrowser, async (t, page) => {
  const postHeader = '[data-testid="post-header"]';

  await page.goto(baseURL);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-testid="post-title"]:first-child > a'),
  ]);

  t.regex(page.url(), /\/blog\//);

  await page.waitForSelector(postHeader);
  const headerIsVisible = await page.locator(postHeader).isVisible();

  t.true(headerIsVisible);

  await Promise.all([page.waitForNavigation(), page.click('a[rel="back"]')]);
  t.is(page.url(), `${baseURL}/`);
});

/**
 * @Given I'm on the index page
 * @When I request the robots.txt file
 * @Then I should receive an OK response
 * @And the file contents should be valid
 */
test("site has a valid robots.txt file", withBrowser, async (t, page) => {
  const body = await getPageContents(page, `${baseURL}/robots.txt`);

  t.regex(body, /User-agent: \*/);
  t.regex(body, /Allow: \//);
  t.regex(body, /Sitemap: (.*)/);
  t.regex(body, /Host: (.*)/);
  t.snapshot(body);
});

/**
 * @Given I'm on the index page
 * @When I request the RSS feed
 * @Then I should receive an OK response
 * @And the file should have a valid XML header
 */
test("site has a valid RSS feed", withBrowser, async (t, page) => {
  const body = await getPageContents(page, `${baseURL}/rss.xml`);

  t.true(body.length > 0);
  t.regex(body, validXMLHeader);
});

/**
 * @Given I'm on the index page
 * @When I request the sitemap
 * @Then I should receive an OK response
 * @And the file should not be empty
 *
 * @todo Currently not run as part of the pipeline.
 */
testIf(!isPipeline)(
  "site has a valid XML sitemap",
  withBrowser,
  async (t, page) => {
    const body = await getPageContents(
      page,
      `${baseURL}/sitemap/sitemap-index.xml`
    );

    t.true(body.length > 0);
  }
);

test("single post contains an edit link", withBrowser, async (t, page) => {
  await page.goto(`${baseURL}/about`);
  const [github] = await Promise.all([
    page.context().waitForEvent("page"),
    page.click('text="Edit Page"'),
  ]);

  await github.waitForLoadState();
  t.regex(github.url(), /github\.com/);
});

test(
  "single post contains a view history link",
  withBrowser,
  async (t, page) => {
    await page.goto(`${baseURL}/about`);
    const [github] = await Promise.all([
      page.context().waitForEvent("page"),
      page.click('text="View History"'),
    ]);

    await github.waitForLoadState();
    t.regex(github.url(), /github\.com/);
  }
);
