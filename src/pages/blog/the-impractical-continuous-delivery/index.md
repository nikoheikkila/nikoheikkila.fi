---
lang: en
title: The (Im)Practical Continuous Delivery
author: Niko Heikkilä
type: post
date: 2018-04-29
cover: cd.jpg
excerpt: This week I participated in a 2-day training session about pragmatic solutions in Continuous Integration, Delivery, and Deployment.
categories:
  - Continuous Delivery
  - Continous Integration
  - Software Development

---

This week I participated in a 2-day training session about pragmatic solutions in Continuous Integration, Delivery, and Deployment. I was there because one of our strategic goals at work is to increase the velocity of our product development.

As has been written, implementing a polished development, integration, and testing pipeline as part of your workflow should greatly help you deliver a consistent product passing all the quality gates and striking your customers with constant excitement. If you want to read more about the benefits of Continuous Delivery I warmly suggest you read [this post][1] written by **Sten Pittet**.

At first, I thought how hard can implementing a consistent pipeline be? My workflow is already sharpened to the maximum and I'm able to solve multiple problems in a day given the right set of tools. Thanks to our great instructor the reality quickly dawned on me.

Therefore, in this post, I will list methods that I have grown used to in my work but which turn out to be the dreadful anti-patterns of Continuous Integration and Delivery. Naturally, as a disclaimer, there are plenty of articles explaining more anti-patterns so please keep in mind this list is inherently a personal and not a complete one. All of the anti-patterns below reflect my personal experience.

## Anti-Pattern #1: Feature Branching

In Continuous Integration model, developers should push their code directly to _mainline_ (eg. the master branch of your Git repository) at least once a day.

What I do instead is that I sit on top of my feature branches for days if not for weeks often rebasing the changes from the parent branch but never pushing back to the mainline. This is so because at work we follow a strict Kanban workflow where for safety and authorization we require both peer review and manual testing before the feature will be merged to mainline.

A downside of the feature branching is that it completely isolates developer from the rest of their team. Despite aggressive rebasing, I still end up with bloody merge conflicts on my hands from time to time. Why is that?

The answer is simple: **isolation hinders communication.**

I tend to keep the code firmly in my grasp and not discuss it unless I hit a real blocker issue. This effectively leads to two outcomes: **a)** I end up implementing more than required ([_YAGNI_][2]) slowing me down, or **b)** implementing the wrong things slowing me down even further as I need to rewrite the code.

To solve this problem and for Continuous Integration to really pick up by the book we should give up feature branching altogether but I'm not convinced that I and my team are prepared for that anytime soon. On the other hand, designing new features as smallest possible increments and merging them rapidly from the feature branches to mainline could work.

Instead, I would like to bump up my communication skills by doing more pair-programming. Lately, I've been practicing it in a real DevOps fashion by pairing up with one of our ops guys – him bashing the server while I'm bashing the code. If you ask me, we have delivered exceptionally well on that front.

Furthermore, when I need a code review I should boldly ask my colleague to review it instead of letting the issue hang on board for ages. I know, I know. It's simple, right? Or not for an introvert type of guy like me. We as developers should start paying more attention to the soft skills of development like communication, cooperation, and empathy to name but a few.

## Anti-Pattern #2: Testing Starts Only After the Feature Is Ready

This is something that most quality assurance specialists have probably felt as a rusty nail stuck through their heels. Imagine a couple of huge user stories consisting of 20–30 new increments being developed in parallel. After all of the (painful) merges have been carried out and the code has been merged to mainline in a _code freeze ceremony_ (an anti-pattern itself) it's time to begin testing for regression bugs before releasing to production.

Regression testing will take several days at the minimum even for a professional testing department while developers are either sitting idle waiting for possible bugs to be reported from testing or move on to next features effectively causing unnecessary context-switches between different tasks. I, for one, have a very hard time remembering the code I've written when I'm asked about it a couple of days or weeks later.

The obvious solution here would be to invite your peers to test your code while you're still developing it. Again, pairing up is a favorable method for solving this problem. As a matter of fact, testing specialists should be included in the development sprint from the earliest feasible meetings all the way to the last sprint reviews. Letting them come in as the last step of iteration will only hurt themselves and developers.

## Anti-Pattern #3: Junk in the Trunk

Continuous Integration checklists demand that all code will be tested locally before pushing to mainline. Normally when developing code locally I run static code analysis and unit tests waiting for them to pass before creating a new commit. Then how can it be that some of my changes still introduce bugs and breaking changes even though all tests have passed and test coverage is flying high?

Well, if you've been reading this post with the attention I kind of explained it in the _Anti-Pattern #1_ section. Bugs and breaking changes (_junk_) in your mainline (_trunk_) weakens the Continuous Integration and Delivery pipeline making it less reliable and require more manual testing. Furthermore, your version control history will look funky with all those commits that attempt to fix stuff.

## Conclusion

For personal projects where you often work in a single branch, it's easy to configure for example [Travis CI][3] for building the commit stage of the pipeline and reporting possible errors before packaging the software or shipping it to production.

For both open-source and closed commercial projects involving dozens of people, the transformation to the best practices of Continuous Integration and Delivery will be harder since it's first and foremost a cultural issue. I think any community or company can make the transformation happen if they really want it. I'm committed to starting tackling the mentioned anti-patterns as much as possible wherever I might end up in this career.

[1]: https://dev.to/squadlytics/the-economy-of-continuous-delivery-58ej
[2]: https://www.martinfowler.com/bliki/Yagni.html
[3]: https://travis-ci.org/
