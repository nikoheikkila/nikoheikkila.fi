---
lang: en
author: Niko Heikkilä
date: 2020-02-11
cover: cover.jpg
title: 'Being a Good Developer: Six Tips for a Painless Code Review'
type: post
excerpt: Walk another mile and make the code review a joyful experience.
categories:
  - opensource
  - git
  - programming
  - codequality
---

A fair amount of the discussion around practising great code reviews concerns the reviewer and how they can be more effective at their work. However, that's only one side of the coin. Having participated in hundreds of code reviews both as a team member and an open-source contributor, I can't stress enough the importance and value of being the other side - the helpful developer.

Imagine yourself throwing a bulk change of **1000 lines of code** without explanation at your teammates or the maintainer of the project. You quickly notice that they don't want to review your code. Thus the pull request is left hanging in a limbo. To make matters worse, the reviewers focus on the wrong things. Furthermore, reviewers are exhausted with longer code reviews losing their focus and becoming distracted more easily. This leads to decreased code quality even though the reviewer would usually be at the top of their game.

What should you, as a developer, do to help your reviewer? Here are my six tips for getting your code through a better review.

## 1. Split the Changes by Concern

The first and easiest tip is to limit the scope of your pull requests by areas of concern. Part of your work can likely be integrated into the codebase independently without breaking anything, so why not have it reviewed independently as well? Defects are much easier to spot from small batches and merges with atomic changes are painless to revert if needed.

If you work on a feature that adds complex logic to your ORM models responsible for fetching rows from the database, finish this pull request by writing tests, and then hand it for review. After finishing with this task, push the changes to the controller calling this logic as a new pull request. The first changeset may even be deployed to production safely as it's not  part of the public API at the time.

Development teams following **Scrum** or **Kanban** methodologies are already familiar with grooming and splitting the user stories from the backlog to multiple small subtasks. Even then splitting the subtask to multiple pull requests can be useful. Furthermore, if the feature involves changes to several repositories, as is the custom in a microservices oriented architecture, it's the only way.

Pull request based workflow requires the use of multiple feature branches, so don't go too far on splitting the changes lest you find yourself in the middle of a rampant merge conflict problem.

## 2. Don't Wait Until You're Finished

Depending on the platform used you can prefix your pull request titles with `WIP:` or use similarly named labels to mark these changes are not yet ready for merging. Another option is to use the pull request drafting feature in GitHub.

After opening the draft, ask for feedback, then move on. Iteratively continue writing more code in small batches and have it reviewed. When you are satisfied with the final changes, lift the pull request from its draft state, and it passes much quicker.

Even if you split your changes to multiple pull requests as advised earlier, you can save precious working hours by ensuring you're going to the right direction by using drafts. This also encourages the practice of writing small commits which you can push more often to the repository. Everyone wins. You can always squash your commits for more cohesive version history right before merging so don't worry about leaving behind a mess.

## 3. Invite the Right People to Review

If you have written a fresh new algorithm for solving a computational problem, then have it reviewed by someone who genuinely cares and knows about code performance and the Big-O notation. Don't mix anyone with impeccable CSS grid skills with this one because they serve you better when you're designing those fancy new UI changes later.

This works if your team consists of developers with a particular set of skills. Some teams might consist of so-called generalist developers (*jacks of all trades*) in which case you have more room for asking a review.

Sometimes inviting more than one person to review can be useful. Changes to e.g. APIs handling sensitive data require additional attention for security details.

## 4. Make Uncertain Changes Visible

If you're not convinced that a particular change is needed or could be implemented better, drop a comment to the specific line explaining your train of thought as detailed as possible. It helps the reviewer to spot these while skimming through the code, and there's already an open thread inviting for more discussion.

I use this method for dropping comments explaining why I made this change, but you should strive for self-documenting code whose intent is clear to even yourself after years have passed. Nevertheless, facilitating discussion with open threads is a valuable initiative if you need to highlight anything that should stand out from other changes.

## 5. Link the Pull Request With the Board

If your project is tracking a Kanban flow in an external tracker like Jira or Trello, use a dedicated plugin or include a link to the relevant card. You should write this on the pull request title, description, or in the body of your commit message. No one wants to start reviewing a stray pull request drifting amidst the waves disconnected from known feature requests and bugs.

For open-source contributions, linking the pull request to an open issue is an excellent way of raising awareness and inviting more people to review.

## 6. Not Communicating Is Not An Option

Be prepared to sit down with your reviewer either in the same room or through a video chat. When more and more questions arise, you don't want to have the discussion bouncing back and forth between you two without ever speaking face-to-face.

I have positioned myself with my team so that I only have to tilt my head to ask for clarification where needed. While working from home, I can send them an instant message or even give a phone call if the matter is super urgent (it rarely is).

I've seen asynchronous code review in action between two people sitting in the same room both wearing their noise-cancelling headphones. Don't be afraid to tap your teammate on the shoulder and ask for guidance. The cost of momentarily disturbing their flow is small comparing to the gain of having your question answered directly. But don't make a habit out of it.

***

<small>Photo by Alvaro Reyes on Unsplash.</small>
