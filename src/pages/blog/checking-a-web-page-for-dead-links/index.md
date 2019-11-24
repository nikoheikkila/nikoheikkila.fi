---
lang: en
author: Niko Heikkilä
date: 2019-11-24
cover: cover.png
title: Checking a Web Page for Dead Links
type: post
excerpt: A Golang Command-Line Tutorial
categories:
  - tutorial
  - golang
  - web development
  - tools
---

There is no content on the web that is immune to rotting and growing moss. Blog posts start festering with old dead links pointing to nowhere, and images blank out when a server hosting them goes away. The cure is to periodically check for any dead content, which is a crazy thing to do by hand. Luckily, we can automate this boring stuff by using computers.

In this tutorial, we write a web scraping tool using the powerful [**Colly**][colly] library for Go. At first, I meant to write this in good old Python 🐍💖, but there was a chance to start learning a new programming language. Go having a clear syntax, a powerful standard library, support for concurrency, and being a compiled language makes it a severe competitor for implementing command-line tools we all love.

You can grab the full source code [here][gh], but follow along as we build this health check for links. Since this is my first project in Go, the following paragraphs are not expert opinions. You, as a seasoned veteran of the gopher wars, will undoubtedly find a way to improve my work. Please, do that in the comments.

## Requirements

By thinking this through, I was able to formulate the acceptance criteria for our MVP program:

1. We need a program which takes a URL as an argument, visits it, and all the links within it.
2. Link traversal should end after the first page, or the second level of traversal to avoid long-running tasks.
3. The program displays the list of links in a fashion that it's easy to catch possible dead links. It means we should colour the terminal output.
4. All the results should be printed with line breaks to help us filter the data using `grep` and other tools.
5. The program should process links asynchronously to optimize performance.

## Structuring Links

First, we need a way to represent our links and Go has a perfect method for this using _structs_, which are a bit like objects in other languages. Let's define a `Link` struct which holds our link's address and status code from the HTTP response.

```go
type Link struct {
	url    *url.URL
	status int
}
```

Note that we are using `*url.URL` as the type for link member. Since URLs are essentially a form of structured data, we want to pass them as such. It also mitigates any potential security risks emerging from passing and returning simple strings around. We can always get the underlying string representation of the URL by using the `url.String()` method before, e.g. printing it out.

Next, we need a few convenience methods for modelling the data within our structure. For instance, we want to know if the link is considered _healthy_. I've chosen that link is healthy if, and only if, the status code from the HTTP response is in the `2xx` range, which is a traditional sign of a successful HTTP request. Struct method `isHealthy()` is responsible for telling us this.

```go
func (link *Link) isHealthy() bool {
	return link.status >= HTTP_MIN_STATUS && link.status <= HTTP_MAX_STATUS
}
```

For the program to be of any use to us, we need to output the data. Let's define a method for displaying dead links.

```go
func (link *Link) printFailure() {
	fmt.Printf(
		"Link to %s is %s with status %d\n",
		link.url,
		aurora.Red("down"),
		aurora.Bold(link.status),
	)
}
```

Below is another method for displaying healthy links.

```go
func (link *Link) printSuccess() {
	fmt.Printf(
		"Link to %s is %s\n",
		link.url,
		aurora.Green("healthy"),
	)
}
```

In the above methods, I'm using a 3rd party [Aurora][aurora] library for colouring the string output. Plain green and red colours suffice for now, but you are free to experiment with the wildest rainbow combinations imaginable.

## Initializing the Collector

Here begins the patty of our tutorial. We need to define a _collector_ which is a Colly struct containing several useful methods for scraping web pages. We configure it with our user agent, turn on asynchronous processing, and limit it to visiting only URLs beginning with either `http` or `https` to avoid getting trapped in, e.g. `mailto:` links. There's also a random delay between requests to decrease the chance of hitting a rate limit on some servers.

The maximum `depth` for scraping is vital in our use case since we only want to visit the first link and links on the first level of recursion below it. Therefore, the value is **2**. Otherwise, we would be falling through the rabbit hole until we hit a dead-end which might take ages.

Since Go is adamant about checking and handling possible errors, I've defined a `handleError()` function which takes an error value and outputs it if necessary. It makes the code more readable for my eyes since I don't have to write `err != nil` checks always.

```go
func getCollector() *colly.Collector {
	userAgent := flag.String("user-agent", DEFAULT_USER_AGENT, "User-Agent for scraping")
	depth := flag.Int("depth", 2, "Recursion depth for scraping")
	threads := flag.Int("threads", 4, "Number of threads to use for scraping")

	flag.Parse()

	collector := colly.NewCollector(
		colly.Async(true),
		colly.UserAgent(*userAgent),
		colly.MaxDepth(*depth),
		colly.URLFilters(
			regexp.MustCompile("https?://.+$"),
		),
	)

	limitError := collector.Limit(&colly.LimitRule{
		DomainGlob:  "*",
		Parallelism: *threads,
		RandomDelay: 1 * time.Second,
	})

	handleError(limitError)
	return setHandlers(collector)
}
```

Remember to call `flag.Parse()` after defining your command-line flags. You also need to dereference them using the asterisk notation to extract the real value.

## Setting the Handlers

After initializing the collector, we need to attach a couple of handlers into it where the core logic of Colly resides. We define handlers for catching connection errors, inspecting HTML elements, and reacting to HTTP responses. All the handlers are mostly simple callback functions, so it's easy to work with them.

### Catching Errors

Our error handler is responsible for, guess what, handling errors! We catch an HTTP response and an error value and attempt to display it. Sometimes Colly is not reporting any errors in which scenario we substitute our rather unhelpful message. What else can we do?

Finally, we pass the reformatted error message to our custom function, so it gets printed out nicely.

```go
collector.OnError(func(response *colly.Response, err error) {
	url := response.Request.URL
	reason := err.Error()

	if reason == "" {
		reason = "Unknown"
	}

	handleError(fmt.Errorf("Request to %s failed. Reason: %s", url, reason))
})
```

### Whitelisting the HTML Anchors

Every time Colly encounters an HTML element, it checks if an `OnHTML` handler satisfies the element it found. We want to visit every link on the web page, so we catch all the HTML anchor tags with `href` attribute. If you're familiar with CSS selectors, you can modify the first argument to the handler here for catching broken `img` tags, for example. I've chosen to keep it this way and limit any URLs visited with the regular expression shown before.

Here we want to discard the error returned from the `element.Request.Visit()` call since they offer no value except warning about the maximum recursion depth reached. The _underscore_ is an excellent way in Go and similar languages to indicate compiler or other people that we don't care about the value.

```go
collector.OnHTML("a[href]", func(element *colly.HTMLElement) {
	link := element.Attr("href")
	_ = element.Request.Visit(link)
})
```

### Peeking into the Response

Below is our single most crucial handler: catching all the HTTP responses we get from Colly's visits.

We capture the requested URL and its status from the response into our link struct and use its methods to tell us if the link was healthy or not.

We could also log these statistics to a file for later analyzing but for the sake of simplicity, we print them out. It's trivial to define other struct methods to process this data further, if necessary.

```go
collector.OnResponse(func(response *colly.Response) {
	link := Link{
		url:    response.Request.URL,
		status: response.StatusCode,
	}

	if !link.isHealthy() {
		link.printFailure()
		return
	}

	link.printSuccess()
})
```

## Wiring It Together

Did we forget something? Ah yes, no program can run without the `main()` function. Let's glue the pieces down.

```go
func main() {
	target, urlError := getURL(os.Args)
	handleFatal(urlError)

	collector := getCollector()

	handleError(collector.Visit(target.String()))
	collector.Wait()
}
```

Here, `getURL()` is a function for validating input arguments and retrieving the first argument. If a wrong number of arguments is given, we handle it with the `handleFatal()` function which outputs the error, and also exits the program with a non-zero status to communicate a problem.

Finally, we initialize the collector, tell it to visit our given URL, and wait for any asynchronous processes to complete. The `Wait()` call is crucial as otherwise, our program would terminate without doing anything.

Now we can build our program using `go build` or test it directly using `go run`. Either way, passing a URL to the program will shortly start visiting the found links and printing their health. In the repository, I've also published this tool as a Docker image if you would rather skip the coding and just use it. Run it like so:

```bash
docker run -it --rm nikoheikkila/go-link-health <URL>
```

Thanks to the Docker multi-stage build, the whole image is just a little over 20 MB.

## Summary

The implementation we made here is not perfect, however. By running the command against a URL, we sometimes get timeout errors from specific requests which have to be inspected by hand. Luckily, we output them in the terminal, so it's easy to click through them provided you have configured your terminal application correctly.

Possible improvements would be to group healthy links separately from dead links for even easier inspecting using slices, or output the data in JSON format if a suitable flag was provided. Those remain a homework.

Learning a new language is not an easy task, but for me figuring a relevant use case and implementing a minimum viable solution for it is the best way forward. Others might stick with more school-oriented studying going through articles and reference documentation, and writing down questions for further research.

I'm the kind of person that needs to get something done and write about it. The essential thing in combining coding and writing is to silence your inner impostor. Granted, not all people feel your writing is important, and they might be vocal about it, but for each sodding bugger, there are many beginners craving to learn by following your footsteps.

With that in mind, I hope you have enjoyed what you've read, and we meet again in the next tutorial. Meanwhile, link to me your Golang tutorials if you have written any.

## Further Reading

As a closing note, below are some resources I found useful when learning how to Go.

- [Go By Example](https://gobyexample.com/); contains plenty of annotated code snippets for performing basic and advanced tasks.
- [GoDocs](https://godoc.org/); for the core API documentation.
- [Official Go Extension for VS Code](https://github.com/Microsoft/vscode-go); huge praise to Microsoft for developing this extension and making writing Go a smooth process. No heavy IDEs needed here either.
- [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests/); if you only click one link in this post, let it be this one. Contains a comprehensive introduction to writing Go with TDD (_Test-Driven Development_) approach.

[colly]: http://go-colly.org/
[aurora]: https://github.com/logrusorgru/aurora
[gh]: https://github.com/nikoheikkila/go-link-health
