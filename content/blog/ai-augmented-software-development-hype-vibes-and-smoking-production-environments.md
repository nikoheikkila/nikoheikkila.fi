---
title: "AI-Augmented Software Development: Hype, Vibes and Smoking Production Environments"
author: Niko Heikkilä
lang: en
excerpt: Generative AI won't save your software delivery process, and may even drown it in half-baked code, context switching, and complexity.
type: post
categories: [ai, software, xp, professionalism]
date: 2025-03-25
hero: null
---

<small>Originally published on [Polar Squad blog](https://www.polarsquad.com/blog/ai-augmented-software-development-hype-vibes-and-smoking-production-environments/)</small>

Generative AI tools have changed how we developers approach our daily work. Today, headlines tout the arrival of AI-augmented software development and vibe coding as silver bullets, making development teams orders of magnitude more effective. However, the promised gains are shallow if teams do not also pay attention to the software delivery aspects.

As a software engineer actively using GitHub Copilot and regularly consulting Anthropic's Claude, I have witnessed the power of AI in specific contexts where frequent experimentation and prototyping are valued. AI recalibrates knowledge work so that what once was necessary for humans to handle is now secondary. Meanwhile, the importance of the rest of the knowledge work aspects has grown a thousandfold.

However, it's crucial to acknowledge that using AI comes with tradeoffs we must not overlook. While AI-augmented software development can be beneficial, it's equally important to recognize that AI-augmented software delivery is still a distant goal. Understanding these limitations is key to being well-prepared in our work.

## The True Nature of Software Delivery

There are significant hazards when using AI to accelerate your development stemming from the fact that programming is only a tiny part of the software delivery process. This process, or more suitably referred to as a value stream, encompasses all the thinking, discussing, experimenting, and learning involved in delivering a working software product to end users.

### Understanding the Value Streams in Software Delivery

As defined by [Lean Enterprise Institute](https://www.lean.org/lexicon-terms/value-stream/), the value stream includes all of the actions, both value-creating and nonvalue-creating, required to bring a product from concept to launch (development value stream) and from order to delivery (operational value stream). Nonvalue-creating actions include unnecessary handoffs, rework due to poor initial design, or delays due to resource constraints.

In software delivery, the value stream encompasses the entire lifecycle from ideation to production deployment and operations. Programming, or codifying requirements and expectations, is only a step. It typically accounts for less than half of the overall delivery. The remaining work involves understanding user needs, designing solutions, testing hypotheses, collaborating across disciplines, and, most importantly, operating amidst organizational barriers.

These non-programming activities are precisely where the most significant delivery challenges and non-value-creating actions emerge. Teams struggle with requirement ambiguity, stakeholder alignment, integration issues, and organizational power dynamics that ultimately determine whether software delivers the intended value. Organizational barriers could include resistance to change, lack of cross-functional collaboration, or unclear decision-making processes.

AI excels at brainstorming mostly syntactically correct code with some logical defects but remains fundamentally limited in navigating these human-centered aspects of software delivery.

### Lean Principles and Identifying Waste in Software Delivery

The most notable impediments to optimizing value streams and team flow have been researched as part of Lean manufacturing and are called waste (muda). We can regard everything that does not create customer value as waste.

Mary and Tom Poppendieck, in their book [Lean Software Development: An Agile Toolkit](http://www.amazon.com/Lean-Software-Development-Agile-Toolkit/dp/0321150783), popularised the mapping of different types of Lean waste to software delivery impediments.

According to the Poppendiecks, the primary waste in our work includes:

- **Partially done work** (work-in-progress) or every backlog item sitting in the work queue between the backlog and production.
- **Overproduction**, or all the extra features we write while solving the problem.
- **Relearning and reworking** involved for the backlog items moving back and forth between inspection points.
- **Internal and external handoffs**.
- **Context switching** when you need to drop a task and focus on a new one.
- **Defects** that hinder user experience and endanger businesses.

There is only so little that AI can do to help overcome this waste. On the contrary, it often only exacerbates it. For instance, AI may generate code that solves a problem but introduces new bugs, leading to rework. It may also encourage overproduction by suggesting unnecessary features. Understanding these limitations is crucial for effectively integrating AI into software delivery processes.

As we enter a new era in software development, we must remain vigilant about the effectiveness of our delivery processes and value streams. While AI-augmented development provides the potential to streamline coding and ignite creativity, it cannot replace the fundamental human elements that drive successful software delivery.

Acknowledging AI limitations and committing to optimizing our value streams, we can use it not as a crutch but as a companion for success. In doing so, we not only enhance our effectiveness as developers but also ensure that the software we deliver meets the needs of our users.

The path forward demands a novel approach integrating AI's strengths while exposing and eliminating the waste typically associated with software delivery projects.

## Partially Done Work

Thanks to its powerful autocomplete features, AI has the potential to revolutionize software development by completing tasks orders of magnitude faster. However, this added speed also carries multiple risks.

Completing one work cycle faster—in Lean manufacturing terms, moving work from one station to another—can jam the team flow as bottlenecks emerge. The quicker we work in the implementation phase, the more work we pile in front of the bottleneck ahead.

Following Eli Goldratt's [Theory of Constraints](https://www.leanproduction.com/theory-of-constraints/), AI-augmented programming is a perfect candidate for the illusion of [local optima](https://fortelabs.com/blog/theory-of-constraints-102-local-optima/) where we attempt to improve the total performance of the system by improving the performance of an individual cog only to find out it doesn't yield the expected results.

### Bottlenecks and the Illusion of Speed

Let's see an example of how that can happen. Consider a team enthusiastically embracing AI coding assistance. Within a couple of weeks, the developers generate code at incredible velocity. However, their testing and review columns are piling up unfinished work. Usually, many pull requests are waiting for review, which the team resolves by rubber-stamping and disbanding the value of code review altogether. Meanwhile, the UI/UX designers are struggling to keep pace and stress that the developers are moving too fast for them.

Without exposing and improving the bottleneck found in testing and review capacity, the team effectively turns their work into a warehouse of partially done work, delaying delivery. Even further delay happens when the code passes the review and it's time to merge the work, but it proves slow and painful due to numerous merge conflicts.

Can AI help with merge conflicts? It is unlikely unless you provide it with full context from both sides of the merge, which is not trivial. Furthermore, having AI review and test features has been the talk of the town for years now, but at the same time, many regulated companies follow the so-called [principle of four eyes](https://www.openriskmanual.org/wiki/Four_Eyes_Principle), where a human outside the work context must review the changes.

As DevOps people have been trying to sell continuous delivery mechanisms and reliable pipelines to these companies for a decade with varying success, I'm skeptical that these companies would activate AI code review and testing and automatically let all the changes move to production.

## Overproduction

AI answers often provide excessive detail and redundant lines of code when we desire simplicity. While experienced developers can fine-tune their prompts, many users, especially juniors, could unquestioningly accept and use overly complex solutions.

While I have nothing against explaining the answers in detail, I seek only a few lines of code when using coding assistance. The less code I receive, the better I follow its intent. Due to the overly helpful nature baked into AI system prompts, they often spit out large parts resembling online tutorials aiding with project setup, file structure, and documentation.

Even though you can work around this problem with careful prompting, junior developers often have little experience nor second thoughts about the answers. So, they are happy to copy and paste the answers to their work.

A [recent study](https://www.mdpi.com/2075-4698/15/1/6) showed that especially younger people with higher reliance on AI tools had more problems with critical thinking than older people. Therefore, it's not unusual to state that they could treat AI-generated code without criticism, using code that technically looks feasible, but in reality, delivers too much. The result is gross overproduction, over-polishing, and often tight coupling between components. Most of the models have not been trained well with clean software design principles and, by default, tend to produce complete solutions instead of small, iterable experiments.

### AI's Tendency Towards Complexity

Suppose I ask the AI for help while implementing a date picker component. If it generates hundreds of lines of code, including validation logic, internationalization support, and calendar-like navigation, what should have been an MVP allowing users to select a date has become a tangled mess of features you won't need now—if ever.

The above example perfectly defines overproduction. The code works but includes features users didn't request or need. When the requirements change soon enough, the team modifies the complex initial implementation three times longer than if they had built a minimal solution. The AI optimized for completeness rather than simplicity, creating waste that had to be carried forward or refactored away.

## Relearning and Rework

Accepting AI-generated code without careful review can lead to more work in the future. It's crucial to understand and be comfortable with the code you're working with, as the person changing the code is often someone else from your team.

Having to relearn often leads to heavy code refactoring, which becomes more complex as more overproduction occurs. Of course, you can have AI do the rework, but without pausing to understand the changes you're about to make, you're only placing an order for more rework in the future.

### The Cost of Unreviewed AI-Generated Code

A junior developer might use AI to generate a user authentication system. Without fully understanding the generated code, they integrate it into the codebase. Sometime later, when the team needs to add social login capabilities, the team can't grasp the architecture embedded in the generated code. Thus, the team spends days refactoring the logic before extending it.

The team could have saved the time investment had they engaged more deeply with the design in the first place. This pattern repeats in worst codebases with black box AI solutions requiring extensive rework whenever they need modification.

## Handoffs

No matter how effectively we use AI, handoffs to other people will inevitably happen for many teams. Often, our products move from the initial development team to the maintenance team so the original team can focus on building new business-critical features. In more old-fashioned environments, products move from development to operations for deploying and running those.

Imagine handing over a codebase where AI has generated 90 % of the code. If anything, that is a ticking time bomb. Sure, for handover, you can generate the required documentation and align the roadmap with AI, but with what context and cost?

### The Challenge of Domain-Specific Knowledge Transfer

AI struggles with domain-specific knowledge transfer, which is the most critical information during handoffs between teams. This limitation stems from how we train AI. While it excels at identifying patterns and generating coherent text, it often lacks sufficient understanding of specialized domain contexts.

For example, a payroll system handling the salaries for municipal employees isn't your average code as it embodies significant regulatory knowledge, compliance requirements, and institution-specific business rules of which AI is unaware. Likewise, healthcare has a bottomless pit of laws, regulations, and essential complexity. Training custom models is possible, but the return on investment is not likely to be profitable as we uncover more complexity during the training.

When AI generates documentation for complex systems, it can describe the technical architecture and surface-level functionality but cannot capture the many whys behind critical decisions.

In the payroll example, why are transactions handled differently on weekends? Why must specific hour reports undergo additional verification steps? These domain-specific rationales are firmly rooted in the institutional knowledge of the team and domain experts who built the system. Past incidents and interpretations often shape this knowledge, which might not be public information.

The most valuable documentation for handoffs addresses these domain-specific nuances: the edge cases, historical context, and business justifications. They explain why a system works as it does. Here, AI falls short, creating a dangerous knowledge gap during team transitions.

## Context Switching

As I explained with partially done work, AI-augmented development creates review bottlenecks, forcing team members to switch contexts between other work items rather than focusing on their work.

Even if we adjust the AI to solve the waste of overproduction and produce only minimum code, we aggravate the problem because a higher number of smaller batches demanding review chokes the throughput and causes even more context-switching.

### More Pull Requests, Less Throughput

In a team heavily utilizing AI, we see a troubling pattern in the pull request process. Team members submit smaller and more frequent pull requests — averaging 12 per week instead of the previous 3–4.

While smaller pull requests generally sound better, the increased volume quickly overwhelms the system capacity. Other team members hop between multiple pull requests daily while their work suffers.

The team suffers from a bottleneck where people write code faster than they can review. Everyone suffers from a high cognitive load and feels exhausted despite AI supposedly making their work easier. We had optimized AI tools for individual speed at the expense of team flow.

## Defects

Whenever I've asked AI to generate a solution to a problem, it has consistently left out unit tests unless I specifically asked it to write them.

I'm unsurprised, having seen many hastily written codebases during my career. The company behind the AI model has likely trained it with a significant subset of public codebases lacking tests. How could it know tests are needed in every serious programming context if many teams do not lead with an example?

If AI does not, by default, write tests for you, then all the AI-augmented 10x developers will only deliver more defects than value. Reflecting on the possibility of AI-reviewed code, I doubt it would know to block a pull request when it lacks tests. That is solely the responsibility of the continuous delivery pipeline. Furthermore, when automated tests mean AI testing the code written and reviewed by another AI, it's another ticking time bomb causing havoc and defects in your production environment.

### Risks of Neglecting Tests

In an example scenario, a project using AI-generated modules extensively, passed all the quality assurance checks, and the team deployed the changes to production. Within the first week, the team had discovered critical vulnerabilities in the API layer the AI had implemented.

Despite looking professional and working correctly for the happy path, the code lacked functional verification for edge cases, error handling, and security headers. The developers had asked for an API fulfilling acceptance criteria but hadn't specifically defined the level of testing they needed. The AI obliged by generating code that functionally worked, but its fundamental insecurities were not caught in the delivery pipeline. The rework cost the team weeks of emergency patching and a security incident review, not to mention losing their reputation along with clients.

## Making AI Work Meaningful

Though this blog post might make the current situation look bleak, there is still plenty of hope. Making AI-augmented software delivery work is a matter of using the correct tools correctly. That means instead of accruing waste we must use AI to expose and eliminate it.

### Establishing Quality and Guidelines

Teams must establish guardrails that ensure AI builds quality rather than accelerates output. Have clear guidelines for how and where AI tools fit your delivery workflow.

First, we must establish quality gates dictating that the AI-generated code must pass before integration. Those include automated checks in the form of unit and preferably mutation tests, complexity metrics via static analysis, scanning of security vulnerabilities and software bill of materials, and adherence to architectural patterns. When you practice continuous delivery and automate these gates into your CI/CD pipeline, you have created safeguards against the quality issues inherent in AI-generated solutions.

Second, implement and document a team-wide protocol for AI tools usage. For example, consider a policy of not deploying AI-generated code without peer-reviewing your prompt and generated answers. Teams should require their developers to explain the functionality of AI-generated code, ensuring they understand what they're adding to the product. Using agentic tools such as [Cursor](https://www.cursor.com/) and [Warp](https://www.warp.dev/), which propose and implement changes incrementally while keeping the developers in the loop is helpful. Defining and documenting recommended prompting techniques as a shared library is another trick worth considering.

Third, invest in AI literacy across your delivery pipeline. If you have quality assurance specialists, they should share an understanding of how and why they augmented test automation code with AI. Product owners should learn to write requirements without embedding a hallucinated well of wishes from AI. Most importantly, tech leads should become experts in identifying and removing AI waste described in this post.

### The Path Forward with AI-Augmented Software Delivery

Thinking of AI as a companion instead of a driver plays a key role here. We have already seen increased perceived throughput using AI while sacrificing quality and stability. We must train, tune, and prompt AI to provide quality solutions to balance the situation. At the same time, we still need to continuously educate ourselves on modern software engineering principles. Regard AI as someone with access to virtually unlimited knowledge resources but lacking a deep understanding of how to apply those to your context.

Thus, the lesson here is that quality does not fall into our hands unless we demand it. To be able to demand it, we must learn to recognize it. More than training the AI, we still need to train ourselves in fundamentals. Tools amplify our capabilities but also our limitations. An undisciplined team with access to a powerful AI produces poorly architected systems faster. Conversely, a team grounded in solid engineering principles will benefit even from a contextually limited AI.

At Polar Squad, treating AI as a companion rather than a driver, using it responsibly, and using it to serve the entire delivery lifecycle instead of being a mere coding assistant can make working with it meaningful. If you require human assistance to master AI assistance, we are ready to help you.
