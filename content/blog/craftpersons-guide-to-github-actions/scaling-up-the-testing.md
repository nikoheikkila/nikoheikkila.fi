---
title: "Craftsperson's Guide to GitHub Actions #2: Scaling up the Testing"
author: Niko Heikkilä
lang: en
excerpt: Move beyond basic unit tests with property-based testing to discover hidden edge cases and mutation testing to verify your tests actually work. Learn how to achieve genuine confidence in your GitHub Actions code.
type: post
date: 2025-12-10
hero: null
---

_Originally published on [Polar Squad blog](https://polarsquad.com/blog/craftspersons-guide-to-github-actions-2-scaling-up-the-testing)._

In the previous post, we improved the design of our GitHub Action to make it testable. But having testable code is just the beginning. We're still far from delivering a truly reliable solution to our users.

In this chapter, we'll enhance our testing approach with two powerful techniques that many developers overlook: property-based testing and mutation testing. These aren't just advanced techniques for the sake of it. They're practical tools that uncover bugs traditional testing misses.

Before diving into advanced testing techniques, let me introduce the example we'll use throughout this post.

## The ROT-13 Action

Our example action is deliberately simple: it transforms an input string using ROT-13 and outputs the result. ROT-13 is a letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. Simple enough to understand, yet complex enough to demonstrate testing challenges.

Using the action in a workflow is straightforward:

```yaml
- name: ROT-13
  uses: nikoheikkila/rot-13-action@v1
  id: rot-13
  with:
    string: "Hello, world!"
```

We set a display name for the logs, assign an ID for accessing output in subsequent steps, and reference the action using its repository name and version tag.

When executed, the action logs its transformation:

```plain
▽ Run nikoheikkila/rot-13-action@v1
  with:
    string: Hello, World!

Hello, World! -> Uryyb, Jbeyq!
```

This represents the minimum functionality we need to test. However, as professional software engineers, we should strive for more than the bare minimum.

GitHub Actions also supports _composite actions_, which are essentially shell scripts split into multiple steps. While they can simplify long workflows, they're notoriously difficult to test correctly. I only recommend them for trivial use cases.

Let's start with practical unit tests.

## Unit Testing: Fast Feedback Without Waiting

Yes, the ultimate test environment for GitHub Actions is GitHub Actions itself. But that doesn't mean we should test there exclusively.

As we discussed in the previous chapter, the key challenge is testing action logic without building and pushing code after every change. With proper design, testing becomes fast and even enjoyable.

Every non-trivial GitHub Action has a core where the business logic lives. You might be tempted to test only this core in isolation, but that's a mistake. We need to verify the complete behaviour from input to output.

I'm not talking about end-to-end tests that span multiple systems. Instead, think of this as _behaviour-focused sociable testing_. These tests verify how components work together to produce the expected behaviour.

We're not testing individual components in isolation. We're verifying complete behaviour from input to output while the components interact. Hence, we refer to it as sociable testing.

"_But is this unit testing or integration testing?_", you might ask.

If the question bothers you, I highly recommend [Ted M. Young's article on why the distinction doesn't matter as much as you think](https://ted.dev/articles/2023/04/02/i-m-done-with-unit-and-integration-tests/). What matters is that our tests are fast, reliable, and verify the expected behaviour.

Here's what happy path tests look like for our action:

These tests arrange the action with predefined input, execute it, assert the output matches expectations, and verify the log message. No spies or mocks needed. The tests are data-driven, readable, and blazingly fast.

```javascript
it.each([
  ["A", "N"],
  ["M", "Z"],
  ["N", "A"],
  ["Z", "M"],
  ["a", "n"],
  ["m", "z"],
  ["n", "a"],
  ["z", "m"],
  ["HELLO", "URYYB"],
  ["WORLD", "JBEYQ"],
  ["ROT13", "EBG13"],
  ["123", "123"],
  ["!@#$%", "!@#$%"],
  ["Hello, World!", "Uryyb, Jbeyq!"],
  ["Héllo", "Uéyyb"],
  ["🔒 secret", "🔒 frperg"],
  ["Тест", "Тест"],
  ["مرحبا", "مرحبا"],
  ["こんにちは", "こんにちは"],
])("transforms %s to %s", (input, expectedResult) => {
 core.setInput("string", input);

 action.run();

 const actualResult = core.getOutput("result");
 expect(actualResult).toBe(expectedResult);
 expect(core.eventsOf("info")).toContain(`${input} -> ${expectedResult}`);
});
```

Edge cases matter, too. While the ROT-13 transformation of an empty string is technically valid, let's demonstrate input validation by requiring input length between 1 and 1,048,576 characters (1 MB).

```javascript
it("fails with empty string input", () => {
  const input = "";
  core.setInput("string", input);

  expect(() => action.run()).toThrowError(
    "input field 'string' cannot be empty",
  );
});

it("fails with input exceeding 1 MB", () => {
  const maxSize = 1024 * 1024;
  const input = "*".repeat(maxSize + 1);
  core.setInput("string", input);

  expect(() => action.run()).toThrowError(
    `input field 'string' cannot exceed ${maxSize} characters`,
  );
});
```

Our unit tests now pass with 100% coverage. Time to celebrate? Not quite. Traditional code coverage is a vanity metric: it tells us which lines were executed, not whether our tests actually verify the correct behaviour. Let's do better.

## Property-Based Testing: Testing What You Can't Imagine

Think about the essential properties of ROT-13 transformation:

* **Length preservation:** transformation doesn't alter the input length
* **Inverse operation:** applying ROT-13 twice returns the original string
* **Case preservation:** uppercase letters stay uppercase, lowercase letters stay lowercase
* **Character selectivity:** only alphabetic characters rotate

You could write hundreds of example-based tests to cover these properties and still miss a myriad of edge cases. Even LLMs would struggle to generate comprehensive enough examples.

There's a better way, and it's called property-based testing. Libraries like Hypothesis (Python) or QuickCheck (Haskell) have demonstrated the power of this approach. For JavaScript, we'll use [fast-check](https://fast-check.dev/), which generates test data automatically based on properties we define.

A property-based test in fast-check is elegant:

```typescript
type Predicate = (s: string) => boolean;

it("does not change text length", () => {
 const preservesLength: Predicate = (s) => transform(s).length === s.length;

 assert(property(string(), preservesLength));
});
```

We _assert_ that a _property_ holds true for all _strings_.

The predicate function returns true when the transformation preserves length. Fast-check then generates hundreds of random strings and checks our predicate against each one. If all pass, the test passes.

When a test fails, fast-check doesn't just throw up its hands. It _shrinks_ the failing input to find the minimal example that demonstrates the bug. Instead of debugging `xKj9!@mNqP#$wZ`, you might get `A`. This shrinking process is invaluable for understanding the causes of failures.

Once you've identified the minimal failing case, write it as a traditional unit test, fix it, then return to property-based testing to verify the fix. This workflow integrates beautifully with test-driven development.

Testing the inverse property is equally straightforward:

```typescript
it("is its own inverse", () => {
 const isItsOwnInverse: Predicate = (s) => transform(transform(s)) === s;

 assert(property(string(), isItsOwnInverse));
});
```

Sometimes we need to constrain inputs to test-specific properties. Fast-check's `string().filter()` method lets us generate only strings matching certain criteria:

```typescript
it("preserves uppercase", () => {
 const isUpperCase: Predicate = (s) => s === s.toUpperCase();
 const preservesUpperCase: Predicate = (s) =>
  [...transform(s)].every(isUpperCase);

 assert(property(string().filter(isUpperCase), preservesUpperCase));
});

it("preserves lowercase", () => {
 const isLowerCase: Predicate = (s) => s === s.toLowerCase();
 const preservesLowercase: Predicate = (s) =>
  [...transform(s)].every(isLowerCase);

 assert(property(string().filter(isLowerCase), preservesLowercase));
});

it("only transforms alphabetic characters", () => {
 const isSpecialCharacter: Predicate = (s) => !/[A-Za-z]/.test(s);
 const skipsTransformation: Predicate = (s) => transform(s) === s;

 assert(property(string().filter(isSpecialCharacter), skipsTransformation));
});
```

Not every GitHub Action benefits from property-based testing. If your action doesn't involve mathematical properties or transformations, traditional tests might suffice.

However, for many actions involving data, cryptography, parsing, or any domain with distinct invariants, fast-check saves enormous amounts of time while uncovering bugs you'd never have imagined.

We now have more test code than production code. "Isn't this overkill for a simple ROT-13 transformation?" you might ask.

No. Quality software often has significantly more test code than production code. We're building confidence that our action behaves correctly under all circumstances. And we're not done yet: the most powerful testing technique is still ahead.

## Mutation Testing: The Ultimate Reality Check

Mutation testing is the most humbling technique in a developer's toolkit. Why? Because it _tests your tests_.

Testing tests might sound recursive and pointless, but it's critical, especially if you write tests after the code. We've all been there until we learn **Test-Driven Development**. Mutation testing reveals whether your tests actually verify behaviour or just exercise code.

Here's how it works: A mutation testing tool modifies your source code in subtle ways — switching `>` to `>=`, changing `&&` to `||`, removing conditionals, or tweaking regular expressions. These modifications are called [mutators](https://stryker-mutator.io/docs/mutation-testing-elements/supported-mutators/).

After mutation, the tool runs your tests. If tests fail, the so-called _mutant is killed_, which is good. If tests still pass, the mutant _survives_, which is bad since your tests didn't catch the bug. The mutation score is the percentage of killed mutants out of all mutants.

Mutation testing exposes the harsh truth: traditional code coverage is a vanity metric. Many teams treat 100% coverage as proof of quality, but mutation testing tells a different story.

I've seen codebases that enforce up to 100% coverage scores through quality gates, yet when I run mutation tests, numerous mutants still survive because the tests were written hastily. You might have experienced this yourself: refactor some code — or let an LLM do it — and then see all tests pass, only to watch bugs appear in production. Your tests touched every line but verified little.

Improving mutation scores in legacy codebases is a challenging task. Even modern LLMs struggle with this. The pragmatic approach is to start with a lower threshold and gradually increase it as you improve tests. For new projects, aim for 100% from the start and enforce it throughout your pipeline.

Our ROT-13 action is new, so we'll choose perfection.

Setting up mutation testing for our GitHub Action is straightforward with [StrykerJS](https://stryker-mutator.io/docs/stryker-js/introduction):

```javascript
{
  commandRunner: {
    command: "bun test",
  },
    checkers: ["typescript"],
    mutate: ["src/**/*.ts"],
    reporters: ["clear-text", "progress"],
    thresholds: {
      high: 100,
      low: 100,
      break: 100,
  }
}
```

Key configuration points:

* **Command runner:** Specifies the test command. We use Bun, but any test runner works.
* **Checkers:** TypeScript checker eliminates mutants that cause type errors, saving time.
* **Mutate:** Defines which source files to mutate. Be specific: mutating tests or dependencies wastes time.
* **Thresholds:** We set all thresholds to 100%, meaning anything less than perfect fails the build.

The high/low thresholds control report colours (green/yellow/red), but since ours are identical, we get either green or failure. There is no middle ground.

Mutation tests add only a few seconds to our test suite, making them perfect for pre-push hooks. Run unit tests, property-based tests, and mutation tests together. Push the commit only when everything is green.

## Conclusion

Building quality into GitHub Actions requires discipline, but the payoff is worth it. Follow this testing pyramid:

* Start with unit tests using test-driven development
* Add property-based tests to uncover edge cases you'd never think to write
* Verify with mutation testing to ensure your tests actually test what they claim to test
* Add a few workflow tests to verify your action is callable

The foundation for all of this is writing actions that do one thing well. Simple logic is more straightforward to test than complex logic. Introduce these practices early, ideally before writing much production code. Retrofitting quality is always more difficult.

Remember that GitHub Actions are just functions. They take inputs and produce outputs. The same testing principles that apply to your backend or frontend code apply here. No exceptions, no excuses.

In [the next chapter](/blog/craftpersons-guide-to-github-actions/building-and-releasing), we'll address the final piece: building and releasing your action. We'll create a CI/CD pipeline that verifies your action works correctly in a real GitHub Actions environment, then releases it safely to users. We'll also explore how to handle external dependencies and asynchronous operations without sacrificing test speed.

It's where all the design and testing practices come together to create automation you can trust in production. This is the kind of delivery culture we help teams build every day at Polar Squad.

Let us ship this action!
