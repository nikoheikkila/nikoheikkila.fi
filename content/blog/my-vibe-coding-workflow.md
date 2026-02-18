---
title: My Vibe-Coding Workflow
author: Niko Heikkilä
lang: en
excerpt: By far, the least sexy way of working with coding agents in 2026.
type: post
date: 2026-02-18
hero: https://r2.nikoheikkila.fi/my-vibe-coding-workflow.jpg
---

Ha, got you there, did I?

For once, the title of my blog post intentionally deceives you. Well, as a matter of fact I do have a vibe-coding workflow. It goes like this.

1. Define the different cycles of test-driven development (red, green, refactor) as [skills](https://github.com/nikoheikkila/agents).
2. Pick a thin slice of functionality and write a Markdown-formatted BDD specification for it **by hand** (gasp!)
3. Commit the specification in case I need to revert.
4. Ask the agent — Claude, typically — to follow the TDD Red skill, write a failing test, and verify it fails to an assertion error.
5. Review the generated test carefully and fix any flaws **by hand** (again, gasp!)
6. Ask the agent to follow the TDD Green skill and write the minimum amount of code to make the test pass.
7. Review the generated production code carefully, but usually don't be too picky about the output as long as the test stays green.
8. Commit the changes in case I need to revert.
9. Ask the agent to follow the TDD Refactor skill and refactor the code to improve design.
10. If the tests pass, commit the changes. Otherwise, revert and repeat the previous step.
11. Complete the cycle by refactoring by hand because it just *is* faster, safer, and more convenient than by prompting.
12. Commit the changes and squash where needed.
13. Run mutation tests along with other checks to verify the code is ready to ship.
14. Push the changes.

Out of the 14 steps above, at least 10 contain phases where I run shell commands or edit the code myself. Furthermore, in *all* the steps I'm reading and grasping the code. If I don't understand code, I will rewrite it. I've made a promise not to ship code I don't understand.

Due to constant failures and getting stuck on a "doom loop", keeping the coding agents on a short leash is the only sustainable way of working with them. Even then, the game is mostly about discarding the output and intervening, which I can happily do often because I save my work often — that is, every time my tests pass.

There are times I do receive viable suggestions from agents and it's safe to say they can bump up my productivity around 15–20 %. If I'm very lucky and working in a technology or domain represented in the training data distribution the productivity gains are more significant. However, eventually, in the next prompt, the same productivity can drop to around 70-80 % of what I would achieve by hand. That's how you operate a slot machine.

**Indeed, this is probably the least sexy and hype-worthy way of delivering software in 2026.** You won't find this post in your AI feeds because it won't sell. You won't see the sharp-dressed tech bros and vibe-coding aficionados in X sharing this because those people understand little about software engineering. All they care about is selling snake oil brochures and telling how to orchestrate massive parallel agent swarms to crunch down a waterfall backlog of items with faulty assumptions.

I'm very much shaking my head regarding the recent unhinged buzz around creating waterfall-style specifications for agents to execute and then running away to the beach. Notably, in these cases I've seen agents reportedly work for hours producing software that does *not* work, be it a web browser not rendering anything or a C compiler unable to compile a simple Hello World program. It might be just me, but I would expect the software handed to me by a worker bee to... work.

So, while the vibers seemingly continue to "ralph" (don't ask me) broken software and cataclysmically boost the climate crisis further, you will find me using the agents responsibly and in small iterations.

My painstakingly manual workflow works better than theirs because the best software is created through continuous iterative bursts where we solve one problem at a time, design, test, refactor, and frequently discuss with users. Did you know 25 years ago they began to call this agile software development? I wonder what happened to that movement.

Waterfall isn't coming back to style. Reading and understanding code isn't going away. Use coding agents or don't, but never forget the fundamentals. The real people being left behind are the ones who forget.

---

Cover photo by <a href="https://unsplash.com/@vladimir_d?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Volodymyr Dobrovolskyy</a> on <a href="https://unsplash.com/photos/a-cat-sitting-in-front-of-a-computer-monitor-KrYbarbAx5s?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> since apparently cats can develop software now as well.
