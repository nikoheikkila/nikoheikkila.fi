---
title: "Clean Frontend Architecture with SvelteKit: Enabling Safe and Continuous Deployments"
author: Niko Heikkilä
lang: en
excerpt: In the previous post, I described how to build a stable and fast acceptance test suite helping me to produce quick and repeatable proofs that my solution works. So what purpose does it serve us?
type: post
date: 2023-05-07
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

The goal of every software team is to deliver the solution into their users' hands sooner than later. In this post, I will explain how to set up a CI/CD-oriented workflow for the Photo Browser that grants confidence in my changes both locally and in the continuous delivery pipeline.

Before venturing further, in case you are unfamiliar with the term, let me present you with a brief definition of continuous delivery. What does it mean in the context of a software engineering team working on a product?

As a concise explanation, I've embraced the analogy of a CEO approaching the engineers working on an upcoming feature. The discussion begins with CEO stating bluntly:

> _"Our competitor just released a new feature similar to what we have in our roadmap — we need to go live with what we have. Can we do that?"_

The answer engineers give the CEO accurately determines whether the organisation is practising continuous or eventual delivery. If the engineers answer _"Yes, give us a moment to release"_, they are delivering continuously, but should the answer be any popular variation of _"No, it would take at least X days to release"_, or _"We have scheduled a release train to conclude at the beginning of next month"_ they practice eventual delivery.

Remember that releasing _what we have_ allows the feature to be far from complete and might not even deliver significant value to users yet. The foundational part of continuous delivery is the technical capability of rolling out the work-in-progress to users while enjoying complete confidence that it will maintain your service level.

To further learn about the importance of continuous delivery, I recommend [**Minimum Continuous Delivery**](https://minimumcd.org/minimumcd/) as your first resource. I'm one of the undersigned and find it a great resource to share with novices seeking to learn trunk-based development, continuous integration, and continuous delivery, to name but a few. After mastering these techniques, you will never look at your craft and engineering with the same eyes again.

What concrete steps should I take to smooth out the delivery process? For each change, I need to double-verify that it's working locally and in a specific build environment having parity with the production environment. For that to happen, the first step is to design a build toolchain.

## Managing the Builds with Task

I'm a massive fan of command-line tools, which, when run locally, help achieve the results I seek from my pipeline.

[**Task**](https://taskfile.dev/) — following the example set forth by **Make** — is a fast, powerful, and cross-platform tool for building, testing, and deploying software. Ideally, Task bundles so many helpful features that writing about them would deserve its own post. Below, I will summarise its pivotal selling points.

Using Task, you define pipeline steps — or tasks — in YAML markup stored in one or more files. The build system is smart enough to prevent redundant steps using file hashes or custom predicate logic to check whether a given step is up-to-date. When coupled with the ability to define dependencies for each step, I can build maintainable pipelines for verifying my changes. Since Task is distributed as a single Go binary, installing it into build environments is trivial, allowing me to run the same steps locally and remotely.

Furthermore, if I add containerisation to the mix, I'm effectively promising that the changes that worked locally will, without a doubt, also work during the build. This is a remarkable additional asset when considering the safety aspect of continuous delivery.

Finally, regarding development experience, I recommend using Task or a similar build system over the programming language's conventions because it helps to define a better interface for your build steps.

If you look at [the package definition](https://github.com/nikoheikkila/photo-browser/blob/main/package.json) of the Photo Browser, you see that I haven't added any NPM scripts for handling the mundane tasks. Instead, I've accustomed to using the following tasks while developing _any_ project.

In my [Taskfile](https://github.com/nikoheikkila/photo-browser/blob/main/Taskfile.yaml), I define:

-   `task install` to install third-party dependencies and set the application up for development. This is run as a dependency for all the later tasks.
-   `task format` to format the codebase according to the used style guide.
-   `task lint` to run static analysis to find code smells lingering in the codebase.
-   `task build` to build the production application.
-   `task serve` to run a web server for the built production application.
-   `task test` to run the whole acceptance test suite before pushing the changes. Yes, I always run all my tests locally before pushing, and you should run too.

All of the above commands are, in fact, interfaces for their respective pipeline steps whose implementation may change freely as long as it provides the same outcomes. Earlier in this guide, you learned how paramount defining an interface and substituting its implementation with another is. The same approach works everywhere, from production code to deployment pipelines.

Another gem is how these commands define a shared syntax integrating with my mnemonic workflow. So no matter what project, language, or framework I'm working on, I can use the same (sub)set of commands.

Onboarding new team members is another remarkable benefit I gain with Task. People don't need to find the correct tools and commands to kickstart their environment when a tool dynamically sets them up.

You might also wonder why I am not using Make since it's already bundled in most operating systems I work with. The YAML definitions and templates with Task are much friendlier for the average developer than the obscure syntax in Makefiles. In addition, I get to enjoy the more powerful build features with less effort. If you have spent considerable time already configuring an ultimate `Makefile` for your codebase, great! The same benefits eventually apply.

## Setting Up the Test and Deployment Workflows

Since I'm using GitHub, the obvious solution is to use their Actions pipelines. As indicated previously, I run all my build and test steps with Task, which helps me to change the CI/CD provider more flexibly in case I need to do so[^pl].

In my [main workflow](https://github.com/nikoheikkila/photo-browser/blob/main/.github/workflows/test.yml), I run the following steps:

-   Check out the changes, set up Node.js, and install the required dependencies.
-   Check the codebase formatting with Prettier.
-   Run the static analysis with ESLint.
-   Run the unit and component tests with Vitest.
-   Build the application and run the Playwright tests.

Excluding the Node.js installation, this is the same workflow I run locally whenever the remote repository has changes I need to check out to my local machine. Pull, test, push.

For convenience, I'm initiating the Netlify production deployment in parallel whenever I push a new commit to the trunk. This is Netlify's recommended workflow when working with their review applications using the pull request model. It's also the easiest one to set up using their GitHub plugin.

Since this is my project, I can work in any way I like, but in a team working on more extensive applications, I recommend initiating the deployment workflow only after the acceptance test suite is passed. Alternatively, with Netlify, I can also set up a branch-based deployment workflow, which can serve as a pre-production environment for you. Eventually, I promoted the changes to production by merging them into the trunk.

Remember that to practice continuous integration and delivery properly, the integration aspect must be _continuous_. Delays in days — or weeks — are not acceptable by definition. I typically push straight to production any small batches that do not require others to review. Other changes _might_ warrant a short-lived pre-production environment, which is automatically destroyed after merging the changes.

I mainly work synchronously in pairs and ensembles with the rest of my team; pushing changes directly to production is a rather convenient and stress-free experience. I hope you have discovered that joy, too.

## Why Pipeline Maintenance Matters

Throughout the software lifecycle, it's crucial to maintain the stability and robustness of the delivery pipeline.

Many teams tend to set up the pipeline and forget it during the project's early days. However, continuous delivery requires disciplined maintenance and monitoring of your live application and pipelines. Unfortunately, people can easily forget the pipeline once they get it working, and then later on, they need to investigate why it takes an hour or more to finish.

I recently worked on a small maintenance task for the Photo Browser updating the dependencies and pruning the obsolete ones. Having completed that, I deployed my changes to production and made a note of how long each test in the pipeline took:

-   Unit tests: 3 seconds
-   Svelte view tests: 6 seconds
-   Playwright tests: 31 seconds
-   Building the Svelte frontend: 4 seconds
-   Compiling Svelte SSR lambda functions: 2 seconds
-   Deploying the site and functions to Netlify: 7 seconds

Delivering a new version of the application takes less than a minute in total. On a good day, it could be even faster when the delivery pipeline is enduring less load. Since I'm using Github Actions and Netlify's pipelines, I trust the infrastructure is already set up so that most days are good.

Slow and flaky delivery pipelines are the most common parts of your delivery lifecycle to ignore. However, when your pipeline has the definitive verdict on whether the application is releasable and can produce that verdict promptly, you trust it more.

Producing software is inherently a risky business. Continuous delivery allows you to manage that risk by conducting short experiments on the viability of your decisions. For example, I've witnessed in many situations that bias to action over debating when planning a new change is often the most fruitful way forward. Reasons to argue about the usefulness of change A vs change B vanish when we can gather factual data through continuous A/B testing.

Paraphrasing perhaps my favourite Linus Torvalds quote: _talk is cheap, show me the ~~code~~ data_.

## Conclusion

You have now read the final part of the guide. To sum up the guide in terms of non-functional requirements, the clean architecture and its supporting practices such as continuous delivery enables you to build applications that:

-   enjoy effortless maintainability due to robust testability
-   are not tightly coupled to specific frameworks or auxiliary devices
-   are less expensive to change whenever stakeholders uncover new needs
-   speak the shared domain language facilitating discussions between the business and development teams.[^es]

Combined, the aspects above allow teams to stay productive and spend their precious time more creatively than sitting in endless debugging sessions.

I hope you've uncovered much new knowledge you can practically apply to your work to improve it. Don't hesitate to contact me if you feel like discussing these practices.

**Godspeed on your way to mastering clean architecture!**

---

**P.S.** I will keep this guide open-source, so you are always welcome to propose changes to its contents. In the future, I plan to add and expand the content to publish the guide as a _pay-what-you-want_ e-book in PDF and ePUB formats.

[^pl]: Switching from GitHub Actions to, e.g. GitLab CI/CD might also require more work than simple YAML changes, so take it with a grain of salt. In any case, task definitions will likely stay the same facilitating the change.
[^es]: See the practice of [Event Storming](https://www.eventstorming.com/).
