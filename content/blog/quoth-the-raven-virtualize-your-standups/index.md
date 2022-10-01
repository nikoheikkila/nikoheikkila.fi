---
lang: en
author: Niko Heikkilä
date: 2020-03-21
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/quoth-the-raven-virtualize-your-standups.jpg
title: Quoth the Raven, Virtualize Your Stand-Ups
type: post
excerpt: How asynchronous communication drives success in the time of Coronavirus
categories:
    - productivity
    - agile
    - communication
    - bots
---

Every agile software development team, whether practising Scrum, Kanban, or something in between as a core methodology, needs to share their progress. [Daily meetings](https://www.agilealliance.org/glossary/daily-meeting/), commonly referred to as *stand-ups* have proved themselves to be an effective form of talking out the accomplishments and issues with the team daily.

As a development lead, I'm burdened with the glorious purpose of making sure my team can move forward as fast as they want. That means making all the vital information available to everyone when needed and ensuring no one is blocked of doing the work for too long.

Kudos to people behind the **Basecamp** platform for publishing their [guide to internal communication](https://basecamp.com/guides/how-we-communicate). Having read it, I started thinking about all our meetings anew. It didn't take long for me to realize that every aspect of our team's communication can be improved. The most striking discovery was…

> "Speaking only helps who’s in the room, writing helps everyone."

Up until last year, we used to gather in a big circle of 5–10 participants within the office space to answer the three standup questions. What did I do yesterday, what will I do today, and do I have any urgent issues to share.

This works on a bare minimum level, but eventually, I started feeling the nausea of being a prisoner on parole. I would need to detach from my flow to arrive the meeting on time, remember in detail what everyone said, tell my side of the story, and be able to recall that information later. The painful realization was, I had begun failing in all of these. What a great way to lead with example, eh?

Repeat after me: **The circle only helps the people in it, disbanding the circle helps everyone.**

## Five Reasons to Avoid Circles

Physical standup circles are ineffective for a myriad of reasons. To mention but a few, these include:

-   **Higher risk of forgetting.** Before and during the meeting, each participant must recall what they did yesterday and plan what they would be doing today. This reserves the majority of the brain capacity leaving little to no room for listening. Unless you're among the first people to speak, there's a considerable risk that you had forgotten what the people before you spoke. Eventually, everyone forgets what others said after an hour or so.
-   **Time wasted standing.** When people need to gather around in a circle, someone will always be late even if the standup meeting was scheduled in the calendar. Since effective teams want to minimize the information loss, they usually can't start the session before everyone is present. Casual chit-chat has its place, but there are far better times for it than right before the standup.
-   **Remote hostility.** If part of your team works outside the office, you either have to exclude them or bring in a full video meeting to carry out the ordinary 15-minute session. This is a massive waste since you have to plug in a conference speaker and a microphone for everyone to be able to communicate. Furthermore, people working in different timezones won't likely attend a standup at 10 AM, which in their timezone could be as late as 8 PM.
-   **Environmental distractions.** Many of the teams work in a single room, which means they can shut the door to have a meeting. However, other teams working from open office spaces have to hunt for a free meeting room or submit themselves to distractions from people walking by getting coffee and talking. Being distracted by noises almost every time messes up what you were going to say.
-   **Invites the wrong kind of discussion.** You would likely disagree with me here stating that managers catching up with your team during the standup is a great benefit, but I assure you it is harmful. Too often have I seen product people innocently smuggling themselves into a standup circle, not keeping their mouth shut. Since product people are righteously interested in the progress of their team shipping new features, all stand-ups with them turn into status meetings. It bears repeating that stand-ups are a way for agile teams to synchronize their work and not report to management – that is for the team lead to deliver when asked.

## Make It Asynchronous

Initially, we started dropping out of these meetings and instead wrote our reports in the chat. This worked fine, especially for remote people for a few weeks, but sometimes we were either sunken in a flow state of mind or taking care of other things, so we forgot to fill the report.

Being a person with severe absent-mindedness who hates bossing people, I didn't want to start reminding the team to do it. A neutral participant was required but asking such from another group would have been weird. We didn't need a human alarm clock, we needed machines!

Since we use **Mattermost** – an on-premise alternative to **Slack** – the selection of tools was radically limited. Fortunately, one of our administrators introduced me to an open-source bot called [**Standup Raven**](https://standup-raven.github.io/). I was instantly bought by the idea and started configuring it for our team.

Every day at 8 AM from Monday to Friday (you don't work weekends, do you), the raven reminds – or croaks – everyone to fill in their standup. Around 9:30, the raven gently reminds those who haven't done their part. This frees up our valuable time since data is pulled from everyone in parallel when they choose. Effectiveness is also improved since people can look up their notes for the work they have accomplished (you are keeping a daily bullet journal, aren't you).

![Standup Raven in Action](https://github.com/standup-raven/standup-raven/blob/master/docs/assets/images/standup.gif?raw=true)

When the clock hits 10, the raven posts a consolidated standup report from all our team members as a single message to our public developer channel. The team can instantly react and comment on this post if someone should happen to be blocked on their work or clarification is needed. Furthermore, the product people should be delighted to receive this information without asking for it.

Having delegated organizing stand-ups to the raven, I can start the day by writing myself a personal agenda which I attempt to stick with until the end of the day. Thanks to flexible working hours, I can check my agenda in the afternoon and decide if the day is done. No more standing in circles and stressing the loss of information when the communication flows smoothly between all the right people. If someone asks me what we have been doing for the last couple of days, I can point them to our channel and instruct them to use the `/standup` slash command which fetches the standup report for any given day in the past.

Needless to emphasize, the raven became an instant hit in our team, and we have been happily using it for several weeks. For me, the idea of circling around in a small room sounds like a silly ritual carried out by natives in ancient times. Modern software development has no place for ceremonies.

![Standup Report Visualized](https://github.com/standup-raven/standup-raven/raw/master/docs/assets/images/user_aggregated_report.png)

## Do It, Do It Now!

Virtual stand-ups are a natural trait when working from home, and during the ongoing *COVID-19* pandemic everyone able should be working from home. If you are still working in the office, please don't gather around speaking face-to-face to each other in a circle spreading germs like stray dogs.

Take this idea of arranging a virtual standup to your team lead or Scrum Master, and start exercising it. The increase in saved time and productivity yields significant results.
