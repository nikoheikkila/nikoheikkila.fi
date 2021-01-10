---
lang: en
author: Niko Heikkilä
date: 2019-05-05
cover: cover.png
title: Don't Use Bash for Scripting (All the Time)
type: post
excerpt: >
  When the complexity of your script grows it's time to drop the Bash.
  With modern tools it can be easy, fast, and fun.
categories:
  - Beginners
  - Bash
  - CLI
  - Linux
---

Writing scripts is a subset of coding we sometimes can't avoid nor should be afraid of. The standard tool for writing scripts is Bash for UNIX environments and PowerShell for Windows environments. In this post, I explain when it's appropriate to use Bash for scripting and when it's not.

## The Good Side of Bash

Bash can be considered a _ubiquitous_ language, meaning it's installed nearly on any system you land on. It's hard to find a Linux-based operating system where either Bourne Again Shell (`bash`) or its older sibling Bourne Shell (`sh`) doesn't come pre-installed.

Working with code requires using a shell for executing a series of easy repeating tasks. It would be a burden to type these by hand every time you want something to happen. Using containers is a way to work around this problem but for environments where those are not supported, you would likely use Bash.

Bash shines in small and efficient scripts which are designed mainly for one thing: repeating instructions you would otherwise type manually from top to bottom. Given a standard project this typically involves installing external packages, running tests, and performing general maintenance tasks for the project.

Deploying a codebase for a local development environment typically involves installing dependencies with your chosen package manager, setting necessary environment variables and launching a development server. These could be baked into a shell script for easier access. Likewise preparing your codebase for tests, running them, and finally cleaning up is a good use case for a Bash script.

However, if the tasks presented above require more complex steps Bash can become cumbersome very quickly.

## The Ugly Side of Bash

I'm declaring this out loud. Syntax of Bash is ugly and has a steep learning curve. Thanks to modern tools not many a developer begin their programming journey setting up UNIX environments with Bash. Therefore, we should not assume every new developer contributing to a software project knows their way around complex Bash scripts.

Consider the following example of assigning a default value to a variable where one is not given:

```bash
name="${1:-World}"
echo "Hello, $name!"
```

The last line looks easy. We are printing a message with a variable but what on earth is going on in the first line? Syntax quirks like wrapping the statement in braces and the mysterious notation of `1:-` make this very hard to understand. Without a good whitespacing it's painful to read as well. Anyhow, this line tells Bash to assign a string value of `World` to a local variable `$name` when the user has not given anything as the first parameter for the script.

Let's do the same in Python.

```python
name = args.name or "World"
print(f"Hello, {name}")
```

Assume we have parsed the arguments using Python's [`argparse`](https://docs.python.org/3/library/argparse.html) module. Python provides a logical `or` keyword for checking if the value on the left is interpreted _falsy_ and a default assignment should be done instead. This is a lot more beginner-friendly.

A similar approach can be followed with Javascript:

```js
const name = args.name || "World";
console.log(`Hello, ${name}`);
```

The only difference to Python is replacing `or` with the standard logical notation of `||`. Granted, you'll have to do a bit more work by parsing the script arguments but the result will be more **readable**. When it comes to maintaining software one of my favorite phrases which everyone should learn is:

> Without readability, there can be no maintainability. Without maintainability, there can be no value. Readability is everything.

Some might argue that scripts need not be readable as they only include so-called _throwaway code_. This is a problematic statement since I've witnessed mission-critical systems being glued together with scripts for the lack of better tools. Have you ever taken a maintenance job in a project built on top of several 100+ lines long scripts maintained by a task force of one developer? Having an indifferent attitude to script maintenance places businesses in grave risks.

## Making It Rain With Bash

Writing good Bash scripts takes years of practice. It's not a fruitless path should you choose to follow it but requires a special set of tools and skills to generate value. To not fail with Bash there are two important pieces of advice to adopt.

The first advice is to use the [unofficial Bash strict mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/) to avoid unnecessary debugging. It consists of two lines making your script behave in the following way:

- The script exits immediately upon encountering an error (`-e` flag)
- The script exits immediately upon encountering an undefined variable (`-u` flag)
- The script exits immediately when one or more calls in a piped statement fail (`pipefail` option)
- Internal field separator (`IFS`) is set to accept newlines and tabs making the notorious Bash array handling easier and more logical

There are some caveats for using the strict mode so I suggest reading the entire linked article and enabling or disabling the settings as you go.

The second advice is to install [_ShellCheck_](https://www.shellcheck.net/) for linting and analyzing your script while writing it. This is a magnificent tool that will find incorrect array iterations or variable substitutions for you to fix before even running the script. _ShellCheck_ is definitely among the finer static analyzers I've used and it comes pre-installed in [Travis CI runners](https://github.com/koalaman/shellcheck/wiki/TravisCI) meaning you can have your Bash scripts checked against defects on each pushed commit. Believe me, you should.

Speaking of debugging your code, it's possible with Bash although I've never found the native debugger (`-x` flag) or throwing print statements around stick with me. If maintaining your script requires periodic debugging sessions you should either enable the strict mode or refactor the logic.

## Scripting Without Bash

Let's imagine you have written a fairly complex Bash script spanning over tens or – in the worst case – hundreds of lines. It now needs to be refactored for one reason or another. This is an excellent position to drop the Bash!

<video autoplay loop>
  <source src="https://media.giphy.com/media/77XwMyXIgUuVW/giphy.mp4" type="video/mp4">
</video>

First, make a note of what is the main language of your codebase. If it's PHP, Python, or Javascript you are in luck. I'm not too familiar with Go or Rust but I've seen and used some great command-line tools written with them so I shall say you're in luck with those as well.

Next, you likely have a _shebang_ line on top of your script which reads something like `#!/bin/bash`. Change this to eg. `#!/usr/bin/env node` replacing `node` with your desired code interpreter.

You might already know that this line makes your script executable given the right permissions by commanding `./script`; or `script` if you place it in a folder included in the `$PATH` environment variable. From here, start converting your script line by line to a new language importing necessary modules where needed. In the end, your script may become longer but it will definitely be more robust and maintainable.

One obstacle you might encounter while refactoring is the ability to run shell commands. In Bash, you don't need to do anything other than writing the command (unless you try to parse and validate its output in which case I wish you luck). With other languages, you have to _invoke_ them either by using a built-in or an external module. Notable picks are [`execa`](https://github.com/sindresorhus/execa) for Node and [`delegator.py`](https://github.com/kennethreitz/delegator.py) for Python. There should be similar modules for handling child processes within scripts for all the popular languages. Many of these modules allow to run commands asynchronously and handle the output in a flexible way which is something you might have a hard time to implement with Bash.

If built-in language features are not enough there are handy frameworks created for writing command-line tools. Take for example [`oclif`](https://oclif.io/) for Node and [`click`](https://github.com/pallets/click) for Python. If your business logic relies heavily on command-line do not hesitate adopting these instead of Bash.

## How I Did It

As an example, I present a [script I wrote for creating quick drafts for this Gatsby site](https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/new.js). The script is written in Javascript and has the following features which would be difficult or even foolish to implement with Bash:

- Interactive prompts and ability to pass given data through validator functions
- Transforming sentences to SEO-friendly slugs (eg. `Blog Post Title` to `blog-post-title`)
- Coloring terminal output without using weird ANSI codes
- Asynchronous programming
- Converting structured data to YAML front matter

I'm not saying it would be impossible to do these things with Bash but it would be a hot mess of weird `awk` patterns I would end up debugging for hours.

One concrete upside is that I'm able to use logic from several 3rd party modules to achieve most of these. With Bash, I would have to find the proper logic from somewhere, copypaste them to dedicated files and `source` those in my code. While this approach would have worked, it would have been frustrating and prone to errors.

For this topic, I like to cite **Sindre Sorhus** who argues strongly for using [small and focused modules](https://blog.sindresorhus.com/small-focused-modules-9238d977a92a) instead of reinventing the wheel:

> Some years ago. Before Node.js and npm. I had a large database of code snippets I used to copy-paste into projects when I needed it. They were small utilities that sometimes came in handy. npm is now my snippet database. Why copy-paste when you can `require` it and with the benefit of having a clear intent. Fixing a bug in a snippet means updating one module instead of manually fixing all the instances where the snippet is used.

<!--alex ignore-->

> **I want programming to be easier. Making it easier to build durable systems.** And the way forward, in my point of view, is definitely not reinventing everything and everyone making the same stupid mistakes over and over.

Actually, if you want tips on creating efficient command-line tools with Javascript go and check some of [Sorhus' repositories on GitHub](https://github.com/sindresorhus?utf8=✓&tab=repositories&q=&type=source&language=javascript).

There might come a day Bash has a good (nested) dependency system and friendlier syntax. As for the syntax part, it has been improved in [_Friendly Interactive Shell_ (fish)](https://fishshell.com/) which I'm using daily. The Fish developers advertise its syntax is "easy, clean, and consistent" which I do agree. However, writing your scripts with _exotic_ shell languages might have more risks than gains unless your whole application is written in the same language.

Until then I'm most comfortable scripting with languages I use to write my business logic with.

## Conclusion

The main take of this post is not to bash Bash but not to use it for every task at hand. Instead, you should design your scripting needs properly before implementing, and notice when the complexity grows too large to handle reasonably within the limits of Bash.

Using Bash for small scripts is a valuable skill in order to quickly carry out repeating tasks – for everything else use whatever the language you prefer.
