---
title: Reducing the Lead Times with Little's Law
author: Niko Heikkilä
lang: en
excerpt: Are your features taking ages to deliver? Beat those long lead times by reducing the work in progress and increasing throughput.
type: post
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/factory.jpg
date: 2021-03-28
---

There's a fascinating law of mathematical theory applicable to agile software development, which helps you deliver features faster without sacrificing quality. It's called [**Little's Law**](https://toggl.com/track/littles-law/), and it dictates that the average lead time of delivery is the team's work in progress amount divided by its throughput.

First, let's define the terms.

**Work in progress** (WIP) is the number of backlog items the team is currently working on. These items are not yielding value for the customer. WIP can be determined by counting those cards in your project board that are not in the *Backlog* column and not in the *Done* column but somewhere in between.

**Throughput** is the measured amount of backlog items a team can complete in a fixed period, which is usually a day.

![Little's Law illustrated with a picture of cute robots dividing the average work-in-progress with average throughput and receiving the average lead time as a result.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/reducing-the-lead-times-with-littles-law.png)

**Example:**

The team has 20 tasks in progress, and its average throughput is four cards/day. Following the law, this gives an average lead time of **20/4** = **5** days.

To foster an effective software development process, we should target our efforts towards shortening the lead time. Following the laws of mathematics, we can achieve this by limiting the WIP and increasing the throughput.

Often we fool ourselves to think that high WIP and high throughput are synonymous with performant processes, but this leads to stagnation, low motivation, low innovation, and burnouts.

In this post, I attempt to share approaches to doing it right, but your mileage may vary.

## Reducing the Work in Progress

> A golden rule of limiting the WIP is to **stop starting and start finishing**.

Total WIP should be smaller than the number of people in the team. If possible, strive for a WIP limit of **one**, but mind that it's not always a feasible choice.

When working under a strict WIP limit, you should leverage the daily stand-up with your team for prioritizing and selecting the tasks for today. If the WIP limit is reached, nobody is allowed to start new work. Instead, everybody should help finish the ongoing work – be it developing, reviewing, testing, or deploying a new feature.

Teams wanting to reduce WIP should focus as many people as possible on as few tasks as possible. Some people think this only applies to Kanban, but Scrum too has a specific technique for this: [_swarming_](https://www.scruminc.com/swarming-instantly-boost-scrum-team-productivity/).

Pair/mob programming is also a natural and effective enemy towards high WIP. Instead of distributing one task for each developer, make them solve the problem together. Pairing and mobbing are not only for programming, as you can also practice design, testing, monitoring, leadership, and many other tasks together.

Essentially, when people pile on a single task, they can design, develop, test, and deliver it more cost-efficiently. Mobbing has its limits, though, and we should find balance through careful studying. Too many people working on a single task invokes [the law of diminishing returns](https://www.investopedia.com/terms/l/lawofdiminishingmarginalreturn.asp) and eventually hurts the performance.

Additionally, to make the mobbing work, all teams should be cross-functional, consisting of designers, developers, testers, and deployers with a well-balanced skill set. These teams deliver [_vertical slices_](https://en.wikipedia.org/wiki/Vertical_slice).

Note that the latter two roles don't often require separate people because developers can test and deploy the changes themselves. In case you have an independent QA team, make sure to involve them early on in the process, tear down the walls, and enable deep collaboration.

## Increasing the Throughput

There are three actions a company can do to increase its teams throughput.

1. Hire more people, but not too much (consider [a two-pizza team](https://jasoncrawford.org/two-pizza-teams) 🍕🍕 the maximum size – leaving the exact number for you to decide).
2. Make the team more proficient by fostering [Extreme Programming principles](https://en.wikipedia.org/wiki/Extreme_programming#Principles).
3. Eliminate patterns of waste (see below).

I consider XP principles and eliminating waste very effective actions here. Below are the most common forms of waste you may encounter in your development process.

### 1. Partially Done Work

We cancel or postpone tasks, our work is stuck in the testing queue, and essential features are waiting for deployment. Swarming and a low WIP limit ensures the team is focused on a fixed number of tasks at any given time. Remember, partially done work does not yield value.

### 2. Overproduction

We are often tempted to design non-trivial, abstract, and flexible code for the speculative future, which might never happen. We may add complex data analysis and charts functionality to the project instead of adding an **Export as CSV** button. Instead, think about how you can solve problems with less or no code.

We might drive ourselves into an endless loop during refactoring code where we polish secondary or unimportant code. Such code might not even change that often nor slow us down, so why bother with it?

Alternatively, we apply the best development principles while developing throw-away prototypes. Refactor only so much to keep the code maintainable and easy to understand until the next time it's changed.

We might deliver features with low or negative user impact. We should carefully observe and respond to UX metrics and customer feedback.

We adopt trendy technologies and tools, whereas the tools we already know how to use would suffice (see [_Marchitecture_](https://en.wikipedia.org/wiki/Marchitecture)).

We chase 100% test coverage for our unit, integration, and acceptance test suites. Still, we ship design defects that are difficult to detect and recover from in case of disasters. Customer finding out a bug in production before your team does is a bad, bad thing.

Our product owners maintain huge backlogs with more user stories than needed for the next few sprints. [_YAGNI_](https://www.martinfowler.com/bliki/Yagni.html) rule is the single best defence shielding us from this.

### 3. Waiting, Delays, and Handoffs

We are maintaining a slow and unstable regression test suite relying on external integrations. Running it keeps us waiting for results due to constant failures. Additionally, the build server is shared with other teams and maintained by a fantasy creature referred to as the *DevOps Engineer*. Why not use on-demand testing environments, or even better: run all the tests locally?

For the better part of the lead time, the code is waiting for someone to review it. Some features require review from a senior developer who is at the moment drinking mojitos in Bali. Align the team's skills so knowledge gaps can't happen.

Teammates are involved in multiple projects, and the same human resources are being shared across squads. Build long-lasting teams with domain expertise as a core objective.

Unexpected, critical, and non-trivial production incidents might pop up in the middle of other work delaying the feature work further. Good observability and XP principles protect us from this.

### 4. Rework

Pull requests are bounced back and forth between the author and reviewer in asynchronous code reviews. Use [trunk-based development](https://trunkbaseddevelopment.com/), [pair programming](https://martinfowler.com/articles/on-pair-programming.html), and a [continuous integration](https://martinfowler.com/articles/continuousIntegration.html) mindset to avoid this.

We need to re-implement solutions due to misunderstood requirements or fix the same bugs twice. If the product owner can't define the requirements, go and talk to the customer yourself. Use [behaviour-driven development](https://en.wikipedia.org/wiki/Behavior-driven_development) to make sure work is only considered done when acceptance criteria are met.

Due to poor communication, we need to answer the same questions, or the lack of automation forces us to run mundane routines repeatedly. We should capture the necessary knowledge in software documentation and [architectural decision records](https://adr.github.io/).

### 5. Non-value added activities

Long-lived feature branches force us to rebase continuously and deal with resulting merge conflicts. Stop branching and start integrating.

At the end of each sprint, we have a retrospective without action points and assigned responsibilities. Shake up the process and start setting action points.

Our calendars are filled with never-ending meetings and attempts to reach consensus without making progress (impasse). Apply Basecamp's [internal communication strategies](https://basecamp.com/guides/how-we-communicate) to heal this.

## Summary

Little's law is one of the most powerful drivers in serious software development efforts because of its simplicity. You don't have to maintain complex models or calculations to observe your delivery performance – a fractional operation does it for you.

---

I gained the majority of these observations in reducing the WIP and eliminating waste during [**The Principal Developer**](https://principal.dev) workshop. Workshops like these provide invaluable tools altering the way you think about processes, teams, and cultures. I argue they offer a more significant return-on-investment in your career than simply learning frameworks and tools like React or Docker.

Photo by **Ant Rozetsky** on [Unsplash](https://unsplash.com/photos/SLIFI67jv5k).
