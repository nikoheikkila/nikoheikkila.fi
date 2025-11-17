---
title: Five Essential Pointers for Improving Your Product and Process Quality
author: Niko Heikkilä
lang: en
excerpt: Recently, I finished an excellent cooperation gig with a client. While my main tasks were focused on helping them design and develop their digital service, I wouldn't be a great consultant if I would just silently fade away on the last day of my contract.
type: post
date: 2023-10-14
hero: https://r2.nikoheikkila.fi/five-essential-pointers-for-improving-your-product-and-process-quality.jpg
---

One technique of ensuring my work will be remembered is giving back professional pointers on how the client can improve the quality of their product and process after I'm gone.

If you have been following my posts, these are familiar pieces of advice. If not, then you're in for some serious diamonds.

## 1. Focus on decreasing the work-in-progress count

Among other things, keeping everyone 100 % utilised on their tasks weakens the knowledge transfer, slows down inter-team communication, delays crucial code reviews, allows for more defects to pass through, and eventually hinders users' trust towards us.

Like many businesses, we are often afraid of situations where everyone is not working on something meaningful and try to address it by creating more work to do. Instead of focusing on idle hands, remember to concentrate on a steady flow of value from idea to production.

It's advisable to establish relevant KPI metrics to monitor this. For example, suitable candidates are:

-   *Lead time* — how long does a user request (ticket) take to be delivered?
-   *Throughput* — how many tickets can a team deliver in time?
-   *Wait-to-processing ratio* — how much of its measured lead time does the ticket spend waiting for processing rather than being processed?

See what is possible to measure in your chosen issue tracker software and consider implementing it. One good option is to place strict WIP limits on the Kanban board. If a WIP limit is hit, the team must focus on finishing existing work instead of starting new. Stop starting and start finishing!

## 2. Refrain from placing too much trust in asynchronous code review

Reviewing code after it has been written is often too late to enable building quality.

Too often, the code review resembles scraping off ash to reveal the edible parts of a pizza after it has been burnt to a crisp in the oven. Instead, attempt to work synchronously and favour continuous or as frequent as possible code review. The optimal size of a pull request is one line of code reviewed immediately as it's being written.[^1]

## 3. Work in the smallest feasible batches.

Whenever possible — ideally daily — try to deliver the tiniest feasible batch of changes to production. The smaller the batch you deploy, the easier to reason what went wrong in case of a production incident.

Often, we mistakenly think it's optional to release if there are only a couple of trivial changes to deploy. However, establishing a culture of rapid deployment frequency yields many benefits. The most well-known are more robust process automation, reduced business risk, and decreased team stress.

## 4. Test with accurate production data

Note that this doesn't mean testing in the production environment, although that's more than a viable option under many circumstances.

Consider how to have an exact or as-exact-as-possible replica of production data in the staging environment so you can verify new changes confidently. It's embarrassing to find a defect in production that could have been fixed earlier in the process had there been more realistic data.

This also applies to automated tests: often, it's an excellent option to provide test data for simple unit test behaviours with libraries such as Faker, but also remember to cover acceptable behaviour with realistic data.

## 5. Only fix a bug after first reproducing it with a test

It's very tempting in a high-pressure hotfix situation to analyse the root cause of a bug, fire up a debugger, fix the leak, and ship it. However, the most crucial step of the process is defining proper reproduction steps as an automated test.

The workflow is deceptively simple:

-   Write a test exposing the bug.
-   See the test fail.
-   Change the code to fix the defect.
-   See the test pass.
-   Enjoy proof that future changes are protected against the bug reappearing.

This is test-driven development (TDD) at its most straightforward and works in feature development and bug fixing. Yes, you might feel that you don't have time to write a test now, but do you have that time later when you need to fix the same bug again after it has reappeared? Most likely not.

[^1]: A popular quote by **Dragan Stepanović** on how large pull requests should be.

---

Photo by [Choi Sungwoo](https://unsplash.com/@beancurd?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/person-pouring-coffee-on-coffee-cup-XiyR0BXRIsI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
