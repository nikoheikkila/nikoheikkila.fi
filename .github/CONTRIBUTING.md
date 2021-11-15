# Contributing to nikoheikkila.fi

-   [Contributing to nikoheikkila.fi](#contributing-to-nikoheikkilafi)
    -   [Contributing](#contributing)
        -   [Where to Contribute](#where-to-contribute)
        -   [How to Contribute](#how-to-contribute)
    -   [Contribution Guidelines](#contribution-guidelines)
        -   [Create an Issue](#create-an-issue)
        -   [Clean Code With Tests](#clean-code-with-tests)
        -   [Create a Pull Request](#create-a-pull-request)
    -   [The Bottom Line](#the-bottom-line)

## Contributing

We expect contributors to abide by good etiquette. All conversations and discussions on GitHub (issues, pull requests) must be respectful and harassment-free.

### Where to Contribute

All [issues](https://github.com/nikoheikkila/nikoheikkila.fi/issues) are up for grabs. For clarification on how we label issues, check out their definitions [here](https://github.com/nikoheikkila/nikoheikkila.fi/labels).

When in doubt, ask me! You can mention me in any issues. Any issue with the `good first issue` tag is typically a good place to start for anyone new to the project.

**Refactoring** code, e.g. improving the code without modifying the behavior is an area that can probably be done based on intuition and may not require much communication to be merged.

**Fixing bugs** may also not require a lot of communication, but the more the better. Please surround bug fixes with ample tests. Bugs are magnets for other bugs. Write tests near bugs!

**Building features** is the area which will require the most communication and/or negotiation. Every feature is subjective and open for debate. If your feature involves public-facing design changes, please provide a mockup first so we can all get on the same page. As always, when in doubt, ask!

### How to Contribute

1. Fork the project & clone locally. Follow the initial setup [here](https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/README.md).
2. Create a branch, naming it either a feature or bug: `git checkout -b feature/that-new-feature` or `bug/fixing-that-bug`
3. Code and commit your changes. Bonus points if you write a [good commit message](https://www.conventionalcommits.org): `git commit -m 'feat(UI): add some feature'`
4. Push to the branch: `git push origin feature/that-new-feature`
5. Create a pull request for your branch 🎉

## Contribution Guidelines

### Create an Issue

Nobody's perfect. Something doesn't work? Or could be done better? Let us know by creating an issue.

PS: a clear and detailed issue gets lots of love, all you have to do is follow the issue template!

### Clean Code With Tests

Some existing code may be poorly written or untested, so we must have more scrutiny going forward. You're welcome to fix it.

### Create a Pull Request

-   Try to keep the pull requests small. A pull request should try its very best to address only a single concern.
-   Make sure all tests pass and add additional tests for the code you submit.
-   Staging deployment will be made to _now.sh_, always check that it succeeds and your changes are deployed correctly.
-   Document your reasoning behind the changes. Explain why you wrote the code in the way you did. The code should explain what it does.
-   If there's an existing issue related to the pull request, reference to it by adding something like `References/Closes/Fixes/Resolves #305`, where 305 is the issue number. [More info here](https://github.com/blog/1506-closing-issues-via-pull-requests)
-   If you follow the pull request template, you can't go wrong.

_Please note: all commits in a pull request will be squashed when merged, but when your PR is approved and passes our CI, it will be live on production!_

## The Bottom Line

We are all humans trying to work together to improve the community. Always be kind and appreciate the need for tradeoffs. ❤️
