import test from "ava";
import { withBrowser } from "./helpers";

const baseURL = process.env.APP_URL || "http://localhost:8000";
const validXMLHeader = /^<\?xml version="1.0" encoding="UTF-8"\?>/;

/**
 * @Given I'm on the index page
 * @When I query all the post titles
 * @Then their count should be exactly 8
 */
test("index page contains an index of posts", withBrowser, async (t, page) => {
  await page.goto(baseURL);
  const posts = await page.$$(".post-title");

  t.is(posts.length, 8);
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
  await page.goto(baseURL);

  await Promise.all([
    page.waitForNavigation(),
    page.click(".post-title:first-child > a"),
  ]);
  t.regex(page.url(), /\/blog\//);
  t.not(await page.$(".post-title"), null);
  t.not(await page.$(".post-excerpt"), null);
  t.not(await page.$(".post-meta"), null);
  t.not(await page.$(".post-footer"), null);
  t.not(await page.$(".post-attachments"), null);

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
  const response = await page.goto(`${baseURL}/robots.txt`);
  if (!response) {
    return t.fail("Request response failed.");
  }

  const body = await response.text();
  t.true(response.ok());
  t.regex(body, /User-agent: \*/);
  t.regex(body, /Allow: \//);
  t.regex(body, /Sitemap: (.*)/);
  t.regex(body, /Host: (.*)/);
});

/**
 * @Given I'm on the index page
 * @When I request the RSS feed
 * @Then I should receive an OK response
 * @And the file should have a valid XML header
 */
test("site has a valid RSS feed", withBrowser, async (t, page) => {
  const response = await page.goto(`${baseURL}/rss.xml`);
  if (!response) {
    return t.fail("Request response failed.");
  }

  const body = await response.text();
  t.true(response.ok());
  t.true(body.length > 0);
  t.regex(body, validXMLHeader);
});

/**
 * @Given I'm on the index page
 * @When I request the sitemap
 * @Then I should receive an OK response
 * @And the file should have a valid XML header
 */
test("site has a valid XML sitemap", withBrowser, async (t, page) => {
  const response = await page.goto(`${baseURL}/sitemap.xml`);
  if (!response) {
    return t.fail("Request response failed.");
  }

  const body = await response.text();
  t.true(response.ok());
  t.true(body.length > 0);
  t.regex(body, validXMLHeader);
});

/**
 * @Given I'm on the index page
 * @When I switch the theme to dark
 * @Then I should have the dark mode on
 * @When I switch the theme back to light
 * @Then I should have the light mode on
 */
test(
  "theme switcher can switch between light and dark modes",
  withBrowser,
  async (t, page) => {
    await page.goto(baseURL);
    await page.click("#react-burger-menu-btn");

    await page.click('[alt="Moon Icon"]');
    let handle = await page.waitForSelector("body.dark");
    let classNames = await handle.getAttribute("class");
    t.not(classNames, null);
    t.true(classNames?.includes("dark"));
    t.false(classNames?.includes("light"));

    await page.click('[alt="Moon Icon"]');
    handle = await page.waitForSelector("body.light");
    classNames = await handle.getAttribute("class");
    t.not(classNames, null);
    t.true(classNames?.includes("light"));
    t.false(classNames?.includes("dark"));
  }
);
