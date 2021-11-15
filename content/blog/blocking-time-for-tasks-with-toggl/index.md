---
title: Blocking Time for Tasks with Toggl
author: Niko Heikkilä
lang: en
excerpt: How organizing your day brings a sense of clarity and calm into this mad, mad world.
type: post
categories: [productivity, tools, opensource, golang]
date: 2021-03-20
hero: https://f001.backblazeb2.com/file/nikoheikkila-fi/Blog/blocking-time-for-tasks-with-toggl.jpg
---

For people doing mainly project work, planning daily tasks is a constant struggle, which can cause severe issues with productivity and mental well-being.

As a software developer with multiple projects on my daily schedule, I used to waddle in a sea of chaos. Attempting to swim and survive throughout my days impacted my work in many ways. The loss of context made it difficult to focus on tasks, which caused my productivity to halt and gave a diminishing sense of accomplishment in return.

Furthermore, when I needed to recall what I had been doing on a given day, I had to resort to checking my browsing history. As you might guess, it had little relevance to what I had worked. Daily standup meetings mainly were a burden where I was supposed to figure out what I did yesterday and what shall I do today. Similarly, the reported hours contained some time to this project and some time to that.

The technique of surviving with simple to-do lists — where **Todoist** is still the king — I had learned previously was suitable for single-project environments. There I could split my days between writing and reviewing code in one domain. It didn't scale at all for multiple sequential tasks. Fortunately, later on, I discovered the magnificent technique called [_time blocking_](https://todoist.com/productivity-methods/time-blocking), where every minute of the day is given a purpose.

Let me tell you how.

## Basics of Time Blocking

Time blocking means saving time for important -- not necessarily urgent -- tasks in your calendar. With your chosen tool, start by dividing a day into slices and decide **one and only one theme** you're working on during a particular time block.

Don't worry. With time blocking, you get to keep your regular breaks and days off. This post is not one of those foolish blurbs hailing 60+ hour work weeks and waking up 4:30 every day to solve productivity issues.

After dividing your days into slices, your day might look a bit like in the picture below. Note that the themes are only examples, and I usually write those down precisely to help me later recall what I worked on.

![Time blocking example sketch](https://f001.backblazeb2.com/file/nikoheikkila-fi/timeblocking.png)

## How Do I Split the Day?

My typical day is as follows. Due to the dynamic nature of my profession, some variations may occur, but mostly it's easy to stick with the plan.

### From Morning to Noon

I start working between 8–9 in the morning and sketch my time blocks for the day. Next, I begin responding to urgent stuff like emails and messages before clearing out the path for focusing on tasks. Then I grab a few planned tasks and complete them at my own pace.

After the first round of intensive focus, I attend a daily standup with my team. Here I leverage the time blocks from yesterday and today while explaining my status and possible blockers. If any meetings have been invited, they are usually held around mid-day.

### Lunch Break / Time Off

With the first half of the day completed, I allow myself to take a decent amount of time off eating, drinking and relaxing. Together with the daily shutdown, it's one of the most important events of the day, and you shouldn't skip it.

### From Noon to Afternoon

When I return to focus work, I then go over the pending code reviews or help team members debugging issues. This kind of work fits my afternoon mental state as most of the urgent stuff has already been done and now there's time to shine some creative light.

To call it a day, I begin slowing the pace down around 16–17 and make note of all the tasks I've achieved. Shutting down at regular times is essential for the mind to function correctly.

## Toggl Track to the Rescue

I first tried using traditional paper and the **Remarkable** tablet for time blocking, but having my schedules tied to one device quickly drove me to use [**Toggl Track**](https://track.toggl.com). It comes with excellent desktop, mobile, and web apps allowing me to access and edit my schedule from virtually anywhere. I don't use Toggl's flagship timer feature that much. The very intention of time blocking is to plan and control my time spent instead of spontaneous tracking.

Toggl web app has a nifty calendar view which is ideal for drawing blocks of time with a mouse and marking them to specific projects. You can also extend it with your calendar. I've hooked my Google work calendar into it, which allows me to duplicate each calendar event as a time block. Fun fact: when you're involved in a project with all-day meetings the time-blocking is automatically there, but it will hurt you in other ways.

## Why Command-Line? Why Not?

However, one thing I was missing from Toggl was a performant terminal app. So, as a hobby project and because my current employer sponsors the personal time spent in open-source, I started writing one. Enter [**Hours**](https://github.com/nikoheikkila/hours). It's a lightweight, single-binary, open-source terminal companion for Toggl written in **Go**. At the moment, Hours ships the following features:

-   listing the saved time entries in various formats using the public Toggl API
-   styling the plain text output with `termenv`
-   converting the output to Markdown, JSON, and CSV allowing you to post-process data with other scripts

Fortunately, the Toggl API is convenient to work with and I've been delighted how easy it is to marshal Go structures to JSON and vice versa. Thus, more features are definitely on the roadmap. I'm thinking of implementing features such as starting and stopping timers without forgetting the basic time entry CRUD operations (create, read, update, and delete). Since **Hours** is still in the very early stages of development, you can help me improve it!

## Conclusion

Blocking time ensures I can complete essential tasks while still reacting to urgent tasks. Having a clear daily plan helps me to recall individual days back to mind. I can also enjoy the rewarding sensation of accomplishing tasks. Most importantly, it helps me to stay away from unnecessary distractions. By the way, I don't have any desktop or web notifications enabled while working, so deal with it. Naturally, time blocking can't eliminate all the stress that a busy world with many projects brings forth, but it guarantees continuous calmness throughout the day.

Throw me with a message if you need help organizing your day with time blocking.

_Photo by **Aron Visuals** on Unsplash_
