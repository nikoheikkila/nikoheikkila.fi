---
lang: en
author: Niko Heikkilä
date: 2022-09-27
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/layman-s-guide-to-higher-order-functions.jpg
title: Layman's Guide to Higher-Order Functions
type: post
excerpt: An introduction to higher-order functions I wish I've had in school.
categories:
    - beginners
    - functional programming
    - typescript
    - react
---

The single most important topic in functional programming is to understand what a **function** is. Inherently, a function is a way to map the input value of some type to output value of another type. To put it in other words, you give your function a problem, and it returns a solution.

In mathematics, you may have stumbled upon the formal definition of a function: $f: A \to B$

This is essentially the same as written above. We define a function $f(A)$ accepting a value of type $A$ and returning a value of type $B$. Note that both $A$ and $B$ could be of the same type, but for the sake of this example, we keep them separate.

In programming, problems are bound to grow more difficult over time, and thus solutions grow more complex. Typically, the larger the problem, the larger our function grows in size. Following the principles of _clean code_ — single-responsibility principle, to be accurate — we need to keep in mind that functions should have only one reason to change. Thus, we should split our logic to small cognitively easy pieces.

So, what possibly could help us? Adding more functions!

When solving a large problem, the important approach is to **divide and conquer**. First, break the problem into small parts (_divide_) and then solve each of them one by one (_conquer_). We can use the concept of higher-order functions to achieve this.

## Anatomy of a Higher-Order Function

A _higher-order function_ is defined to have either of the following two properties:

1. It takes one or more functions as its arguments
2. It returns another function (a _closure_)

**React** developers know that for example, the `React.useState` hook for managing component state is a higher-order function since it returns a function used for updating the state.

```typescript
const App = () => {
	const [counter, setCounter] = useState<number>(0);
	// typeof setCounter === 'function'
};
```

At first, higher-order functions seemed to me like an overcomplicated problem-solving tool. Why not write a single function and call other functions from inside? Truthfully speaking, I thought as much about object-oriented programming before grasping how different design patterns improve the code.

This was my mind before I understood the value of declarative programming over imperative. In declarative programming, you define what things _are_, whereas, in imperative programming, you define what things _do_.

Solving problems in a declarative way is a perfect demonstration of divide and conquer. Let's take an example.

## Use Case: Password Validation

Assume we are given a user password for validation. Our function should return `true` if the password is valid, and `false` otherwise. We have received the following requirements for validating passwords:

-   password must contain 12 or more characters
-   password must contain at least one uppercase and one lowercase character
-   password must contain at least one number

What an easy task, you might think. Write a function with a couple of conditional blocks and after having run through all of them return the intended result. Let's grab a keyboard and start defining our function.

```haskell
validate password
    | not (longEnough password)     = false
    | not (hasUpperCase password)   = false
    | not (hasLowerCase password)   = false
    | not (hasNumbers password)     = false
    | otherwise                     = true
```

This is perfectly fine for a lax validation. However, what if requirements keep on coming, and you need to add more and more conditionals into your function? Your function could quickly grow to a convoluted, unmaintainable, and unreadable mess.

One solution is to define each validator as a function and pass it as an argument. The example below is in TypeScript.

```typescript
/** Helper for chaining and printing the validator warnings **/
const warn = (msg: string): boolean => {
	console.warn("Invalid:", msg);
	return false;
};

type Validator = (password: string) => boolean;

const longEnough = (password: string, minLength = 12) =>
	password.length >= minLength ||
	warn(`Password should contain ${minLength} or more characters.`);

const hasUpperCase = (password: string) =>
	/[A-Z]+/.test(password) ||
	warn("Password should have at least one uppercase letter.");

const hasLowerCase = (password: string) =>
	/[a-z]+/.test(password) ||
	warn("Password should have at least one lowercase letter.");

const hasNumbers = (password: string) =>
	/[0-9]+/.test(password) ||
	warn("Password should have at least one number.");

const validator =
	(...fns: Validator[]) =>
	(password: string) =>
		fns.every((fn) => fn(password));

const isValidPassword = validator(
	longEnough,
	hasUpperCase,
	hasLowerCase,
	hasNumbers,
);

const validPasswords = [
	"passwordpassword",
	"Passwordpassword",
	"Passwordpassword1",
].filter(isValidPassword);

console.log("Valid passwords are:", validPasswords);
// Valid passwords are: ['Passwordpassword1']
```

Breaking this down you can see that `longEnough`, `hasUpperCase`, `hasLowerCase`, and `hasNumbers` are each a closure passed to the `validator` function. Using variadic arguments — known as the spread operator (`...`) in JavaScript — we can pass any number of validators and our code takes care of the rest.

The [`Array.prototype.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) function returns `true` if the array satisfies all the conditions passed so here we pass predicate (boolean) functions as conditions.

Another sweet aspect of higher-order functions is the ability to _curry_ your functions. Here we pass our password to the `isValidPassword` function, which itself is built on from curried functions. Doing this, we don't have to define the validation rules again each time we wish to validate a given password. This makes the code easier to read again.

Perhaps your head is spinning fast right now, so let's write the validate function without the ES6 arrow notation to examine it further.

```typescript
function validator(...fns: Validator[]) {
    return function(password: string) {
        return fns.every(function(fn) {
            return fn(password);
        };
    };
};
```

After removing the arrows, we have a function satisfying both pre-conditions of being a higher-order function. In my opinion, arrow functions have made writing especially JavaScript way more succinct since we can write all of this in one line and without using a single `return` statement. No more nested code, also known as _hadouken_ code.

Higher-order functions provide a clean way of solving a large problem by composing smaller solutions together. Now, instead of having to maintain a long and cumbersome validator function, we can define smaller validators elsewhere in our codebase and import them. Want to remove a certain validation? Remove it from the list of arguments. Need to change how the validation logic? There's no need to touch the main validator at all.

I wrote this post because I had very much trouble understanding different functional programming concepts when studying. Unfortunately, typical computer science education tends to lean on the way of defining high-level theories and proving them using mathematical constructs. This is something you almost certainly won't find in a professional software development environment. If you have managed to achieve such a position without a degree as I have, I hope this post is helpful to you.

---

Cover image by **Ilija Boshkov** on _Unsplash_.
