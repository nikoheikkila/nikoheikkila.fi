---
title: "Clean Frontend Architecture with SvelteKit: Server-Side Routes and Components"
author: Niko Heikkilä
lang: en
excerpt: After a long detour, we peek into the internals of SvelteKit and how its conventions merge with our clean architecture ideals resulting in a maintainable frontend application.
type: post
categories: [guides, frontend, architecture, design, svelte]
date: 2023-05-02
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

In the previous chapters, I have demonstrated the power of designing and testing a backend within the frontend, but you can only walk so far. I haven't touched the powerful capabilities of **SvelteKit** yet. It's time to fix that and get my server-side routes and components to visualise the data users asked for.

I will refer to the architectural concepts I've introduced in the earlier chapters but will not explain them again. This is a perfect moment to pause and revisit those in case you need a refresher.

## Routing the Requests and Loading the Data

Photo Browser consists of multiple filesystem-based [routes](https://github.com/nikoheikkila/photo-browser/tree/main/src/routes) similar to what you would find, for example, in **Next.js** applications.

However, with SvelteKit, each route consists of a page component (`+page.svelte`) written in Svelte's markup and a data loader (`+page.ts`) in TypeScript. Furthermore, I have set up generic components for handling [layout](https://github.com/nikoheikkila/photo-browser/blob/main/src/routes/%2Blayout.svelte) and [error](https://github.com/nikoheikkila/photo-browser/blob/main/src/routes/%2Berror.svelte) pages. I advise you to browse the source code of the files under the `src/routes/` directory as much as necessary. You should also read more about Svelte's routing in detail from their [documentation](https://kit.svelte.dev/docs/routing).

While browsing the implemented routes, you will notice they are very slim and contain only the minimum amount of logic. As you remember, the business logic is delegated to our service layer handling and returning relevant domain models.

In short, to implement SvelteKit's routing, all the data-bound routes must export a page loader function called `load()`, returning a typed object holding the data that the requested page needs. The loader function is essentially an adapter to the underlying service. For convenience, I have exported the `PhotoBrowser` and `APIGateway` as singleton instances. This is convenient because the architecture is stateless, but be forewarned your use cases might differ from mine, and you should inject your dependencies with alternative means.

```typescript
export const load: PageLoad<Response> = async () => {
	try {
		return {
			albums: await browser.withLimit(500).groupPhotosByAlbum(),
		};
	} catch (err: unknown) {
		handleError(err);
		throw errorWhileLoadingPhotos();
	}
};
```

> ❌ SvelteKit's documentation shows an example of retrieving blog post data directly from a database. While this is certainly possible, **you should never ever do that**. In clean frontend architecture, the page loader must be utterly ignorant of the secondary adapters and gateways. Instead, the page loader relies on the provided service layer for retrieving data. Doing so, the architecture remains flexible and easy to change.

Finally, the page loaders catch errors and return typed error objects, which SvelteKit allows me to build using its dedicated `error()` helper. The error data is then used to render the error page. Furthermore, I have built a custom `handleError()` function, which only logs the error to the console for demonstration purposes. In a real-world application, it would be ideal to also dispatch errors to an external service such as Sentry via a gateway.

## Rendering the Data Through Views and Components

It's no surprise that Svelte components operate elegantly in my architecture.

Thanks to SvelteKit's routing, the object I return from the page loader is passed on to a page component. This is made possible by exporting a mutable variable called `data`. For Svelte novices, this style of importing by exporting sounds counter-intuitive. However, setting keywords aside, it greatly facilitates the separation of concerns. The components do not technically know where their props are coming from. The callers of the components hidden within SvelteKit's routing infrastructure are the ones to worry about it. All a meagre Svelte component needs to worry about is how to best use the data it's given.

```svelte
<script lang="ts">
	import PhotoGrid from '$components/PhotoGrid.svelte';
	import type { PageData } from './$types';
	import Warning from '$components/Warning.svelte';

	export let data: PageData;

	// define reactive props derived from data here
</script>
```

In the clean frontend architecture, I use the term _view_ to denote a more extensive integration of separate components delivering value to visitors. The views operate using data from _view models_, which my data object represents. Furthermore, individual components' props derive data from the view model but are blissfully unaware of any view models above them.

For example, while my landing page accepts the view model, I derive a list of the album's photos and a corresponding album identifier to the `<PhotoGrid>` component. The grand design here is not a novel idea. It has existed in React applications for a long time and is my preferred strategy for building clean frontend applications there.

```svelte
{#each entries as [albumId, photos] (albumId)}
	<PhotoGrid albumId={Number(albumId)} bind:photos />
{/each}
```

## Conclusion

While we have invested time in creating a filesystem-based router and components, you should remember that the clean architecture is, in essence, a plugin architecture. If I want to use another framework based on React, I could still detach the services, gateways and domain models from the codebase, translate the Svelte components to React, and finally plug them back in. The power of delaying these decisions to the last responsible moment is one of clean architecture's most significant selling points. You want to avoid painting yourself into the corner with rigid and hacky architecture, don't you?

In [the next post](/blog/clean-frontend-architecture-with-sveltekit/acceptance-testing), I delve into the most exciting chapter in the series: designing acceptance tests for my photo browser. I've seen countless developers stumble while testing their frontends. I've been there, too. Fear not, my friend, for after reading my guide, you know of a battle-proven technique for designing ultimately testable frontend applications.
