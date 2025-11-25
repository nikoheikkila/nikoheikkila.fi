---
title: Everyday Design
author: Niko Heikkilä
lang: en
excerpt: >
    Why do most developers struggle while changing code?
    The answer lies in how we think about software design.
    Learn how focusing on behavioural thinking can elevate your code quality.
type: post
date: 2025-11-25
hero: null
---

I'm going to show you two code snippets that solve the same problem of comparing two inputs. One takes ten lines. The other takes seventy. Which one would you write?

Here's the ten-line version:

```python
def compare_values() -> None:
    a = int(input("Enter the first value: "))
    b = int(input("Enter the second value: "))

    if a > b:
        print("The first value is bigger")
    elif a < b:
        print("The second value is bigger")
    else:
        print("The values are equal")
```

Here's the version with 78 lines:

```python
from enum import IntEnum
from unittest import TestCase, main

class ValueComparison(IntEnum):
    Bigger = 0
    Smaller = 1
    Equal = 2

class Console:
    def read_int(self, prompt: str) -> int:
        return int(input(prompt))

    def write(self, message: str) -> None:
        print(message)

class FakeConsole(Console):
    def __init__(self, inputs: list[int]) -> None:
        self.index = 0
        self.inputs = inputs
        self.messages = []

    def read_int(self, prompt: str) -> int:
        value = self.inputs[self.index]
        self.index += 1
        return value

    def write(self, message: str) -> None:
        self.messages.append(message)

def compare_values(a: int, b: int) -> ValueComparison:
    if a > b:
        return ValueComparison.Bigger
    if a < b:
        return ValueComparison.Smaller

    return ValueComparison.Equal

def program(console: Console) -> None:
    a = console.read_int("Enter the first value: ")
    b = console.read_int("Enter the second value: ")

    match compare_values(a, b):
        case ValueComparison.Bigger:
            console.write("The first value is bigger")
        case ValueComparison.Smaller:
            console.write("The second value is bigger")
        case ValueComparison.Equal:
            console.write("The values are equal")

class TestShell(TestCase):
    """Unit tests for the program"""

    def test_first_value_is_bigger(self):
        console = FakeConsole([2, 1])

        program(console)

        assert len(console.messages) == 1
        assert "The first value is bigger" in console.messages

    def test_second_value_is_bigger(self):
        console = FakeConsole([1, 2])

        program(console)

        assert len(console.messages) == 1
        assert "The second value is bigger" in console.messages

    def test_values_are_equal(self):
        console = FakeConsole([1, 1])

        program(console)

        assert len(console.messages) == 1
        assert "The values are equal" in console.messages

if __name__ == "__main__":
    main()
```

Most developers would come up with the first version without hesitation. Spanning ten lines, it's easy to understand. Even people unfamiliar with Python can grasp it immediately.

The second version looks intimidating filled with classes and abstractions that seem excessive for such a simple problem. Yet crucial design decisions set them apart in code quality.

The first snippet is what I call _everyday design_. Pleasant to look at, easy to change, obviously correct. It _must_ be high-quality code, no?

A developer practising everyday design will write code resembling the first snippet in minutes and feel satisfied.

Then the requirements change. The product owner wants to fetch values from another team's REST API. Or they want to write the output in JSON format. Or they want to store the comparison result in a database.

Now what? You can't easily test the comparison logic in isolation: it's tangled with I/O. You can't reuse the comparison in different contexts without copying and modifying the entire function. Every change requires touching multiple concerns at once.

So, you add a conditional statement here, a new parameter there, maybe a flag to control the output format. The function grows. Before long, you're wrestling with a logic doing everything and testable only by mocking terminal I/O or running end-to-end tests.

If this sounds familiar, you're not alone. The appeal of everyday design is immediacy while the cost is flexibility. Want to know how to improve? Read on.

## It's No Science

A software engineer practising clean design writes the tests for the second snippet first, then writes a crude solution to make them pass, and finally refactors it. Yes, it reminds me of an acronym, but that's not important right now.

The entire activity takes minutes. However, the speed matters less than understanding why most developers revert to everyday design. Many developers I've worked with explain that they need to visualise the solution mentally, load it into their editor, and see if it works. Or rather, whether it doesn't immediately crash.

This experimental approach is perfectly sensible due to its scientific nature:

- First, we set up the experiment.
- Next, we run it.
- Finally, we verify the hypothesis.

However, clean design works differently. One could even say it works in an unscientific manner, and that fact alone makes it particularly challenging for most to ingest.

The first obstacle: we must stop thinking imperatively and focus on declarative specification, or _behaviour_.

That is, instead of thinking through the following steps:

- Ask the user for the first input, and store it.
- Ask the user for the second input, and store it.
- Compare the inputs.
- If the first input is bigger, print _"The first value is bigger"_.
- If the second input is bigger, print _"The second value is bigger"_.
- If the inputs are equal, print _"The values are equal"_.

You must turn it upside down:

For all numbers $(a, b)$, the following behaviour is valid:

- Given $a > b$, return _"The first value is bigger"_.
- Given $a < b$, return _"The second value is bigger"_.
- Given $a = b$, return _"The values are equal"_.

The above is not so clear anymore, is it? Instead of telling you what to do, I'm specifying the expected behaviour of the program.

You may ask me where I get the inputs from, and where I write the result to. It doesn't matter as much as you think. You could pick virtually anything. You could read from and write to a terminal, database, REST API, or a combination of those. The expected behaviour does not change.

However, if you conflate behaviour with verbatim instructions, infrastructure decisions suddenly dictate your design. Instructions do not equal behaviour.

What matters is how declaring the behaviour makes you think of test cases instead of instructions, empowering you to start writing the tests immediately.

When you start writing tests, you work in this strange, unscientific, backwards reality where you:

- State the hypothesis — even though it's always correct.
- Run the experiment.
- Set up the experiment.

I know, I know, you may feel nauseous. Practise this for a day, and you feel pretty uncomfortable. Continue practising it, and the more challenging the problem, the more you're inclined to revert to your old scientific ways and the comfort of everyday design. But like any new diet, practise it diligently for months, and you'll notice a subtle but remarkable difference.

You start distinguishing behaviour from implementation details more easily, resulting in cleaner design. Details like retrieving inputs and writing outputs become less urgent. They _still_ matter when integrating with external systems, but they no longer dictate your design. Thus, you can postpone these decisions until [the last responsible moment](https://blog.codinghorror.com/the-last-responsible-moment/).

For sure, you end up writing more lines of code. Sometimes, when working with verbose languages, ridiculous amounts of extra code are required. However, any system you write is orders of magnitude easier to scale without requiring a complete rewrite.

## How to Start

Let me show you how to write micro-tests using behavioural thinking. We'll start small and build up.

First, think about what is _true_. Not how to implement the solution.

```python
def test_first_value_is_bigger():
    assert compare_values(2, 1) == ValueComparison.Bigger
```

This doesn't pass yet. You don't have the `compare_values()` function, or `ValueComparison` enum. That's fine. Write the test first.

Now make it pass:

```python
from enum import IntEnum

class ValueComparison(IntEnum):
    Bigger = 0
    Smaller = 1
    Equal = 2

def compare_values(a: int, b: int) -> ValueComparison:
    if a > b:
        return ValueComparison.Bigger
```

The test is green. Proceed to the next case.

```python
def test_second_value_is_bigger():
    assert compare_values(1, 2) == ValueComparison.Smaller
```

This doesn't pass yet because the function returns `None` value for this case. Let's fix it:

```python
def compare_values(a: int, b: int) -> ValueComparison:
    if a > b:
        return ValueComparison.Bigger
    if a < b:
        return ValueComparison.Smaller
```

Both tests pass.

Finally, add the equality test, and make it pass. Now you have a `compare_values()` function that's fully tested and completely independent of I/O and usable everywhere.

Eventually, you need to integrate the logic to the infrastructure. In other words, glue [the functional core to the imperative shell](https://www.youtube.com/watch?v=P1vES9AgfC4). The I/O wrappers from the second snippet (`Console` and `FakeConsole`) come into play here. You write another set of tests using the I/O wrappers, and can even discard the first tests since they only served as the design scaffold.

The key in overcoming the pains of creating clean design is to repeat this process vigorously. Every time you design a new feature, start by thinking about the expected behaviour. Write the tests first. Then write the implementation to make them pass. Finally, refactor the design if necessary.

Incidentally, this is precisely why I endorse working on [_programming katas_](https://sammancoaching.org/kata_descriptions/) regularly. Design is not unlike working out. You need to keep on practising your design muscles to allow them to grow.

> But Niko, what's the benefit of this _clean design_? Right now, I can quickly modify my code and see the changes work.

Yes, that's the appeal of everyday design. But here's what I've learnt after years of both approaches:

The everyday design is faster to write **until** the first change request. Then it's slower for every subsequent change. The clean design requires more upfront thought, but each change afterwards is isolated, tested, and safe.

When your product owner says, "Can we make this work with a database instead of terminal input?", the second version changes in one place. The first version requires untangling I/O from logic, adding abstractions you should have had from the start, and rewriting tests that were coupled to implementation details.

When you need to change the output format, the second version changes in one function with its tests already in place. The first version requires carefully editing a function that does everything, hoping you don't break the intertwined concerns.

When a bug appears in production, the second version lets you write a failing test for the comparison logic in seconds. The first version requires mocking I/O just to test whether `5 > 3`.

Go back to those two snippets at the start. Which one can you modify without breaking? Which one can you test in isolation? Which one will you still understand when you're debugging at 3 AM?

The everyday design is faster to write once and throw away. It's only value is that of a prototype. The clean design is more resilient to change, easier to test, and joy to maintain. When you're building software that needs to last longer than a weekend, that difference compounds exponentially.

You don't need to write perfect code on day one. But you do need to separate behaviour from infrastructure. Test the behaviour. Make the infrastructure swappable. Everything else follows from that.

Start small. Pick one function tomorrow. Write the test first. See what design emerges. You might be surprised how natural it feels after the initial discomfort fades.
