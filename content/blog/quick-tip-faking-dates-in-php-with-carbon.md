---
lang: en
title: "Quick Tip: Faking Dates in PHP with Carbon"
author: Niko Heikkilä
type: post
date: 2018-06-24
hero: https://r2.nikoheikkila.fi/quick-tip-faking-dates-in-php-with-carbon.jpg
excerpt: Often there are scenarios where our code depends on the current time. Carbon handles this eloquently.
---

Often there are scenarios where our code depends on the current time. Most programming languages handle datetime parsing pretty eloquently but a demand for simpler more humane date libraries have arisen. One of the best date libraries I've used is [Carbon][1] by **Brian Nesbitt** which could be briefly described as PHP's `DateTime` for humans. It's a must-to-have tool if you're developing anything complex with Laravel.

Suppose your project includes a routine that needs to save a new row to database _but_ only on specified working days (no weekends, no public holidays). It's trivial to implement date validation by calling, for example, `Carbon::today()` which returns a new object representing the current day.

For asserting that your logic works as intended you would write unit tests as usual. However, you might end up in a situation where your unit tests would fail if the current day is a non-working day. Next, imagine you're practicing continous delivery – like you probably should – and you can't deploy a critical fix to production until tomorrow because of a failing pipeline. How would you explain this to the client? You would probably mark this test as incomplete so the entire pipeline could pass even if a single unit test would fail.

Fortunately, Carbon offers a straightforward solution for faking dates in unit tests. You only need to mock the current date to a given Carbon instance with [`setTestNow()`][2] method like so:

```php
// Set test date to 12:00 on 18th June, 2018
$testDate = Carbon::create(2018, 6, 18, 12);
Carbon::setTestNow($testDate);

// Execute the logic
BusinessClass::doStuff();

// Check the results
$this->assertDatabaseHas('stuff', [
    // The data you need...
]);

// IMPORTANT: Reset the date to not affect the next test!
Carbon::setTestNow();
```

As you can see, faking dates in tests is very easy. Don't forget to reset the date or you might experience more failing tests.

[1]: https://carbon.nesbot.com/
[2]: https://carbon.nesbot.com/docs/#api-testing
