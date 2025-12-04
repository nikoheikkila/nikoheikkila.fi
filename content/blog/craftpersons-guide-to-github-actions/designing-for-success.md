---
title: "Craftsperson's Guide to GitHub Actions #1: Designing for Success"
author: Niko Heikkilä
lang: en
excerpt: Discover how to design testable GitHub Actions by avoiding common pitfalls like implicit dependencies and global state. Learn to separate business logic from infrastructure using dependency injection for fast, reliable testing.
type: post
date: 2025-12-04
hero: null
---

_Originally published on [Polar Squad blog](https://polarsquad.com/blog/craftspersons-guide-to-github-actions-1-designing-for-success)._

Like many other types of scripts, GitHub Actions suffer from a common problem: it's tempting to take a legacy Bash or PowerShell script and convert it into JavaScript without considering best practices like modularity and separation of concerns. The result is code that's difficult to understand, test, and maintain.

Typically, actions become tightly coupled with the underlying infrastructure. They make network requests haphazardly, write to and read from disk, and invoke arbitrary shell commands — all without proper abstraction.

Even seemingly straightforward actions, such as downloading and adding a binary executable to the path, quickly reveal their complexity. What if the download fails? What if permissions prevent writing to the directory? What if we download the wrong version? What if the executable doesn't launch at all?

If you've ever written a script for installing custom software from the internet, you know how exhaustive the logic can be, even when it looks as simple as piping curl output to bash. This is why we can't afford to skip quality practices, even for simple scripts.

## The Hidden Cost of Implicit Dependencies

To streamline action development, GitHub provides the [@actions/toolkit](https://github.com/actions/toolkit) monorepo, which includes several helpful packages. While these tools are powerful, I've seen them used in ways that create maintenance nightmares.

Take a look at this code snippet from GitHub's official tutorial. If you're familiar with software design principles, it might make you wince:

```javascript
import * as core from "@actions/core";
import * as github from "@actions/github";

try {
  const nameToGreet = core.getInput("who-to-greet");
  core.info(`Hello ${nameToGreet}!`);

  const time = new Date().toTimeString();
  core.setOutput("time", time);

  const payload = JSON.stringify(github.context.payload, undefined, 2);
  core.info(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

Three significant issues stand out:

1. Direct third-party library usage without abstraction
2. Global mutable state dependencies
3. Uncontrolled side effects (date construction)

While I won't judge a tutorial too harshly, these patterns are spreading rapidly, especially as developers use LLMs to generate action code. The resulting actions become difficult to test and maintain.

## Import Smells: When Dependencies Use You

**Issue #1** prevents safe side-effect handling and clean testing. The `core` object performs multiple responsibilities: logging to the console, setting output data, and terminating the script with exit codes.

Running this code in tests without a proper abstraction creates a miserable experience. Environment variables for inputs are missing, outputs can't be asserted, and your terminal floods with logs.

"But we can always use spies and mocks!", some might argue.

True, but at what cost? Your business logic is still entangled with infrastructure, tests become fragile, and refactoring turns into a risky endeavour. When tests depend heavily on implementation details, they require increasingly complex mocking setups. Coming back six months later to fix a bug through tests? Good luck.

Importing functionality from third-party packages without abstraction creates what I call **import smells** — dependencies that pollute your code and make testing painful.

## Global Mutable State: The Silent Killer

**Issue #2** introduces dependency on global mutable state that changes during pipeline runs. This creates the dreaded scenario: tests pass locally but fail after pushing. Debugging becomes a guessing game.

Worse still, your action might behave differently between pull request and release workflows because the global context contains different data. What worked in one scenario breaks in another.

Using context for simple debug logging? That's fine. However, once complexity increases, confidence in your actions tends to evaporate. As a maintainer, prepare yourself for a steady stream of bug reports and confused users.

## The Time Problem

**Issue #3** is subtler but equally important.

When business logic calculates the current timestamp directly, testing becomes unreliable because each test run produces a different timestamp.

You can't test the timestamp cleanly and end up either mocking the system clock, or writing weak assertions that check the string vaguely resembles a timestamp. That's not testing but wishful thinking.

This ties back to the first issue: even without explicit imports, you have an implicit dependency on the `Date` class.

To address the issues above, we need to design actions that are easy to test and not coupled to the infrastructure. How do we solve that?

## The Solution: Dependency Injection

The fix is simpler than you might think. Let's separate business logic from infrastructure by splitting our code into two files:

```javascript
// action.mjs
export function run({ core, github, date }) {
  const nameToGreet = core.getInput("who-to-greet");
  core.info(`Hello ${nameToGreet}!`);

  const time = date.toTimeString();
  core.info(`The current time is ${time}`);

  const payload = github.payload.dump();
  core.info(`The event payload: ${payload}`);
}
```

```javascript
// index.mjs
import * as core from "@actions/core";
import * as github from "@actions/github";
import * as action from './action.js';

try {
  action.run({ core, github, date: new Date() });
} catch (error) {
  core.setFailed(error.message);
}
```

The structure looks similar, but the improvement is dramatic. Our business logic is now infrastructure-independent. The logic doesn't import anything from the Actions toolkit. This makes the code portable to other systems with similar interfaces.

The infrastructure hasn't disappeared; it's been separated through dependency injection. The `core`, `github`, and `date` objects are now parameters we can easily substitute in tests.

That's it! Our business logic and dependencies are now cleanly separated, and, most importantly, they are testable.

In place of infrastructure dependencies, we use **infrastructure test doubles** — fake objects — which don't contain side effects making them ideal for tests.

I've added a few helper methods to the fake objects to make testing more ergonomic. JavaScript and TypeScript allow this flexibility as long as objects implement the required interface. Since these test doubles never leave the test suite, there's no risk of them appearing in production code.

The assertions simply inspect an in-memory log, ensuring tests pass for the right reasons, produce clean reports, and allow confident refactoring of business logic.

Dependency injection scales extremely well. No matter how complex dependency you have, you can always pick out the interesting parts, write an abstraction, and use a test double in its place.

## Conclusion

Before writing your next GitHub Action, ask yourself one question:

> Can I test this logic without pushing to GitHub and running a workflow?

If the answer is yes — using the techniques described here — you've unlocked fast feedback loops that reduce defects and make changing business logic cheaper and safer.

But we're just getting started. In [the next chapter](/blog/craftpersons-guide-to-github-actions/scaling-up-the-testing), we'll explore advanced testing techniques, including property-based testing to uncover edge cases you might never think to write, and mutation testing to verify that your tests actually test what they claim to test.

It's the next step toward building automation you can truly trust.

See you there!
