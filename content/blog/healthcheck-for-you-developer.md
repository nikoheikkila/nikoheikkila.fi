---
title: Healthcheck for You, Developer
author: Niko Heikkilä
lang: en
excerpt: Research into AI coding and mental health made me ask why coding itself has never burned me out, and what healthy ways of working look like. Let's find out!
type: post
date: 2026-08-15
hero: https://r2.nikoheikkila.fi/healthcheck-for-you-developer.jpg
---

I was watching **Scott Tolinski's** [insightful video on Syntax][tolinski] about the negative mental health effects
developers experience while coding with AI. Measuring it against my own experience, I was surprised. I have never felt
that _coding_, with or without AI, takes a significant toll on my well-being.

While unreasonable client environments, toxic management, and multiple projects juggled at once have driven me close to
burning out, coding itself has always been a joy.

## Why the Joy Never Left Me

Why is that? I suspect it has a lot to do with the _Extreme Programming_ and _Continuous Delivery_ practices I adopted
aeons ago. You know, the ones the rest of the world is only now catching up with, now that AI has made them compulsory.

The way I work supports my well-being directly. In my team, we plan and slice the work to implement only what's
absolutely necessary. I test my work continuously. After each successful test I save my work as a
[micro-commit](/blog/a-practical-guide-to-micro-commits/). Then I push the changes and see whether the delivery
pipeline finds them releasable.

Indeed, I deliberately avoid long sessions based on complex and expensive plans, preferring to hand agents the smallest
possible increments to work on.

With my team, we refine user stories aggressively and proactively into [small vertical slices](/blog/from-speculation-to-facts-mastering-vertical-slicing-in-software-engineering/). When we
spot additional work, we estimate its importance and either defer it to a future story or drop it altogether. This
keeps the batch size reasonable, but everyone in the team can still understand and reason about the contents of
delivery.

Before AI, many people I've talked to used to work for several days without committing or testing their work.
Now they prompt for hours while neglecting the same steps. It seems to me little has been learned from the pre-AI days;
only the tools got more powerful. Hence, the suffering.

In the video, the interviewees describe burning the notorious midnight oil, spending as many tokens as possible,
neglecting other people, and skimping on sleep, to name but a few. These are all real dangers that can derail your
career in a matter of months if you don't pay attention.

The corporate world, where the target of AI adoption is to increase AI adoption — yet no one seems to criticise this at
all — is to blame here. So is the ruthless self-made entrepreneur spirit chasing the next big thing. If you can
complete a new feature in a fraction of the time with AI, it's natural to think you must assign yourself even more
work. You do not. Breaking out of the vicious circle of faith in infinite economic growth might be difficult, but its
benefits are remarkable. It is a topic we must discuss more in political and technological discourse.

I have urged people _not_ to work in this continuously straining factory-line environment, but I've been laughed
at for failing to see the massive improvements in GDP that AI brings forth. Guilty as charged. I don't see the
value in people ending up hospitalised after all-night prompting sessions. I'm no economist, but I dare say that's
not conducive to GDP, either.

Chances are your client or employer is less interested in your mental health than in the number of tokens you
have burned. In that case, it's your responsibility to stand up and act — by fixing yourself first.

## A Checklist for the Fatigued

When the tools we use grow more potent at both destroying and improving us, it's crucial to build healthy processes and
ways of working. Below is a simple checklist to go through in case you're feeling fatigued or long for the joy of coding
to return.

1. Sleep at least eight hours each night.
   Everything below in the list is moot if you fail at this.
2. Keep drinking water and eat small meals throughout the day.
3. Ensure proper ventilation in your (home) office.
4. Exercise regularly. Strength training can be even more addictive than work.
5. Talk to people. I know remote work is great for its flexibility, but humans are not supposed to be antisocial hermits.
   Never glorify a solitary lifestyle.
6. When working on a feature, break it down into a small list of requirements, and guide the implementation with the
   [ZOMBIES](/blog/growing-software-guided-by-the-living-dead/) pattern.
7. Every time the work is ready to ship, pause, review, and... well, ship it. Typically, the delays with agents and
   remote pipelines scrutinising your work offer a decent window for taking a small break. When you work in small
   batches you can naturally take multiple small breaks throughout the day.
8. Once or twice a day, take at least a 30-minute break to walk around the house or office, or take a stroll in nature
   if possible. This tunes you out of the previous task and recalibrates your brain to the next one.

**Disclaimer:** These tips work for me, and they _might_ work for you. However, none of the above is intended as medical advice,
so contact a medical professional if issues persist. Doctors are there for you. Use their services!

An additional recommendation I would follow is to limit the total weekly hours to 30.
The [largest four-day-week trial to date][nature], covering nearly 3,000 workers across 141 organisations and cut to 32 hours
with no drop in pay, found substantial gains in well-being and no decline in how productive people rated themselves. An
[Austrian study of a compressed four-day schedule][taylor-francis] saw fatigue and time pressure fall while perceived
productivity held steady, even though the total hours stayed the same.

Still, it's an unfortunate reality that today's economy is still steered by people who mistakenly think that putting in
more hours yields better productivity and profit. If you are an entrepreneur with a sustainable hourly rate, though,
what are you waiting for?

In the end, knowledge work is a long-distance run, not a sprint. The methods allowing us to work more sustainably
without affecting our mental or physical health will always outrank any notion of increased short-term productivity.
I think you can't really argue with that from any position.

---

Photo by <a href="https://unsplash.com/@nikkotations?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nikko Macaspac</a> on <a href="https://unsplash.com/photos/photo-of-person-reach-out-above-the-water-6SNbWyFwuhk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

[tolinski]: https://www.youtube.com/watch?v=iPUn1Fnfn0k
[nature]: https://www.nature.com/articles/s41562-025-02259-6
[taylor-francis]: https://www.tandfonline.com/doi/full/10.1080/1359432X.2024.2379061#abstract
