---
title: "Clean Frontend Architecture with SvelteKit: Preface"
author: Niko Heikkilä
lang: en
excerpt: A practical guide for craftspeople seeking to avoid the most common pitfalls when designing modern frontend applications.
type: post
categories: [guides, frontend, architecture, design]
date: 2023-01-28
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

Long gone in the past[^1] are websites that purely displayed static, seldom changing content to visitors. Today, almost all user interfaces are _web applications_ instead of _websites_.

A web application, judging by how it is seen, is an interactive website reacting to user events and updating its views dynamically. We are so comfortable building them, but do we know what they mean for a software engineer?

It means we must _design_ the applications. However, I'm not talking about the service, user experience, or user interface design that consultancy shops often sell. Instead, I'm referring to any maintainable application's internal design and architecture. Without good design, the potentially profitable application is doomed to become increasingly more expensive to change.

> _"By legacy code, I mean profitable code that we feel afraid to change."_ — [**J. B. Rainsberger**](https://blog.thecodewhisperer.com/permalink/surviving-legacy-code-with-golden-master-and-sampling)

What does such a design entail to prevent an application from becoming legacy, you ask? Arguably, the most prominent clean design patterns are [**Hexagonal Architecture**](https://alistair.cockburn.us/hexagonal-architecture/) by **Alistair Cockburn** and [**Clean Architecture**](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by **Robert C. Martin** (Uncle Bob). As an enlightening primer to this guide, I recommend reading both articles.

In essence, clean design is independent of technology decisions and external side effects. Therefore, you should be able to craft a clean design with or without the application framework. It means the framework does not dictate your design. On the contrary, clean design allows you to postpone most technological choices until the last responsible moment.

Functional programming enthusiasts know that when our design is free of side effects, it becomes reasonable, predictable and testable. All the given inputs map to their respective expected outputs, and we can formally define and compose our use cases from functions free of side effects.

However, a clean design does not require a software engineer to have PhD in mathematical analysis and functional programming, although it might help. Clean design only requires writing clean code, which is irrelevant to your chosen paradigm. Clean code is perfectly doable by mixing object-oriented[^2], imperative, and functional paradigms — this is where purists stop reading the guide in nausea.

As a software engineer, I witness the following chain of problems regularly in myself and others:

-   Developers like writing code because it's a creative and fulfilling activity.
-   Developers dislike design because it's time-consuming.
-   Design is time-consuming because it takes time to master, and there are not enough accessible guides.
-   Consuming time is equal to wasting precious resources.
-   Stakeholders don't want developers to waste resources; they should ship features instead.
-   Shipping features without clean design equals constantly accumulating technical debt and paying back only the interest.
-   Developers dislike contributing to a legacy codebase with high technical debt.
-   Ultimately, developers resign or rotate to another project.

I cannot fix the world, but I have a particular set of skills that can alleviate the pain above. Hence, I've written this guide on clean frontend[^3] design and architecture. It should ignite a spark in you to start your learning journey so that one day you could be proud of the clean software you've produced and never too afraid to change it.

## Table of Contents

1. [**Discovering the Use Cases**][part1]
2. **Handling the External Dependencies with Gateways**
3. **Domain Modelling**
4. **Server-Side Routes and Components**
5. **Acceptance Tests**
6. **Deploying the Site to Netlify**

## How to Read the Guide?

For this guide, I have constructed a cleanly architectured frontend application with Svelte and [**SvelteKit**](https://kit.svelte.dev/). Therefore, you only need to be comfortable reading TypeScript code in this [repository](https://github.com/nikoheikkila/photo-browser). Then, you may clone the repository and play with it as much as necessary to gain a better understanding.

As the saying goes, the software is never finished. Therefore, I reserve the right to modify the contents of this guide and the example codebase accordingly. Since I intend to keep both the guide and repository open-source, you can help me improve them. Moreover, all the pages contain an _Edit Page_ link in the footer, allowing you to open a pull request to submit your improvements.

## Up Next

In the [next post][part1], I will explain the purpose of defining use cases for a photo gallery application. If you have applied to a frontend developer position at [**Futurice**](https://futurice.com/careers), you might have encountered something similar during the recruitment process.

[^1]: In the past, but only so long until they decide to make a comeback.
[^2]: In clean object-oriented design, a class is nothing more than a collection of partially applied functions.
[^3]: Don't worry. Most of the content in this guide also applies to clean backend architecture.

[part1]: /blog/clean-frontend-architecture-with-sveltekit/discovering-the-use-cases/
