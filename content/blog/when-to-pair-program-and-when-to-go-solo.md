---
title: When to Pair Program and When to Go Solo
author: Niko Heikkilä
lang: en
excerpt: Despite all the praise pair programming gets, it is not a silver bullet and we should carefully practise it to get the most benefit from it.
type: post
categories: [pairprogramming, mobbing, collaboration, books]
date: 2021-05-23
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/when-to-pair-program-and-when-to-go-solo.jpg
---

I recently finished reading [*Practical Remote Pair Programming* by **Adrian Bolboacă**](https://www.goodreads.com/book/show/57518328-practical-remote-pair-programming). In the description, the author promises to teach you the structure, organisation, communication, and tools for making (remote) pair programming successful in your (distributed) team.

Pair programming is complicated. Despite that, I've been practising and advocating it for a while, trying to build solid habits around it. Thus, the book naturally caught my eye. Besides, today most of the programming work is remote, making the book a timely publication.

In addition to describing when and how pair programming works to speed up your delivery process, it is crucial to understand situations where it might only slow you down. In this post, I will go over these situations briefly. However, I warmly recommend reading the book as well for complete insights.

---

**Disclaimer:** I will use the term _pairing_ a lot in this post in place of pair programming. Many pairing techniques also apply to _mobbing_ (mob programming), which means working in groups of three or more people. For beginners, I recommend starting in pairs and moving on to mobs after a while. In some texts, you might also stumble upon the term _ensemble programming_, a friendlier name for mobbing. After all, we are not here to smack down the code like an angry mob, even though programming can be frustrating at times.

---

## The (Not-)Obvious Benefits of Pairing

Trying to convince your team to take on pairing can be even more challenging than programming in pairs itself. In this section, I will tell how and why pairing can make us better developers.

### Pairing Is Mentoring

When I began to build software for a living, I was introduced to new projects, their conventions and other ways of working through pairing. I'm eternally grateful to all my colleagues who have paired with me.

The pairing has allowed me to grow orders of magnitude faster than being thrown to survive in a project alone because pairing is a pure form of mentoring. After a while, I too began pairing with new hires passing forth all the knowledge I had gained.

As in martial arts, those with a higher rank are responsible for teaching others with a lower rank. Pairing is all about this. Therefore, the best pairs are often junior-senior pairs. The junior is ideally a new hire or otherwise unknown to the codebase or domain. Pairing with someone on your level can work, too, although it involves less mentoring and growing.

The next time your team gets a new member, do not only throw entry-level tasks at them — pair with them, instead.

### Pairing Is a Learning Tool

Like many others, I started my career studying computer science in study groups. The fundamental programming classes I attended always involved exercises. Often we would solve the given problems together, sitting next to the same computer sharing the same keyboard.

In the book, the author references the four levels of knowledge related to a concept known as _staff liquidity_. These describe the skills you possess about the current system or parts of it. They are as follows.

1. _"I know nothing!"_ (beginner)
2. _"I can run it"_ (intermediate)
3. _"I can tweak and fix bugs"_ (advanced)
4. _"I **own** it!"_ (master)

Although you typically climb these levels independently with occasional support from your team, the journey towards mastery is fastest travelled by pairing. When you pair to learn, you will develop a solid understanding of the system, enabling you to redesign or refactor it faster and safer than working alone.

The next time you need to learn a complex system or domain to manage it, pair with the one who knows it best.

### Pairing Is Sharing Knowledge

The more we work alone, the more we gather silent knowledge about the inner workings of our code. It's inefficient and time-consuming to share knowledge only through documentation despite its importance for product longevity. We can conveniently build shared conventions about developing the product through pairing without having to sit in meetings or glance at massive pull requests.

A well-established technique is to form pairs from people working with different parts of the system. For example, a back-end developer should pair with the front-end developer working with requests to the back-end interfaces. Successfully applying pairing techniques will tear down the invisible walls in your team.

Note, however, that the shared knowledge should also be written down. Otherwise, it is only silent knowledge in your and your pair's heads.

### Pairing Is a Social Event

Developers come in all sorts of flavours. Some like to do focus work being buried under music from noise-cancelling headphones. In contrast, others enjoy the company of their peers and have a chance to brainstorm complex problems together.

I belong to the latter group. In fact, I often feel more stressed and anxious when working alone. These feelings have also begun to intensify during the pandemic. Being isolated in continuous long stretches has made my performance significantly weaker. Thus, I need social programming to live and thrive.

Pairing and mobbing (style of pairing with three or more people) can also happen in social events organised within a community. Hackathons are a prominent example. If the employees are suffering from isolation, organising a community event is a beautiful way to build up the spirit and see new innovations grow.

In the book, there is a fascinating anecdote about the social aspect of pairing:

> "During a community event that I was facilitating, while the programmers were pairing, **a CEO appeared**. He heard about this event and he was curious what was going on. Nobody had any idea about his role, and he joined, paired, and discussed just like any other attendee. Only after the event did I find out that he wasn't really a programmer."

Pairing is not only for developers. You can pair with designers, testers, product owners, managers and even your CEO under some circumstances. What value does your solution have if you can't explain it to your CEO, anyway?

## Common Mistakes Made While Pairing

By now, you most likely noticed that you have tried pairing at least once, whether it was during your studies or junior years.

The unfortunate fact is that many of us stop pairing at some point. We might blame bad prior experiences or incompetent managers who think that features are done fastest when everyone is working independently.

It cannot be denied that pairing does not mean eating cake and drinking champagne from golden carafes all day. Hence, avoid these common mistakes.

### You Should Be Pairing All Day

Pairing all day every day can make you exhausted and emotionally zapped at the end of the day. I can usually last no longer than two hours talking and writing code at the same time. Then I need to rest for at least 15 minutes to ease the fatigue. Continuously keeping up a pace like this will more than likely grind our wellbeing and drop our interest in pairing.

Doing the devil's math shows that we can split the average day of eight hours to a maximum of three to four extended sessions with short breaks in between. On paper, this sounds efficient, but it quickly proves as wasteful as any approach where developers are fully utilised. Remember, 100 % utilisation is a parking lot – or an express lane to sick leave.

It's better to start by pairing for 25-30 minutes straight (in total 1-2 hours daily), pausing briefly, and rotating roles before carrying on. If the task is finished, you can rotate pairs before starting a new task. I recommend you download a **Pomodoro application** or use any suitable timer to keep track of time. Rotating often keeps the spirit up as you are not stuck working with the same partner repeatedly.

Efficiently managing the time spent in the pairing will eventually make you less and less tired while you get used to this new way of working. From there on, you can increase the amount of pairing slowly. I have found out that I can roughly keep on pairing 75 % of the day. The rest 25 % I reserve for a slack time where I learn, research, or work independently. Your perfect percentage may vary, but don't let it creep towards 100 %.

### Pairing in Hostile or Unknown Waters

While pairing, we need to bounce ideas back and forth when trying to develop optimal solutions. Inevitably some of our clever ideas can sound utterly crazy or prove ineffective right after saying them.

Therefore, pairing requires a psychologically safe space where you are not laughed at no matter what you say. Without psychological safety, you cannot bring forth your best ideas. In the worst case, you might end up silently following what others say, effectively reducing the pair to a solo effort.

If there are any tensions within your team, you should resolve those first before starting to pair. Suppose no one in the group knows the other person, as is sometimes the case in fast-paced consultancy projects. In that case, you should wait until the team has passed its forming phase and is comfortable working as a unit.

If the whole development organisation is on fire and people hate working with each other, then... well, just hand over your resignation.

### Expecting a Formal Code Review After Pairing

Some developers accustomed to the ways of working in highly bureaucratic, process-oriented, and hierarchical cultures adamantly state that pairing is no substitute for a formal code review. It is further reasoned by saying that a third person with *fresh eyes* is supposed to catch all the mistakes you and your pair have made.

In these situations, ask how the third developer — who has no context or deep understanding of the problem at hand — could review the solution any better? Asynchronous ways of working have instilled the notion that we must always invite an outsider to scan our code. Contrary, the code review is most useful coming from peers who understand the context and problem. They are your pairs.

Suppose we have a process demanding an external code review despite pairing. In the worst case, you first have to wait for the third developer to detach from their current task. Then they suffer through all the negative impacts of context switching before studying the code you have written. Finally, they present you their often flawed feedback before switching back to their previous task again. This drastically reduces the team's throughput and increases your lead times.

Instead, try pairing in a continuous delivery mindset. Design, implement, review, test, and finally deploy your solution. Then make a (virtual) high-five, grab coffees, and move on to the next task. I've efficiently completed user stories with tens of subtasks without creating significant defects in a day or two doing so.

### Pairing With Unclear Requirements

When your team has no clear understanding of the problem or the domain, pairing is not fruitful. You will likely end up staring at a task description — often phrased verbatim by the client or product owner — with open mouths for a couple of minutes before moving on to an easier task.

Fortunately, pairing is not always about programming because solving problems is not always about writing code either. You can pair with your product owner or team lead and together write high-quality requirements.

### Pairing with Bad Coding Practices

Pairing is ineffective when tight schedules force your team to cut corners daily, resulting in technical debt. After deciding to improve the codebase quality, you can slowly start slicing through the legacy cruft and refactor the code in pairs.

## Practical Tips Before Starting Pairing

This section shall briefly describe small tricks that have helped me whether pairing remotely or in the office.

### Use Ensemble Commits

During pairing, we usually share the same codebase, which means that version control tools cannot accurately determine who has done what. It is not always crucial to attribute commits to specific authors. After all, the team should have _collective ownership_ of the solution. However, it is a good practice to give credit where it is due.

This can be done with a technique called *ensemble commits*, in which you simply write the name and email of your pair in the commit message footer. See the example below.

```plain
feat(api): add a new route '/films' for fetching IMDb data

// optional longer description here

Co-authored-by: Steve McQueen <kingofcool@gmail.com>
```

Not all source control providers display this information correctly. However, [**GitHub**](https://docs.github.com/en/github/committing-changes-to-your-project/creating-and-editing-commits/creating-a-commit-with-multiple-authors) favours this approach when specifying multiple authors. It is a great way to give credit to your pair. It also helps other developers to see who should they ask about this commit later.

### Assign Roles

Besides writing informative commit messages, make sure to commit early and often. You can also assign roles — minding the rotation — while pairing. Test-driven development while pairing is particularly effective when the other developer is unfamiliar with solid testing practices.

In TDD pairs, the other developer writes a failing test. The other developer follows by writing the code to make the test pass. After a passing test, save the game by committing and proceed to refactor the solution. After the code is clean enough and the test is still passing, commit again. Eventually, you may squash the commits together if needed before pushing.

### Use a Proper IDE

This is a matter of taste, but for myself, tools like _JetBrains' Code With Me_ and _Microsoft's Visual Studio Live Share_ are among the best pairing tools. You can also share a terminal session through a multiplexer like `tmux`. Still, I would avoid this unless my pair is perfectly comfortable swimming in the terminal and using a terminal editor like _Emacs_ or _Vim_.

I have found Visual Studio Live Share the best tool for my pairing sessions. Most of the time, I share my local environment through the remote port forwarding feature. Doing so allows my pair to navigate to the same `http://localhost:<port>` address and see the live development environment. I can also share access to my terminal when pairing, which helps them to see what commands I use in my development flow. All this is done with few clicks, and it makes remote pairing almost as frictionless as sitting together.

While IDEs are geared towards remote pairing, they also work locally, given an ideal network setup and low latencies. For many, it's uncomfortable to share a keyboard (feel the germs! 🦠). Sharing an environment between two or more laptops is the better option.

### Share the Screen for Context

Nevertheless, do not rely solely on your IDE because sometimes you need to show your pair the precise situation. Especially when working on front-end tasks, make sure you're sharing the right browser tab so your team can see what is happening.

Platforms we typically use for remote meetings like _Google Meet_, _Zoom_, and _Microsoft Teams_ are viable choices.

### Invest in the Equipment

Make sure you have a decent webcam, headphones and microphone available when pairing.

Never, ever use your laptop's built-in microphone and speakers. The sound of your typing and the echo of your pairs voice will severely distract their thoughts and abruptly thrash the experience. The book walks an extra mile describing different high-end podcasting setups with proper mic stands and pop filters. Still, you can make do with affordable headsets as long as they are not the cheapest earbuds. A good rule of thumb for headphones is to try them out while pairing for an hour. If your ears hurt, change the headphones.

You don't always need to have your webcam on. Sometimes it can make pairing feel more personal, but not everyone is comfortable with having cameras on all the time. Discuss this with your pair if needed before your first session. If you choose to have your webcam on, adjust the lighting so you don't end up looking like a black silhouette in front of bright daylight. Shut down any backlight sources and turn on a front light – not too bright – to make your face more visible.

### Ensure a Stable Network Connection

Sloppy connection causes your voice to stutter or become robotic, which is a distraction. However, you don't need 1 GB optic fibre for pairing. As long as you make sure the connection is stable, latencies are low, and there's enough extra bandwidth for audio and video. The rest of the family should not be watching too much Netflix in the other room.

If you're using Wi-Fi, move as close to the router as comfortable. Plugin the Ethernet cable whenever you can. If the current task does not require using a VPN connection or other proxies, disable them.

## Should I Pair?

In this post, I outlined many benefits, pitfalls and practical tips to ease your journey into pairing. However, the critical question is: when should I pair?

It is not always easy to decide. In my experience, there are specific tasks that are often better solo. These include but are not limited to:

-   deploying builds and running scripts
-   documenting existing features and writing simple instructions
-   checking if a reported bug can be reproduced
-   doing mundane and routine tasks, which should be automated, anyway

For all other tasks that require levelling knowledge, learning new concepts, or solving challenging problems, the answer is often *yes*. You should always be ready to pair.

If you need more help to get started with pairing, read the book. You can also contact me for coaching. Let us make the development world better by working together.

---

Photo by **Nathan Dumlao** on [Unsplash](https://unsplash.com/photos/QMhc3D_zwJ0).
