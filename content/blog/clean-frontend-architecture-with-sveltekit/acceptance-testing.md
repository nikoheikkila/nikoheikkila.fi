---
title: "Clean Frontend Architecture with SvelteKit: Building Confidence with Acceptance Testing"
author: Niko Heikkilä
lang: en
excerpt: What good does a clean architecture do if you cannot safely deliver it to the hands of your users? Unit tests help to a point, but the real confidence lives in automated acceptance tests.
type: post
categories: [guides, frontend, architecture, design, svelte]
date: 2023-05-03
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

In the previous chapters, you saw how the heart of our architecture — services, gateways, and domain models — were covered with behavioural IO-free[^1] tests. However, omitting the acceptance tests at a higher level still leaves a lot of ground to cover, and I'm not entirely confident that my web application will satisfy the users' needs when I deploy it.

How would I solve that? By writing acceptance tests to verify the users are served the expected content.

When generating a new walking skeleton project with SvelteKit, I was asked to use [**Playwright**](https://playwright.dev/) for writing end-to-end tests, which I happily accepted. Even though end-to-end testing, especially for browsers and micro-services, has a bad reputation among some industry professionals, I do endorse crafting _just enough_ happy case acceptance tests with Playwright. I also endorse using Playwright over alternative libraries such as **Cypress** and **Selenium** due to its robustness and simplicity. While teaching developers to use Playwright for browser-based testing, I've noticed how satisfied and effective they become shortly after learning the basics.

In the future, Playwright ships with [first-class support for component tests](https://playwright.dev/docs/test-components). However, since component tests are still considered experimental when writing this, I shall leverage the [**Svelte Testing Library**](https://testing-library.com/docs/svelte-testing-library/intro/) instead. Developers familiar with React Testing Library should find it homely.

Do note that writing about the acceptance testing deliberately late in the series does not mean I have written these tests late after the production code. On the contrary, following test-driven development with acceptance testing is possible and incredibly rewarding.

A simple test-guided workflow with a SvelteKit application goes as follows:

1. I specify an expectation for a page route in the form of a test.
2. The test fails, so I implement the page and see the test pass.
3. Next, I write a test that expects the page to have relevant content.
4. Again, the test fails, so I implement the page contents and see the test pass.
5. Finally, I wrote a test expecting the page to have an interactive element.
6. The element is missing, and the test fails, so I implement it and bind logic to it. You know what happens next.

It's repetitive, rhythmic, and thus so glorious.

While striving to make the acceptance tests pass, I introduce another TDD loop for designing the underlying views and components. This practice is commonly known as the _outside-in_ TDD loop or ATDD (Acceptance Test Driven Development), where I start from the high-level scenarios and gradually descend deeper to solve the problem. At the end of this loop, both high-level and lower-level tests pass, and I can refactor the solution safely.

## Testing the End-to-End Functionality

Following the guidance of the test pyramid, I have kept my [end-to-end tests](https://github.com/nikoheikkila/photo-browser/tree/main/tests/e2e) brief because being on top of the pyramid they are the slowest and most brittle automated tests you can write. In the context of frontend applications, end-to-end tests typically launch a real browser for each test visiting the given page and asserting the correct data and behaviour.

Having these slow tests around does not mean you should skip them. Many browser-based features are outside the scope of component and unit tests. For example, finding out how your web application's root `<html>` tag specifies the content language is only accessible through an end-to-end test. You only need to be wary of testing edge case behaviour too extensively. Instead, focus your end-to-end tests on the happy paths of your user journeys to reap the best return on investment.

Furthermore, end-to-end tests act magnificently as _smoke tests_ I can run after each deployment to verify the site was deployed correctly. Should any smoke test fail, I can instruct my delivery pipeline to fail the build and prevent publishing the new changes to users. Given that your infrastructure supports decoupling web application deployments from public releases, you should consider this method for complex frontend applications. If it doesn't, modernise your infrastructure.

Given a photo browsing application, what tests do I focus on with Playwright? The list below describes the scenarios.

-   **Landing page**
    -   defines English as the content language
    -   declares a page title in HTML
    -   contains a list of grouped album photos
    -   allows users to navigate back to the home page
    -   contains author information in the footer
-   **Single album page**
    -   declares a page title in HTML
    -   displays the photos fetched by album ID
    -   warns the user when they navigate to an album page with an invalid ID
-   **Single photo page**
    -   declares a page title in HTML
    -   displays the photo fetched by ID
    -   warns the user when they navigate to a photo page with an invalid ID

Above, I've defined happy cases that boost my confidence in acceptance tests. Besides locating the correctly rendered DOM elements on pages and testing page interactions, I also want to check if I had set up the SvelteKit routing correctly. I should see the expected contents by navigating with valid route parameters but be warned when navigating to the page with bogus parameters.

Playwright does a fantastic job creating test fixtures, such as the page you're visiting for test cases. Using Playwright's built-in assertions, I can easily verify that the page contains an expected title.

```typescript
test("has an accessible title", async ({ page }) => {
    await expect(page).toHaveTitle(/Home/);
});
```

I can also verify the visibility of the contents almost as quickly.

```typescript
test("displays informative error when photo is not found", async ({ page }) => {
    const alert = page.getByRole("alert");

    await page.goto("/photo/invalid");

    await expect(alert).toContainText(/Invalid photo ID 'invalid' given/);
});
```

It's worth noting I could have tested _all_ the numerous edge cases using the [parameterisation feature](https://playwright.dev/docs/test-parameterize) built into Playwright. Enumerating a list of invalid route IDs and verifying that an expected error was displayed does not only sound easy, it _is_. However, the said effort would yield far more waste than value due to the nature of end-to-end testing.

As a matter of fact, I've seen developers losing their otherwise rational minds over chasing to cover all the possible and sometimes even impossible edge cases. Furthermore, when combined with the slowness of end-to-end tests, this approach will result in a test suite that takes an exceptionally long time to run.

_Yes, but... what's so horrible about a long-running test suite? It doesn't sound like the end of the world to me._

Oh, have I heard this one before? Many times.

When tests run for an extended time, developers typically run them less often. In addition, a handful of failing tests within an _enormous_ test pipeline is considered acceptable because rerunning them would be too painful. Consider a low-end environment like your continuous integration pipeline with only 2 virtual CPUs. If an end-to-end test suite would run on your local machine for a few minutes, how does it feel to wait 10 or 20 minutes for the same tests to pass in the pipeline? You won't wait, I argue. After all, passing, say, ~80 % of the acceptance tests is often deemed "acceptable" for the next release.

To my amazement, I've seen teams who have grown comfortable having parts of their test suites fail daily because of flakiness or poor hardware. Another developer once kindly instructed me to disregard the failing tests because failure was expected, and those had been marked as warnings. The critical point was that the number of warnings stayed the same. Welcome to a legacy project.

Hence, I can not stress enough how dangerous the path of attempting to maintain an insufferably slow test suite is. Instead, you must focus on covering the edge cases by writing faster and, ideally, IO-free tests where you get feedback orders of magnitude faster. Seconds, not minutes.

## Testing the Views

Since we want to keep our acceptance test suite robust, I must write fine-grained [tests for my Svelte views](https://github.com/nikoheikkila/photo-browser/tree/main/tests/components). These are and are not the same as routes. The list below describes the scenarios.

-   **Landing view**
    -   counts the number of photos per album
    -   photos link to their respective pages
    -   photos contain accessible texts for screen readers
    -   warns the user when there are no albums to show
-   **Single album view**
    -   photos link to their respective pages
    -   photos contain accessible texts for screen readers
    -   allows navigating to the next album page
    -   allows navigating to the previous album page
    -   forbids navigating to the previous page from the first page
    -   warns the user when the album contains no photos
-   **Single photo view**
    -   wraps the photo inside a `<figure>` element
    -   contains a photo caption describing its title and size in pixels
    -   contains a photo with accessible text for screen readers
    -   contains a link back to the album page

As remarked in the previous chapter, I construct my user interfaces using _views_, which bundle multiple Svelte components. Doing so supports the TDD approach when I design the views. However, I won't start with the fleshed-out components in my mind, only the initial view scaffolding. During the first iterations, my views are rough, and all the HTML is deliberately inlined. Then, after writing enough passing tests, I refactor and extract the inlined HTML into elegant and encapsulated components.

Testing vast views with complex state logic can also be time-consuming. Fortunately, my views are simple, and I don't need any particular state management setup for this application. Still, trade-offs are wise to keep in mind as the complexity grows. For example, you should split your extensive views into more petite, manageable child views. I have yet to look deeply into the Svelte internals, but the test performance might be better than React due to Svelte's compilation step.

For example, testing the accessibility of the view is easy. Below, I'm rendering the view through a custom `arrange()` test helper. Then, I pass it a random photo model, locate the photo by its alt text, and verify it's visible. Generally, locating HTML elements through their accessible roles and descriptions is better for ensuring accessibility than using IDs or class names.

Furthermore, you don't see any rigid coupling to a specific component. Rendering a specific SvelteKit page component is the only thing needed.

```typescript
const arrange = (data: PageData) => render(Page, { data });

test("contains a photo with accessible alternative text", async () => {
    arrange({
        photo: randomPhoto({ title: "My friend" }),
    });

    const photo = await screen.findByAltText("Caption: My friend");

    expect(photo).toBeVisible();
});
```

Because Svelte considers each `*.svelte` file a standalone component, extracting the inlined HTML and defining props requires little effort and is greatly helped by my IDE. This is a helpful approach as I don't need to know beforehand what components to build my views from. As TDD practitioners worldwide claim, the correct design will eventually emerge. Let your tests guide your hands on the keyboard towards it.

I won't write tests for my individual components since I've already transitively covered their behaviour in my view tests. As with tests targeting the behaviour of the service layer, view tests enable refactoring components without breaking the existing tests.

## Conclusion

While browsing the test cases I've written, you probably encountered some overlap between the Playwright and Svelte tests. This is normal, as the line between higher and lower-level UI tests can be thin. As a rule of thumb, if you don't need a real browser to render your entire application in tests, consider aiming as low in the test pyramid as possible. Aim to make your UI a superficial formatting layer whenever feasible so you don't have to test it. Instead, focus testing on behaviour in the backend of the frontend. I've seen this possible in many cases, yet sometimes you will encounter applications with more complex logic whose behaviour must reside in the component. In the end, that's a challenge to refactor as well.

In this post, I wanted to demonstrate how to efficiently test user interface construction and behaviour using two approaches to acceptance testing. You should pick the one that suits your needs better, or use both. Unfortunately, there is no correct answer other than the famous senior engineer catchphrase: _"It depends"_.

In [the next post](/blog/clean-frontend-architecture-with-sveltekit/continuous-deployments), I will explain how to deliver the application to my users by setting up a continuous delivery pipeline. Cleanly architectured applications with stable test suites allow deploying new versions multiple times daily without significant pain. It must be nice, doesn't it?

[^1]: Here, I'm using the lexical separation [**Ted M. Young**](https://ted.dev/articles/2023/04/02/i-m-done-with-unit-and-integration-tests) coined when speaking of different levels of developer tests he writes. IO-free tests concern the domain and service behaviour, while the I/O-dependent tests verify the application works with external I/O sources as expected. This is more meaningful than plainly speaking of unit and integration tests.
