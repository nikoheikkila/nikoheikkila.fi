---
title: My Vibe-Coding Workflow
author: Niko Heikkilä
lang: en
excerpt: My vibe-coding workflow pairs coding agents with test-driven development. By far, the least sexy way of working with them in 2026.
type: post
date: 2026-02-18
hero: https://r2.nikoheikkila.fi/my-vibe-coding-workflow.jpg
---

Ha, got you there, did I?

For once, the title of my blog post intentionally deceives you. Well, I do have a vibe-coding workflow. It goes like this.

## My Vibe-Coding Workflow, Step by Step

1. Define the different cycles of [test-driven development][tdd] (red, green, refactor) as [skills][skills].
2. Pick a thin slice of functionality and write a Markdown-formatted BDD specification for it **by hand** (gasp!).
3. Commit the specification in case I need to revert.
4. Ask the agent — Claude, typically — to follow the TDD Red skill, write a failing test, and verify it fails with an assertion error.
5. Review the generated test carefully and fix any flaws **by hand** (again, gasp!).
6. Ask the agent to follow the TDD Green skill and write the minimum amount of code to make the test pass.
7. Review the generated production code carefully, but don't usually be too picky about the output as long as the test stays green.
8. Commit the changes in case I need to revert.
9. Ask the agent to follow the TDD Refactor skill and refactor the code to improve design.
10. If the tests pass, commit the changes. Otherwise, revert and repeat the previous step.
11. Complete the cycle by refactoring by hand because it just _is_ faster, safer, and more convenient than by prompting.
12. Commit the changes and squash where needed.
13. Run mutation tests along with other checks to verify the code is ready to ship.
14. Push the changes.

## Why Coding Agents Need a Short Leash

Out of the 14 steps above, at least 10 contain phases where I run shell commands or edit the code myself. In _all_ the steps, I'm reading the code. If I don't understand code, I will rewrite it. I've made a promise not to ship code I don't understand.

Due to constant failures and getting stuck on a "doom loop", keeping the coding agents on a short leash is the only sustainable way of working with them. Even then, the game is mostly about discarding the output and intervening. I can happily do that often because I save my work often — that is, every time my tests pass.

Sometimes I receive viable suggestions from agents, and it's safe to say they can bump up my productivity around 15–20 %. If I'm very lucky and working in a technology or domain represented in the training data distribution, the productivity gains are more significant. Then, with the next prompt, my productivity can drop to around 70–80 % of what I would achieve by hand. That's how you operate a slot machine.

**This is probably the least sexy and hype-worthy way of delivering software in 2026.** You won't find this post in your AI feeds because it won't sell. You won't see the sharp-dressed tech bros and vibe-coding aficionados in X sharing this because those people understand little about software engineering. All they care about is selling snake oil brochures and telling how to orchestrate massive parallel agent swarms to crunch down a waterfall backlog built on faulty assumptions.

## Waterfall Specifications Are Not the Answer

I'm shaking my head at the recent unhinged buzz around creating waterfall-style specifications for agents to execute and then running away to the beach. In these cases I've seen agents reportedly work for days producing software that does _not_ work, be it a web browser that barely compiles or a C compiler whose own Hello World example fails out of the box. It might be just me, but I would expect the software handed to me by a worker bee to... work.

While the vibers seemingly continue to "ralph" (don't ask me) broken software and boost the climate crisis, you will find me using the agents responsibly and in small iterations.

My painstakingly manual workflow works better than theirs. The best software is created through continuous iterative bursts where we solve one problem at a time: design, test, refactor, and frequently discuss with users. Did you know 25 years ago they began to call this agile software development? I wonder what happened to that movement.

Waterfall isn't coming back into style. Reading and understanding code isn't going away. Use coding agents or don't, but never forget the fundamentals. The real people being left behind are the ones who forget.

[tdd]: /blog/test-driven-development-on-a-bus-ride-to-hell/
[skills]: https://github.com/nikoheikkila/.agents/tree/main/plugins/agentic-cd/skills

---

Cover photo by <a href="https://unsplash.com/@vladimir_d?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Volodymyr Dobrovolskyy</a> on <a href="https://unsplash.com/photos/a-cat-sitting-in-front-of-a-computer-monitor-KrYbarbAx5s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> since apparently cats can develop software now as well.
