---
lang: en
author: Niko Heikkilä
date: 2020-03-27
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/rapid-prototyping-with-table-driven-testing.jpg
title: Rapid Prototyping with Table-Driven Testing
type: post
excerpt: Lazy developers ain't got time for installing test libraries
---

Developers often need to work with something from scratch. Usually, it's a couple of lines of code whose suitability to real business logic needs to be measured before using. Sometimes you might get an idea you want to play around.

However, prototyping can get cumbersome. You need to create a project, install a test library, organize the logic, and make sure tests pass. This is often too much for lazy developers like me who want to brainstorm but not give up on testing.

One technique is particularly helpful for making the prototyping faster, and it's called **table-driven testing**. This technique has gained popularity among those working with the Golang programming language.

In table-driven testing, you declare a table of values which can be implemented using a two-dimensional matrix (_nested array_). The first columns usually hold the values passed to your testable function and the last column the expected result.

## How It Works

To demonstrate this, let's write a quick curried function that formats a sum of money into a sweet currency string in euros. I'm using Typescript here, but this applies to any language capable of handling basic arrays and throws.

### **Code**

```typescript
type Formatter<T> = (a: T) => (b: T) => string;
const numberFormatter: Formatter<number> = (decimals) => (euros) =>
	euros.toFixed(decimals).replace(/\./, ",") + " €";

// Partial application to store our precision
const toCurrencyString = numberFormatter(2);
```

### **Tests**

```typescript
// [argument, expected result]
const suites: [number, string][] = [
	[-1, "-1,00 €"],
	[0, "0,00 €"],
	[1, "1,00 €"],
	[10.01, "10,01 €"],
	[59.0, "59,00 €"],
	[Math.PI, "3,14 €"],
	[NaN, "NaN €"],
];

for (const [euros, want] of suites) {
	const got = toCurrencyString(euros);

	if (got !== want) {
		throw `Got ${got}, but wanted ${want}`;
	}
}

console.log("Congratulations! All tests passed.");
```

As you can see, the trick is to declare a test loop throwing an error for each failed test. With Javascript and Typescript, it's easy to terminate the program by merely throwing a native value like string. If all the tests pass the program prints a congratulatory message for you. No assertion libraries needed.

You could walk an extra mile and capture all the errors into another array for printing the full test results. I like to take the easier route and abort tests as early as possible even when using real test libraries.

If your editor is **Visual Studio Code, JetBrains IDE, Atom**, or **Sublime Text**, you can use the free **[Quokka](https://quokkajs.com/)** extension for even faster prototyping. Live scratchpad ensures you don't even have to save a file onto disk to get down with coding.
