---
title: "Clean Frontend Architecture with SvelteKit: Domain Modelling"
author: Niko Heikkilä
lang: en
excerpt: All design efforts should begin from the domain when solving business problems. How do we model the domain of a photo browsing application?
type: post
date: 2023-02-28
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

Whether you follow the domain-driven design or not, clean domain modelling is one of the most crucial problems we software engineers must tackle. Why is that? Because domain modelling helps us establish a shared language with stakeholders and manage the essential complexity within our product.

Can you count the occasions when you've talked with a stakeholder or user of your product, thinking you understood their problem, only to come back days later and realize they meant something completely different? If the number is zero, you don't talk to people or are a shameless liar. If it's more than zero, you know the importance of the topic.

In **Hexagonal Architecture**, the domain is the centrepiece of the whole puzzle — without it, ports and adapters lose their significance, and the architecture itself falls to a pile of steaming spaghetti. All our messages coming from and going out to the external systems must be compatible with our domain logic after they have been translated by adapters.

## Modelling the Photo Browser

So, what are the domain entities of a photo browsing application? Unsurprisingly, those would be the photos.

In frontend applications, domain entities are typically designed for reading, while in backend applications, the entities are designed for reading and writing[^2]. Hence, our photo entities do not contain any behaviour mutating their internal state, which keeps the domain clean and functional.

In TypeScript terms, a simple object passed to functions querying its properties will suffice for a read-only model. On the other hand, objects and functions or even a class with methods is a desirable choice for a writable model. Generally, the correct structure of the domain model will reveal itself incrementally as the design evolves, so don't rush to decide too soon.

In the previous post, we handled the incoming data through a gateway, which left our data way too raw to safely use. How do we solve that? By parsing the photo entities from the raw data.

## Parsing and Validating the Photo Entities

[**Implementation**](https://github.com/nikoheikkila/photo-browser/blob/main/src/lib/domain/Photo.ts)

In the context of a demo application, we could trust that the Typicode API obediently validates the photos it sends so that we only need to render them in our UI. However, years of working with external backend systems have taught me the exact opposite: trust but verify the correctness of your inputs. It's also a sane foundation for all software engineers.

How do we verify the incoming data, then? Since we receive JSON records, we could traverse the entire document tree and validate each key individually. However, the result would be utter chaos with tons of conditionals.

Fortunately, there's a strategy which I see too rarely used in the real world. It's commonly dubbed as _parse, do not validate_[^1]. In a nutshell, you define a schema, which swallows your raw data and spits out a flawless domain entity. I fell in love with this concept when I first worked on a project involving distributed microservices and event-driven messaging. The data provided by an external microservice or a human should not linger in the system unchecked.

One of the more valuable libraries following this strategy is [**Zod**](https://zod.dev/), but there are many alternatives with a repertoire focusing from pure objects to HTML form validation.

In the case of photos, we want to verify that:

-   Both photo and album IDs are positive integers.
-   Photo title is not empty.
-   Links to the full-size photo and its thumbnail are valid URL _value objects_.

If you need clarification on the terminology here, know the following. A **domain model** is an object with identity — typically represented as an `id` field — whereas a **value object** is a simple encapsulation of rudimentary information such as `Date`, `URL`, or `Money`. Furthermore, value objects should be strictly immutable, whereas the different properties of domain models are mutable when necessary.

Unfortunately, TypeScript's type system is limited in this regard. So, we can't enforce these rules on the type level. Nevertheless, it wouldn't help us when running our compiled JavaScript application.

We need a schema and a type to design a domain model with Zod. However, before going further, it's helpful to know that using Zod can construct a type for our domain entities by inferring it from the given schema. This is a helpful way to prevent duplication.

```typescript
import * as z from "zod";

export type Photo = z.infer<typeof Photo>;
```

Subsequently, defining the parser is simple, thanks to Zod's friendly interface:

```typescript
export function createPhoto(data: Dictionary): Photo {
	const result = Photo.safeParse(data);

	if (!result.success) {
		throw result.error;
	}

	return result.data;
}
```

Above, I've implemented a simple function throwing an error on parser failure, but you could adjust it for your use case depending on whether you need to return a different value based on the parsing result.

An alternative pattern, which I use when applicable, is to use a _monadic_ return type found, e.g. in Rust programming language. Monadic return types sit well when designing functional domain models.

```typescript
export function createPhoto(data: Dictionary): Result<Photo, Error> {
	const result = Photo.safeParse(data);

	return result.success ? Ok(result.data) : Err(result.error);
}
```

Irrelevant to the chosen paradigm, `createPhoto` is called in the service layer transforming the raw data from the API gateway to one or more domain models.

## Rendering the Domain

Strongly-typed domain entities are a delight to work with when implementing UI components. For example, consider how we render a photo in our application as a Svelte component. I've removed some attributes from the HTML markup for brevity, but you can see the full implementation [here](https://github.com/nikoheikkila/photo-browser/blob/main/src/components/FullPhoto.svelte).

```svelte
<script lang="ts">
	export let photo: Photo;

	const { width, height } = new PhotoCalculator(photo).parseFullSize();
</script>

<section>
	<section>
		<Link to="/album/{photo.albumId}">Back to album</Link>
	</section>
	<figure>
		<img src={photo.url.href} alt="Caption: {photo.title}" {width} {height} />
		<figcaption role="caption">
			<span>{photo.title}</span>
			<span>{width} by {height} pixels</span>
		</figcaption>
	</figure>
</section>
```

I will explain later how Svelte components work. For now, you should know that we can pass domain models as props by exporting a `let` variable in the script block of the component file.

Previously, I advised keeping components responsible of only displaying the data passed to them. We can easily construct a view model from one or more domain entities with domain modelling. The result is effortless and type-safe to render.

As I indicated in an earlier post, one caveat is that the Typicode API doesn't return the photo's width and height as part of the JSON response. Hence, I'm not embedding them directly into our photo model, even though they are technically part of the domain model. So instead, the above is an example of querying information from the domain model.

## Conclusion

All design efforts should begin from the domain when solving business problems. What concepts are the users talking about? What data do these concepts hold? What is the behaviour we expect to see? How are domain models talking to each other? Domain modelling answers all the above questions by encapsulating data and behaviour in a well-defined and strongly-typed fashion. Ideally, larger domain models are also composed from smaller domain models because we should prefer composition over inheritance.

Don't obsess over primitive values such as strings and numbers. Instead, encapsulate your entire domain into models and value objects. As a result, the application becomes easier to reason, refactor, and maintain. Additionally, new team members will thank you for explaining the core business concepts in code. After all, a clean domain is above all documentation, too.

In [the next post](/blog/clean-frontend-architecture-with-sveltekit/server-side-routes-and-components/), we will dig deeper into Svelte's server-side rendering capabilities and how it compiles components. Having done the solid groundwork for our application, injecting any application framework or changing one is a breeze. I hope the same applies to your current project.

[^1]: Technically, we are parsing and validating, so the established nomenclature is off. I forgive the authors for that.
[^2]: The pattern of separating domain models designed for reading from models designed for writing is known as [Command Query Responsibility Segregation (CQRS)](https://www.martinfowler.com/bliki/CQRS.html). It's a valuable design pattern when working with complex enterprise applications.
