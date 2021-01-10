---
lang: en
author: Niko Heikkilä
date: 2020-06-15
cover: opensource.jpg
title: Kickstarting the Open-Source Culture in Your Company
type: post
excerpt: Thinking of selling open-source to your employer? Read this guide for a swift path to glory.
categories:
  - opensource
  - github
  - culture
  - workplace
---

By the 2020s, every software company in existence should be using open-source code as building blocks for their products. Better than that, every company should also be giving back to the open-source community by making regular contributions.

For many companies, it's a no-brainer to import published code from services like _NPM_ or _Packagist_ and add it to their build dependencies. Product people expect projects to ship on time, so why not use third-party solutions.

However, uneasiness emerges when employees within development teams wish to produce open-source components themselves. Most often, the challenges revolve around tight bureaucracies set in stone by senior executives without a coherent understanding of the fundamentals or business benefits of the open-source.

Therefore, the task of convincing the business to support open-source and allow developers to contribute during the working hours falls to none other than developers — because we care about our work most. It's not necessarily a bad thing since every reputable developer should possess _softer_ skills like convincing stakeholders and driving a cultural transformation.

Throughout this article, I explore _one_ way of cultural transformation from a closed-source organization to open-source advocacy. Finally, I share some of my personal experiences driving the change for my current employer.

## Establish the Open-Source Movement

The hardest part of making the change is knowing where to begin. You see the status quo, and you might have a vague goal in mind, but it still can be daunting to get started on this journey.

For me, it helps to outline rough ideas by first thinking in first-person and expanding from there. Ask yourself what motivates you into open-source? What will you get out of it? Essentially, how will this support your life and career goals?

After a moment of pure blissful selfishness, extend your thinking to your colleagues. Would they feel the excitement you feel? Would this improve their lives and careers as well?

Attracting followers is all about listing benefits. However, at this point, you don't need a massive cult standing behind you. A few like-minded colleagues who can help review and refine the plan is enough.

Carry on by writing short and long term goals down in a bullet list. For instance, **Sophie Alpert** has written a comprehensive article on _[Increment](https://increment.com/open-source/the-benefits-and-costs-of-corporate-open-source/)_ about the benefits and costs open-source brought to React project. Add to the list my short-term benefits that companies enjoy by adopting open-source as part of their toolchain.

- Open-source is a cost-effective and flexible way to adopt new technologies without risking vendor lock-in. Importing a dependency and changing it later is trivial if your software architecture is built upon **SOLID** principles, namely the _[Dependency Inversion](https://stackify.com/dependency-inversion-principle/)_ principle.
- It builds morale and reputation among developers and helps retain them in the company for longer. We all love a degree of variety in our work.
- Public projects benefit from the increase in quality and security. Remember the **Linus Torvalds'** law: "Given enough eyeballs, all bugs are shallow".
- The public brand of the company and its engineers receive a facelift as proud supporters of open-source.
- It's an excellent excuse to clean up the code and documentation of older projects before open-sourcing them. Throw bad commit history away where necessary.

Likewise, there's much long-term fruit to harvest.

- A company emerging as an open-source champion drives more tech-savvy people to use their products which generates more revenue.
- More tech-savvy users mean improved quality through contributions, which again generates more marketability, users, and revenue. Looks like we have a profit loop here!
- Talent acquisition becomes easier as well-known regular contributors become potential hires. Note that many people prefer to be _drive-by_ contributors who only contribute once and then vanish — keep a close eye on your regulars and feature them in your repository.
- By seeing the tech used by mainstream open-source projects, the company is given more unobstructed view of the future and helps plan strategically for the future.

There are plenty of other benefits, but these should give you a good start on your mission.

## Communicate the Vision

Having a bullet list of ideas only goes so far. Rather than sharing a selection of raw short-form ideas, it's more important to practice professional written communication by writing a solid thinkpiece. It's time to open the value stream and pitch your ideas to the whole company.

### Choose the Right Approach

There is no right way of taking the initiative. The most suitable way depends on your company. In some occasions, you might need to submit the action in front of a special board to review. Sometimes, you only have to send a company-wide letter or mail it to your manager or CEO.

Whatever the approach you need to take, a well-versed letter accompanied by a spoken presentation is usually the most effective way. Before sending one, be mentally prepared to answer any questions. Some people don't have the faintest idea what open-source is. Some might even suspect it as a foolish endeavour and waste of resources — we all remember how Microsoft felt about open-source and Linux back in the early 2000s. In technology organizations, however, most people are familiar with the basics and curious to learn more.

### Make It Solid

When communicating a cultural change, define the status quo*.* It's useful to address the following:

- where your company stands at the moment compared to your competitors
- what are you missing out by not contributing to the open-source
- what do your business and culture benefit from the change (see above)
- what concrete steps have you planned to achieve results

Back up each statement with a reliable citation. For example, cloud provider **Digital Ocean** has done substantial research on open-source for their **[Currents](https://www.digitalocean.com/currents/)** survey. Other companies may have published their findings and retrospectives on adopting open-source. Use every credible source, even academic ones, you can find. You can even use this post as one — but not the only — reference.

We all stand on the shoulders of giants, so citing the big players like **Facebook**, **Google**, and **Amazon** sounds attractive. However, if you are working for a smaller company, don't forget to include smaller organizations that have succeeded in your mission and operate in the same domain. It's easy to disregard something Microsoft or Google did as too grandiose.

The more thought you invest in your initiative, the less risk of fighting for acceptance you face. The same goes for the legal and compliance departments who have every right to be suspicious of a new initiative affecting a significant part of the payroll.

Some companies pay their developers extra for open-source contributions but unless you're confident about your company would do the same from day one, steer away from it. Asking more money from the get-go is an easy weapon for the opposite side. After all, if the management realizes the value of open-source, they might suggest the bonus initiative themselves.

### Keep the Discussion Alive

After presenting your mission, don't stop there. Invite people to share their ideas in a public Slack or other discussion channel and keep the discussion alive — pin links to interesting open-source articles and guides in your channel.

Interested people will drop by sharing their ideas. Write down even the craziest ideas and amend your plan's short and long term goals. Naturally, the plan itself should be visible for all in the form of a roadmap or even a Gantt diagram if the timing is essential.

At this point, naysayers might appear telling you this was tried before and thus it can't work. Keep in mind that absolutely nothing in this new initiative is the same as when it was last attempted. Pay no attention to naysayers. If there's a written retrospective from the past attempts, it's useful to read those to avoid common pitfalls.

## Designing the Projects

After selecting a few viable projects, it's time to convert the ideas to practice. Create a GitHub organization for your company if one doesn't exist yet. Make sure the information like logo, website, and contact email is correct. Finally, set up teams with necessary permissions. Usually, it's wise to have a couple of organization owners with administrative access, and the rest of the members to have write permissions to your repositories.

By the way, it's not mandatory to host your open-source efforts in GitHub but given its growing reputation and recent acquisition by Microsoft, it has gained a significant advantage to competitors like Gitlab and Bitbucket. Naturally, you can use any code hosting service outside GitHub, but we aware of the additional work.

The crucial question is, what repositories should you add? It depends on the domain you work in.

Fortunately, for companies meddling with web development, the task is more comfortable. If your company ships a SaaS product with a public API on the front, you might want to open-source its integration documentation and build client libraries in various languages for it. This makes the product itself more attractive to technical end-users who often measure the company by its visibility on GitHub.

Create a project hosting example code snippets that people could use to test out your products.

Roll a library for querying and visualizing all that big juicy data you have hauled — provided it's not sensitive information.

Don't forget the community health files. Issue and pull request templates, security policies, code of conduct, and contribution guides are essential material for any GitHub organization.

Chances are you already have suitable projects in your internal version control. Search the optimal way of opening them to the public. Utilities that help other developers or your customers are more than viable.

Start with 1–5 public projects for the sake of visibility. Make sure they include comprehensive READMEs as those are seen as project front pages. If I stumble upon your project and I need to click further than the top-level README to find out what it's used for, you've done it wrong.

## Tackle the Processes

To make your open-source work seamless, you need to define processes lest all your hard work may fall apart.

For example, how will you manage the incoming issues and pull requests? Who is responsible for the code review? How do you publish your libraries and deploy your applications? Who maintains the changelog? What branching strategy is used?

### Pull Requests Are Awesome

Internal and external contributions to your projects should follow the same pattern.

A contributor forks your project, adds some code, and opens a new pull request for review. This strategy is more commonly known as **[GitHub Flow](https://guides.github.com/introduction/flow/)**. When coupled with efficient code reviews and continuous integration pipelines, it brings along peace of mind and top-level quality assurance.

No one must skip from the agreed flow. Employees with write permissions to the project might be tempted to push new code directly to the production branch without opening a pull request. This is acceptable for minor fixes that correct typing mistakes but every change towards actual business logic must be submitted for review. Chances are you already have this convention enforced in your internal product development, thus making this a non-issue. Coding in public repositories requires additional scrutiny since the reputation of your company and your colleagues are at stake.

### Enter the Boards

GitHub supports organization boards which can be used to manage a variety of tasks going on in your organization. I recommend the following two boards, but feel free to make more as needed.

- One board for issues, or _Bug Tracker_
- One board for pull requests, or _Contributions Tracker_

If you've used **Trello** or **Jira**, these boards are not that different. You have a board holding multiple columns which in turn hold various cards. Cards can be dragged across the board to other columns as necessary.

### Triaging Issues with a Bug Tracker

For the bug tracker, set up a basic board for _triaging_ issues. Triaging in this context means categorizing the incoming issues by their priority (high vs low) or closing them. Prepare one column for each label.

- _Needs Triage_
- _High Priority_
- _Low Priority_
- _Closed_

Leave each new issue waiting for triage. The key here is to gather with your team weekly or daily for a special triage session where you will discuss the priorities and possible solutions.

If the issues were reported within your team, you could discuss them straight in this session. However, more often, you will get bug reports and questions from the community. Thus, it's courteous to ask for more information and try to reproduce the issues as described before moving on with triage. GitHub issues can be enriched with labels which helps everyone to see the lay of the land.

As a rule of thumb, if the issue has a severe impact on your application or library preventing its intended use, it should be a high priority. All the rest are a low priority which doesn't mean they should gather dust for years. Find time to fix these once all the critical issues have been cleared.

Don't bother setting any middle stages like a _Normal_ priority between _High_ and _Low_ or prioritizing by using numbers. They will only obfuscate the meaning of priority as everyone interprets them in their way.

### Monitoring the Contributions

For the contributions tracker, set up an automated Kanban board with following columns. You may pick different names depending on your needs.

- _In Progress_ for PRs marked as drafts or implementing review suggestions
- _In Review_ for PRs being actively reviewed
- _Ready for Merge_ for PRs that have passed testing
- _Done_ for closed PRs

You shouldn't need to touch this very often since GitHub can move the cards for you. However, it's essential to keep an eye on this board to get an overview of how pull requests flow in your repositories.

An important aspect of Kanban is the ability to limit the work in progress. GitHub doesn't support strict card limits for columns as of writing this. You need to establish the rigour yourself. Make sure there are not too many pull requests stuck as drafts, waiting for review, or waiting to be merged.

Making your contributors wait for pull requests to move is frustrating and will almost surely crush their motivation to work with you in the future. I once waited a whole year for the maintainer to verify my code review improvements. Eventually, I ended up closing the entire PR having a bitter disrespect towards the project!

## Drive the Change

You have the long-term vision, people are aware of what you are doing, and processes have been set straight. The trick of keeping the culture safe from being forgotten is none other than work.

At first, you may have felt discouraged by the lack of reaction in your organization. The truth is, not too many feel comfortable asking questions directly. Instead, they will watch you from a distance.

**The more you build, the more will come.**

Keep on building for the community. Include the people in your organization as part of the community. Build products that make their daily work more comfortable. Encourage them to submit issues and pull requests. After a while, the ball of snow grows in size.

This doesn't mean you have the permission to start slacking and let others do your work. Spearheading a new culture is tough, but you must keep doing it until it's naturally embedded in your organization. You know you have accomplished the mission when you and others work towards open-source projects like any other work.

## Case Paytrail

At **Paytrail**, I've used this approach to kickstart our open-source development and culture successfully earlier this year.

Since we ship online payment software as a service bundled with several APIs, it was easy to start designing client libraries for more seamless integrations. We have shipped client libraries in PHP for our Form and REST APIs, and we shall likely support more languages and APIs in the future.

Additionally, our public [documentation](https://docs.paytrail.com) was rebuilt from an old and unreadable XML DocBook to a modern static web site using Hugo for generating the site and Netlify for deploying it continuously. Talk about a leap to the 21st century.

For me, the best thing in kickstarting the open-source culture has been the excitement surpassing department boundaries. People from customer service, marketing, and sales have been working towards better open-source activity from the first day with our developers creating inspiring things. At first, some of the developers were a bit intimidated to work under a public eye but quickly overcame it.

Given our internal cultural success and clients growing interested in our efforts, we don't see any notable downsides from jumping the open-source bandwagon. That doesn't mean those downsides wouldn't exist, but that's another story for the future.

Go ahead, open some of your projects into the public where suitable. The risk is worth taking.

<small>Photo by Markus Winkler on Unsplash.</small>
