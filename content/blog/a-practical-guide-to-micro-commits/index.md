---
title: A Practical Guide to Micro-Commits
author: Niko Heikkilä
lang: en
excerpt: How do you practice small batches — micro-commits — as part of your daily workflow? Let me show you.
type: post
categories: [git, testing, tips]
date: 2022-07-27
hero: null
---

In software development, there's a lot of talk about small vs big batches. However, that talk mostly comes from the Lean methodologies perspective, which, while essential to learn, is not digestible for all.

How do you practice small batches — micro-commits — as part of your daily workflow? Let me show you.

> If you'd rather skip straight to the source code, you can find it [**here**](https://github.com/nikoheikkila/setup/tree/main/bin).

**Tim Ottinger** of Industrial Logic has written [a great piece about micro-commits](https://www.industriallogic.com/blog/whats-this-about-micro-commits/). It's one of those articles that changed how I see Git and version control for good. Not only as a sequence of commits pushed to the remote but as a means of saving and loading a working state — people familiar with fast-paced video games know what I speak of.

> "**A micro-commit is a tiny commit.** It consists of the changes necessary to do one tightly-scoped change. Maybe it's just a file reformat. Maybe it's just a variable rename. It could be the addition of one loop or one statement. It might involve a new microtest and just enough code to make it pass."

Working with micro-commits requires tremendous self-discipline. So, unsurprisingly, you should couple it with a practice that allows you to work with small batches verifying that each minimal change leaves your codebase in a working state: micro-tests and test-driven development.

That being said, before working with micro-commits, you should be experienced in writing practical automated tests that are essentially [**FIRST**](https://scribe.rip/pragmatic-programmers/unit-tests-are-first-fast-isolated-repeatable-self-verifying-and-timely-a83e8070698e): fast, isolated, repeatable, self-verifying, and timely.

When I work with micro-commits, I typically follow the steps below.

1. Set the goal
2. If tests pass, save the progress; otherwise, revert to a last known good state
3. Wrap up the task

To facilitate it, I've created a few custom Git commands. Few people know that you can extend Git in powerful ways when you create custom scripts named according to the pattern `git-{{command}}` and place the files in your `$PATH`, where they become accessible by invoking `git command` in your shell.

## Setting the Goal

Before starting to work, I must figure out what I want to do. This is an excellent opportunity to create a new empty commit — a topic — stating my goal.

Later on, as you will see, I can squash my work to this commit and retain a clean version history.

```bash
# git goal "feat: add use case handler for adding blog posts"

echo "Setting up goal for: '$message'"
git commit --allow-empty --no-verify -m "$message" > /dev/null 2>&1
```

Additionally, I'm using the `--no-verify` flag to skip pre-commit hooks, which I usually have set up in my projects. Running them for an empty changeset would be redundant.

## Saving the Progress

At this point, I have completed a minimal slice of my work. Following the TDD practice, it's typically all tests passing (green phase). This is the best time to save the progress if I screw it up.

```bash
# git save

echo "Committing recent changes with message: '$message'"
git add -A > /dev/null 2>&1
git commit --no-verify -m "$message" > /dev/null 2>&1
```

For staging files, I'm using the `-A` flag without specifying the path to ensure all files in the entire working tree are updated. Next, I'm once again skipping the hooks and committing the changes. I default the commit message to something simple like _"quicksave"_ or _"wip"_ because it doesn't matter now.

## Rolling Back Defective Changes

Alas! After continuing my work, I notice I have made a tragic mistake, and my tests are no longer passing. Unfortunately, time has passed, and I can't fix forward quickly, so it's only logical to roll back to the last known good state.

```bash
# git load

echo "Reverting to the last known good state at: '$last_commit'"
git reset --hard > /dev/null 2>&1
git clean -fd > /dev/null 2>&1
```

First, I discard the changes made, and then I clean the repository of any additional files or directories I've created.

## Polishing and Wrapping it Up

Finally, after a few save runs and all tests passing, I'm happy with my changes and ready to share them with others.

To retain a clean history and eliminate the work-in-progress commits, I want to squash those to my goal. There are many ways to achieve this, but I've accustomed to resetting the state softly, staging everything, and amending the changes to the last commit, which is now my goal. I also have the opportunity to reword my commit message if I have a better one in mind.

One caveat to avoid is creating too large commits when wrapping up. Sometimes there is a chance that I set a too ambitious goal, and squashing the micro-commits would result in a massive chunk challenging to review. In that case, I'll squash only some micro-commits and adjust my goal by rebasing. Fortunately, I tend to keep my goals relatively small, so I don't need to do it often.

There's also the option of not squashing if I like it. For those cases, I can simply reword the quicksaves while wrapping up or pass an argument to the `git save` command.

```bash
# git done

git reset --soft "$(git history)"
git add -A
git commit --amend
echo "Feature committed. Run 'git push' to share with others."
```

The `git history` command above is beneficial. It uses `fzf` — a powerful interactive fuzzy finder — to help me get the commit SHA from my goal. I could have saved the desired SHA to an environment variable while setting the goal, but I prefer to view my commit history before squashing so I know I'm going in the right direction.

`fzf` also has an excellent way of running an arbitrary command for a given line. Here I'm using `git show` accompanied by `diff-so-fancy` to view the contents of that commit on the right-hand side of my screen.

```bash
# git history

git log --oneline --pretty='%h %s' | fzf --preview='git show --color=always {+1} | diff-so-fancy' | cut -d ' ' -f 1
```

## Conclusion

Just because Git steers you to work a certain way doesn't mean you have to follow it by the book. Git is a potent tool, and I've found it best to crank its benefits to the extreme like in _Extreme Programming_.

Creating a micro-commit every few minutes ensures a stable pace, and you can always revert to safety in case of errors. If you try it out, you may notice a significant amount of stress related to Git usage simply vanishes.
