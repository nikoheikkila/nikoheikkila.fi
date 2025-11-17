---
title: Uncertainty-Driven Project Development
author: Niko Heikkilä
lang: en
excerpt: Embrace the known unknowns
type: post
date: 2022-02-12
hero: https://r2.nikoheikkila.fi/uncertainty-driven-project-development.jpg
---

In the modern world struck by [volatility, uncertainty, complexity, and ambiguity][vuca] we are still pushed to estimate our work accurately. Some say estimating is stressful and counter-productive. Some say it's essential for tracking the team's progress. There is an alternative parallel universe way of working, forcing you to refine and split your work to decrease the feedback loops.

Categorising and prioritising planned work by uncertainty is a practical skill I learned from a product owner I worked with. We didn't waste time throwing around story points or hours for estimation in that project. Instead, we meticulously assessed how risky moving forward with a proposed change is. In agile software development, it's crucial to understand the consequences of your actions so you can react and correct the course as fast as possible.

The technique I use is relatively simple. I like to map uncertainties on two levels: **business and technical uncertainty**. I refer to these in T-shirt sizes from XS to XL because they are usually more helpful than arbitrary numbers. The levels are as follows.

## Technical Uncertainty

-   **XS:** nothing to plan here, add or remove code to implement the change
-   **S:** minimal planning is required; otherwise, the change is still straightforward
-   **M:** reserve several hours of planning to find the best way forward, experiment with potential solutions, and throw away the prototypes
-   **L:** reserve a full day of planning and realise the change is too risky to implement without breaking it into smaller pieces (user stories)
-   **XL:** instantly reject the change and require further refinement and splitting

## Business Uncertainty

-   **XS:** the change greatly helps our users, and we have concrete data to prove it
-   **S:** we feel the change does good for our users, and we have good—yet imperfect data—to prove it
-   **M:** we are unsure about the outcome, but we have enough data to move on with our prototypes
-   **L:** we would like to have this feature in the future, but we don't have any data to prove whether it's needed now, so let's play the _YAGNI (You Ain't Gonna Need It)_ card
-   **XL:** Eddie from the marketing department called and said that we need this huge feature, but they couldn't explain why so let's leave it off the backlog (sorry, Eddie!)

You may wonder where do you find this mythical data to back up the claims whether a change is risky or not. The simplest way to gather data is to set up a proper CI/CD pipeline enabling continuous A/B testing in production. Doing so decreases the feedback loop in your decision making, thus eliminating the uncertainty.

If you want to know whether your users benefit from something or not, deploy the change _now_ — and roll back if it was a wrong decision. There is an only effective way of agile software development called [DevOps][devops].

## Prioritisation

Assuming you now have two metrics describing relative uncertainty, how do you use these two together? A fruitful way is to use a whiteboard.

An entertaining exercise in teams is to write down the planned features and ideas on post-it notes. Then we draw four quadrants according to how high the uncertainty is from a technical and business perspective. Next, have each proposed feature placed into one of the quadrants. You should now see a rough picture of what you _can_ make vs what you _should_ make next.

Prioritising work using the uncertainty quadrant is swift.

### Low Technical Uncertainty & Low Business Uncertainty

These features are smooth to implement, and we need them. Therefore, we place them on top of the backlog.

### High Technical Uncertainty & Low Business Uncertainty

These features are needed, but technically they might be challenging to implement due to, e.g. bad architecture, incompetent design, or rampant technical debt. In the latter case, make sure to allocate time for refactoring and rewriting parts of the codebase to decrease technical uncertainty.

### Low Technical Uncertainty & High Business Uncertainty

These tend to happen in greenfield projects where the codebase is fresh, yet stakeholders fight for their unique vision of the minimum marketable product. Consider these low priorities until business uncertainty is decreased through better analysis and refinement actions.

### High Technical Uncertainty & High Business Uncertainty

These features don't fit well in our product vision or current tech stack, but they could probably be part of another product. Leave these out altogether.

## Next Steps

With the priority laid out for all to see, it should now be easier to pick the next most important feature to work on. Then aggressively slice the feature into the smallest possible stories and work on them with the whole team keeping the team's inventory (work-in-progress) as low as possible. Once you get familiar with this technique, guesstimating with story points begins to feel like an ancient practice akin to writing programs on punch cards.

[vuca]: https://en.wikipedia.org/wiki/Volatility,_uncertainty,_complexity_and_ambiguity
[devops]: /blog/dev-ops-is-the-interface-your-organisation-implements-it/
