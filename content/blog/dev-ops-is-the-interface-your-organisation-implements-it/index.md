---
title: DevOps Is the Interface, Your Organisation Implements It
author: Niko Heikkilä
lang: en
excerpt: Once upon a time, two software companies were competing in the same business domain. The first one has been out of business for a while now. The latter one thrives.
type: post
categories: [devops, agile, scrum, management]
date: 2022-01-01
hero: https://f001.backblazeb2.com/file/nikoheikkila-fi/Blog/dev-ops-is-the-interface-your-organisation-implements-it.jpg
---

## Long Time Ago in a Software Company, Far Far Away

The product management learns about a speculative need for the **Feature** that will help the company increase their cash flow. Then, they write a formal product card and hand it to the department responsible for service and user experience design.

Together with a team of business analysts, UX and service designers gather the requirements forming a rough vision and user flow for the Feature. Then, they create a new business epic for Jira, fill it with acceptance criteria, and hand it off to software architects.

Architects decide what changes to the existing architecture are required to implement the Feature. At the same time, while in the flow, they even decide upfront how to implement the Feature. They create one or more user stories to Jira, append technical details to acceptance criteria, and handoff those to the software developers.

Software developers led by a tech lead humbly accept the stories. They split the stories into multiple small subtasks and let everyone pick their favourite task to work on. After each developer has completed their task, they hand it off to another developer for code review. Finally, after days of arduous isolated development and arguments regarding code quality, the distinct feature branches are merged. The Feature is considered complete and developers hand the stories off to QA specialists for testing.

QA specialists accept the incoming stories and read the included acceptance criteria. They then request the IT department to install the untested versions of the application into the centralised QA environment. After a brief wait, they can start performing manual functional tests to the stories. Some of the stories pass tests, but some fail. The QA specialists file a pile of bug reports and handoff failed stories back to developers for necessary fixes.

Finally, after days of rigorous testing, the Feature is again considered complete as it passes all the tests. Next, QA specialists ask the developers to package a new release, which developers happily do before requesting the IT department install the latest release to the production servers.

The IT department schedules a new release to go live during a future release window in a few weeks. Unfortunately, new packages do not perfectly install to the existing servers, and the IT department has to invent subtle workarounds to get the applications working. Finally, after several long hours and some downtime, the application is live.

However, by following the metrics and user traffic, the company realises the changes are not exactly what the users wanted. The developers implemented the flow differently than it was designed because they felt their version made better sense than what was initially designed. Developers are not to blame because they did write their decision to Jira, but unfortunately, no one understood their technical jargon well enough to catch the issues early.

The product management has been putting together the tragic war stories from different teams. None of the representatives of their respective silos is taking any responsibility for the poorly delivered Feature. Stakeholders are unhappy when they sum together the wasted money and blame the inefficient product management. The financial numbers for the past quarter are lower than ever, there are no bonuses on sight, and the people are chastened for underperforming. Many people attend excruciating performance review discussions, ultimately resigning and hoping to find a better career elsewhere.

## Meanwhile at The DevOps Company

Following the competitors, the market, and business trends, the product management learns about a need for the **Feature** that will help them engage and satisfy their users better, eventually producing a greater cash flow. First, they create a draft of the design document, briefly highlighting the business need. Then, they invite relevant available people from designers to developers to deliver the Feature.

Designers and developers form the **Mob** to collaborate closely on the Feature. They evolve the Feature together, working only on a single task at a time. Acceptance and unit tests are written before the production code, and for each pushed change, the CI/CD pipeline deploys the tested changes to a canary production server, which serves a small portion of the userbase.

The Mob verifies the changes work in the canary environment as intended while closely monitoring the technical and business metrics. Finally, the Mob agrees from the metrics that the changes do good for their users, and they decide to release for the whole userbase.

The product management team has followed the transparent delivery process from start to finish and is happy to declare good results for business stakeholders. People enjoy their well-earned bonuses. The joy is only topped by the extremely satisfactory quality of work everyone in the company is doing. The recruitment pipeline is burning hot because people are lining up to work on an outstanding product and culture.

---

Can you now see why you can't implement DevOps by hiring one or more DevOps engineers or investing in new tools like _Kubernetes_? The best way to become a DevOps organisation is to create a fast and transparent end-to-end delivery process and sustainable people-first culture to support it.
