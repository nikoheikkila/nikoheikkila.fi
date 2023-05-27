---
lang: en
author: Niko Heikkilä
date: 2022-04-17
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/effortless-end-to-end-testing-with-microsoft-playwright.jpg
title: Effortless End-To-End Testing with Microsoft Playwright
type: post
excerpt: How can we improve the developer experience in writing tedious browser-based tests?
categories:
    - testing
    - automation
    - frontend
    - productivity
---

> _Don't care about reading much, eh? Too bad, but you can also skip the content and head over to my [Playwright Kickstarter repository][kickstarter] and learn how to use it for robust automated end-to-end testing with your frontend applications._

In my job, I stumble upon projects where there are _zero_ tests, or a project is equipped with a single generated test constantly failing. Writing and maintaining a comprehensive automated test suite for some development teams is a lesser priority. These teams' end product is usually an application that satisfies the bare necessities asked by the client but is plagued by code rot, technical debt, and instability.

During the maintenance phase, new layers of code are added on top of the existing cruft, making things worse. Fear of breaking things prevents refactoring, and hence the code quality keeps dropping.

Software maintenance and lifecycle management are complicated. As maintainers, we are often tempted to heroically rescue the project by adding all the missing tests or rewriting the whole project from scratch. No budget will ever be given for such a crazy thing. Fortunately, we can follow certain practices:

-   adding tests whenever writing new functions, methods, or classes
-   adding tests before refactoring a unit of code
-   studying the business logic and writing end-to-end tests for it

In this post, I explain the latter -- **end-to-end tests** -- which I've found to be the most effective way of refreshing a stale project. What are these tests, you may ask?

## Anatomy of an End-to-End Test

End-to-end tests (abbreviated as E2E from now on) instead of unit and integration tests cover user-facing flows and business requirements defined for the application since its planning phase started. These include, for example:

-   booking a hotel room online
-   adding products to the basket, viewing them, and checking out the purchase on an e-commerce website
-   ...and many more

Experienced developers might now stop and think of _behaviour-driven development_ (BDD), which goes hand-in-hand with E2E. Behaviour flows are often decided when planning a new feature.

Say we have a calculator application, for example. We want to implement the adding feature and start drafting a specification.

```gherkin
Feature: Calculator

  Scenario: "+" should add to the current total.
    Given the current total is "5".
    When I enter "7".
    Then the current total should be "12".
```

The syntax in the snippet above is called _gherkin_, and it can be used to convert human-readable specifications to machine-readable tests! Thus, E2E tests can and should be written before the business logic.

Here, the above specification would result in the following test code. The below example is partly written in pseudo-code for the sake of simplicity.

```javascript
describe("Calculator", () => {
	it("+ should add to current total", () => {
		initialTotal = 5;
		number = 7;

		click(".plus");
		fill(".input", number);
		click(".run");

		newTotal = $(".total").innerText;
		expect(newTotal).toBe(initialTotal + number);
	});
});
```

E2E tests are easy to write before the business logic, but they are also easy to write months or years afterwards. This makes them a powerful asset in a project.

But who should write them? **Developers**

## The Problem of Divergent Tests in Software Development Teams

Product teams consist of developers and QA specialists in some organisations, often separated by mental or physical walls. We may use [Conway's Law][conway] to dictate that tests produced by two different groups who don't communicate with each other are radically different.

Developers stick with tests close to their daily work implementing low-level unit tests with many mocks, fakes, and stubs. Their tests run fast, use modern features of their chosen programming language, and mainly deliver stable results. The end product is a technically ambitious test suite with low business value and confidence. Most of the functionality might be broken, but at least my fancy new method always returns the correct list of dummy user objects using a mocked database connection. What more do I need?

Meanwhile, QA struggles to write and maintain an exhaustive test set when not testing features by hand, ultimately proving the application works as the client wants. It's a pity their test suite requires a laborious setup, runs slowly, and crashes half of the runs.

Let's put this in the form of a picture.

![A breakdown of test suites that either quality assurance specialists or software developers typically write.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/DevQATests.png)

The root cause of flaky E2E tests is naturally failed communication, but sometimes choosing the right tools may also help. For example, the QA boomers (pardon the expression) who have been working in the software business for decades often write E2E tests with **Robot Framework** and **Selenium**.

As a developer from Finland, I can say **Nokia** has had a significant impact on our professional lives and education. Still, I don't shy away from saying that tests written in Robot Framework are a devastating travesty and maintenance nightmare. Since Cypress began gaining popularity, it has been our time to move on.

Typically, Robot tests are written in a quirky tabular keyword syntax advertised as accessible to even non-developers -- which it certainly is not, I dare to say. Robot tests almost always become a jumbled mess of keywords and external Python libraries without rigorous engineering practices. In a worst-case scenario, as the test suite complexity grows over time, people start neglecting it and what is left is a pit of obsolete tests that worked five years ago, but the application has lived on and changed a lot since then.

The solution is two-fold:

1. End the Cold War, and bring QA and developers together
2. Throw away the Robot framework

The former is an organisational and cultural topic outside the scope of this post. The latter, however, can easily be fixed with modern tools. One prominent newcomer to the scene is [**Playwright**][playwright] by **Microsoft**, which I've enjoyed.

## How Playwright Reduces the Burden of Automated Testing

For those who have used **Puppeteer**, the logic and API behind Playwright should be familiar. You control three different browser engines. As of writing this, they are **Chromium**, **Firefox**, and **Webkit**. Browsers can handle multiple windows and tabs through contexts. Through device emulation, there is also support for different mobile devices like iPhones and Pixel phones.

A couple of aspects make the Playwright especially pleasant to work with.

### Speed and Stability Matter

Page actions can be run with `async/await` logic one by one or concurrently when wrapped inside `Promise.all()` or `Promise.allSettled()` calls. Furthermore, page operations automatically wait for the targeted element to become _actionable._ So, for example, a button is not clicked until it's visible on-page and enabled. Never resort to `Sleep 5` or other shenanigans again.

Playwright scripts run incredibly fast with the default configuration, so you may want to add a slight delay for the human eye to catch up. Most of the time, you should be running your tests headless (no visible browser) and without delay, though.

### Support for Modern Languages

Developers can write Playwright tests in **JavaScript** or **TypeScript** using all the modern features as long as a recent Node version is used. For example, I've run my tests with the latest LTS version (v16) using all the newest ECMAScript goodness through the TypeScript configuration.

Using **VS Code**, I'm also able to attach the debugger right in the middle of a test to investigate where that one element disappeared.

If the languages mentioned above are not your cup of tea, you may also use other [supported languages][languages], including **Python**, **C#**, and **Golang**. These are currently considered to be in preview and not ready for production use, but feel free to tinker away.

The upside with multiple language support is that QA specialists and other people with less programming background can start writing tests with simple languages like Python. In contrast, more experienced people appreciate the robust type systems found in TypeScript and Golang. So, naturally, the most important thing is you don't have to use Robot Framework keywords anymore.

### Extendability

Playwright ships with a helpful test runner, making multiple parallel tests across machines and writing powerful assertions a breeze. However, chances are you might want to keep your existing test setup. You may continue using any test runners and libraries you're familiar with, be it `assert`, `chai`, or `expect`.

You can also use any third-party NPM modules in your tests. For example, the [`faker.js`][faker] library is helpful when testing HTML form validation with random data.

### Configuration

If you choose to use the first-party test runner, you get to configure your tests in a single TypeScript file. The configurable features are documented and well. Some of the most helpful ones are:

-   adjusting test timeouts in case of particularly slow web servers
-   specifying multiple projects with separate configurations and running them with `playwright test --project <name>`
-   specifying multiple reporters -- generally, you want console and HTML reporting, but there are more, or you can roll your own
-   allowing flaky tests to be retried multiple times, which is sometimes useful when working with crappy external APIs
-   launching a web server in the background and waiting until an endpoint responds with HTTP 200 code before running tests

### Easy Maintenance

More than often, E2E tests contain a lot of repeated actions that can be abstracted into common methods for increased maintainability. Playwright did not invent the **Page Object Model** (POM), but using them proves helpful here.

In brief, POMs are regular classes that are instantiated with a `Page` object responsible for page actions. Remember to declare your methods asynchronous.

Using a POM, the following operation of signing a user in...

```typescript
await Promise.all([
	page.fill("data-test-id=username", username),
	page.fill("data-test-id=password", password),
]);

await page.click("data-test-id=login");
```

...becomes a more readable version

```typescript
class LoginPage() {
    constructor(page: Page) {
        this.page = page;
    }

    async fillCredentials(user: User) {
        await this.page.fill('data-test-id=username', user.name);
        await this.page.fill('data-test-id=password', user.password);
    }

    async login() {
        await this.page.click('data-test-id=login');
    }
}
```

Note that above I've removed the `Promise.all()` wrap for simplicity. After the abstraction, this model can be used for further tests requiring the user to be authenticated.

You should write a model for each specific page in your application and import them to your test suite when needed. Then, if necessary, you can create a new page object with Playwright if sharing one is not an option (it usually is). Of course, you can test single-page applications without model classes, but they offer a significant productivity boost for testing more complex routes.

### Generating Code by Recording Browser Actions

Suppose your usual routine with new tests is to open the browser developer tools and search for CSS selectors to add to your tests. In that case, you are delighted to know that Playwright supports recording and code generation via its command-line tool.

If we want to record actions done in the English Wikipedia, for example, it's as easy as running the following line in your terminal:

```bash
npx playwright codegen https://en.wikipedia.org
```

Using the `npx` tool part of Node.js, this command downloads the Playwright CLI tool and opens your browser in a recording mode.

In the browser, let's now fetch a random article from Wikipedia, "read" it, and navigate back to the main page. Meanwhile, we receive the code below on another window, ready to be saved for further inspection.

```typescript
import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	// Go to https://en.wikipedia.org/wiki/Main_Page
	await page.goto("https://en.wikipedia.org/wiki/Main_Page");

	// Click text=Random article
	await page.locator("text=Random article").click();
	await expect(page).toHaveURL(
		"https://en.wikipedia.org/wiki/Howie_Schwarzman"
	);

	// Click text=Main page
	await page.locator("text=Main page").click();
	await expect(page).toHaveURL("https://en.wikipedia.org/wiki/Main_Page");
});
```

The code generated by Playwright CLI is clearly structured, annotated, and encapsulated as a real runnable test. Therefore, you may simply copy this among your test files with relevant modifications and run it with the `npx playwright test`.

Obviously, randomness is a terrible feature in tests, so you should not expect always to end up looking at Mr Schwarzman. With no offence, Howie, keep doing those card tricks in the great beyond.

### Continuous Delivery with Playwright

Writing tests is never enough if they only run locally. Playwright supports most build platforms out of the box, including **Azure Pipelines**, **GitLab CI**, and **GitHub Actions**. In my [kickstarter repository][kickstarter], I have defined a concise yet powerful GitHub Actions workflow that runs E2E tests across different browsers and operating systems.

Generally, a delivery pipeline has the following steps:

-   clone the repository
-   install dependencies
-   build the application with a production-like configuration
-   launch the application in the background
-   run Playwright tests

Because remote build systems offer limited visibility to test runs, it's crucial to leverage Playwright's capabilities of recording screenshots, videos, and test traces in case of failures. These should be uploaded as test artefacts and the actual test report, so you may attempt to reproduce the same failure locally.

After a successful test run, you should have the confidence of deploying your application to production or to a test environment for further inspection at a minimum.

A well-known limitation of containerised build systems is limiting the number of virtual CPUs. For example, GitHub Actions only offers 2 vCPUs and thus is usually slower to run tests than my MacBook Pro. However, it's a tradeoff worth taking as you don't have to switch laptops between macOS, Linux, and Windows to test across different hardware.

## Closing Remarks

Today when working with frontend applications, I don't write too many fine-grained tests for my UI components. Testing an isolated component with or without shallow rendering is often tricky and yields less confidence than testing the actual interactions on a live page. Furthermore, Playwright with parallel test runs and multiple worker threads is fast even with average hardware.

Have you used Playwright for testing your application? Let me know in the comments how it went and if you need guidance with it.

Photo by David Travis on Unsplash

[conway]: https://en.wikipedia.org/wiki/Conway%27s_law
[playwright]: https://playwright.dev/
[languages]: https://playwright.dev/docs/languages
[faker]: https://github.com/marak/Faker.js/
[kickstarter]: https://github.com/nikoheikkila/playwright-kickstarter
