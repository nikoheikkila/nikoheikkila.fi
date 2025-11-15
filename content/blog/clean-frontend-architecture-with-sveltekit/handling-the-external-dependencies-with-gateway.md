---
title: "Clean Frontend Architecture with SvelteKit: Handling the External Dependencies with Gateway"
author: Niko Heikkilä
lang: en
excerpt: Contrary to some beliefs, side effects have a place in clean architecture. In fact, they enjoy our utmost care and attention.
type: post
date: 2023-01-31
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/clean_frontend_architecture_with_sveltekit.jpg
---

In the previous post, I designed our service and use case handlers. However, it had one glaring detail I left unexplained: _the gateway_.

What exactly is a gateway? It is known by many names, but in my use case, it's a class responsible for handling network requests to an external service. If you've worked with databases, you might have come across _repositories_, which handle storing and retrieving domain entities. Both are **outbound adapters** because they translate messages heading out from our application.

Gateways and repositories have another more crucial similarity, which makes them very powerful: they implement an interface. How is that a big deal? Because of the dependency injection technique[^1], I can substitute my actual dependencies with fake ones when I'm testing. To keep our unit tests as fast as possible, I must focus on limiting my tests' boundaries to I/O logic. What lies beneath the I/O border is no concern for my tests.

## Dependency Injection

Are you familiar with the term _demo effect_? Have you ever presented your solution to a customer only to be embarrassed by a random outage in an external service? It happened to me, too. While developing the application, the Typicode API had an intermittent outage, and all requests began to time out momentarily. No problem there; I changed one line in my application configuration and used a fake gateway until the incident was resolved.

Here lies the power of dependency injection. I can continuously develop and test my application separate from any external services. Surely enough, I'm not working with the _actual_ data, but because my fakes are also following the external contract, it would be enough to fool anyone. Furthermore, I can even demonstrate the application behaviour to users before having an actual endpoint to talk to. If a human can't sufficiently distinguish whether you're using a real service or a fake one, you know you have a sane model for managing your dependencies. This is exceptionally helpful with backend applications when an external service or database is not ready for consumption. An in-memory version of your data source removes the dependency on the external service during development.

Enough talk. How does one implement a gateway?

## The Interface

Both my actual and fake implementation need to implement the same interface below to reap the full benefits of dependency injection. In Typescript, interfaces are trivial to write if you have any experience with C# or Java.

I'm going to declare methods for the following:

-   fetching all the photos
-   fetching a single photo by ID
-   fetching photos by album ID

```typescript
type Dictionary<K = string, V = unknown> = Record<K, V>;

export interface PhotoGateway<T = Dictionary> {
	fetchPhotos(args: FetchParams): Promise<T[]>;
	fetchPhoto(id: number): Promise<T>;
	fetchPhotosByAlbumId(albumId: number, params: FetchParams): Promise<T[]>;
}
```

The internal structure of my domain entities might change in the future, but I don't want to leak that change into my public interface. Fortunately, gateways are great candidates for a generic supertype pattern. If there is any valid type `T`, I can declare to receive either a single entity or a collection of those in return. For simplicity, I've set the gateway `T` type to a default of `Dictionary`, which is a standard key-value map.

## Fake Gateway

[**Implementation**](https://github.com/nikoheikkila/photo-browser/blob/1e22e32c04e627a5f08e2f4f83649e93787e72d9/src/lib/services/__tests__/index.ts#LL5C51-L5C51)

Fakes[^2] might feel laborious if you're heavily accustomed to using mock objects. However, once you grasp the basic techniques, you notice they are as effortless to write and maintain as mock objects. For example, instead of making an HTTP request, it instantly returns a stub response, which could be more or less expected from the actual service.

Let's model a stub photo close enough to the real deal. I will use the [Faker](https://fakerjs.dev/) library to generate random data with specific rules.

```typescript
private stubPhoto(): Dictionary {
 return {
  id: faker.datatype.number({ min: 1 }),
  albumId: faker.datatype.number({ min: 1 }),
  title: faker.lorem.sentence(),
  url: faker.internet.url(),
  thumbnailUrl: faker.internet.url()
 };
}
```

I need valid IDs for photos and albums, so they must be positive non-zero integers. The title can be any kind of text, and photo and thumbnail URLs only need to be valid.

The method above is suitable for stubbing a single photo. However, when I need to fetch multiple photos, I generate $N$ amount of stubs in a loop and use the Javascript spread syntax to override specific fields such as photo and album IDs. I want to obey the Typicode contract as closely as possible without knowing or implementing the details. I generally want to return keys and values with expected types — the rest can be fuzzy.

The genuinely exciting part comes when I test the edge case behaviour. What if my fake needs to return empty data? I can't use the stub above for that, but I can _feed_ my gateway data in the setup phase.

```typescript
public feedWith(stubs: Dictionary[]) {
 this.stubs = stubs;
}
```

The same technique applies to simulating error scenarios.

```typescript
public setError(error: Error) {
 this.error = error;
}
```

Eventually, checking the state of the feeds is easy.

```typescript
public async fetchPhotos(params: FetchParams): Promise<Dictionary[]> {
 if (this.error) throw this.error;
 if (this.stubs.length > 0) return this.stubs;
 // ...
}
```

If I've fed the gateway an error object, it is checked first and thrown. If I've fed it any predefined stubs, those will be returned.

I can arrange for the expected outcomes in the service tests easily using these public methods.

```typescript
// Given gateway returns empty collection
gateway.feedWith([{}]);

// Given gateway returns an error
gateway.setError(new Error("A bad thing happened"));
```

Despite the gateway instance being a private member of my service class, I can interact with it because I create it separately as a _test fixture_. Fixtures are mandatory for efficient tests because they are created anew for each test, resetting an existing state such as errors and stubs. Hence, I don't need to call any teardown method manually after each test.

The above is much more efficient and developer-friendly than using mocks, forgetting to reset those[^3], and trying to figure out why tests happen to affect each other. As a bonus, I don't need to install and manage external libraries for fakes. Your chosen programming language often offers enough to build stubs and fakes.

## Real Gateway

[**Implementation**](https://github.com/nikoheikkila/photo-browser/blob/main/src/lib/adapters/Gateway.ts)

Unsurprisingly, to converse with the actual Typicode API, I need an implementation for that. Luckily, all the requests are simple `GET` requests requiring no authentication. I wire up [Axios HTTP](https://axios-http.com/) library in the constructor to do the heavy lifting. For that, I need to inject a base URL, which I retrieve from a public environment variable.

Axios is pleasant to use with Typescript. Each instance of `AxiosResponse` accepts a generic type and has a member `data` typed with it. The gateway doesn't need to know or care what's the exact format of the response as long as it's valid JSON. In the service, I parse the received JSON to domain models.

## Testing the Real Gateway

Even though I've covered my core logic while unit testing the service, I still need to briefly test that I interact with HTTP correctly. Note that I'm not testing that Axios works — I leave that to its maintainers. I only want to verify that I used the client correctly.

However, I want to refrain from firing an actual HTTP request in each test because it would make tests slow and brittle. What should I do?

I use the [Nock](https://github.com/nock) testing library to intercept and simulate HTTP responses from Typicode API. The alternative would have been to inject a fake HTTP client as a dependency on my gateway. But again, I explicitly want to test how my code integrates with an HTTP client so that the gateway performs as expected.

Some developers advise mocking the HTTP client directly through a spy, but I strongly recommend against this. Writing a mock like the one below would tightly couple my test with the Axios library. My tests would break when I refactor to use, for example, the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) or another library.

```typescript
spyOn(axios, 'get').mockResolvedValueOnce({...});
```

**Forget that example. Do not follow it!**

Forgot it? Great. Instead, by writing interceptors with Nock, I'm free to play with the details as much as necessary without exposing the HTTP client I use.

```typescript
nock(url)
	.get(/photos')
	.reply(200, [payload]);
```

Here, given a URL and a route matching `/photos`, my interceptor object will always reply with a status code of **200 OK** and a predefined payload. Similarly, I can test for an intermittent API failure by simulating a **500 Internal Server Error** and verifying it's handled properly.

```typescript
nock(url)
	.get(/photos')
	.reply(500, 'Connection timed out');
```

But how am I supposed to know that my interceptor did intercept the outgoing request if I'm not using a mock object and verifying the number of its calls? What if I have an error in my interceptor configuration and don't know about it? Fortunately, Nock protects me from that scenario by throwing an error if a request doesn't match.

```json
Nock: No match for request {
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/photos",
  "headers": {
    "accept": "application/json, text/plain, */*",
    "user-agent": "axios/1.2.2",
    "accept-encoding": "gzip, compress, deflate, br"
  }
}
```

As you can see, Nock failed to match any outgoing requests and failed the test.

You might wonder why I used the fake gateway implementation in the previous unit tests if a library like Nock exists. Think about it for a second. What would happen if I began retrieving photos from a web socket, GraphQL, or gRPC API instead of REST? A rare scenario, but possible, nevertheless.

A change like that would be easy. I would need a new class implementing the gateway interface and brief integration tests for the new client to carry it out. Nothing else in the logic surrounding our adapters, including unit tests targeting use cases, would not change. Dismantling and rewriting most of our tests because of a tight REST coupling would showcase a lousy design.

Okay, but weren't all mock objects considered harmful, so why use them with Nock now? Despite the name, I treat and use Nock as a stub library. I command it to return canned responses or errors, similar to what I did with the fake gateway. It's still easy and does not limit me to a fixed HTTP client, unlike spying and mocking. Mock objects aren't harmful, either. We should only use them sparingly and be aware of the trade-offs.

## Conclusion

In this post, I showed you how to design an outbound adapter to collaborate with the use case handlers and assist with the dirty work. Our use case handlers should always act like helpless store clerks: when asked to handle input or output, they raise their hands and ask a collaborator to help with the task.

However, you don't always need an outbound adapter. Instead, use it only when communicating with an external service or dependency. For example, earlier, I presented you with a photo calculator service for parsing the photo dimensions. This is a pure service without any ties to external services, and as such, it does not need to collaborate with an outbound adapter.

Remember that external dependencies are not limited to APIs running in a foreign cloud service. Your computer's file system is also an external dependency, even if accessing one is fast with modern drives. The same applies to a local database running inside a container. Those can still fail you — that alone is enough reason to substitute those with fakes.

You're a grown-up person. I won't chasten you for _not_ faking dependencies. You can test against a real filesystem, API, and an actual database to your heart's content. However, you _will_ realize the importance of test doubles when your previously so fast tests start to take longer and longer to run, and as a consequence, you run them less frequently, increasing the feedback loop and causing defects to arise. I hope you come back to read my guide then.

In [the next post](/blog/clean-frontend-architecture-with-sveltekit/domain-modelling/), I will explain the importance of domain modelling and introduce the magnificent concept of parsing instead validating.

[^1]: Beware of abusing the dependency injection technique! Some codebases are too keen on it by enforcing each class to have at least one interface to implement. This creates redundant indirection, which benefits no one, only showing that the author hasn't understood dependency injection.
[^2]: If you're overwhelmed by the terminology around dummies, stubs, fakes, spies, and mocks, Uncle Bob has written a helpful dialogue called the [Little Mocker](https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html) where he explains the differences.
[^3]: Popular test runner libraries such as **Jest** and **Vitest** support resetting the state of all mock objects after each test run, but it's common to forget configuring this and spending substantial time in debugging the failing expectations.
