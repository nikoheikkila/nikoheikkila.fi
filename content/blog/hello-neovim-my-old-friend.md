---
title: Hello, Neovim, My Old Friend
author: Niko Heikkilä
lang: en
excerpt: How Claude helped me overcome a severe case of Luaphobia.
type: post
date: 2026-08-05
hero: https://r2.nikoheikkila.fi/hello-neovim-my-old-friend.jpg
---

I'm writing this post with [Neovim](https://neovim.io/) editor. You probably haven't heard of it. Or if you've ever come close to talking with a
software developer, you've probably heard the name.

Perhaps you've met one of those people wearing handsome beards and "I ♥️ Linux"
T-shirts mandating that it's _the only_ text editor you can use. I'm friends with all the editors, and I don't judge them.

For several years, I've had this strange tendency to always come back to configuring first Vim and then Neovim to my taste. The former foundered on my
having to learn Vimscript, and the latter for the same reason, this time with Lua.

I then went on to try out Helix, Micro, and
even Emacs (oh, lord!). The core motive for rejecting those has always been how the keymaps, mnemonics, and motions of
Neovim sit better in my head. In fact, they sit so well that I have regularly configured VS Code and
Obsidian to work in Vim mode. I don't recommend doing the same.

Alas, that still leaves me with the tremendous uphill battle of studying Lua and the burden of choosing from millions of plugins and configuration snippets.

I'm sure the inventors of Lua meant only well, but the language reads like Python and Perl
had a child and then Python left it to its own devices. You may find it elegant, though.

Setting all that aside, I've finally come to a configuration that satisfies me. Mostly, I use to write Markdown and a
bit of code, so the configuration is optimised towards it.

You may now wonder how I was able to keep my interest long enough to succeed. Like all the other people today, I made
the coding agents do the boring job.

## Lua and Claude Code

Luckily, coding agents have taken significant steps in maturity, at least enough to help with personal hobby projects.
Professionally, I do use them to implement and review parts of my tasks, but relying on them solely to do long-horizon feature
implementations is still science fiction.

Even so, having Claude Code design, implement, and document
my Neovim configuration has been a relative success.

You may have a look at [the source code](https://github.com/nikoheikkila/nvim). I expect you'll find it full of slop, crappy performance, bugs, and excess documentation. If you're heavily against AI, you will probably enjoy tearing it down. You're more than welcome.

The above, of course, points to a fundamental problem with the productivity boosts people keep praising in agentic coding. What you cannot objectively judge, measure, or test may appear valuable to a novice while at the same time being complete trash to an expert eye.

When coding agents generate Python, JavaScript, and TypeScript, I instantly find countless flaws in the code they produce. With Lua? Well, I believe it's the same even though the result does look _good enough_ to me. LGTM, baby!

## Set up Guardrails, or Abandon All Success

Fortunately, in a hobby project where I set the goalposts myself, I can be more relaxed about the implementation, but that only concerns
the Lua details, not the quality as a whole.

Even then, as a software engineer
I have also enforced guardrails to keep the agents on a short leash.

I run static analysis with Selene and formatting with StyLua, followed by unit and integration tests with Busted. The unit tests verify pure Lua logic while integration tests exercise the configuration in a real headless Neovim environment.

Claude Code itself is constrained with
deterministic linting and testing hooks. Never trust an agent to run the tests on its own — make a hook do it!

Git hooks with Lefthook ensure the same linting and testing are run for each commit and
push operation.

Finally, the GitHub Actions delivery pipeline verifies the configuration across Linux and macOS runners before packaging
the release, testing the installation, and uploading [the release artifact](https://github.com/nikoheikkila/nvim/releases/latest) to GitHub.

For an effortless installation and update process, I made [an installer script](https://github.com/nikoheikkila/nvim/blob/main/scripts/install.sh) you can pipe directly into a shell:

```sh
curl -sSL https://raw.githubusercontent.com/nikoheikkila/nvim/refs/heads/main/scripts/install.sh | sh
```

## Self-Reflection as a Core Strategy

As an essential practice, every session I have with Claude concludes with me asking it to reflect on its performance on the task at hand.

If anything was missing from the context while it researched the task, I ask it to add that to the instructions under `.claude/instructions`, which are referenced from my brief `CLAUDE.md` file.

If the loaded skills steered
the work down incorrect paths, I ask it to improve the skills.

If Claude ends up repeatedly writing a throwaway script for a
mundane task, I ask it to add the script to the repository.

## No Easy Wins

The above yields a crucial lesson about agentic engineering: **all of it is hard work.**
There are no easy wins, and people who think they can prompt an agent to "make a SaaS app" and get rich will
eventually agree with me.

My experience shows that most of the interactions with Claude result in me fixing up the code, tests, or
documentation. Mostly the last of those, since somehow Claude always leans towards blabbering before I trim it down.
The next skill I write will probably be about documentation.

There's still no credible evidence that purely agent-maintained projects can uphold the same level of engineering
quality for years. Thus, I must accept the risk of having to eject this configuration eventually and work on the
features I want by hand.
It's not going to be pretty, I confess, but I'm going to enjoy the ride as long as it lasts.

---

Photo by <a href="https://unsplash.com/@adolfofelix?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adolfo Félix</a> on <a href="https://unsplash.com/photos/text-HwuNOYolZdE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
