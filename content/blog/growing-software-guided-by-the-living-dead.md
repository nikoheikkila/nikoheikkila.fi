---
title: Growing Software Guided by the Living Dead
author: Niko Heikkilä
lang: en
excerpt: A gentle introduction to the ZOMBIES development pattern
type: post
date: 2022-02-13
hero: https://r2.nikoheikkila.fi/growing-software-guided-by-the-living-dead.jpg
---

While dipping our toes with test-driven development for the first time, a significant obstacle is usually finding out how to write our first tests. Happy cases are easy to start with, but a better way involves mapping your inputs to expected outputs—watch out, ZOMBIES!

No, I mean for real. **ZOMBIES** testing pattern was introduced by **James Grenning** in their [blog][grenning] as follows:

> "When test-driving, guided by ZOMBIES, the first test **S**cenarios are for **S**imple post-conditions of a just created object. These are the **Z**ero cases. While defining the **Z**ero cases, take care to design the **I**nterface and capture the **B**oundary **B**ehaviors in your test **S**cenarios. Keep it **S**imple, both **S**olutions and **S**cenarios. You'll find that hard.
>
> Once progress is made on the **Z**ero cases, move to the next special **B**oundary case, testing the **B**ehavior desired when transitioning from **Z**ero to **O**ne. To do so there are likely other **I**nterfaces to define and use in new test **S**cenarios.
>
> Once the **B**oundary **B**ehaviors between **Z**ero and **One** (and possibly back to **Z**ero from **O**ne) have been captured in tests, move on to start to generalize your design now dealing with **M**ore complex **S**cenarios and **M**any items being managed. Often there are new **B**oundary conditions to be concerned with.
>
> Finally review your work and make sure you consider and **E**xercise the **E**xceptional things that might happen."

In mathematics, you may have encountered [proofing by induction][induction], which is more or less related to the **ZOM** part of our approach and is particularly helpful.

Let $P(n)$ be our test case where $n$ is the complexity of our input starting from the base case ($n = 0$), advancing to the induction step ($n = 1$), and finally achieving the end case ($n = k$). If mathematical analysis and proofing are not your strongest assets, let me explain these more practically through an example.

Imagine an invoicing system that receives a list of employees and a list of projects as input and returns a list of invoices as output.

```haskell
generateInvoices ::
    List<Employee> employees -> List<Project> projects -> List<Invoice>
```

How do we test this with ZOMBIES?

## Zero

The zero case offers an excellent relaxed start. Given there are no employees and no projects, our function should not return any invoices. We will write this expectation (an empty list) as a test, then run it, and see it fails because the function didn't return a meaningful value.

Failing tests are a good starting point, so we are encouraged to fix our logic by making the function return an empty list. Finally, our test is satisfied, and we already have a clean interface through a typed function. Hooray!

## One

Next, we determine our induction step. Given that we have a single employee in a single project, we should see precisely one invoice with the desired content when running the invoicing. This test case fails because we still receive an empty list.

We can fix it by checking the count of employees and projects and returning a list containing precisely one invoice with a fixed value. Tests are green again.

## Many (or More Complex)

Finally, we have arrived at our complex cases. Here we enrich our logic to talk to a data layer and retrieve the necessary models. We work through scenarios where many employees belong to a single project before satisfying the end case where many employees belong to many projects.

It's worth noting that you don't want to have your tests communicating with a live database. Instead, replace whatever data the abstraction layer returns with a fake. In-memory databases, for instance, are a good companion for our tests.

Obviously, our end case doesn't mean we stop writing tests at this point. Instead, our happy case is fulfilled by completing the ZOM part, only half of the feature. The rest half is about handling different boundaries and exceptional circumstances.

## Boundaries and Exceptions

Next, we can write more test cases for the following boundary scenarios:

-   One employee, but no billable projects = no invoices
-   One project, but no staffed employees = no invoices (or a _blank_ invoice with zero total sum depending on the requirements)

We can adjust the code to check whether these hold true and return the expected values. All of our test cases should still be green.

What happens if our data layer sends back a failing response or a connection timeout occurs? We satisfy these cases with stubbed failure responses. In case of errors, we could either log it and rethrow or modify the function signature to work with `Either` monads or any container value/tuple that holds the results for different paths. Generally, it's easier to test pure values, so I warmly recommend diving into the world of [Monads][monads] when you have time.

## Keeping It Simple

Eventually, our tests are now handling both happy and sad paths. If we haven't paid attention to refactoring yet, now is a great time. Our tests are our best safety net, so we should not be afraid to render our code as **simple** as possible.

A crucial point in refactoring is to advance in baby steps. In practice, you make a minor modification to your code, compile it, run your tests and commit your changes. If, at any point, you can't compile your code without errors or your tests fail, you should reset to the last known working state and try again.

I usually start my refactoring process by setting up a goal, making a tiny useful change, and committing it with a dummy message. After that, all the subsequent commits may be squashed to a logical whole describing my efforts better. Read more about my [practical micro-commit workflow][microcommits].

But your workflow may differ, and it's fine as long as you keep the rhythm of refactoring steady: _refactor–compile–test–commit–repeat_.

Refactoring workflows are described in great detail in **Martin Fowler's** and **Kent Beck's** groundbreaking book [_Refactoring_][refactoring]. Suffice to quote the senseis here:

> Whenever things get difficult, my first reaction is to take shorter steps. In particular, should a test fail during a refactoring, if I can't immediately see and fix the problem, I'll revert to my last good commit and redo what I just did with smaller steps. That works because I commit so frequently and because small steps are the key to moving quickly, particularly when working with difficult code.
>
> The most important thing to learn is the rhythm of refactoring. Whenever I've shown people how I refactor, they are surprised by how small my steps are, **each step leaving the code in a working state that compiles and passes its tests**. I was just as surprised myself when Kent Beck showed me how to do this in a hotel room in Detroit two decades ago. The key to effective refactoring is recognizing that **you go faster when you take tiny steps**, **the code is never broken**, and you can **compose those small steps into substantial changes**. Remember that—and the rest is silence.

[grenning]: https://blog.wingman-sw.com/tdd-guided-by-zombies
[induction]: https://en.wikipedia.org/wiki/Mathematical_induction
[monads]: https://www.toptal.com/javascript/option-maybe-either-future-monads-js
[refactoring]: https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757599
[microcommits]: /blog/a-practical-guide-to-micro-commits/
