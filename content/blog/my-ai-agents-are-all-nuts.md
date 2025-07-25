---
title: My AI Agents Are All Nuts
author: Niko Heikkilä
lang: en
excerpt: A heartfelt defense to a provocation about AI-assisted programming.
type: post
categories: [ai, llm, agents]
date: 2025-06-10
hero: null
---

**Thomas Ptacek** published [this article](https://fly.io/blog/youre-all-nuts/) in the Fly.io company blog. You might ask why such a one-sided and belittling rant with plenty of toxic vitriol could be published in a business blog, but let's put that aside.

Instead, I'd like to address the blatant claims that AI sceptics—such as myself—have poor arguments. Like with any internet fight, a fair share of bad and good arguments exist. However, when it comes to AI, I've mostly seen the worse ones come from the proponent's side, with some exceptions. I find the article's condescending rap and its claims unsound.

Before reading forward, please read the above-linked article. I understand if you can't, as it's quite a dance of clever words and, as such, not very readable. Should you feel like it, please skip to the end of my article, where I introduce an exhaustive list of hopefully sane arguments informing you whether or not agentic programming is the miracle you've been looking for your entire career.

## What the Article Got Wrong While Advocating for AI

Let's break down the claims in the article.

The author begins by stating:

> LLMs can write a significant fraction of all the tedious code you'll ever need to write. And most code on most projects is tedious.

Tedious? Not really. As software engineers, we constantly learn and adapt new techniques by managing complexity and abstracting away the tedious parts. We rarely solve the same problem twice. That's what libraries are for. The dominant solution for this problem has long been frameworks and project templates, which spar you from writing boilerplate code.

Sure, some code is less enjoyable to write than others, but I seldom hope someone would come to write this logic for me. It might be because I don't write a lot of code. As a TDDer, I write only the minimal code to make my tests pass. Naturally, many others don't, and I regularly see them either write or copy huge chunks of code, then run their tests and wonder why their code broke. This, by the way, is precisely how agents work, too.

> But an LLM can be told to go refactor all your unit tests. An agent can occupy itself for hours putzing with your tests in a VM and come back later with a PR.

Just because it can doesn't mean it should. To effectively guide development, humans should be responsible for specifications through tests. If you allow the agent to "refactor" your unit tests and make them pass, you will most likely get something completely different than you requested. Many people tend to conflate refactoring with rewriting, so the agent trained on this false definition will likely go to "putz" around and replace your tests with something you will regret later.

Furthermore, this mindset is rooted in the fallacy that AI is an entity that can be left alone, just like we tend to leave our team's junior members alone to figure out a solution. Pair programming is a mandatory practice with juniors. AI is even more junior than most juniors; thus, we must always supervise it—no exceptions.

> You've always been responsible for what you merge to `main`. You were five years ago. And you are tomorrow, whether or not you use an LLM.

Yes, and we must also consider that agents are optimised to deliver more rather than less code. More code is always more challenging to review, and humans are terrible at code review. Review fatigue is an actual problem in our industry, and for most of us, it hits even after reviewing a handful of modified source files.

It doesn't take long from the first AI-generated pull requests to see how the slop introduces more and more defects. How do you like reviewing 10,000 lines of code generated by agents? Is it a better tradeoff than reviewing 500 lines of code written by a human? I don't think so.

Indeed, the `git blame` points to you. Do you really want to become the person who caused a business-wrecking production incident and then state how your solution was AI-generated for your defence? I think not.

> Reading other people's code is part of the job. If you can't metabolise the boring, repetitive code, an LLM generates: a skills issue! How are you handling the chaos human developers turn out on a deadline?

Yet again, AI-generated code is often quite different from AI code as it strives to deliver feature-complete solutions, whereas skilled software engineers always deliver deployable code in small batches. Reviewing human code is tremendously easier than AI code.

When I pair with humans, I continuously question the code we write. We debate and agree on the direction we are proceeding in, often ending up with higher quality. When I pair with an agent, I watch it generate a comprehensive solution. I then point out a single flaw, listen to its apologies, and watch as they trade in the bad current solution for a worse new solution, possibly throwing other unrelated pieces of logic into the mix.

> Agents lint. They compile and run tests. If their LLM invents a new function signature, the agent sees the error. They feed it back to the LLM, which says, "Oh, right, I totally made that up", and then tries again. You'll only notice this happening if you watch the chain of thought log your agent generates. Don't. This is why I like Zed's agent mode: it begs you to tab away and let it work, and pings you with a desktop notification when it's done.

Only if you tell them to lint, compile, and test.

Sure, when properly instructed, the agent may correct its course. However, the agent is also a cab driver without a license steering a NASCAR car along a busy street while taking the wrong turn nine out of ten times before ultimately crashing into a wall and congratulating themselves on winning the race.

Repeated corrections also cause them to burn all the tokens and hit API rate limits constantly. I find my work often disturbed when the context window either fills up or reaches a point where the agent's hallucination grows even more radical. The only solution is to start a new thread, losing essential work context.

What would you do when your agent cannot continue after hitting the usage limits? You may have left your computer for several hours only to find out that the agent had crashed to an error prematurely, and no value was delivered. As of yet, the agents, in all their promised omnipotence, can't call you to come and fix the issue.

Thus, it bears repeating: **Do not leave the agent without supervision**.

> Using agents well is both a skill and an engineering project all its own, of prompts, indices, and (especially) tooling. LLMs only produce shitty code if you let them.

The rule system does help up to a point. I've set up my own strict rules for them. Yet, it's always up to agents to respect the rules.

For example, Claude by Anthropic is notoriously bad at following the rules. Many agents are more than willing to bend and break under pressure. The more rules you impose on them, the less eagerly they obey you.

For example, I can tell the agent to aim for high test coverage through mutation testing, but somewhere along the way, it may give up after achieving an 80–90 % score, audaciously patting itself on the back for a good day's work. Hey, I asked for 100 %! You're a machine; you don't quit. You don't get tired. Leave that to humans and get back to work.

> Let's stop kidding ourselves about how good our human first cuts are.

On the contrary, these first stabs at solutions written by humans are often *good enough* since they represent our understanding of the problem that can still remain limited. We professional engineers work agilely, delivering the least amount of code, asking for feedback, and iterating until the problem is solved.

Agents, however, crank out the maximum amount of code, hallucinating additional aspects of the problem's very nature. What they come up with requires excessive editing insofar that inviting a human to rewrite it starts to feel like a compelling alternative.

> Do you like fine Japanese woodworking? All hand tools and sashimono joinery? Me too. Do it on your own time.

A significant attraction of software engineering is the constant development of our craft in the most creative ways. It keeps us energised until we retire. Working a job supervising agents throughout the day sounds incredibly dull and horrible.

Sure, the supervisor job is easy on paper, but is it fun? Controversially, our work should be fun. Telling people to settle as Taylorist factory line workers during office hours and save all the fun in their free time is as fresh an attitude as Fortran is for writing applications. When given an option, I doubt most people would sit 40 hours a week in front of a computer writing detailed implementation plans. Instead, it sounds like a dystopian scenario in an Isaac Asimov novel. I, for one, would rather migrate to Svalbard and become a fisherman.

If you're not convinced about what drives people forward, I recommend reading the [*Drive*](https://www.danpink.com/books/drive/) by **Daniel H. Pink** and specifically the role of purpose as an intrinsic motivator.

> As a mid-late career coder, I've come to appreciate mediocrity. You should be so lucky to have it flowing almost effortlessly from a tap. We all write mediocre code. Mediocre code: often fine. Not all code is equally important. Some code should be mediocre. Maximum effort on a random unit test? You're doing something wrong. Your team lead should correct you.

Mediocre code should not be confused with simple code. Improving the code until it's simple takes time. Writing mediocre slop is fast for humans and blazing fast for agents.

> And LLMs aren't mediocre on every axis. They almost certainly have a bigger bag of algorithmic tricks than you do: radix tries, topological sorts, graph reductions, and LDPC codes.

Yet, they have serious problems [solving a Hanoi Tower Puzzle](https://machinelearning.apple.com/research/illusion-of-thinking). I asked an agent to solve this puzzle and check its solution against tests. They came up with excess garbage, which technically worked but should have been replaced with a recursive solution. Perhaps that is the mediocre code that the author is after: garbage that barely works. Fine, but professional software engineers do not write such code.

> But I've been the first responder on an incident and fed 4o — not o4-mini, 4o — log transcripts, and watched it in seconds spot LVM metadata corruption issues on a host we've been complaining about for months. Am I better than an LLM agent at interrogating OpenSearch logs and Honeycomb traces? No. No, I am not.

Feeding error logs to AI is a game a hit and miss. Sometimes, you find a clue, and sometimes, the issue is so out of its reach that it sends you off on a wild goose chase where you waste hours testing and verifying every single one of the agent's leads.

Granted, a human could easily waste those same hours by themselves, but at least they wouldn't constantly be tricked by false promises. Imagine searching for an explanation for an error and then discovering hundreds of GitHub Issues that are, in fact, about a completely different problem than you're having. That's how it is with AI.

> But AI is also incredibly important — a word I use advisedly. It's getting the same kind of attention smartphones got in 2008, and not as much as the Internet. That seems about right.

Finally, here, we agree. AI is important in many ways, and that's why I—the nutty AI sceptic—use it daily and hope, though unlikely, contribute to its development with my findings.

As of writing this, the best use case for AI is to whip up a spike. An experimental and short-lived code sitting in a branch that you generate and validate to see if it's worth building upon. If it is, **you throw it away and build the production-grade solution by hand**. I'm ready to change my mind in the future, but the past three years haven't yet been quite successful at that. I leave my heart and mind open.
## All Right, All Right, Give Me Those Good Arguments

Whether you read the above counterarguments or skipped through here doesn't matter.

Here's a summarised list of everything that still requires improvement regarding agentic programming.

- Never take a rule for granted. Agents are more than willing to bend and break them.
- The more rules you impose on agents, the less they obey you. Talk about a robot uprising!
- Agents get stuck easily, retrying the wrong fix again and again.
- By default, agents touch every file and run every shell command unless you tell them not to. This is a hazardous risk.
- The code agents write for production and tests is incredibly bloated and complicated. To continue from that point would take a significant amount of time, converging towards net zero in productivity gains.
- Agents optimise for the number of lines delivered, which makes reviewing and maintaining their code risky and expensive.
- Agents fill their context window and burn through tokens faster than you realise. This leads to context-switching as you switch to a new thread, requiring an agent to relearn everything.
- Agents rapidly dispatch parallel API requests, often causing your computer to become rate-limited. This abruptly stops the flow since you must wait until the rate limits wear off.
- Most people won't throw away their AI-generated prototypes but continue to use them in production instead. We have witnessed this long before AI and will continue to witness it for the foreseeable future.
- Lastly, working with agents is far from fun. I acknowledge it might affect my overall opinion, but I stand behind it.

You can dismiss all my counterarguments by stating that AI is fast. It sure is, but ask yourself this: to what extent has it benefited you to have the fastest computer, mobile phone, or car at your disposal? Ultimately, we work as part of a system and all its constraints.

In closing, I'd like to ask you, dear reader, to take this list and provide reputable counterarguments to it—not childish rants about how I'm nuts, standing still, swimming against the tide, or being left behind. That is how we help AI become the genuine game changer influencers are selling it now.
