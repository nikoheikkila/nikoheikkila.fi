---
title: The Essentials of Simple Design
author: Niko Heikkilä
lang: en
excerpt: Passes the tests, reveals intention, has no duplication, and contains the fewest elements.
type: post
categories: [design, xp, tdd]
date: 2022-06-27
hero: null
---

Few rules in designing clean code have been as crucial for me as **Kent Beck's** *four rules of simple design*. To jog your memory, they are as follows:

Well-designed code…

-   passes the tests
-   reveals intention
-   has no duplication
-   contains the fewest elements

How do I use them?

First and foremost, I need to get to a state where my code is passing **ALL** the tests — not just some of them. This baseline grants me the confidence that my application is essentially working. Luckily, driving development through tests and smart behavioural specifications helps me to get there multiple times a day.

Only after all the tests are passed am I allowed to start refactoring my code to reveal its intention to other people. This includes renaming variables and functions, removing comments by encapsulating code, and placing logic in different modules.

Right, so the intention is now crystal clear. Up to this point, I have traded in speed for a small amount of duplication penalty. It is very likely I have several functions whose bodies are similar, which I can now abstract to be reused. I won't fight for the abstraction to my death, though, as over-abstracted and smart code eventually introduces more issues than it fixes.

Finally, once there's not much duplication around, it's easy to start decrementing. Typically, I comment out randomly picked portions of my code, run the tests, and if they pass, I delete the commented code altogether. Deleting code is probably my favourite activity, and it gets addictive quickly. Some developers would be terrified upon hearing the idea of writing code only to delete it moments after — nope, it's a relief. More code equals more errors squared. The more I can delete while keeping my use cases satisfied, the happier the future maintainers of the codebase and I become.

As you see, the four rules are easy to remember yet very effective. They work equally well for both functional and object-oriented programming paradigms. They couldn't care less about your choice of programming language or framework. They are also flexible and easy to misuse, but you will eventually learn them after several cases of trial and error. Most importantly, they train the programmer's eye for design, which is crucial for building long-lasting software and driving down the cost of change.
