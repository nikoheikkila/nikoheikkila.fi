---
title: Turning up the Developer Experience to Eleven with Mob Programming
author: Niko Heikkilä
lang: en
type: post
categories: [agile, mobprogramming, collaboration, lean]
date: 2022-08-08
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/turning-up-the-developer-experience-to-eleven-with-mob-programming.webp
excerpt: |
    My team and I have now practised mob programming for half a year. Transitioning from working asynchronously and integrating changes late in the process to working synchronously and integrating continuously has not been without pain. However, in the end, the benefits have far outweighed the detriments.
---

_This post was originally published in [Futurice blog](https://futurice.com/blog/mob-programming)._

**Disclaimer:** similar to other ways of working, both pair and mob programming are known to elicit heated discussions. Some people feel they represent precisely how they want to work, while others detest them as no-good practices. I attempt to share my points of view given my background, experience, and context following the [Just Sharing principle](https://justsharing.dev/), which means the solutions I describe here may or may not work for you.

If you're not familiar with mob programming — also known as ensemble programming — here's an accurate definition from its early pioneers:

> "All the brilliant people working on the same thing, at the same time, in the same space, and on the same computer." — Woody Zuill, [mobprogramming.org](https://mobprogramming.org/)

In the simplest terms, mob programming is pair programming with at least one additional developer. Granted, the last two points in Zuill's definition are debatable in the era of hybrid working. Nevertheless, it's the opposite of a well-known software development process where brilliant minds work on their tasks, when, where, and how they choose.

But why would that last sentence carry any problems? Isn't autonomy a crucial trait of self-organising teams? You're not wrong there, dear reader. However, a fully autonomous [scatter-gather software development model](https://www.industriallogic.com/blog/scatter-gather/) has its frequently observed downsides, which I describe below.

### Challenges of Asynchronous Software Development

In many software projects, working features in isolation and integrating the pieces later is the standard way of working. A team of developers, each with their areas of specialisation, are staffed together to optimise resource utilisation. The team then meets to plan the features for the next iteration together with a lead developer or a product owner. The team adds client feature requests to the iteration backlog, estimates them, prioritises them, and splits them into multiple tasks.

Up until now, the team has been working conveniently together. However, next, the team usually ends the meeting and kicks off the iteration work by dividing the tasks. First, developers write features that satisfy the task's acceptance criteria and commit their work under feature branches. When done, they open pull requests to the project repository's mainline. Other developers review the pull requests before those are merged into the mainline. After merging, the developers pick the next tasks from the backlog to work on.

Soloing based on feature branching and pull requests has established itself as a status quo in many teams, with developers often unable to see any other alternative. One culprit is that many developers I’ve spoken to perceive pull requests as the only mechanism for code review, which is far from the truth.

The problem with soloing is how it negatively affects the flow efficiency by contributing to the following types of process waste (*muda* in Lean):

1. [**Delays**](#delays)
2. [**Queues**](#queues)
3. [**Defects**](#defects)
4. [**Big Batches**](#big-batches)
5. [**Overproduction**](#overproduction)
6. [**Rework**](#rework)

### Delays

Process delays emerge when the system is already utilised at its maximum capacity and can't accept new work. If all the developers are working on their tasks, they should finish them before starting new ones. However, quality processes dictate that it's impossible to complete a task without it passing through a quality gate, which in software development is often a code review.

Therefore, developers must also review the work of others. They must drop their current task, accept a new task, complete it, and finally return to their original task. When this context-switching is repeated multiple times a day, the team's *throughput* suffers and the *lead time* of a single task increases. What was previously estimated as the task's duration is no longer even remotely accurate. Some developers realise the effect of delays and add the necessary buffer to their estimates, but that hardly solves the bottleneck problem.

In lean software development, **lead time** is how long it takes for a task to move from the backlog to being done, and **throughput** is the average number of tasks the team can complete in a unit of time. Here's a [helpful description](https://toggl.com/track/littles-law/) of the terms using tacos as examples.

### Queues

When developers hand off their tasks to a review, they should wait for peer feedback before going forward. However, the system often has little to no capacity to serve the developer immediately due to delays. So, to feel productive (or **busy**), developers take on the next task while waiting for review, which creates queues — often referred to as inventory or work-in-progress — in the system. This further overloads the system with demand for capacity, again increasing the lead time.

Suppose you have participated in one of those team meetings where developers are begging for someone to drop whatever they are working on and review their code. In that case, you are familiar with the queue problem.

### Defects

When developers are invited to review the code they haven't written, they seek to understand the context and decisions the code author has made. Authors can facilitate reviews by keeping batches small and adding helpful remarks for the reviewer. However, it's impossible to know what has been going on inside the author's head when they wrote that particular line of code. Indeed, numerous pieces of advice have been written to optimise the experience of asynchronous code reviews. Yet, most fail to understand that code review is a synchronous activity often requiring face-to-face communication.

In the worst case, the reviewer could focus on low-hanging fruits and leave review comments about styling, function lengths, naming, and blank spaces, to name but a few. While these are crucial points for high-quality code, focusing solely on the style issues also allows more severe logical defects to pass the quality gate unnoticed. A humorous yet accurate joke on the subject goes as follows:

> "Never seen a pull request over 500 changed lines that didn't look good to me."

### Big Batches

Integrating changes late from feature branches to the mainline is the net sum of the problems mentioned above. Suppose we survive the nasty merge conflicts arising from long-running feature branches. The other common reasons for defects found in production are **big batches** — the size of the release.

When the team has been working on several tasks concurrently, their changes are often intertwined, so it's impossible to release one feature without the other safely. Moreover, when the batch sizes grow, it's increasingly difficult to differentiate what change caused which defect and reverting the release becomes an all-or-nothing feat. In contrast, when changes are released frequently in small batches, it's easy to discern their impact and roll back or release a new fix in case of defects.

Delays and queues inherently contribute to larger batch sizes, which are also orders of magnitude more difficult to review properly without context. Thus, the risk of releasing defects through shallowly inspected code grows higher.

As a remedy, teams often react to increased error rates in production by adding more quality gates, which unfortunately do not resolve the underlying problems. In some cases, teams may even become afraid to ship frequently and begin to hold back on releases, thus skyrocketing the batch sizes even further. The *catch-22* of big batches has started.

### Overproduction

While developers work in feature branches, they are often tempted to add one more feature because they foresee an imaginary situation in the future where they might need it. It’s interesting how we developers are bad at estimates, yet we are always so confident we need to have this feature for the future. Unfortunately, those extra features are rarely needed and only harm the flow with delays and a higher chance for defects. More code equals more errors squared.

For many developers, overproduction is a familiar situation. When you hit the flow state of mind and the creative juice is flowing, it takes considerable willpower to restrain yourself.

### Rework

Perhaps the most familiar waste among developers is the notorious code review ping-pong. The developer opens a pull request, submits it for review, and comes back later to fix the issues found in the review. If the code review happens in an online tool, the chance of communication failures often results in a substantial rework loop.

## Introducing Mob Programming as a Solution

### How Does it Help?

Mob programming eliminates delays and queues by effectively limiting the work-in-progress to one. When all the brilliant developers are working together on the same task, there is no need to hand off the task outside the mob because quality inspection is immediate. Rework is still possible, but it happens less because the code review ping-pong has become a thing of the past.

Having multiple eye pairs scrutinising the code being written, the code quality tends to stay higher, and defects are discovered more quickly. Participants of the mob also have the responsibility to restrain each other from adding unnecessary features, thus avoiding overproduction.

When the task is done, it can be released immediately to production, given the automated delivery pipeline passes. Thus, the team can deliver the smallest possible batches multiple times daily. Incidentally, mob programming is also close to the definition of DevOps since the mob can be responsible for designing, implementing, testing, and releasing features without depending on others.

Because the team throughput grows and the lead time of a single task drops lower, the system has better responsiveness to new work. After completing the current task, the mob can rapidly shift to work on the next most important task, whether a defect in production or a new client need.

I admit these ideas sound too good to be true. Indeed, several people I've been talking with have described their first experiences with pair and mob programming as entering a parallel dimension where the work flows naturally in the leanest possible way.

### Common Misconceptions about Mob programming

Critics of mob programming often reject it with arguments about how ineffective it is. To an inexperienced or non-technical person, people working as Zuill defined earlier may seem peculiar and wasteful.

So, let's define what mob programming is not.

**It's not many people watching one person doing all the work.** As a rule of thumb, everyone in the mob participates equally. In a typical mob setup, drivers write the code while navigators help the driver overcome obstacles and direct the grand scheme of things. The driver's role is rotated frequently — for example, every 10 minutes — so they can relax their brains before taking on the navigator's duties.

**It's not many people doing the work of one.** A misconception rooted in soloing where every developer should work on one task at all times. While mob programming, the team doesn't assign personal tasks unless they involve researching a topic or drawing design diagrams, for example. Instead, the mob starts and finishes tasks together, sharing the code ownership and transferring knowledge as they learn.

**It's not a full-day meeting.** By definition, meetings are a passive form of work where you discuss the work before being able to complete it. Understandably, many developers have a passionate fury towards meetings. Talking about work while not doing it is ineffective. While mob programming, we talk about work while doing it, which is effective. Unfortunately, the hybrid work has come with many online meetings that are here to stay. Still, distributed teams need to communicate using whatever tools are necessary. If you can mob co-located in the office, I recommend that instead of meeting online.

**It's not only for extroverts and neurotypicals.** We can make the mob programming sessions more comfortable for introverts by allowing them extra breaks and remembering to ask how they would solve a problem if they hesitate to express their opinions aloud. Naturally, the more the mob works together and learns to know each other better, the safer they feel while communicating. On the other hand, extroverts can often take the helm with their views while navigating. To counter that, we must lay out clear rules for communication: treat everyone in the team equally and respect everyone's unique needs.

## What Did We Need to Solve?

Our project involves an unfamiliar business domain related to data science and low-level device programming, which I'm not allowed to disclose further due to an NDA. Suffice it to say; this is not a typical Futurice portfolio project where we deliver a B2C web application for the client. Because of the domain complexity, everyone needs to amplify learning as efficiently as possible.

However, our learning was slow due to many workflow issues.

### Long Feedback Loops

Our initial ways of working followed the earlier described scatter-gather model. We were three developers — two from Futurice and one from the client side — working on three or more tasks simultaneously across multiple repositories. If you've read this far, you can probably guess what problems we had, but allow me to explain.

We created *busywork*: lots of work but poor results: high output but low outcomes.

Despite our best planning efforts, tasks took several days to complete because the code review process was a bottleneck. In addition, inspecting the code days after it was written made it nearly impossible for the reviewer to understand the surrounding context and the author's decisions. This, in turn, delayed the delivery. Unsurprisingly, the most often used phrases in code review comments were:

-   _"Can you explain to me what this line of code does here?"_
-   _"Can you add a comment here to explain the code?"_
-   _"Why was this line removed?"_
-   _"Should we use function X instead?"_

Before advancing further, we also required sign-offs through approved code reviews from our lead developer. Because the lead developer was fully utilised both with their tasks and reviews, the feedback loops grew incredibly long. Returning to a code you wrote earlier became tremendously painful. When switching context from another task to a previous one, the thoughts often were:

-   _"What was I thinking then?"_
-   _"How should I improve my code now?"_
-   _"I need to complete the other task because I need code from that feature branch."_

### Knowledge Gaps

We had severe knowledge gaps due to knowledge not being shared daily. As a result, I couldn't help my colleague with their task, nor could they help me with mine.

Taking time off for vacation or sick leave was risky because the work might be stalled. No one could continue my work without first spending significant time inspecting the code I had written.

### Team? What Team?

Ultimately, our team of consultants and in-house developers did not feel like a team. We didn't know each other very well and met only once or twice a day during meetings. It's no overstatement that we were not a team. We were pairs of hands, each having our small mission instead of working towards a common goal.

Especially during the COVID-19 pandemic, I've struggled writing code in solitude. Not because I wouldn't have been skilled enough to work alone, but because it simply feels duller. Not having a colleague to talk to or invite to check out a line of code removes all the social aspects of programming. So it was only me, my remote office, and the clicks and clacks of my mechanical keyboard echoing in the hallways.

Developers often praise the positive effects of deep focus on remote working, which leaves the adverse effects underlooked. For example, I am incredibly grateful to work in the office with my team again, yet I would never sign a contract prohibiting me from working remotely.

As the clichéd movie narrative goes, we had to do something.

## What Did We Lose by Mob Programming?

Following the poorly optimised development process for a couple of months, in frustration, I suggested we experiment with working in pairs and mobs instead of always working alone. The idea was greeted with curiosity. Yet there was also slight hesitation in the air due to the lack of experience.

Fast-forward six months to the present day, and we have onboarded one new developer to the team through mob programming and lost a lot of problems. Oh, and gained new, but more about those later.

### Less Queues, More Efficiency

Due to the team working only on one task at a time, we don't do context-switching. As a result, we can't be interrupted to review the code of others when the single task at hand is right in front of us. Thus, there are no interruptions or the immeasurable pain of recalibrating your brain to work on one task, jump to another, and finally, get back to the original task.

We don't have to wait for our code to be reviewed because the review happens instantly after a single line of code has been written, if not earlier.

### Less Technical Debt, More Refactoring

However, instant code reviews don't automatically mean we always produce perfectly infallible solutions that are worshipped on the walls of heavenly mausoleums.

We often need to improve our earlier code, so we simply return to it and conduct the necessary refactoring. We don't ask anyone's permission to refactor our code because it's our duty and responsibility as professional software engineers to keep the codebase in mint condition. As a result of refactoring at every opportunity, the design of our software is constantly improving in short iterations.

We have also applied *behaviour-driven development* (BDD) to our process, which makes it easy to verify whether regression defects appeared after the latest changes. With BDD, we define the application's initial state, actions, and post-conditions of our logic and write it as an automated test before implementing the logic. If you've encountered _Given-When-Then_ or _Arrange-Act-Assert_ methods while writing tests, you're familiar with BDD.

### Less Knowledge Gaps, More Knowledge Transfer Practising

Mob programming together ensures I know as much of the project's design and codebase as my colleagues do. Consequently, I don't have to stress about having a vacation or taking a day off due to sickness. Yes, there are unknown unknowns, but all the known knowns and unknowns are distributed across the hivemind.

Furthermore, efficient knowledge transfer allows me to come back refreshed after a month, knowing that my team's work has not stalled because of something I forgot to tell on Friday afternoon before logging off. It's a glorious sensation you must experience before fully appreciating it.

Thanks to mob programming, we are always synchronised. So if we need to demonstrate our solutions to stakeholders, not everyone has to be present because our hivemind is perfectly aware of the fruits of our labour.

### Less Passive Meetings, More Collaboration

You might say: *"A-ha! But you're always in a meeting because of mob programming!"*. To which I say: yes, our so-called *meetings* have become more efficient.

Our daily stand-up meetings transformed from the old-fashioned pattern of reporting the individual statuses towards planning what we should do today as a team to achieve our sprint goals. Of course, we still have sprint planning, reviews, and retrospectives, but those have become easier because we communicate and collaborate better.

### Less Branching, More Integrating

Our branching model transformed from long-running (more than a day) feature branches to [trunk-based development](https://trunkbaseddevelopment.com/) (or _continuous integration_, if you prefer) using a shared development branch. Of course, we are still using pull requests but only for those cases where we want to trigger a release pipeline of our software.

Our mainline branch triggers a canary release pipeline, and pushing a tag to version control triggers the stable release pipeline. Today, we release new preview versions daily, and stable versions whenever we are confident that features satisfy user needs.

In the future, we might stretch our branching patterns further and commit directly to the mainline. For now, committing to a shared development branch accompanied by daily merges to the mainline has worked well enough for us.

### Less Guesstimating, More Forecasting

The more we learn from each other and our domain while mob programming, the sharper our estimates become. But, naturally, estimating stories and tasks too accurately is still a significant process waste, so we avoid overdoing it.

By estimating, we merely want to measure how much work we can take for the next sprint while still feeling good about ourselves. Agreeing and committing to a common sprint goal feels more meaningful when the team works together.

### Less Blaming, More Psychological Safety

One of the unexpected benefits of mob programming was how we began to regard failures. During one week, we felt very productive and completed one task after another. However, we conducted more thorough testing the following week at the client premises and noticed our application was not working as expected.

We simply had understood the requirements wrong and had to fix the implementation during the week postponing the upcoming release to a later date. On another note, it shows well how wasteful measuring only velocity is. You can always run at full speed in the wrong direction.

Surprisingly, we only had ourselves as a team to blame for the failure. So instead of pointing fingers at one developer, we gently pointed the fingers at ourselves, embraced the learning effect, and got to work again.

But, of course, even while working alone, we were not shaming each other over the defects we've allowed to accumulate. Nevertheless, even in psychologically safe teams, passive-aggressive speech like _"this is Joe's code, why don't you ask them about it"_ can easily hurt morale and endanger motivation.

Tight collaboration nurtures empathy and team spirit. Of course, you become more vulnerable when mob programming with others daily, but that's only our soft skills evolving. We, the developers, need to be people first and rock stars last.

## What New Problems Emerged With Mob Programming?

As I indicated earlier, mob programming is neither a silver bullet nor a best practice. Therefore, it's fair to expect that transforming our work also brought new problems. However, we have discovered root causes for most of these thanks to agile retrospectives.

### Remote Code Sharing

Working in a hybrid model where one of our team members lives in another city poses the problem of communication and keyboard sharing. However, these are not issues when everyone is in the same space.

For sharing the code, we have been using **VS Code Live Share**, which, in all irony, works surprisingly poorly on Windows compared to, e.g. macOS. Typically, signing in to the Live Share service takes a long time, and you might have to restart the whole IDE a couple of times before being able to share a session or join one. So the most reliable solution is restarting the software before starting to work.

We have also looked into the [mob.sh](https://mob.sh/) tool as a solution for doing fast driver-navigator handovers with Git. However, for now, Live Share hasn't been a major enough problem to motivate the switch.

### Remote Communication

For video calls, we've been using our client's **Microsoft Teams** with a conference speaker setup in our project room. Calls work decently with occasional drops in audio quality (hello, Mr Robot Voice), but when you turn on your webcam, all the CPU resources are sometimes entirely drained.

There is no good group call feature other than calling each member in the direct messaging group, which is slightly noisy. So, to facilitate our communication, we have created a 24/7 video call, which acts as an open discussion space similar to what Huddles are for Slack.

### The Flow is Strong in This One

While working on tasks, we often experience a powerful sensation of flow, which holds tight to our harm and hindrance.

Once, we were working on a particularly challenging task for several hours straight and forgot to take breaks. So, after calling it a day, it was hard for me to enjoy my free time due to massive exhaustion. After this, we promptly aimed for more discipline and agreed that all of us are responsible for watching the clock and suggesting we take a short break away from the computer at least once per hour.

We still tend to work late. We are not at our best when the clock hits four in the afternoon. But fortunately, even the most giant shark becomes a timid fry after a good night's sleep, and we resolved yesterday's issues early in the following day. Flow and deep focus are often touted as essentials for producing quality software, but in our experience, their disadvantages often exceed their benefits if we're not careful.

We also noticed that sometimes our attention tends to wander off. People who were not driving started browsing the Internet instead of participating. So, we agreed to mute our notifications, define goals for each session (e.g. one task completed, have a break), and allow everyone equal time to drive and navigate others.

As a rule of thumb, we have been using 10 minutes as a typical rotation length, after which the driver becomes a navigator, and the next driver is picked. However, the strict time limit often feels too rigid. So we have also experimented with ping-pong rotations in *test-driven development* (TDD) style, where one person writes a test, and another makes it pass before writing the next test. Sometimes it's better than a fixed timer, and as a bonus, it forces us to design our solutions through tests, which helps maintainability.

### Loose Specifications

If the acceptance criteria for a given task are not set in stone, it leaves room for interpretation. Hence, we often debate the best way forward, which does not feel productive.

In a sense, not feeling productive is not a bad thing, though. A common problem in systems optimising for resource utilisation is that you start feeling guilty if you don’t have active work at all times. However, the feeling of being unproductive doesn’t mean you are unproductive. In mob programming, we spend a significant portion of our time learning instead of following a concrete to-do list, which adds to the guilt trip. Why am I here talking when I could be productive at my task? It’s hard to unlearn it, but we must try.

### Third-Party Libraries

As part of getting to know the unfamiliar business domain, we have encountered a few packages whose usage hasn't been most developer-friendly. When you don't understand how external code behaves, a mob pointing fingers at the screen, reading documentation, and asking questions is not the most productive way to solve it. Occasionally, we split the mob into two pairs or go solo to research libraries and possible alternatives. When someone finds a viable solution, we regroup and present our findings before continuing together.

### CI/CD

We are using **Azure DevOps** and its pipeline solution for delivering our application. In addition, we strive to follow good CI/CD practices: running the whole test suite before pushing to trunk, keeping the pipeline definitions readable, leveraging caching efficiently, and ensuring no redundant tasks are run.

Unfortunately, Azure Pipelines is not particularly better when compared to other CI/CD solutions in the market. Often, we make a change, wait for the pipeline to trigger and watch for any errors to report. When the pipelines take several minutes to run, it's clear this is not the best use of the mob's time.

## Conclusions

Adopting and embracing tight collaboration and collective code ownership through mob programming instead of the loose collaboration and divided ownership of soloing has been immensely rewarding. Of course, mob programming has its clear ups and downs, but thanks to our agile mindset, we have quickly discovered any pitfalls in retrospect and adjusted our methods for the better.

When our shared journey began, we were a group of specialists with people experienced in the frontend, backend, data science, and UI development. After extensive periods of mob programming, we have built a generalist full-stack team where everyone can cover for each other in case of absence.

Years ago, I studied **Lean & Theory of Constraints**, which didn't stick with me until I began to practise mob programming. I now understand better one of its key revelations:

> "Any improvement not at the constraint is an illusion." — [fortelabs.co](https://fortelabs.co/blog/theory-of-constraints-101/)

Any attempt to improve the asynchronous code review experience is an illusion if your constraint is the long queue of pull requests. Any attempt to throw in more people is an illusion if your constraint is a large work-in-progress count. Any attempt to increase the batch size and release less often is an illusion if your constraint is defective releases. Any attempt to fiddle with story points is an illusion if your constraint is large and unrefined user stories.

The only way to improve the situation is to find the constraint and drive a stake through its heart. Teams practising mob programming effectively also tend to remove constraints easily.

Finally, I'm closing this article with a famous *Systems Thinking* quote from **Russell L. Ackoff**, which is particularly fit for mob programming:

> "A system is never the sum of its parts; it’s the product of their interaction."

Likewise, in software development, the best products are not born by summing up the team's work but by multiplying their interactions. Mob programming is a lean solution to maximise the outcomes from those interactions.
