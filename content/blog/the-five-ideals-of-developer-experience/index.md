---
lang: en
author: Niko Heikkilä
date: 2020-01-06
cover: cover.jpg
title: The Five Ideals of Developer Experience
type: post
excerpt: Assessing the anti-patterns and embracing the remedies.
categories:
  - DevOps
  - Business
  - Processes
---

Developer experience is a term often thrown loosely without much explanation. You might have come across it in developer communities describing how easy it's to work with some public APIs or your company might have participated in one of the myriad best workplace competitions. Job advertisements may promise a heavenly developer experience by offering table tennis or a fridge full of beers and pizza as a work benefit. However, to me, developer experience is all about getting my job done while maintaining my competence in this profession.

Two books that have hit my nerve and managed to define the developer experience coherently have been [**The Phoenix Project**](https://www.goodreads.com/book/show/17255186-the-phoenix-project) (Kim, Behr, Spafford. 2013) and its thematic sequel [**The Unicorn Project**](https://www.goodreads.com/book/show/44333183-the-unicorn-project) (Kim. 2019). Both seek to address technological, operative, and cultural issues present in modern software companies. While The Phoenix Project focuses on telling a story of how an IT department went through a full DevOps transformation, The Unicorn Project tells the same story from a female developer's and their team's point of view. Being a developer myself, I was more interested in the latter book.

The thread of The Unicorn Project is about five ideals that the author has observed to be pain points in many a technology organisation. I will refer to those ideals in my slightly adapted list below. All the observations are based on both the fictional events depicted in the books and my real experiences working with different people as a software engineer. Together they lay the groundwork of boosting the fabled developer experience.

I will omit the middle step eliminating the anti-patterns and embracing the remedies since that is always very subjective to each business. If you want to know the ins and outs of how I warmly recommend reading the books. They might include the best return on investment I've ever spend on business books.

---

**The Five Ideals**

<!--alex ignore-->

- [1. Keep It Simple, Keep It Local](#1-keep-it-simple-keep-it-local)
- [2. The Joy Must Flow](#2-the-joy-must-flow)
- [3. Improve Yourself and Your Work](#3-improve-yourself-and-your-work)
- [4. Maintain a Psychologically Safe Workplace](#4-maintain-a-psychologically-safe-workplace)
- [5. Focus on the Core](#5-focus-on-the-core)

<!--alex ignore-->

## 1. Keep It Simple, Keep It Local

> "If a team needs to schedule a deployment and it requires 40 to 50 other teams to work with them into the schedule, nothing will ever get done. And if a team delivering on a single feature has to coordinate with 2 or many other development teams, it only creates delays and challenges for all of these teams."

💀 **Anti-Patterns**

When a developer clones and builds an existing project it takes days to complete because they need to search the intranet for insufficient documentation, configuration parameters, and magical shell commands to make the application work in their environment.

Due to enormous technical debt, the application has become so complicated that people have started avoiding touching the code at all costs. Each new feature involves modifying the code in several different places, and writing tests is often neglected. Thus, every new line of code likely breaks the application, but it's not noticed until very late in the process – usually after the production deployment goes wrong and trashes crucial data.

Developers are required to work in a shared development environment which has no parity with the real production system, and for which a high number of tickets must be opened to get access. The development environment also suffers from outages and prevents the use of custom productivity software due to unnecessarily strict IT policies championed by an overtly officious chief information security officer.

QA specialists work in a separate department completely isolated from developers. Their only communication with developers happens via a ticket system. QA receives changes that haven't been tested by developers at all, forcing them to spend a significant part of their day writing bug tickets after hours of manual testing. For the QA, no dedicated testing environments exist, so the functionality has to be verified by building the application from scratch, which is painful to them as well.

Developers nor QA are not allowed to perform essential tasks such as deployments by themselves since doing them requires a ticket to be opened for the IT Ops team. Feedback from right to left takes several weeks to loop effectively blocking all learning and experimentation.

💉 **Remedy**

Projects are designed to be run by developers on self-service platforms either as cloud-native serverless applications or distributed via Docker or Vagrant images to be built on their laptops. All images are designed with high parity with the production environment. Setting up a project requires developers only to clone it and build it with a single command. Everyday tasks like running tests, fixing code style issues, and deploying the application are implemented with task runners, and their use is well documented.

The amount of technical debt is kept low by aggressive refactoring so developers can spend time writing happy and sad test cases for each new feature they ship.

QA is also able to self-service a new testing environment by leveraging _Infrastructure as Code_ methodologies where they install portable testing environments with the help of a few configuration files stored in version control. Using these environments, the QA can perform exploratory testing finding all the possible defects that automated tests didn't catch or the developer sitting right next to them couldn't have thought.

Deploying the changes happens with a single command and does not depend on other teams. The feedback loop is shortened to minutes allowing to see if a potentially risky change was worth committing and whether it should be rolled back.

## 2. The Joy Must Flow

> "When developers are able to focus on developing their code with minimum dependencies, delays and impediments, it creates flow of value, therefore joy."

💀 **Anti-Patterns**

Developers must surrender to a constant context switching so much that there's hardly any context or focus in their daily work. The office has become an environment of perpetual chaos, distractions, and anxiety. Working remote has either been forbidden or made difficult. Developers need to attend multiple long meetings daily to get their work done. When not in meetings, they are barraged with an endless stream of messages and emails screaming their immediate attention.

The flow and focus of developers are also constantly interrupted by having to depend on other teams for completing even the simplest tasks. As a result, tasks are often postponed, and personal backlogs grow to substantial numbers making everyone feel miserable.

💉 **Remedy**

Meetings are only used as a last resort of communication. If a session must be booked, its agenda is written with absolute preciseness, and invitations are sent as early as possible so that participants have time to prepare. Declining meetings is not shunned if work is flowing strongly.

Majority of the information exchange happens asynchronously in a written, not spoken, form. Peers understand that rare questions are so time-critical that replies are needed on that exact moment. Developers are encouraged to disable message notifications and block time for development. They should not be distracted by anything other than a fire alarm.

## 3. Improve Yourself and Your Work

> "The FANGs, which are the elite organizations such Facebook, Amazon, Netflix, Google, eBay, LinkedIn, Microsoft are successful because they all made the conscious decision to pay down their technical debt. They all did whatever it took to make sure that developers’ daily work could be done and could flow with as little interruption and impediments as possible. On the other hand, we have companies, and Nokia is a good example, that didn’t prioritize tackling their technical debt or modernizing their technology and architecture."

💀 **Anti-Patterns**

Teams are not given time to pay off the increasing technical debt accumulating in the system. They are required to continually write new features on top of an existing poorly working monolithic codebase which should already be split into several smaller modules or completely rewritten. To make matters worse, business owners fill the backlog with new features, not understanding how much they accumulate technical debt.

Self-improvement and honing of skills by reading books, watching videos, or attending courses is actively discouraged in favour of working with business features in a rushed schedule. The company has never sent anyone to a conference.

💉 **Remedy**

Cutting technical debt is brought forward as a core strategy of the company even if it means that all work on new projects must be frozen until the debt is radically shorter. Existing team compositions are altered to best suit each project's needs. If any area of work fights against the first ideal of simplicity and locality, it's resolved as a high priority issue.

Developers block time for self-studying techniques and methodologies that help them do their work more effectively. They also come together weekly to teach something new to each other, be it a new programming language, framework, design pattern, or productivity tool. Fresh ideas are often brought home from courses and conferences where developers are actively sent for learning trips. These ideas are then written down as proposals and proof-of-concept solutions are created, which in turn generates new conventions and innovations.

## 4. Maintain a Psychologically Safe Workplace

> "Psychological safety is one of the top predictors of team performance. [Google](https://diversity.lbl.gov/2019/05/13/the-quest-to-build-the-most-effective-teams/) established to what degree team members feel safe to talk about problems, to say what they think without fear of castigation and of being ridiculed or blamed."

💀 **Anti-Patterns**

Developers are afraid of getting belittled and bullied for expressing their opinions or disagreeing with a senior peer. Their initiatives are actively discarded as unimportant or foolish. As a result, most of the developers fall silent and stop caring about advancing the team's throughput.

When a potentially costly production incident occurs, people seek to find someone to blame for it often yearning a reason to fire or move the person into another team as a punishment. Failures are then announced on company-wide emails telling the person found to cause the incident is on leave until further notice.

During coffee breaks, office halls and water cooler chat rooms fill with offensive jokes targeted against those with less power in society, making representatives of different minority groups uneasy. Since reporting cultural issues to managers is not considered safe, it will ultimately drive many employees to resign and seek a better job.

💉 **Remedy**

Developers are encouraged to write down their ideas and present them to the team without fear of being laughed. Developers rarely come up with foolish ideas. They have only been prepared in a rush with a lack of substantial research and evidence of their usefulness.

All production incidents are reconstructed and recorded as a timeline of events during a **blameless post-mortem** seeking to find the root cause. It's agreed that before and during the incident, everyone was equipped with their best intent, skills, and knowledge. Even if someone has directly caused an incident they are not punished for it but trained to avoid doing the same mistake next time instead.

Discussion topics on coffee breaks and water cooler chats are kept respectable and jokes are told following the golden rule of stand-up comedy: [always punch up, not down](https://www.urbandictionary.com/define.php?term=Punch%20Up). If anyone is found working against this culture, their actions will be reported to their manager and discussed in a civilized manner.

## 5. Focus on the Core

> "Core creates lasting durable business advantage, whereas context is everything else. Core is what customers are willing to pay for, context is what they don't care about."

💀 **Anti-Patterns**

Developers are required to work with systems that do not contribute to cutting the technical debt nor increasing the customer experience (_core_). Their days are spent maintaining legacy internal systems like compliance, bookkeeping, and payroll (_context_) that could be fully automated or replaced with more robust solutions from external vendors (e.g., cloud services).

After changes are deployed to production after weeks of committing them into version control, there is no way to measure their effectiveness. Marketing and sales teams are blocked from creating campaign initiatives for field testing. As a result, the business loses revenue.

💉 **Remedy**

Developers participate in experiments where their changes cut technical debt or impact directly on customer experience. All changes are actively monitored in a metrics platform producing relevant data about the impact of the team's multiple daily deployments. Marketing and sales teams flow while inventing even bolder ideas of new revenue generation.

Time spent on working with repeating office tasks and systems invisible to customers is reviewed and compared against the time spent on working for business goals. The context will not slay the core. Developers can be productive with work that grows the company's technical and business competence.

---

<small>Quoted paragraphs were taken from the [InfoQ](https://www.infoq.com/articles/unicorn-project/) interview with **Gene Kim** in November 2019.</small>

<small>Photo by Marco Secchi on Unsplash.</small>
