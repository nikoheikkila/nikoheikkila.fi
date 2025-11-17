---
title: Five Best Talks from DevTernity 2021
author: Niko Heikkilä
lang: en
excerpt: No agile bullshit bingo nor marketing talks.
type: post
date: 2022-03-12
hero: https://r2.nikoheikkila.fi/five-best-talks-from-dev-ternity-2021.jpg
---

The promise on [**DevTernity**](https://devternity.com) conference homepage is to turn developers into architects and engineering leaders. A bold mission, which many major players in the thought leadership business would find a formidable challenge to overcome.

Then again, they advertise to be in the top 3 among international software development conferences, so perhaps the said goal is indeed a reality and not merely a fantasy.

To myself, the most significant aspect of DevTernity setting it apart from other conferences is how it focuses on the craft itself. Organizers promise you won't find _agile bullshit bingo_ or marketing talks here—those are not permitted. Whereas many other technology conferences attach themselves to a specific tech, as in frameworks, libraries, and cloud platforms—obviously for marketing purposes—DevTernity aims to deliver a longer-lasting experience with a vast speaker and knowledge portfolio. Browsing the 2021 catering, I found talks about software architecture, continuous delivery, soft skills, agile practices, and many more.

The conference took place remotely via Zoom in December of 2021 due to the pandemic. Despite that, organizers did solid work across all three tracks connecting the audience with the speakers through Slack. As a result, the experience was nearly as good as attending a live conference.

As a visitor, I've had the pleasure to watch the raw and unpolished recordings and pick five favourites of mine. Here's what I chose (in no particular order).

**Don't trust only on my words. Click on the talk titles to watch the recordings.**

---

## [Kevlin Henney – Decremental Development](https://www.youtube.com/watch?v=Wv4NBpB53Bg)

How do you increment value through developing decrementally?

Following Henney's train of thought, small is beautiful: a fact that applies in many things — software development above all. We, as developers, have a pervasive habit of creating more complex solutions than what is necessary. You've seen this in effect in all those situations where we raise the YAGNI card to the discussion.

All our development efforts should begin from the statement that the best code is the one that does not exist. Don't write more code if you can solve the problem in any other way. Having a minimum amount of code is also the cheapest to maintain.

What does not exist cannot kill you as it is also effectively invulnerable to exploits. I've found this especially relevant lately when we've been tracking and mitigating all the suffering in the wake of **#Log4j** vulnerability.

In my line of work, there is a pervasive possibility of reducing our solutions to their minimal functional versions. We can do this by enforcing the correct number of tests and refactoring (decrementing) our solution until no more elements are removed. What is left is the most uncomplicated design we can muster.

## [Allen Holub – War Is Peace, Freedom Is Slavery, Ignorance Is Strength, Scrum Is Agile](https://www.youtube.com/watch?v=41CES2sNPxs)

One of the most thought-provoking talks in the event came from Allen Holub explaining how Agile (with a _capital_ A) has suffered from excess productization.

The first thing many agile practitioners find controversial is the title of the talk: Scrum that coaches have been selling to you may not be agile at all. Instead, Scrum is to agile what training wheels are to a bicycle. You can't package agility to a boxed process, move it to a new environment, and expect it to work.

We are undermining the best parts of agile by attaching it to frameworks, attempting to scale it, adding redundant bureaucracy, and ultimately selling it as a product. The true heart of agile lies not in selling better thinking inside a gift wrap but in teaching and mentoring teams to radically think and act differently.

It's not agile when communicating our work across convoluted boards and spreadsheets. Why not just use a (virtual) whiteboard with sticky notes on it? Agile Manifesto taught us to focus on _individuals and interactions_, not configure **Jira**.

It is not agile when certifications lure us into thinking there's only one way of doing agile by the book, yet that's as far from the truth as one can imagine. There's a fundamental flaw in our industry that makes us chase certificates, which in the end do not necessarily make us any more agile.

It is not agile when we attempt to convert our waterfall process to massive user stories that we split into unnecessarily fine-grained subtasks and roll story points with dice. Likewise, it is not agile when we prophesize our long-term product development in roadmaps. A more apt analogy would be a sea chart, which gives us room to adjust our direction when we see fit.

Finally, Holub gives us a precious tip. The word _agile_ translates to nimble, flexible, or fast. It's an adjective, not a noun. If you can't substitute agile with these adjectives in your text, you're probably doing it wrong.

## [Anton Keks – The World Needs Full-Stack Craftspeople](https://www.youtube.com/watch?v=ipKw9hB2_bM)

Over-specialization of talent has led us to divide our craft between many professionals. As a result, for a significant amount of time, there has been an ever-ongoing battle between developers whose job is to change things and system admins whose job is to keep things running stable.

Developers have split into the frontend, backend, _Android_, _iOS_ and whatnot developers. Outside development teams in many companies, you can find database administrators, network specialists, testing specialists, and white-hat hackers.

The single responsibility principle works well with code but poorly with people. Too many specialists (one-trick ponies) leads us to suffer from inflated teams, low truck factor, and expensive value delivery. As a result, toxic conflicts emerge between people who _know_ best.

Furthermore, it's not easy to inherit code built by a team of specialists. Finally, I speak of those who like to point the finger at other developers:

> Can you tell me what this module does?
> – Oh, you have to ask them. I didn't write this code.

Granted, it's not their fault as the root cause lies in poor management, where the ideal of practical software development is to build a team of specialists, trickle tasks evenly, and merge the results. Effective on paper, but trouble in practice.

Keks offers generalists, polyglots, full-stack developers, and software craftspeople as an answer. These people understand that the whole team is responsible for building and running the product with collective code ownership. If you still seek those mythical **10x developers**, you shall find them here.

A generalist developer with a wide array of fundamental skills can be orders of magnitude more effective than a narrowly skilled specialist. Generalists also tend to know what to leave from the solution, thus providing faster and more consistent delivery.

Building a team of generalists is challenging in environments where we favour projects over products. What is the worst that can happen if we very quickly build a specialist team and disband it before the actual results are harvested? Depending on the project duration, forming, storming, and even norming may happen. What about performing?

In the long run, your product is most likely doomed without a single generalist who cares about long-term maintainability. It is the curse of our business that, in the short term, we can still earn good profit by delivering wrong results inefficiently. That is where our mentality has to change the most.

## [Robert Martin – The Craftsman's Oath](https://www.youtube.com/watch?v=nM-0gfFvT-k)

I always enjoy watching Uncle Bob share wisdom, and their talk about developer responsibilities was no exception.

If we date the genesis of software to the year 1936 when **Alan Turing** published their famous paper _On Computable Numbers, with an Application to the Entscheidungsproblem_ and draw the line to the present day, we notice that the number of _computers_ and _programmers_ has grown incomprehensible. Software has become an everyday commodity that should be easier than ever to produce with speed and safety.

Still, today we struggle to produce quality software mainly because we are eager to ignore disciplined software engineering processes. Here, the term "we" refers to a horde of energetic and undisciplined young men who started occupying programmer positions during the 1970s, desperately needing management. One can only wonder what the software development world would be like if women still occupied most developer positions.

Harmful software can take our job, money, and even life in the worst case without strict adherence to quality. As of today, there is no way to live without software; a significant disaster is waiting to happen. Fortunately, we can still mitigate the worst by following Martin's oath.

The oath in 10 commandments is published in Martin's latest book _Clean Craftsmanship: Disciplines, Standards, and Ethics_. A brief version of it is as follows:

1. I will not produce harmful code.
2. The code that I produce will always be my best work.
3. I will produce, with each release, a quick, sure, and repeatable proof that every element of the code works as it should.
4. I will make frequent, small releases so that I do not impede the progress of others.
5. I will fearlessly and relentlessly improve my creations at every opportunity.
6. I will do all that I can to keep the productivity of myself and others as high as possible.
7. I will continuously ensure that others can cover for me and that I can cover for them.
8. I will produce estimates that are honest both in magnitude and precision.
9. I will respect my fellow programmer's ethics.
10. I will never stop learning and improving my craft.

Naturally, the most crucial promise is hippocratic first. No matter what software you are developing, ensure it inflicts no harm to others.

## [David Neal – Leadership Guide for the Reluctant Leader](https://www.youtube.com/watch?v=3PcL8UkorEg)

_Note the linked recording above is from 2019, but the same concepts still apply._

According to David Neal, there are two common misconceptions about leadership. Firstly, leadership is not only for managers but also for you all. Secondly, leadership is not about being in charge; it's about having influence.

I would add that the most crucial type of leadership is how you lead yourself. Doing it well enables me to lead others, too.

I found the talk resonated with me because I felt stuck at one point in my career, more or less. I had become a task ninja, a to-do-machine who shared little about anything between tasks and projects. So I had to try changing that. Then I noticed that great things began to happen when I led myself to:

-   joining online communities
-   attending meetups and conferences
-   mentoring and teaching other people
-   supporting my team in their high and low days
-   writing about what I had learned
-   contributing to open-source software

The initial stress faded away when I realized I wasn't good\* at this kind of activity, but I still kept doing it. So yes, even now, my every post is a more or less unpolished stream of thought, but I keep doing it.

People have asked me how long it takes to write a new post. I usually say it takes 15–30 minutes with a few rounds of edits included. In the past, it took significantly longer. Today, I rarely rewrite something entirely because I'm afraid to publish it. Instead, I share my unique experience. Not everything is golden, but at least 10% of my total posts should contain some nuggets of wisdom to someone. What matters is just publishing, which is not the same as talking before thinking.

Human beings are designed to coexist with each other. Therefore, the more we isolate, the less we can shine. We always need to bring our best awesomeness forward. I remember Jeff "Coding Horror" Atwood once saying:

> "Better to embrace _the suck_ and do it in public."

Neal wants to remind us that we don't suck. We're awesome. So, all we need to do is share our awesomeness with others. We don't need anyone's permission to do that.

Thanks, David, for heartful and encouraging thoughts and amazing drawings in your DevTernity 2021 talk!

_\*) that's just my inner impostor talking; disregard that._

---

At the time of writing this post, the organizers have already published a number of speakers and the date (8–9 December) for the DevTernity 2022 conference, which I will likely attend as well.
