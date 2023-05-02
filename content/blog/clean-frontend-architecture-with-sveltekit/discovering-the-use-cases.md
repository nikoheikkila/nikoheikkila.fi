---
title: "Clean Frontend Architecture with SvelteKit: Discovering the Use Cases"
author: Niko Heikkilä
lang: en
excerpt: Why designing loosely coupled applications is crucial for managing complexity and sustaining maintainability.
type: post
categories: [guides, frontend, architecture, design]
date: 2023-01-29
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

The essence of software lies in the problems it helps us to solve. Software that doesn't offer a solution to the problem is only code for the joy of coding. What helps us to solve problems, then? Modelling the problem domain and formulating use cases from it.

Use-case-driven development extends **test-driven development** (TDD) and is crucial to **Hexagonal** and **Clean Architecture** patterns. We define the application's behaviour as one or more use cases, define formal acceptance tests for them, and fix the system until the tests are satisfied.

This involves testing the use cases rather than the implementation details. Let your tests traverse your design and invoke anything they need once the correct behaviour is verified. Writing tests on higher behavioural levels also helps the stakeholders to understand the tests. You especially want stakeholders to understand the importance of your tests, or how else can you sell the effort to write those?

Finally, use cases should remain pure from external side effects. Where the handling of side effects is necessary, special collaborator entities are helpful.

As I indicated in the last post, I'm about to build a photo-browsing application. What use cases would such an application contain? Let's find out.

## Browsing the Photo Gallery

I shall gather some hypothetical user stories for a small application visualising data from Typicode's RESTful JSON Placeholder API. The documentation for the API is [**here**](http://jsonplaceholder.typicode.com/).

By investigating the response from the `/photos` endpoint, I see that it lists many photos. Each photo consists of an ID, album ID, title, photo URL, and thumbnail URL. Optionally, the endpoint accepts a query parameter for limiting the number of photos. A single photo can be queried by specifying the ID as a route parameter via `/photos/:id`. All the photos belonging to the same album can be queried by specifying album ID as a route parameter via `/albums/:albumId/photos`.

The above is not an exhaustive list of what you can do with Typicode API, but for simplicity and to deliver value sooner, I practise aggressive scope limiting. With this knowledge, I have defined the following user stories.

> Do note that with a real-world product, you should define user stories by discussing with stakeholders instead of inspecting existing behaviour from an external service. Technical people defining the features they want to deliver without conversing with the right people is a great way to waste money.

**As a gallery visitor, I want to:**

-   browse a gallery of thumbnails on the landing page
-   view full-size photos
-   share links to my favourite photos
-   browse all the photos in an album
-   share links to my favourite albums

How does the above map to technical use cases?

**Given the stories above, I need to:**

-   load all the photos and thumbnails
-   load a single photo by ID
-   load a single album by ID
-   group photos by album ID

Additionally, I need to serve this data accessibly on a website — sorry, web application.

If necessary, take a moment to study the [**tests**](https://github.com/nikoheikkila/photo-browser/blob/main/tests/unit/PhotoBrowser.test.ts) and the [**implementation**](https://github.com/nikoheikkila/photo-browser/blob/main/src/lib/services/PhotoBrowser.ts) yourself before reading on.

---

To implement the above, I have defined a class `PhotoBrowser` with several use case methods. Some people prefer to utilise multiple classes with a single public handler for each use case. That is a viable approach, especially in event-driven messaging applications, but for the sake of demonstration, I've stayed within the bounds of a single service class. I can always come back later to refactor if I want to.

For each use case method, I invoke a collaborator class `APIGateway` injected as a constructor dependency. Through the gateway, I receive a list of records which I map to domain entities. I also validate the input parameters for loading photos and albums, as I don't want to abuse the Typicode API with known invalid inputs.

> Do note that I'm heavily using object-oriented design in this application because TypeScript facilitates it for me. However, the points stand as well for functional design. If you choose to follow functional programming paradigm, then instead of injecting dependencies via class constructors you would typically inject them via curried function parameters.

To group photos by album, I've written a [**utility function**](https://github.com/nikoheikkila/photo-browser/blob/main/src/lib/domain/Group.ts) taking a string key and an array of generic entities as inputs and returning an entity collection grouped by the said key. Unfortunately, at the time of writing this, Javascript doesn't yet offer a native grouping method for arrays[^1], but we can reasonably quickly write it as [a higher-order function](/blog/layman-s-guide-to-higher-order-functions/) using array reducing.

In case you're wondering, I'm not handling the rejected JavaScript promises in my asynchronous methods. I'll explain the purpose of that later. You might also wonder who is calling these use case handlers. Rest assured, I shall reveal it all to you in due time.

## Calculating the Photo Sizes

While developing the application, I noticed a curious detail. All the photos are square, and their width and height are present in URLs for full-size photos and its thumbnail. Therefore, I spiced up the use cases by including an additional one for parsing this information.

> **As a gallery visitor, I want to see the photos' exact width and height.**

I would expect the photo dimensions to be present in the JSON payload in a real-world use case. But, alas, I must do it myself. In the [implementation](https://github.com/nikoheikkila/photo-browser/blob/main/src/lib/services/PhotoCalculator.ts), for parsing the width and height, I extract the pathname of the `URL` object, match it against a regular expression, and parse the numeric data. If the result is not a number (`NaN`) or zero, I fall back to a default size that is close enough.

Granted, Photo Calculator is a slightly naive name for a service, but it's focused and honest about its intent. So, for example, if a new use case is discovered where I need to extract more details from a photo, I can rename the service or create a new one.

If, up to now, everything has felt deceptively simple, don't be surprised. The intention of use case handlers is to remain lightweight and summon the help of their collaborators. In my case, the service logic comprises domain logic and adapters. I will write more about those later.

## Testing the Use Cases

All the use case methods return meaningful values for assertion. I've also tested several known edge cases when a gateway returns invalid data. Thanks to smart design, testing the use cases is as simple as that. I duly apologise if you expected something else.

I will delve deeper into frontend testing later on in this guide.

## Why Software Design Matters

Let's stop here for a minute. Was I not supposed to develop a frontend application? How come I've only been tinkering with arbitrary service classes. Where is the UI, and where are the components? Why am I going this far? Why won't I simply set up some components and query the API there? Instead, it looks like I'm developing an arbitrary backend application.

Yes, that is precisely what I'm doing! This is where clean architecture and design come into play. Let me present you with two radical notions, which I hope you think are not that radical having finished this guide.

### All Frontend Applications Ship with a Backend

Firstly, the backend of my frontend application does not mean a separate project or anything conversing with, for example, a relational database. It merely represents a web application's business logic outside its _presentation and view layers_. These layers include everything the user sees and interacts with. The modern browser ecosystem comes with an endless amount of odd behaviour and edge cases. Therefore, testing the user interface is inherently error-prone, and the logic should be minimal.

The advice above has been repeated a lot by **Uncle Bob** in his seminal books _Clean Architecture_ (2017) and _Clean Craftsmanship_ (2021), but it bears repeating. Next, say after me: the database is a detail, the user interface is a detail, the network is a detail, and the filesystem is a detail. I shall keep my application design clean of any and all details.

Now, say it louder:

> **I shall keep my application design clean of any and all details!**

One of the reasons for writing this guide is that I have seen too many frontend applications where application and networking logic is tightly coupled with the view layer. Typically, user interface components fetch data in the browser via AJAX requests, applying formatting on top of it and displaying it to the user. For example, in React, it's a widely used approach to fetch data inside a `useEffect` hook and fail it by specifying hook dependencies incorrectly. You've probably come across an infinite rendering loop or two in your career.

Some special utility libraries, such as **React Query**, endorse it as a best practice. In this fashion, components fetch data and render their HTML based on whether the internal state of a query is pending, rejected, or fulfilled. It does this so you don't have to touch the global state[^2]. But I'm afraid of no state, and neither should you be!

I don't recommend having components responsible for querying data because their responsibility is already in presenting the data. More accurately, components need only receive data from view models, format it, and output it to the screen. Instead, I advise you to follow either of the three following ways:

1. Render the data on the server and pass it to components as a view model, as shown in this guide.
2. Use a state management library that supports dispatching actions (e.g. _Redux_ or _MobX_), deriving view models from the state, and passing them to components as properties.
3. Mix 1 and 2 above, but be careful.

Components should primarily see the data passed to them via properties, commonly known as _props_. It helps you by creating a natural _anti-corruption layer_ between your views and the application keeping it maintainable, scalable and effortless to test. Push the logic as far to the backend as possible, whether it's the frontend's backend or the actual backend.

### User Interface Is an Afterthought

Secondly, the user interface is an afterthought[^3] because, as smart software engineers, we want our designs to be easily replaceable when the time is ripe. By decoupling the application from the view layer, changing the design system or even the entire UI library becomes easier.

Your application must be reachable from a command-line interface. Therefore, in most projects, your command-line interface is your test runner. This knowledge makes it easy to validate if your design is clean enough. For example, do you need to test the user interface to validate your core business logic? If you do, your design is painfully coupled with the user interface.

In this guide, the UI decisions I've made with **SvelteKit and Svelte** are perfectly importable to **Next.js and React** or **NuxtJS and Vue**. So try it if you don't believe it.

Ultimately, I could take my services with me and integrate those into a micro-service without a hassle. But unfortunately, I couldn't easily do it when there is a tight coupling between the use case handlers and the view layer.

## Conclusion

I explained my application's top-level design and use cases in this post. To design cleanly architectured frontend applications, you should divide your design into separate modules and tie them neatly on the service layer. Do not couple the application use cases to your view layer.

But the service layer is merely a scratch on the surface of my grand design. You must venture further to fully understand it. In [the next post](/blog/clean-frontend-architecture-with-sveltekit/handling-the-external-dependencies-with-gateway), I will explain how you can safely handle and test side effects using adapters.

[^1]: There is a [TC39 proposal](https://tc39.es/proposal-array-grouping/) currently on stage 3 for native array grouping.
[^2]: Demonising the global state is a card often played by developers who need help understanding the relevance of the state in business logic. Contrary to the famous catchphrase, the state is the root of all value.
[^3]: **Michel Weststrate**, the author of MobX, has explored this notion in great detail [here](https://michel.codes/blogs/ui-as-an-afterthought). I warmly recommend you read it.
