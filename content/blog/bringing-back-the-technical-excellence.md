---
title: "Bringing Back the Technical Excellence: Rules of Thumb for Effective Software Lifecycle Management"
author: Niko Heikkilä
lang: en
excerpt: In this post, I present a brief — constantly evolving — guide on gradually bringing back technical excellence and driving down development costs.
type: post
date: 2021-11-15
hero: https://r2.nikoheikkila.fi/bringing-back-the-technical-excellence.jpg
---

> In software, legacy code is a code that runs in production.

Don't you love the defeatist attitude of this quote? You might have stumbled upon it on many occasions. But, sadly, it is not too far from the _truth_.

There are many definitions for legacy code. I've settled to define it as the code we are afraid to change, yet we need to. The code whose developer experience converges asymptotically to zero over time.

## Complexity as a Driver for Legacy Code

Without realising it, we tend to create software like we construct buildings. The hard way: layer after layer, too late to look back and improve things in retrospect. We fail to keep software _soft_ as we lock the details in place with complexity in both design and implementation.

Complex design often comes directly from complex business requirements. We might rewrite a service _en masse_ without criticism only because the customer asked us to do so. We are keen to ask what kind of software they want us to deliver while the more pressing question is: what problem do they want us to solve?

Complex implementation, therefore, is a direct consequence of complex design. However, the effects of complex implementations become more detrimental via their ability to feed themselves and keep on growing during the software lifecycle.

The common culprits for complex implementations are the following:

-   teams are not abiding by the technical excellence and software craftspersonship — also known as having **immature senior engineers** in the team
-   too high (100 %) utilisation rates keeping everyone as busy as possible therefore stifling innovation
-   severe blindness towards the wastes in the development process
-   allowing the unplanned work (e.g. production incidents) to stall the team's throughput by holding planned work hostage
-   working through tasks in isolation (one-person silos) and not sharing and integrating code daily
-   accepting too much work, and as a result, cutting corners under pressure to get tasks done

All of the above contribute to unhealthy codebases, but the fastest way is to cut corners regularly.

Often, we have a situation where our time and budget constraints seemingly do not allow us to deliver our best software craftspersonship. Unfortunately, cutting corners under pressure from stakeholders is a temptation many of us are not prepared to resist.

As a result of cutting corners, our codebases typically lack automated tests, technical documentation, and sometimes even styling. So, you may only wonder, what could be the reason for not even having the chance to add a style guide to the project. Time? Carelessness? Lack of skills? All of it?

The above are the definitive signs of a legacy codebase. But why should we care about legacy code?

Because most legacy codebases still deliver heaps of value to their users. However, what they lack is **cost-efficiency**. The cost of developing new features has risen to extreme heights due to emerging complexity. What took three hours to implement a year ago might now take three or more days, especially if the team compositions have been changing in-between and silent (undocumented) knowledge runs wild.

---

Having worked in software lifecycle management for a significant portion of my career, I have gathered a set of practices to fight back the costs emerging from complexity.

In this post, I present a brief — constantly evolving — guide on gradually bringing back technical excellence and driving down development costs.

I will focus mainly on writing tests and documentation, the two most crucial things regarding missing technical excellence. Other important factors like increasing security, observability, and accessibility of a product are not discussed in this guide (yet).

## Increasing Cost-Efficiency Through Automated Tests

When investigating an insufficient test coverage, it's easy to let the [**Sunken Cost Fallacy**](https://thedecisionlab.com/biases/the-sunk-cost-fallacy/) tell us that we shouldn't bother with automated tests at _this point_ in the project.

We judge that the costs of covering the _entire_ codebase with tests are already too high and thus not worth the investment. Besides, the people who originally developed the application should have paid attention to writing tests from day one.

How do we fix the situation? I've found it helpful to traverse the [**Test Pyramid**](https://martinfowler.com/articles/practical-test-pyramid.html) from top to bottom.

We start by migrating our _definition of releasable_ through automated end-to-end tests that usually test the user interface flows. Next, we sink into delivering new features, fixing defects, and refactoring code by leveraging fine-grained tests and test-driven development. Ultimately, this guides us to build coherent technical documentation through well-defined test suites.

### End-to-End Tests

When the codebase has zero automated tests, it usually means that all the acceptance testing before a release is done manually.

It is not unusual to manage test cases in software like _Jira_ or _PractiTest_. Within these tools, a special QA team designs and runs the tests, compare the actual test outputs to expected, and notifies the release team of any critical issues they uncovered.

Meanwhile, developers are watching Youtube waiting for the bug reports to arrive.

If we need to manually verify that our user interfaces are functioning correctly, the automation of said test cases is easy. Instead of clicking through pages in the browser, we can add these steps as scripts using tools like **Cypress** and **Playwright**.

Yes, but... our product doesn't contain a browser interface. We have a set of legacy APIs instead.

Suppose we want to verify that our backend integrations return the expected responses to given requests, it is helpful to use a technique called [**Golden Master**](https://blog.thecodewhisperer.com/permalink/surviving-legacy-code-with-golden-master-and-sampling), also known as characterisation testing. If you have ever used snapshots when verifying that the shape of a complex object or a structure of a UI component did not change, you are familiar with the Golden Master technique.

> "Rather than revert to the Guru Checks Output antipattern, however, I take a snapshot of the last-known acceptable output — I call that the _golden master_ — and save it for future use. When I run the test again, I compare the output to the golden master, and if they match, then the test passes; if they don't match, then the test fails." — J.B. Rainsberger.

Yes, but... how do I sell the initiative of adding tests? It must cost us a fortune to have developers study automated testing techniques and then migrate our specialised test cases.

Fortunately, expenses are modest if we carry out the migration in tiny steps.

We can order our test cases by priority. Users being able to sign in to a self-service portal is naturally a higher priority than the business contact information being rendered in a specified order. The stakeholders are happy to know that by automation, we have eliminated the chance of human error.

Alternatively, we can find out what test cases consume the most of our time. For example, clicking through the whole e-commerce flow from adding products to a shopping cart, filling in details, choosing a payment method, and eventually checking from the confirmation page that the order was processed is a significant time sink. We should record these steps and automate them. The stakeholders are happy to know that we have eliminated the time cost of manual testing and saved additional bandwidth for solving other problems by automation.

Yes, but... now that we are automating everything, does it mean I have to fire our QA team?

No, you don't need to fire your testing specialists. Instead, they can free up their bandwidth and expertise from mundane regression checks before releases to continuous, investigative, and exploratory testing through automation.

Each _sprint_ should include a feasible amount of test case migrations. When planning the next sprint's contents, everyone must understand that our velocity drops slightly because we will not deliver as many new features right _now_. However, after a few sprints, the automation benefits kick in, and the velocity restores to normal levels and even higher.

Having a stable suite of automated end-to-end tests gives us a preliminary safety net. It guards us against breaking the whole application while we are changing it.

However, refactoring and thus keeping the codebase in prime health is still potentially dangerous. For that, we need to dig deeper...

### Fine-Grained Tests

At this point, your most valuable revenue flows are covered with high-level end-to-end tests. The problem is, when one of these high-level tests fail, there can be multiple causes for it.

When high-level end-to-end and integration tests fail, it's similar to a fire alarm buzzing you that something is burning somewhere in your city, but you don't know what it is. Alas, the only way to find out is to follow the smoke.

Perhaps the worst trait of end-to-end tests is that they are slow. When a test run takes a long to complete, I'm incentivised to skip running tests frequently. When I don't run tests for each tiny change, I risk adding more and more risky changes into the batch, taking away my chance to safely change the codebase.

Enter fine-grained tests, more often referred to as _unit tests_. Practical unit tests verify **a single behaviour of the system under test**. Thus, they fail for **one and only one** reason.

Furthermore, we can run unit tests fast side-by-side with code changes using a watchdog functionality. Whenever I write new code, tests related to my changes are run automatically. Thus, I get instant feedback telling me if I'm straying from a safe path. It's precious while refactoring: if my changes pass the tests, I commit them and carry on — otherwise, I revert my codebase back to the last working state.

Yes, but... we don't have any unit tests in our codebase right now. Where should we start?

Sprinkling unit tests here and there in the codebase doesn't motivate us. It's best to focus on adding tests to parts of the codebase you have changed frequently and recently (_frecency_).

We write an expectation for every new feature, witness it fail for the right reason, and finally write enough code until the expectation is satisfied.

For every new defect raised, we should write an expectation exposing the fault and then write code until the expectation is satisfied and the defect has vanished.

### Test-Driven Development and Refactoring

The technique I described above, also known as **test-driven development**, is the easiest and safest way to introduce new features to our codebase in a controlled manner. You are free to disagree with me, but I dare you to find me a more effortless and safer way.

Unfortunately, many developers still take a step backwards and judge you when they hear the acronym TDD. They may decry it as a mantra, or something sinister practised within a religious cult. To those people, we can tell that programming is always about setting expectations for your code. Without TDD, these expectations are stored in your head and verified with your human senses. With TDD, the expectations are held as executable tests and confirmed by the computer. Do you really think the human brain is more effective?

That being said, TDD is not a silver bullet for every situation. Nevertheless, I like [the points](https://kentcdodds.com/blog/when-i-follow-tdd) **Kent C. Dodds** writes on their blog post. Precisely, I embrace the notion of not using TDD while doing exploratory coding.

I, too, have found out that when I'm trying to figure out how a library or a framework works, I tend to hack some code together and learn it through exploring. Hacking is not an issue unless every task you work on becomes a feeble attempt at exploratory coding. Such is prone to happen when we don't split nor refine our tasks to concrete implementation details. The more I need to duct tape my code, the less incentivised I'm to write tests first, and my main driver is simply to make the code work.

Let's remember that TDD is not a testing tool. Instead, it forces us to design our code before writing it. If we never pay attention to good design, our codebase will eventually become a rotten cavity that only gets worse before a dentist needs to operate the whole tooth with a root canal, or in our case, rewrite the code.

Yes, but... using TDD, we can't write tests for the existing code by definition, right?

When we are writing tests for the existing production code, we often find it difficult. As a result, our design likely contains serious flaws, usually caused by a lack of continuous refactoring, which has not played a significant role due to a lack of tests as a safety net.

Fortunately, we can practise test-driven development also for the existing code by following the steps below.

1. In the codebase, locate the code (_behaviour_) you want to test
2. Comment out the code as if it never existed in the first place
3. Write a failing test
4. Start restoring the commented out code line by line until the new test passes
5. If necessary, write another failing test and make it pass
6. Remove (do _not_ comment out) all the code not required for the tests to pass
7. Refactor until the code satisfies your taste

There are many good resources written about refactoring. I tend to follow [the four rules of simple design](https://martinfowler.com/bliki/BeckDesignRules.html) by **Kent Beck**:

-   make the tests pass
-   refactor until the intention is clear
-   remove duplication where feasible
-   remove everything not needed to satisfy the first three rules

More succinctly: **test, refactor, remove, and repeat**.

If the codebase is extremely convoluted as a consequence of lousy engineering, we find this process difficult. In those cases, instead of commenting out old code, we should consider writing a new module or class from scratch. Then, when we are ready, we can swap it with the old implementation helped by the interfaces defined in our type system. Doing so leaves us the possibility of quickly reverting back to the old implementation if things go wrong.

Most importantly, writing tests side-by-side with both the existing and new production code takes away the reason to ask how much writing tests cost. The cost of writing tests is now embedded within the feature development.

In some projects, I've seen teams creating separate tickets for writing tests and refactoring. Doing so, the developers think they get proper permission for these tasks, but they actually look as if apologising for following the quality standards of their craft.

Differentiating tests and refactoring from feature development is **a huge red flag** and makes us developers look unprofessional. We must never allow ourselves to think a feature is _done_ unless we have proved it with tests. Respectively, refactoring is a mandatory continuous practice, which must never require explicit permission.

## The Boring Part: Document All the Things

Let's assume that through rigorous testing and refactoring efforts, our codebase is in better shape now. End-to-end tests ensure we can release safely, and fine-grained tests provide we can rapidly develop and refactor new features.

What do we miss? Documentation!

When studying a codebase for the first time, I often reach for three different types of documentation:

1. How do I install and run this application locally?
2. What features does it have, and how do I use them?
3. What past decisions have affected the design of this application and the way it works today?

### Read Me, Read Me

We should ensure we have a **README** file in the project root for the first task. This is the front page of your documentation in modern version control systems, which people consult first. As a bare minimum, it should contain the following information.

-   How to install the application
-   How to start the application
-   How to test the application manually
-   How to run the automated tests
-   How to deploy the application
-   How to contribute to the codebase
-   Who to ask for support in case the documentation can't provide answers

### Executable Documentation

The second task, however, might surprise you. Having covered our codebase with automated tests, we actually have the relevant technical documentation right there, and we can even run it — aren't we the lucky ones.

End-to-end tests document how the users interact with our application and how the client applications interact with our backend systems. When written clearly and concisely (see [_behaviour-driven development_](https://automationpanda.com/bdd/)), every developer can quickly grasp the basics.

Fine-grained tests document how our internal interfaces are used and how public methods are called. Without fine-grained tests, we would have to read the entire source code to understand how to call its public methods, what inputs they require, and what kind of outputs they produce. By looking at well-defined tests, it becomes evident like reading a user manual.

Yes, but... my excellent IDE shows enough information when I hover my cursor over the method name. So why do I need more documentation?

Indeed, many state-of-the-art omnipotent god-given IDEs can also display the intent and signature of methods by hovering over their name. However, our code often contains intricate handling for edge cases and errors, which are not apparent by looking at the type signatures. It bears repeating that type systems, despite their value, never have, and will never, be a substitute for proper tests and documentation.

### Architectural Decision Records

The third task is perhaps the most exciting one. Despite our best efforts, we can't know what we don't know. Even with codebases that could be a little more than a year old, we tend to find ourselves in peculiar waters.

We may ask ourselves, how did this class come to be? Why is this state shared between these components? Why does our database table contain an index for this column? Why do we require an API key for all our public REST APIs?

Surely we can figure out the answers to the above questions ourselves, or more traditionally, by asking other developers. However, wouldn't it be _nice_ to read the answers explained to you in plain text, ideally next to the source code?

Yes, but... I can just as quickly run `git log` and check the history from there.

Stop right there! Commit messages in version control systems are great for capturing and explaining the motivation behind micro-level changes such as renaming a variable. However, they perform poorly for significant architectural changes spanning across tens or hundreds of small commits.

Some developers are keenly obsessed with keeping the version control history linear to tell a logical narrative of changes between points A and B in time. I admit to doing it myself from time to time. Other developers like to squash merge entire feature branches so that one commit equals precisely one feature. In most situations, both approaches come with tradeoffs that make them more harmful than beneficial.

Thus, we should use [Architectural Decision Records](https://adr.github.io) instead.

ADRs capture a single decision that has significant consequences towards the design and implementation of the product for the foreseeable future. Typically, they include but are not limited to:

-   title of the decision
-   status (proposed, accepted, rejected, or superseded by another ADR)
-   context (why did we have to discuss this?)
-   decision (where did our discussion lead us?)
-   possible consequences (what later impacts did our decision have?)

ADRs work well with internal meetings, and therefore we should set a requirement that no architecture meeting takes place unless a decision or proposal is produced.

Yes, but... aren't the ADRs useless for us? I mean, who can't remember what we discussed yesterday or last week?

You might feel like it now, but try telling that yourself in six months. I can assure you that when enough time has passed in a project, even the code you wrote is indistinguishable from someone else's.

## Conclusion

If you, like me, have worked in maintaining the software in the later stages of its lifecycle, I hope you have enjoyed this post and found pieces of wisdom in it.

The bottom line is that we should not run away from legacy codebases. Granted, I can name a dozen more exciting tasks than trying to get an old application without tests or documentation up and running. However, that is not for us to decide. All we have to decide is what to do with the code that is given to us.

Keep calm and carry on!

---

Photo by Cesar Carlevarino Aragon on Unsplash.
