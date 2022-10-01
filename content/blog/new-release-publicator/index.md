---
title: "New Release: Publicator"
author: Niko Heikkilä
lang: en
excerpt: A better experience for publishing Python packages.
type: post
categories: [python, opensource, tools]
date: 2022-01-30
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/publicator.jpg
---

Lately, I've been investing more time in _Python_ projects. However, having worked with _Node.js_ and _TypeScript_ for the better part of the last few years, I instantly began to miss the comforts provided by the Node ecosystem, namely the fantastic [**Yarn**](https://yarnpkg.com/) package manager.

Python ecosystem has had its fair share of package management solutions starting from the classic Pip and advancing to Pipenv a few years ago. Unfortunately, both tools lack a wholesome user experience similar to Yarn. I was lucky to stumble upon [**Poetry**](https://python-poetry.org/) some time ago and haven't looked back at other tools since.

While Poetry finally brings us a sensible solution for publishing and maintaining Python packages, many developers crave a more _enhanced_ and safer user experience. **Sindre Sorhus** and contributors have given us [np](https://github.com/sindresorhus/np) for the Node ecosystem, which I've happily used to publish both private and public NPM packages.

Was there anything like this for Poetry? Probably, if I've bothered to search through the packages carefully, but why not make a tool to fit precisely for my use cases? Thus, my latest open-source tool, [**Publicator**](https://github.com/nikoheikkila/publicator), aims to offer the same convenient solution for publishing your everyday Python packages.

Out of the box, its most helpful features include:

-   Ensuring you're publishing from your default branch (you can ignore this)
-   Ensuring the working directory is clean and removing any untracked dependencies from the virtual environment
-   Running the unit tests (defaults to running pytest, but you may specify another test command)
-   Automatically bumping the package version in your _pyproject.toml_ file
-   Committing the version bump, pushing a new tag to your Git server, and publishing the new package to [Python Package Index](https://pypi.org/) (or your private repository)
-   Projects hosted on GitHub.com open a new browser window for drafting the release with pre-filled details. Sweet!

Developing and testing Publicator has been an incredible luxury because of the dogfooding – that is, I can release new versions using the tool itself. Additionally, I created [**semmy**](https://github.com/nikoheikkila/semmy), a simple Python package to help with semantic versioning, which Publicator uses internally.

On another note, the codebase has many micro-tests I've obediently written following TDD cycles. Hence, you won't find any technical debt here, making your contribution efforts easier.

As is the custom, my employer generously funds the development through [The Spice Program](https://spiceprogram.org/). I'm also sharing my work under the **MIT** license so you can use it for your commercial projects as well.

More features will follow in the future, and you're welcome to [contribute](https://github.com/nikoheikkila/publicator/blob/main/CONTRIBUTING.md) to them. If anything crashes or feels buggy, let me know by opening a new [issue](https://github.com/nikoheikkila/publicator/issues/new).
