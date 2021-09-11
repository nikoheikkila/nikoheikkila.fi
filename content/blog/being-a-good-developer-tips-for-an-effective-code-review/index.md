---
lang: en
author: Niko Heikkilä
date: 2021-09-11
hero: https://f001.backblazeb2.com/file/nikoheikkila-fi/Blog/being-a-good-developer-six-tips-for-a-painless-code-review.jpg
title: "Being a Good Developer: Tips for an Effective Code Review"
type: post
excerpt: Walk another mile and make the code review a joyful experience.
categories:
  - code review
  - pairing
  - mobbing
  - continuous integration
  - code quality
---

> **Hey!** An earlier revision of this post described how to survive the world of pull request workflows. However, since then, I've grown more convinced that asynchronous development is among the well-known root causes why software teams struggle to ship working code fast. Thus, I've decided to rewrite this post to reflect the way I currently think, enjoy!

---

Many of us have been there. A software project with significant business value should ship to end-users as soon as possible. But, unfortunately, the budget has run over. Management is throwing a furious fit. Developers are doing their best to sustain and control damage by explaining that the features are being reviewed and tested, but all they need is a little more time.

Rapid feature delivery is impossible when code reviews become a blocker, which they often are because of our inability to *shift left* (move events earlier in the process instead of later).

Some developers' comfort zone is buried under noise-cancelling headphones working on a feature isolated from the rest of the world. After a couple of days, the feature is "finished", and a pull request is submitted for peers to scrutinise. However, an effective code review can't occur because the changeset is made of inconceivable hunks of code totalling over **1000 changed lines**.

Feeling the insufferable pressure from management, another developer takes a quick glance at the changes, writes "looks good to me", and approves the pull request. Finally, another developer spots a couple of minor design issues and apologises for nitpicking while commenting. The reply is a famous line:

> "Yeah, let's fix this later when we have time."

**Legacy code is born when we fail to build quality in.**

All those moments where we play a safe bet and write another page of technical debt explaining how we had a tight schedule. Surely, we can pay back the technical debt later. So in a sense, we can, but we *won't*.

I've done this too many times and always felt ashamed, profoundly questioning my professionality. This post will explain how you can avoid these pitfalls and make code review a pleasant part of the development experience.

## Ask for a Review Before Committing

The greatest thing you can do to improve your team's performance is to integrate feedback into your work early and often. In practice, this means you shouldn't delay improvements to a post-development phase.

Many professional teams have been influenced too heavily by open-source development workflows fashioned by GitHub, where all the changesets must be submitted as pull requests. Certainly, pull requests have become a disastrous plague for many teams: they promise a sense of security but deliver only bottlenecks and constraints in return.

Pull requests have their place in open-source development where trust doesn't exist. They are also helpful on those occasions where deployment to a temporary preview environment is needed. However, in other situations, pull requests do little to facilitate the code review experience, often making it worse.

When the development happens asynchronously, developers work on their tasks and are forced to wait until their peers are available for review. Naturally, this incentivises starting new tasks before previous ones have been finished. It's a trait rooted in our mind that we should keep ourselves busy, lest a judging eye of the management might find us slacking and not working. However, the more tasks we start, the more context-switching penalties we suffer, and the slower our velocity become.

Fortunately, the great minds of the *Extreme Programming* community have had a solution to this for a long time: **test-driven development** and **pair/mob programming**. To achieve the most effective form of code review, we should use linters to check our code style, write the minimum amount of code to make tests pass, and finally use ~~a rubber-duck~~ a teammate to verify our design. All this should happen at the same time, in the same space, on the same computer.

I've written extensively about [the benefits and pitfalls of pairing](/blog/when-to-pair-program-and-when-to-go-solo), so suffice to say here that the best code reviews take place instantly after a single line has been written.

The bottom line is that **code review doesn't need online tools**. Instead, discuss code face-to-face (in person or through screen sharing) and resolve any issues in real-time. Defects are best fixed when it's cheapest and fastest: before creating a commit.

## Split the Changes by Concern

The unfortunate truth is that defects will occur despite our best intentions. Therefore, it's equally important to limit the scope of our changes by concern. That means working in the smallest feasible batches. These can be integrated into the codebase as independent [_micro-commits_](https://www.industriallogic.com/blog/whats-this-about-micro-commits/) without breaking a thing.

Defects are much easier to find from micro-commits, and they are effortless to revert where needed. For example, I've lost count of how many times [`git bisect`](https://git-scm.com/docs/git-bisect) has saved the day because I've used micro-commits.

Practising Continuous Integration dictates that we should push to the trunk at least daily — I prefer multiple times a day. However, developers sometimes reject this notion stating that their changes are too large and risky to integrate *now*. Hence, they stash their batches in branches, allowing them to grow in size and become more challenging to review.

A reinforcement loop where we are forced to write large batches because we're afraid of integrating reveals a malodorous design smell. The task you took wasn't correctly broken into subtasks, and it likely contains dependencies to other developers (or teams) work. Unfortunately, it's too late for us to fix lousy design during a code review, but we can monitor and improve for the future by limiting the scope and writing smaller user stories.

## Invite the Right People to Review

If you have written a fresh new algorithm for solving a computational problem, have it reviewed by someone who genuinely knows about code performance and the Big-O notation. In addition, people with impeccable CSS grid skills will serve you better when you're designing those fancy new UI changes later.

Often team compositions vary greatly. Sometimes teams are built from generalists (_jacks of all trades_) and sometimes specialists or deep experts in different areas. In the case of specialists, inviting more than one person to review is helpful. Doing so facilitates knowledge sharing and allows the team to level their specialities, guiding them to fluidly grow as generalists.

Expecting more than one person for review might tempt us to walk our code through multiple rounds. However, what we need is a live mob review, again **without tools**.

For example, changes to APIs handling sensitive data may require additional attention for security details. If the team has a security specialist, have them lead this code review and invite the team to learn.

Likewise, the review for introducing a new design system to improve mobile responsiveness could be led by the group's front-end specialist.

## Grab the Mentoring Opportunity

In the past, I've used code review as a strict gatekeeping and controlling tool to prevent lousy code from entering the codebase. After all, that is its purpose, right? As a result, I've criticised some design decisions sharply without realising how my tone and message have influenced my team's work.

Trust is in the heart of code review and deeming that all code is faulty unless proved otherwise will significantly damage the spirit of your team.

Instead of scrutiny, we should use code review for mentoring. Instead of telling what all is wrong in the code, we should guide people to improve. Fix the defects together and allow the mutual trust to grow. Soon the same developers have a tremendous amount of self-confidence, and implicitly they contribute to a better and healthier codebase.

## Trust the Infinitely Improvable Code

Similarly, as an avid gatekeeper, it took me a lot of time to understand that the code written by others is not inherently faulty. The code might not meet my expectations of good design, but that's rarely an issue. All the code is *infinitely improvable*, and our responsibility as developers is to improve it.

As arguments arise in code reviews, it's important to practice humility and not push your solution too firmly. By saying that, do I mean that code review doesn't matter? No, but it's to be used wisely. Likely, the code reviewed to be acceptable now wouldn't pass the same inspection in six months.

Keeping the code easy to change allows us to refactor it to better serve our purpose long after writing. There's no need to expect perfect software to emerge during a code review when we can perpetually grow it. That is what makes software *soft*.

---

<small>Photo by Alvaro Reyes on Unsplash.</small>
