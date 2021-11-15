---
lang: en
author: Niko Heikkilä
date: 2021-01-07
hero: https://f001.backblazeb2.com/file/nikoheikkila-fi/Blog/effortless-end-to-end-testing-with-microsoft-playwright.jpg
title: Effortless End-To-End Testing with Microsoft Playwright
type: post
excerpt: How we can improve the developer experience in writing tedious browser-based tests.
categories:
    - testing
    - automation
    - frontend
    - productivity
---

In my job, I stumble upon projects where there are _zero_ tests, or a project is equipped with a single generated test always failing. For some development teams, writing and maintaining a comprehensive automated test suite is a lesser priority. These teams' end product is usually an application that satisfies the bare necessities asked by the client but is plagued by code rot, technical debt, and instability.

During the maintenance phase, new layers of code are added on top of the existing cruft, making things worse. Fear of breaking things prevents refactoring, and hence the code quality keeps dropping.

Software maintenance and lifecycle management are hard. As maintainers, we are often tempted to heroically rescue the project by adding all the missing tests or rewriting the whole project from scratch. No budget will ever be given for such a crazy thing. Fortunately, we can follow certain practices:

-   adding tests whenever writing new functions, methods, or classes
-   adding tests before refactoring a unit of code
-   studying the business logic and writing end-to-end tests for it

In this post, I explain the latter -- **end-to-end tests** -- which I've found to be the most effective way of refreshing a stale project. What are these tests, you may ask?

## Anatomy of an End-to-End Test

End-to-end tests (abbreviated as E2E from now on) instead of unit and integration tests cover user-facing flows and business requirements defined for the application since it's planning phase started. These include, for example:

-   registering a new user for a service
-   signing in and out of a service as an existing user
-   adding products to the basket and checking out the purchase in an e-commerce website

Experienced developers might now stop and think of _behaviour-driven development_ (BDD) which goes hand-in-hand with E2E. Behaviour flows are often decided when planning a new feature.

Say we have a calculator application, for example. We want to implement the adding feature and start drafting a specification for it.

```gherkin
Feature: Calculator

  Scenario: “+” should add to current total.
    Given the current total is “5”.
    When I enter “7”.
    Then the current total should be “12”.
```

The syntax in the snippet above is called _gherkin_, and it can be used to convert human-readable specifications to machine-readable tests! Thus, E2E tests can and should be written before the business logic.

Here, the above specification would result in the following test code. The below example is partly written in pseudo-code for the sake of simplicity.

```js
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

But who should write them? **Developers!**

## The Problem of Divergent Tests in Software Development Teams

In some organisations, product teams consist of developers and QA specialists often separated by mental or physical walls. We may use [Conway's Law][conway] to dictate that tests produced by two different groups who don't communicate with each other are radically different.

Developers stick with tests close to their daily work implementing low-level unit tests with lots of mocks, fakes, and stubs. Their tests run fast, use modern features of their chosen programming language, and mostly deliver stable results. The end product is a technically ambitious test suite with low business value and confidence. Most of the functionality might be broken, but at least my fancy new method always returns the correct list of dummy user objects using a mocked database connection. What more do I need?

Meanwhile, when not testing features by hand, QA struggles to write and maintain an exhaustive test set, ultimately proving the application works as the client wants. It's a pity their test suite requires laborious setup, runs slowly, and crashes half of the runs.

Let's put this in the form of a picture.

![Typical tests created by QA and developers.](https://f001.backblazeb2.com/file/nikoheikkila-fi/DevQATests.png)

The root cause of flaky E2E tests is naturally communication, but sometimes choosing the right tools may also help. The QA boomers (pardon the expression) who have been working in the software business for decades often write E2E tests with **Robot Framework** and **Selenium**.

As a developer coming from Finland, I can say **Nokia** indeed has had a significant impact on our professional lives and education. Still, I don't shy away from saying that tests written in Robot Framework are a devastating travesty and maintenance nightmare. Since Cypress began gaining popularity, it has been our time to move on.

Typically, Robot tests are written in a quirky tabular keyword syntax advertised as accessible to even non-developers -- which it certainly is not, I dare to say. Robot tests almost always become a jumbled mess of keywords and external Python libraries without rigorous engineering practices. In a worst-case scenario, as the test suite complexity grows over time, people start neglecting it and what is left is a pit of obsolete tests that worked five years ago, but the application has lived on and changed a lot since then.

The solution is two-fold:

1. End the Cold War, and bring QA and developers together
2. Throw away Robot framework

The former is an organizational and cultural topic outside the scope of this post. The latter, however, can easily be fixed with modern tools. One prominent newcomer to the scene is [**Playwright**][playwright] by **Microsoft**, which I've enjoyed a lot lately.

## How Playwright Reduces the Burden of Automated Testing

For those who have used **Puppeteer**, the logic and API behind Playwright should be familiar. You control three different browser engines. As of writing this they are **Chromium**, **Firefox**, and **Webkit**. Browsers can handle multiple windows and tabs through contexts. There is also support for different mobile devices like iPhones and Pixel phones through device emulation.

There are a couple of aspects that make Playwright especially pleasant to work.

### Speed and Stability Matter

Page actions can be run with `async/await` logic one by one or concurrently when wrapped inside `Promise.all()` or `Promise.allSettled()` calls. Furthermore, page operations automatically wait for the targeted element to become _actionable._ So, for example, a button is not clicked until it's visible on-page and enabled. Never resort to `Sleep 5` or other shenanigans again.

Playwright scripts run incredibly fast with the default configuration, so you may want to add a little delay for the human eye to catch up. Most of the time you should be running your tests headless (no visible browser) and without delay, though.

### Support for Modern Languages

Developers can write tests in **JavaScript** or **TypeScript** using all the modern features as long as a recent Node version is used. I've been running my tests with the latest LTS version (v14) using all the ES2020 goodness through TypeScript configuration.

Using **VS Code**, I'm also able to attach the debugger right in the middle of a test to investigate where that one element disappeared.

If the languages mentioned above are not your cup of tea, you may also use other [supported languages][languages] which currently include **Python**, **C#**, and **Golang**. These are currently considered to be in preview and not ready for production use, but feel free to tinker away.

Upside with multiple language support is that QA specialists and other people with less programming background can start writing tests with simple languages like Python. In contrast, more experienced people appreciate the robust type systems found in TypeScript and Golang. Naturally, the most important thing is you don't have to use Robot Framework keywords anymore.

### Extendability

Because Playwright does not ship with an assertion library or a test runner, you may use any libraries you're familiar with be it `assert`, `chai`, or `expect`. As for running the tests, Jest is recommended because it takes a lot of setup code out of your hands so you can focus on writing the actual test cases.

You can also use any third-party NPM modules in your tests. For example, [`faker.js`][faker] library proves useful when testing HTML form validation with random data.

### Easy Maintenance

More than often, E2E tests contain a lot of repeated actions which can be abstracted into common methods for increased maintainability. Playwright did not invent the **Page Object Model** (POM), but using them proves useful here as well. In brief, POMs are regular classes which are instantiated with a `Page` object responsible for page actions. Remember to declare your methods asynchronous.

Using a POM, the following operation of signing a user in...

```ts
await Promise.all([
    page.fill("[data-test-id=username]", username),
    page.fill("[data-test-id=password]", password),
]);

await page.click("[data-test-id=login]");
```

...becomes a more readable version

```ts
class LoginPage() {
    constructor(page: Page) {
        this.page = page;
    }

    async fillCredentials(user: User) {
        await this.page.fill('[data-test-id=username]', user.name);
        await this.page.fill('[data-test-id=password]', user.password);
    }

    async login() {
        await this.page.click('[data-test-id=login]');
    }
}
```

Note that above I've removed the `Promise.all()` wrap for the sake of simplicity. After the abstraction, this model can be used for any further tests requiring the user to be authenticated.

You should write a model for each specific page in your application and import them to your test suite when needed. If necessary, you can create a new page object with Playwright if sharing one is not an option (it usually is). You can test single-page applications without model classes, but they offer a significant productivity boost for testing more complex routes.

### Generate Code by Recording Browser Actions

Suppose your usual routine when writing new tests is to open the browser developer tools and search for CSS selectors to add into your tests. In that case, you are delighted to know Playwright supports recording and code generation via a command-line tool.

If we want to record actions done in the English Wikipedia, for example, it's as easy as running the following line in your terminal:

```bash
npx playwright-cli codegen https://en.wikipedia.org -o test.js
```

Using the `npx` tool part of Node.js, this command downloads the Playwright CLI tool and opens your browser in a recording mode. The `-o test.js` part is used to stream the generated code to standard output (your terminal) and save it to a file.

In the browser, let's now fetch a random article from Wikipedia, "read" it, and navigate back to the main page. After closing the recording, we have received this code ready to be saved for further inspection.

```js
const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    // Go to https://en.wikipedia.org/wiki/Main_Page
    await page.goto("https://en.wikipedia.org/wiki/Main_Page");

    // Click text="Random article"
    await page.click('text="Random article"');
    // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/San_Vittore_Prison');

    // Click //a[normalize-space(@title)='Visit the main page']
    await page.click("//a[normalize-space(@title)='Visit the main page']");
    // assert.equal(page.url(), 'https://en.wikipedia.org/wiki/Main_Page');

    // ---------------------
    await context.close();
    await browser.close();
})();
```

What is incredibly impressive is that the code is clearly structured, annotated, and wrapped as an asynchronous instantly invocated function. It even suggests places for writing test expectations with `assert.equal()`. If you have Playwright installed globally or in a project, you may repeat the previous actions by running `node test.js`.

From here, you likely want to fine-tune the selectors to be more user-friendly, which is a trivial task given your application has a sensible frontend structure.

### Portability and Automation

If you work on a general-purpose test suite, you may sprinkle a little bit of portability into the cake by using [the official Docker image][docker] provided by Microsoft.

Writing tests is never enough if they only run locally. Playwright supports most of the Continuous Integration solutions out of the box, including **Travis**, **Jenkins**, **Circle CI**, and **GitHub Actions**. For the latter, you may also use [the official GitHub Action][action].

## Closing Remarks

Lately, I've started working with an extensive e-commerce application where a robust end-to-end testing suite is worth every penny. We have established an Azure cloud platform development environment and plan to run tests nightly and after deploying a new application version. This lifts tons of manual testing and stresses off our backs.

With Playwright, I drafted an initial test suite by recording a user flow and refactored it to page object models. After a couple of hours, I had a full-featured test suite which works as a regression test when I want to ensure my changes haven't broken anything. I have a new hammer, and I intend to use it everywhere.

Have you used Playwright for testing your application? Let me know in the comments how it went.

---

<small><span>Photo by <a href="https://unsplash.com/@dtravisphd?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">David Travis</a> on <a href="https://unsplash.com/s/photos/testing?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></small>

[conway]: https://en.wikipedia.org/wiki/Conway%27s_law
[playwright]: https://playwright.dev/
[languages]: https://playwright.dev/docs/languages
[faker]: https://github.com/marak/Faker.js/
[action]: https://github.com/microsoft/playwright-github-action
[docker]: https://playwright.dev/docs/docker/README
