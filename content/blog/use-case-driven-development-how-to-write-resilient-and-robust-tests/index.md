---
title: "Use Case Driven Development: How to Write Resilient and Robust Tests"
author: Niko Heikkilä
lang: en
excerpt: |
    Do you want your automated tests to be resilient? Do you hate when your tests break when you refactor or rewrite parts of the functionality? High-level end-to-end tests guarantee this, but their problems arise from flakiness and slowness.
type: post
categories: [tdd, architecture, design, mocking]
date: 2022-08-20
hero: null
---

Recently, I had a discussion with my team regarding an always timely question: at what level should I write my automated tests: unit, integration, or end-to-end?

My initial advice has been to follow the [**Practical Test Pyramid**](https://martinfowler.com/articles/practical-test-pyramid.html), which dictates that you should write mostly unit tests, fewer integration tests, and least of all, end-to-end tests — but don't be too strict when applying it.

However, it's easy to get the test pyramid wrong and assume that all of our unit tests should test only the smallest atomic pieces of our application, thus units.

> "Wait, what did you say? Of course, unit tests should test units. Are you rambling quite mad now?"

Let me explain because, depending on your perspective, the units are not what they seem.

The definition of a unit from the perspective of a unit test is what separates different test-driven development schools — **Mockist** (London) vs **Classicist** (Detroit) — from each other.

**The Mockist school** defines the unit as a slice of structure: class, method, or function. It's the smallest piece you could imagine writing a test for. Each slice a mockist builds has one or more corresponding unit tests. A mockist tests only the unit in isolation and mocks out the rest of the dependencies, as the name implies.

These unit tests are also called solitary tests because the system under test performs in glorious solitude.

**Meanwhile, the Classicist school** — which I represent — defines the unit as a concrete behaviour or use case from the end user's point of view. So I have a unit test for each behaviour defined in the Given-When-Then syntax. I implicitly include the dependencies and collaborators in my tests. However, if there are any I/O-related shared dependencies (databases, filesystems, network requests), I substitute those with a test double — not necessarily a mock, mind you.

These unit tests are also called sociable tests because the system under test socializes with its direct dependencies.

> "If the program's behaviour is stable from an observer's perspective, no tests should change." — Kent Beck

Therefore — and this is where it becomes fascinating — for an old-fashioned mockist developer, most of the unit tests a classicist developer writes are inherently integration tests.

How does the test pyramid fit in the picture for these two schools?

**Test Pyramid for Mockists:**

-   few end-to-end tests for the whole application
-   some integration tests for each class integrating with another class
-   many unit tests for each singular class

**Test Pyramid for Classicists:**

-   few end-to-end tests for the primary UX flow
-   some integration tests connecting multiple use cases
-   many unit tests for each singular use case

In the classicist pyramid, it might not be necessary to write integration tests because unit tests cover the singular use cases, and the end-to-end tests sufficiently cover more complex behavioural flows. On the other hand, in the mockist pyramid, you want to test on all levels, which is the worse approach because each new test adds to the maintenance costs of the software.

I'm not going to deny you your mockist approach, but I'll explain why I think the classicist approach of targeting use cases is better.

The significant value increment when writing unit tests for our use cases instead of structures comes from better maintainability through easier refactoring.

As a mockist, I couple my tests with implementation details when I write unit tests for each structure. Unfortunately, details are known to change every so often when I'm refactoring. Furthermore, I'm typically very prone to fiddle with details while I search and uncover a better design. Thus, I need to rewrite my tests equally, often making them brittle and unfit for service.

A mockist can write 1000 unit tests targeting the implementation details and change them whenever, for example, a domain model needs changes. On the other hand, a classicist can write 200 unit tests targeting the use cases and refactor all the domain models safely whenever needed without touching the tests.

Are you convinced now? Then you are probably wondering how we define and test use cases.

Suppose we are building an expense tracker to monitor our daily budget. As a simple **CRUD** application following the [**Hexagonal Architecture**](https://alistair.cockburn.us/hexagonal-architecture/) design pattern, we are likely to support the following use cases:

-   add new expense(s)
-   search expenses
-   archive expense(s)
-   upload attachment(s)
-   generate expense report(s)

Each line above is a unit of behaviour, which I can test. When I design the implementation, I sketch out a test where I call my use case port with a payload and verify that the port responds with expected data. For most tests, I need the setup phase (_Given_), the handler execution phase (_When_), and the verification phase (_Then_).

The above sounds a lot like testing REST APIs, no? However, my tests are decoupled from the REST integration because I'm testing the ports of my hexagon (use case handlers or services) instead of the REST server itself. The most striking idea in hexagonal architecture is how implementing it strips away the need to start my application and interact with it to verify behaviour. Therefore, I can work only with tests for an extended period. Then, I'm confident the application works when it's time to spin it up.

Furthermore, writing tests for use cases allows me to add any number of relevant adapters. For example, I can easily add a CLI adapter if I need to allow interacting with my application through the terminal or a message bus adapter if I need to consume messages from queues.

Eventually, I discovered the structure of how my application works through several domain entities represented by interfaces and implemented by objects. At this point, moving my tests to target the pure domain models would be tempting, but I would consequently fall into the mockist trap.

When I test the use cases, I verify that I receive the expected amount of domain models with expected data. The internal data and methods within the models are not valuable to my tests. This is a great approach to foster a clean public interface to your application by practising information hiding and making your modules deep. If you're into measuring test coverage, you are delighted to know that it remains high because I'm also transitively covering the domain models.

This is what I practice today: I write many unit tests for each use case and cover the end-to-end flows with some browser-based UI tests or API tests. There's little reason to add integration tests in-between. It's also perfectly valid to call my end-to-end tests integration tests. Following the paradigm, my test pyramid resembles a *test hourglass*, a silly name. Moreover, it's a poor hourglass because its bottom is larger than its top.

Don't become too dogmatic with test pyramids, trophies, hourglasses, or elephants, as those will ultimately shackle you.

Instead, my advice to everyone starting with automated tests is to learn the fundamentals of the classicist approach and write tests for each use case. Then, when you hit the point where you can't comfortably cover the behaviour with unit tests, write the fewest amount of end-to-end tests and return to unit tests.
