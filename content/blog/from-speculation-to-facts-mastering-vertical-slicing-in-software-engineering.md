---
title: From Speculation to Facts – Mastering Vertical Slicing in Software Engineering
author: Niko Heikkilä
lang: en
excerpt: Exploring the paradigm shift from speculative to factual communication in software engineering. Using vertical slicing, teams deliver better software sooner, gaining insights from early user feedback increasing the probability of the overall project success.
type: post
categories: [agile, software, engineering]
date: 2025-03-02
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/from-speculation-to-facts-mastering-vertical-slicing-in-software-engineering.jpg
---

## Benefits of Small Batches and Vertical Slicing

When capturing and writing down the work we need to do, we often add it to our designated issue-tracking system. In agile terminology, we usually call the written artefact a user story, describing what our users need and suggesting solutions.

Unfortunately, with all the suggested solutions, user stories also act as fertile ground for communication failures, which grow exponentially the more we discuss (speculate). Thus, to work with facts, we must deliver the first batch swiftly to learn and establish factual observations about our work. We can only deliver batches sooner if those batches are small.

The first rule in slicing the work into small batches is to understand the direction of slicing. It's tempting to slice horizontally instead of vertically because it comes naturally to us.

A typical software product will likely consist of cloud infrastructure, backend logic, messaging protocols, and user interfaces. These components form our technology stack, which we are about to slice. If we slice the stack horizontally, we begin our work from the user interface or cloud infrastructure and fully implement it before moving to other parts of the stack. While we test our work, we substitute the other unfinished components with so-called test doubles to gain confidence in how our component integrates with other components.

Working with horizontal slices is especially attractive because we build teams from specialists in different areas. This creates a reinforcing cycle: we structure teams around specialities, which encourages horizontal slicing, which further entrenches specialised silos.

What could go wrong if the experts in frontend, backend, and cloud engineering form a team, each reserving one slice to work on themselves in isolation from the rest? Almost everything. The structure determines the communication patterns, and the communication patterns determine the delivery outcomes.

It is typical for frontend engineers to develop their user interfaces by coupling those with components that talk to some nonexistent API. Meanwhile, backend engineers add logic returning arbitrary data structures as responses from the API above. Finally, a cloud engineer writes infrastructure code to build delivery pipelines, networks, databases and API gateways with the best tooling in the market without understanding the minimum required resources to help the rest of the team progress.

Horizontal slicing is an attractive yet dangerous path that can ultimately manifest in delays and, in some cases, even destroy your business' profitability. To prevent this, many agile experts recommend changing the direction of slicing from horizontal to vertical.

Reflecting on the example above, the team must **work together on the entire technology stack** to make the vertical slicing work. This exposes the team to two inevitable and hard-to-swallow facts:

1. You cannot deliver quality outcomes as promised when working in isolation.
2. You must be comfortable working with the entire technology stack.

Yes, this requires investment in both technical and soft skills. Learning to satisfy the two rules above takes time and creates short-term productivity dips. However, the long-term acceleration in throughput and quality from eliminating cross-team handoffs and speculation far outweighs this initial cost.

Becoming a T-shaped (deep in one area but competent across many) professional is worth the effort. Yet, it doesn't mean everyone becomes an expert in everything, which is an impossible and counterproductive goal. Instead, it means building enough shared knowledge that handoffs and specialists don't block the work and aren't isolated from the consequences of their decisions. For example, the frontend developer who understands database query performance likely makes different UI choices. The backend developer who understands frontend design concerns will likely design different APIs. These cross-disciplinary insights produce better outcomes than strict specialisation ever could.

These statements are hard to swallow because many people I've worked with strongly object to them. To them, being able to work in isolation for extensive periods of so-called deep work is mandatory to enjoy the work. These people are also comfortable becoming excellent in a single part of the technology stack rather than adept at many.

Thus, here comes my hot take: In _modern software engineering_ — a phrase proudly stolen from [a book](https://www.amazon.com/Modern-Software-Engineering-Discipline-Development/dp/0137314914) with the same title by **Dave Farley** — the discipline of software engineering is defined by empirical, feedback-driven approaches rather than plan-driven ones. It places learning and adaptability at its core, treating software development as a design and discovery process rather than a construction project. Within this paradigm, you cannot proclaim to be a top engineering talent on the market if you object to these truths because they form the foundation of effective discovery and learning.

The best software engineers work synchronously with other team members to master their learning. They are comfortable using the entire technology stack to manage the essential complexity of product development, regardless of the business domain. The best software engineers possess many other traits to deliver better software sooner, but that's a topic for another post.

Theory without practice rarely convinces sceptics. So, let's move from principles to a concrete example that illustrates both the mechanics and benefits of vertical slicing.

## Example: Managing User Profiles

When slicing down the work, I've found it helpful to pay close attention to the acceptance criteria, or rather _criterion_. We should keep refining the user story until the criteria is a single sentence and no one on the team can no longer simplify it. Such a pernickety way of eliminating speculation requires high communication skills.

I've seen many user stories that capture the discussion directly into the acceptance criteria using a style similar to the example below:

**As a customer, I want to manage my profile settings to keep my personal information current.**

Where the acceptance criteria state that:

1. Customers can view all current profile information on a single page.
2. Customers can edit their name, email, phone number, and address.

This is a user story of typical size, although I've seen tremendously larger ones. However, this does not change the fact that this story is difficult to estimate and will be delivered late due to the baked-in assumptions and speculation. I strongly advise against using story points to estimate the story's complexity, but if you still want to do that, be aware that this story is a lot more than a single point.

To manage the inherent complexity, let's break it down into several vertical slices and deliver those individually.

### Slice 1: As a customer, I want to view my profile information to verify what data the service stores about me.

**Acceptance criteria:**
Customers can view their profile information on a single page.

To implement this, when the customer visits the new page, we fetch their profile information from a database via the backend API, return it to the user interface, and render it as a simple read-only form respecting different accessibility requirements. If the customer wishes to change something, we display a note advising them to contact support by email.

Even this simple slice delivers business value. It reduces support calls about stored data, gives users transparency, and establishes the foundation for self-service account management while teaching us how users interact with profile information before we invest in editing capabilities.

This is already a large slice with more speculation and assumptions than we like, so we must deliver this to production to gain feedback and learn about the next slice.

Note how I advise deploying to production since, in my experience, it's the best way to gain honest feedback from actual users. Sometimes, you cannot do this for reasons, and you must set up a staging environment displaying fake user data and gain feedback from an internal "user" group. While this can work for you in many contexts, it is an inferior approach to genuine user feedback in a real production environment.

Deliver to and test in production whenever possible. Yes, that includes Fridays as well. Of course, you should apply this principle within your context: a medical device company could approach this differently than a content website. The key is to minimise the gap between completion and feedback, whether that means actual production deployment or sophisticated preview environments. Whatever your industry constraints, shorten the distance between building and learning.

### Slice 2: As a customer, I want to update my name so that my profile displays my preferred name.

**Acceptance criteria:**
Customers can update their names on the profile page.

We spoke to our users and learned we are still on the right track. Thus, we make the first form input an editable text field and save the changes automatically. The rest of the fields are kept as read-only. We continue advising customers to contact support if they wish to change their email, phone number, or address.

The technical challenge is that we must now communicate the modified information from the user interface to the backend systems and cloud storage. From the user interface point of view, this procedure triggers when the input field loses focus.

If you only read the acceptance criteria, you might think this slice is inane to release on its own without working on other inputs, but at this point, we have already hauled in a lot of work, and we want to deliver stably and validate with customers. Thus, we deliver to production.

### Slice 3: As a customer, I want to update my email address to receive communications at my preferred address.

**Acceptance criteria:**
Customers can update their email address on the profile page.

Next, the second input is made editable. As a prudent team, we implement email address validation on the backend. Yet another technical challenge emerges. We must also send the customer a confirmation email to verify the new address, which requires integrating with an email provider.

At this point, due to several surprises, also known as emerging facts, during the development, we finally realised the value of splitting the work. Due to technical challenges, the size of this slice was more prominent than estimated. Still, as a seasoned team of full-stack experts, we delivered this into production within a reasonable time.

### Slice 4: As a customer, I want to update my phone number so you can contact me via my current number.

**Acceptance criteria:**
Customers can update their phone numbers on the profile page.

Next, we replace the third input with a telephone field. We add a two-part input capturing the country code and the rest of the number. Then, we add the necessary validation rules before spending significant time setting up an SMS integration to verify the new number using an automatically expiring verification code sent to the customer's phone. This, in turn, requires significant work in the API along with further user interface changes to acknowledge the user's verified phone number.

We couldn't foresee the time spent implementing this slice, so we are happy about the decision to split the work. Thus, we deliver to production.

### Slice 5: As a customer, I want to update my postal information so that my shipments arrive at the correct address.

**Acceptance criteria:**
Customer can save a new postal address into their profile.

Finally, we convert the last input in our scope to several inputs, including the street address, zip code, city, and country.

We need to publish this change as an event to an external subsystem keeping track of the customer shipping information, so another significant portion of time is spent setting up the required integration to an event publishing platform. We also realise we must communicate the customer's email and phone number using the same payload. Yet again, how fortunate it was for us to have split the work. Thus, we deliver to production.

### Revelations After Practising Vertical Slicing

Vertical slicing isn't just an engineering technique; it's also a business strategy.

Delivering incremental value creates multiple opportunities for the business to change direction without wasting development effort. After delivering the second slice, market research shows users care more about a different feature entirely.

With traditional approaches, you'd complete the entire profile feature before this discovery. With vertical slicing, you deliver value while allowing the business to pivot objectives. Aligning between engineering practices and business agility shows why companies embracing these approaches outperform their competitors in rapidly changing markets.

A common objection to vertical slicing is that it seems inefficient to revisit the same parts of the system repeatedly. Let's think about this for a minute. Is implementing the entire form at once faster than adding fields incrementally? This apparent inefficiency is an illusion. The reality is that each vertical slice forces early integration, reveals accidental complexities — like our SMS verification and event publishing requirements — and creates opportunities for course correction.

The seemingly efficient approach of building everything at once inevitably leads to longer integration periods, rework when assumptions prove incorrect, and the accumulation of technical debt from hastily patched solutions. Vertical slicing may require touching the same code areas multiple times, but each touch improves the system based on facts rather than speculation.

## Final Thoughts

In our example, by slicing the work from two lines of acceptance criteria to five small user stories, we see how easy it is for non-technical and technical people alike to underestimate the size of the work.

When communicating speculatively, we rarely have the full context, and our heads are full of unverified assumptions. In our example, it was easy to think that we were dealing with a modest single-page application displaying a single form with a handful of inputs. How difficult can it be to make editable by the customer, we ask? Why couldn't we deliver the whole large batch to users within a timeframe of a maximum of a couple of days? What an understatement.

To a layperson, the user interface is the heart of the application, but for people working daily with the product, it's merely the surface. In my experience, this is only one example of daily speculation. Different business domains have their respective blind spots that foster speculation. By slicing the work vertically into small batches, we eliminate speculation and replace it with proven factual evidence gathered from within the team and from the users while we work. This is impossible with large batches and waterfall-style engineering.

Why isn't everyone working in small batches? That is a good question. In my experience, somewhere in the past, people involved in software engineering established wrong defaults as their way of working. Specifically, the root cause of our problems with late delivery often points to the fallacy of parallelising work to be carried out in isolation, failing to communicate by succumbing to speculation, and ultimately missing essential learning opportunities uncovered by facing the facts.

This blog post should have convinced you to question those defaults. The change starts small. Pick your next feature and ask your team what the smallest vertical slice that delivers value is. Deliver it end-to-end, gather feedback, and observe how your understanding evolves. The compounding effect of this approach, from faster delivery to better products to happier teams, will make speculative communication feel just as outdated as the waterfall model. Your future self will thank you for making the switch.

Photo by <a href="https://unsplash.com/@biancablah?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Bianca Ackermann</a> on <a href="https://unsplash.com/photos/brown-bread-on-orange-table-dsrsjg-as-M?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
