---
title: Test-Driven Development on a Bus Ride to Hell
author: Niko Heikkilä
lang: en
type: post
date: 2022-09-17
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/test-driven-development-on-a-bus-ride-to-hell.jpg
excerpt: |
    Want to learn TDD while saving innocent civilians from dying?
    Hop on board the bus!
---

I'm going to admit something: I had trouble understanding test-driven development (TDD) and it took me a long time to get over it.

TDD felt mysterious, confusing, and painful. Yet, I was fascinated in 1) all the testimonies of people who practised it and kept their codebase in great shape, and 2) its nature of turning upside down the way I build software. The latter reminded me of the first steps I took with functional programming and writing functions in declarative style in contrast to imperative style. I had to detach my brains from the skull, turn them around, and place them back in — figuratively speaking, of course.

So I tried to practice TDD from time to time. I failed again and again.

Driving the design of my code through tests was intimidating and challenging. However, when I finally understood that I was working with too massive batches (_commits_) and started to radically look at decreasing the feedback loop, it got gradually easier. Today, I use TDD for _almost_ all the code I write.

You may be stuck in that particular quagmire too. Chances are you are asking yourself the following questions:

-   how can I split this feature into smaller tasks?
-   what test should I write first?
-   how do I organise my test code?
-   what should I assert if my logic is not yet completed?

To help you start the journey, I've written a tutorial on how to approach writing tests before the production code in tiny batches. Fasten your seatbelts, we're going on a ride but I assure you it's going to be smooth.

## Prerequisites

Before continuing, I expect you know your way around the basic Git commands and Python programming language, which we use as examples here.

The outline of this tutorial is to follow the Red-Green cycles by first writing a failing test and then making it pass by writing simple production code. After each failing test, we record our changes in a new micro-commit — think it as a commit but a very small one.

> If you're interested in how I work with small commits, read my earlier post about [**micro-commits**](/blog/a-practical-guide-to-micro-commits/).

You don't necessarily need to have watched the fantastic Oscar-winning film [**Speed (1994)**](https://www.imdb.com/title/tt0111257/) directed by **Jan de Bont**, and starring **Keanu Reeves** and **Sandra Bullock**, but it might help you to tune into the atmosphere.

## Requirements

> "When a young Los Angeles police department, Special Weapons and Tactics (SWAT) officer called Jack Traven angers retired Atlanta police department bomb squad member Howard Payne, by foiling his attempt at taking hostages stuck in an elevator with a bomb, Payne in retaliation arms a bus with a bomb that will explode if it drops below 50 miles per hour. With the help of spunky passenger Annie, Jack and his partner Detective Harry Temple try to save the people on the bus before the bomb goes off, while also trying to figure out how Payne is monitoring them."

We can extract the following testable acceptance criteria from the film's storyline.

-   [ ] The bus accepts passengers on board.
-   [ ] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [ ] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [ ] There is an unarmed bomb installed on the bus.
-   [ ] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

We will start modelling these expectations in our test code and solve one problem at a time with a minimal amount of production code.

The process of extracting automatically testable tasks from a list of requirements is inspired by the book [**Learning Test-Driven Development**](https://www.oreilly.com/library/view/learning-test-driven-development/9781098106461/) by **Saleem Siddiqui**. I warmly recommended reading that book if you regularly work with Javascript, Python, or Golang and are interested in TDD.

Throughout the upcoming sections, I will denote with a red circle 🔴 when we write a test and expect it fail. Consequently, I denote with a green circle 🟢 when we expect to make the test pass.

Contrary to some TDD guides, I won't stop and refactor after every green step. I consider that to be a limiting practice. Instead, I will save the refactoring as the last step when I have a full confidence in my implementation.

If you want to dig directly into the source code, check out the code in [**GitHub**](https://github.com/nikoheikkila/speed-tdd).

### 1. The bus accepts passengers

Our first task is to define an interface for our bus. It should also be helpful to our society and pick up passengers.

🔴 We write a failing test, which exercises this behaviour. The bus picks up a passenger, and we verify that the passenger is indeed on the bus. The test fails because we haven't defined our `Bus` and `Passenger` classes.

```diff-python
+from speed_tdd.bus import Bus, Passenger
+
+def test_bus_accepts_passengers() -> None:
+    bus = Bus()
+    passenger = Passenger()
+
+    bus.pick(passenger)
+
+    assert passenger in bus.passengers
```

🟢 A minimum amount of code to make the test pass includes both classes and a method to pick up a passenger. We don't care about passenger details now and leave it empty. We choose to place the passengers in a set object instead of a list, although for our use case, it doesn't matter, and the data structure is easy to refactor later if needed.

```diff-python
+class Passenger:
+    pass
+
+class Bus:
+    passengers: set[Passenger]
+
+    def __init__(self) -> None:
+        self.passengers = set()
+
+    def pick(self, passenger: Passenger) -> None:
+        self.passengers.add(passenger)
```

### 2. The bus can accelerate to a given speed

-   [x] The bus accepts passengers on board.
-   [ ] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [ ] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [ ] There is an unarmed bomb installed on the bus.
-   [ ] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

Now that our bus can pick up passengers, it would be great if it could also take them to their destination. But, following the laws of physics, it must naturally accelerate to a given speed to comply with that requirement.

🔴 Our test accelerates the bus to 20 miles per hour and verifies that it is achieved. Unfortunately, the test fails because no method `accelerate()` is defined for the bus.

```diff-python
+def test_bus_can_accelerate_to_given_speed() -> None:
+    bus = Bus()
+    bus.accelerate(20)
+
+    assert bus.speed == 20
```

🟢 To make the test pass, we must store the bus speed in class context. Then we define the method to accelerate the bus to whatever speed we have. Finally, we discard the laws of physics momentarily to get to our goal.

```diff-python
class Passenger:
    pass

class Bus:
+   speed: int
    passengers: set[Passenger]

    def __init__(self) -> None:
+       self.speed = 0
        self.passengers = set()

    def pick(self, passenger: Passenger) -> None:
        self.passengers.add(passenger)

+    def accelerate(self, speed: int) -> None:
+        self.speed = speed
```

### 3. The bus cannot accelerate to a lower speed

It wouldn't make much sense to accelerate the bus and see it suddenly slow down. Of course, such a bus would need immediate repairing, but as software engineers, we are here to craft infallible buses!

🔴 Our test first accelerates the bus to 20 miles per hour and then back to 10 miles per hour. Our test fails because it is possible to do so against all common sense.

```diff-python
+def test_bus_cannot_accelerate_to_lower_speed() -> None:
+    bus = Bus()
+    bus.accelerate(20)
+    bus.accelerate(10)
+
+    assert bus.speed == 20
```

🟢 We write a simple one-line check to disallow slowing the bus down when accelerating. Now we realize this sounds rather dangerous.

```diff-python
class Bus:

    def accelerate(self, speed: int) -> None:
+        if speed > self.speed:
            self.speed = speed
```

### 4. The bus can decelerate to a given speed

-   [x] The bus accepts passengers on board.
-   [x] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [ ] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [ ] There is an unarmed bomb installed on the bus.
-   [ ] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

As it stands, our bus cannot slow down at all and is a severe threat to the lives of its passengers. That's not good. We must do something!

🔴 We write a test which first accelerates the bus to 20 miles per hour and then decelerates it to 10 miles per hour. Unfortunately, it fails because we don't have a `decelerate()` method defined for our `Bus` class.

```diff-python
+def test_bus_can_decelerate_to_given_speed() -> None:
+    bus = Bus()
+    bus.accelerate(20)
+    bus.decelerate(10)
+
+    assert bus.speed == 10
```

🟢 It's easy to pass the test by simply copying the acceleration logic to a new method. Moreover, we always want to ensure we don't overstay our welcome in the red phase.

```diff-python
class Bus:

+    def decelerate(self, speed: int) -> None:
+       self.speed = speed
```

### 5. The bus cannot decelerate to a higher speed

What would happen if you suddenly hit the brakes and the bus would accelerate to ludicrous speeds. A lot of dead folks would happen, I tell you. So to enforce even more safety, we should ensure our brakes don't accidentally increase the speed.

🔴 We write a test that accelerates the bus to 20 miles per hour and decelerates it to 30 miles per hour. It fails because the operation is possible.

```diff-python
+def test_bus_cannot_decelerate_to_higher_speed() -> None:
+    bus = Bus()
+    bus.accelerate(20)
+    bus.decelerate(30)
+
+    assert bus.speed == 20
```

🟢 We do another quick one-line check to disable that, and our test now passes.

```diff-python
class Bus:

    def decelerate(self, speed: int) -> None:
+       if speed < self.speed:
            self.speed = speed
```

### 6. The bus has an unarmed bomb on board

-   [x] The bus accepts passengers on board.
-   [x] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [x] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [ ] There is an unarmed bomb installed on the bus.
-   [ ] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

Finally, the plot thickens! There is a bitter older man portrayed by excellent **Dennis Hopper** who would like to blow us to smithereens. They have installed an explosive into our bus. Fortunately for us, it's yet to be armed.

🔴 We write a test that assumes we have the unarmed bomb on board. It fails because that is not the case right now. It's not the most comfortable test to make passing, but we didn't choose the requirements here.

```diff-python
+def test_bus_has_an_unarmed_bomb() -> None:
+    bus = Bus()
+
+    assert bus.bomb.is_unarmed
```

🟢 We introduce a new `Bomb` class and inject it into our `Bus` through the constructor. By design, the bomb starts its lifecycle unarmed, which makes our test pass.

```diff-python
+class Bomb:
+    armed: bool
+
+    def __init__(self) -> None:
+       self.armed = False
+
+    @property
+    def is_unarmed(self) -> bool:
+       return self.armed == False

class Passenger:
    pass

class Bus:
    speed: int
    passengers: set[Passenger]
+   bomb: Bomb

    def __init__(self) -> None:
        self.speed = 0
        self.passengers = set()
+       self.bomb = Bomb()
```

### 7. When the bus accelerates to 50 miles per hour, the bomb arms itself

-   [x] The bus accepts passengers on board.
-   [x] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [x] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [x] There is an unarmed bomb installed on the bus.
-   [ ] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

The terrorist has designed the bomb to become armed when our bus accelerates to 50 miles per hour. Makes you hope we would have built the bus to have a maximum speed of 49 miles per hour earlier, don't you?

🔴 We write a test where we accelerate the bus to 50 miles per hour and verify that the bomb is armed afterwards. But, for now, the bomb remains inactive, and our test fails.

```diff-python
+def test_when_the_bus_accelerates_to_50_mph_the_bomb_is_armed() -> None:
+    bus = Bus()
+    bus.accelerate(50)
+
+    assert bus.bomb.is_armed
```

🟢 We make the test pass by checking the received speed instructions and arming the bomb when it exceeds 50 miles per hour. We also make a note of how our code is getting messier due to a nested conditional, but that is perfectly fine at this moment.

```diff-python
class Bomb:

    @property
    def is_unarmed(self) -> bool:
        return self.armed == False

+    @property
+    def is_armed(self) -> bool:
+       return self.armed == True

class Bus:

    def accelerate(self, speed: int) -> None:
        if speed > self.speed:
            self.speed = speed
+           if self.speed >= 50 and self.bomb.is_unarmed:
+               self.bomb.armed = True
```

### 8. When the bomb is armed, and the bus decelerates to 50 miles per hour, the bomb explodes

-   [x] The bus accepts passengers on board.
-   [x] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [x] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [x] There is an unarmed bomb installed on the bus.
-   [x] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [ ] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

To keep us on the edge of the driver's seat, the bomb explodes whenever we decelerate the bus to under 50 miles per hour.

🔴 For now, we resort to expecting an exception called `Explosion` whenever the bomb goes off, even after a minor slowdown. The test fails because our code doesn't raise such an exception.

```diff-python
-from speed_tdd.bus import Bus, Passenger
+from speed_tdd.bus import Bus, Passenger, Explosion
+from pytest import raises

+def test_when_the_bomb_is_armed_and_the_bus_decelerates_to_50_mph_the_bomb_explodes() -> None:
+    bus = Bus()
+    bus.accelerate(51)
+
+    with raises(Explosion):
+       bus.decelerate(50)
```

🟢 To make the test pass, we check that the speed is correct and the bomb is armed. Next, we may rest in peace, unless…

```diff-python
+class Explosion(Exception):
+    pass

class Bus:

    def decelerate(self, speed: int) -> None:
        if speed < self.speed:
            self.speed = speed
+           if self.speed <= 50 and self.bomb.is_armed:
+               raise Explosion()
```

### 9. Belay that order! — the hero can still save the day

We have happily neglected our passengers and forgotten that **Keanu Reeves** has onboarded our bus. So indeed, we are going to be saved now.

🔴 We write a slightly longer test to nail our final requirement. Whenever our bomb is about to go off, **Jack Traven / Neo / John Wick** intervenes, magically charms all the passengers out of the bus, and lets the empty bus explode. However, our test fails because we are still raising the explosion.

```diff-python
+def test_hero_can_save_the_day_from_bus_explosion() -> None:
+    bus = Bus()
+    sandra_bullock = Passenger(name="Sandra Bullock")
+    keanu_reeves = Passenger(name="Keanu Reeves")
+
+    bus.pick(sandra_bullock)
+    bus.pick(keanu_reeves)
+
+    bus.accelerate(51)
+    bus.decelerate(50)
+
+    assert bus.bomb.is_exploded
+    assert sandra_bullock.is_alive
+    assert keanu_reeves.is_alive
```

🟢 To make the test pass, we start tracking a separate state for our bomb. It can be either unarmed, armed, or exploded. Unfortunately, boolean flags are not very good for this purpose, but we'll fix that later. We also add the missing functionality to our `Passenger` class. All the passengers now have names, and some named **Keanu Reeves** are our heroes. Our lives are saved whenever such a hero is on board the bus when the bomb goes off. Cool!

```diff-python
class Bomb:
    armed: bool
+   exploded: bool

    def __init__(self) -> None:
        self.armed = False
+       self.exploded = False

    @property
    def is_unarmed(self) -> bool:
        return self.armed == False

    @property
    def is_armed(self) -> bool:
        return self.armed == True

+    @property
+    def is_exploded(self) -> bool:
+       return self.exploded == True

class Passenger:
-    pass
+    name: str
+    is_alive: bool
+
+    def __init__(self, name: str) -> None:
+       self.name = name
+       self.is_alive = True
+
+    @property
+    def is_hero(self) -> bool:
+       return self.name == "Keanu Reeves"

class Bus:
    speed: int
    passengers: set[Passenger]
    bomb: Bomb

    def accelerate(self, speed: int) -> None:
        if speed > self.speed:
            self.speed = speed
            if self.speed >= 50 and self.bomb.is_unarmed:
                self.bomb.armed = True

    def decelerate(self, speed: int) -> None:
        if speed < self.speed:
            self.speed = speed
            if self.speed <= 50 and self.bomb.is_armed:
+               if any(passenger.is_hero for passenger in self.passengers):
+                   self.bomb.exploded = True
+               else:
                    raise Explosion()
```

Right now, there's not much sense in raising any exceptions. Moreover, while practising TDD, we should pay constant attention to our design choices and improve them later as long as we don't break our use cases.

🔴 We verify that our unlucky civilian is killed when the bomb goes off, even though we don't raise an exception. But unfortunately, our test failed again because we raised an unexpected exception.

```diff-python
-from speed_tdd.bus import Bus, Passenger, Explosion
-from pytest import raises
+from speed_tdd.bus import Bus, Passenger

def test_when_the_bomb_is_armed_and_the_bus_decelerates_to_50_mph_the_bomb_explodes() -> None:
    bus = Bus()
+   passenger = Passenger(name="Unlucky Civilian")
+   bus.pick(passenger)
    bus.accelerate(51)

-   with raises(Explosion):
+   bus.decelerate(50)

+   assert bus.bomb.is_exploded
+   assert passenger.is_dead
```

🟢 To make our test pass, we define what it means when our passenger dies. That is, they are not alive, obviously. We also commit an ugly hack to our horrible method, which kills all our passengers in case the bomb goes off.

```diff-python
-class Explosion(Exception):
-    pass

class Passenger:

+    @property
+    def is_dead(self) -> bool:
+       return self.is_alive == False

class Bus:

    def decelerate(self, speed: int) -> None:
        if speed < self.speed:
            self.speed = speed
            if self.speed <= 50 and self.bomb.is_armed:
-               if any(passenger.is_hero for passenger in self.passengers):
                    self.bomb.exploded = True
+               if any(passenger.is_hero for passenger in self.passengers):
+                   pass
                else:
-                   raise Explosion()
+                   for passenger in self.passengers:
+                       passenger.is_alive = False
```

## Red-green cycles are done — time to refactor

Looks like we are done here. Time to mark the feature as done and go home? Absolutely not!

-   [x] The bus accepts passengers on board.
-   [x] The bus can accelerate $v_0 \to v_1$ mph, where $v_1 > v_0$.
-   [x] The bus can decelerate from $v_1 \to v_2$, where $v_2 < v_1$.
-   [x] There is an unarmed bomb installed on the bus.
-   [x] When the bomb is unarmed **and** the bus accelerates to $v \geq 50$ mph, the bomb arms itself.
-   [x] When the bomb is armed **and** the bus decelerates to $v \leq 50$, the bomb explodes **unless** there is at least one passenger on the bus who can save the day.

In its current state, our codebase is ghastly with all the magic numbers, nested conditionals, and lack of abstractions. However, as professional software engineers, we should always adhere to the _boy scout rule_:

> "Always leave the ~~campground~~ codebase cleaner than you found it."

Since refactoring is an opinionated business, I will skip the intermediate phases and show you the results directly. We are going to refactor both our production code and test code. While we don't ship the test code, it's imperative to keep it maintainable. How else could we continue fulfilling later requirements?

### Refactoring the test code

The refactoring for our unit tests is below.

```python
from pytest import fixture
from speed_tdd.bus import Bus, Passenger


@fixture
def bus() -> Bus:
    return Bus()


@fixture
def driver() -> Passenger:
    return Passenger(name="Sandra Bullock")


@fixture
def hero() -> Passenger:
    return Passenger(name="Keanu Reeves")


def test_bus_accepts_passengers(bus: Bus, driver: Passenger) -> None:
    bus.pick(driver)

    assert driver in bus.passengers


def test_bus_can_accelerate_to_given_speed(bus: Bus) -> None:
    bus.accelerate(to=20)

    assert bus.driving_at(speed=20)


def test_bus_cannot_accelerate_to_lower_speed(bus: Bus) -> None:
    bus.accelerate(to=20)
    bus.accelerate(to=10)

    assert bus.driving_at(speed=20)


def test_bus_can_decelerate_to_given_speed(bus: Bus) -> None:
    bus.accelerate(to=20)
    bus.decelerate(to=10)

    assert bus.driving_at(speed=10)


def test_bus_cannot_decelerate_to_higher_speed(bus: Bus) -> None:
    bus.accelerate(to=20)
    bus.decelerate(to=30)

    assert bus.driving_at(speed=20)


def test_bus_has_an_unarmed_bomb(bus: Bus) -> None:
    assert not bus.can_explode


def test_when_the_bus_accelerates_to_50_mph_the_bomb_is_armed(bus: Bus) -> None:
    bus.accelerate(to=50)

    assert bus.can_explode


def test_when_the_bomb_is_armed_and_the_bus_decelerates_to_50_mph_the_bomb_explodes(
    bus: Bus, driver: Passenger
) -> None:
    bus.pick(driver)

    bus.accelerate(to=51)
    bus.decelerate(to=50)

    assert bus.is_exploded
    assert driver.is_dead


def test_hero_can_save_the_day_from_bus_explosion(
    bus: Bus, driver: Passenger, hero: Passenger
) -> None:
    bus.pick(driver, hero)

    bus.accelerate(to=51)
    bus.decelerate(to=50)

    assert bus.is_exploded
    assert driver.is_alive
    assert hero.is_alive
```

**What did we do?**

-   Use test fixtures to inject the bus, the driver, and the hero into our tests. I recommended using injectable test fixtures in any test framework you are using to keep the setup phase thin and tests readable.
-   Arranged the test code to _Arrange-Act-Assert_ blocks for improved readability.

### Refactoring the production code

The refactoring result for our production code is below.

```python
from dataclasses import dataclass
from enum import IntEnum


class BombState(IntEnum):
    UNARMED = 1
    ARMED = 2
    EXPLODED = 3


@dataclass
class Bomb:
    state: BombState = BombState.UNARMED
    trigger_speed: int = 50

    def arm(self) -> None:
        self.state = BombState.ARMED

    def explode(self) -> None:
        self.state = BombState.EXPLODED

    @property
    def is_unarmed(self) -> bool:
        return self.state == BombState.UNARMED

    @property
    def is_armed(self) -> bool:
        return self.state == BombState.ARMED

    @property
    def is_exploded(self) -> bool:
        return self.state == BombState.EXPLODED


@dataclass(unsafe_hash=True)
class Passenger:
    name: str
    is_alive: bool = True

    def kill(self) -> None:
        self.is_alive = False

    @property
    def is_hero(self) -> bool:
        return self.name == "Keanu Reeves"

    @property
    def is_dead(self) -> bool:
        return not self.is_alive


class Bus:
    speed: int
    passengers: set[Passenger]
    bomb: Bomb

    def __init__(self) -> None:
        self.speed = 0
        self.passengers = set()
        self.bomb = Bomb()

    def pick(self, *passengers: Passenger) -> None:
        for passenger in passengers:
            self.passengers.add(passenger)

    def accelerate(self, to: int) -> None:
        if to > self.speed:
            self.speed = to

        if self.should_arm_bomb:
            self.bomb.arm()

    def decelerate(self, to: int) -> None:
        if to < self.speed:
            self.speed = to

        if self.should_explode:
            self.explode()

    def explode(self) -> None:
        self.bomb.explode()

        if not self.is_hero_onboard:
            self.kill_all_passengers()

    def kill_all_passengers(self) -> None:
        [passenger.kill() for passenger in self.passengers]

    def driving_at(self, speed: int) -> bool:
        return self.speed == speed

    @property
    def should_arm_bomb(self) -> bool:
        return self.bomb.is_unarmed and self.speed >= self.bomb.trigger_speed

    @property
    def should_explode(self) -> bool:
        return self.bomb.is_armed and self.speed <= self.bomb.trigger_speed

    @property
    def is_hero_onboard(self) -> bool:
        return any(passenger.is_hero for passenger in self.passengers)

    @property
    def can_explode(self) -> bool:
        return self.bomb.is_armed

    @property
    def is_exploded(self) -> bool:
        return self.bomb.is_exploded
```

**What did we do?**

-   Replace the boolean flags controlling the `Bomb` state with a standard integer enumeration.
-   Save the trigger speed of 50 miles per hour as a constant to the `Bomb` class.
-   Convert the regular `Bomb` and `Passenger` classes to Python's data classes and eliminate the redundant constructors.
-   Split the core logic from nested conditionals to tiny methods and getters (dynamic properties).

## Homework

Our bus is clearly an MVP, but it successfully transports people somewhere, even though endangering their lives.

What else could we build with our tests? Below are some suggestions, which I leave unimplemented for the sake of this tutorial's brevity.

-   The bus explicitly has a driver and cannot travel without one.
-   The bus has a maximum speed it can travel.
-   The bus cannot travel at a negative speed.
-   Unarmed bombs cannot explode.
-   Armed bombs can be disarmed.
-   The bomb can be removed from the bus.
-   Exploded bombs cannot become unarmed or armed again.
-   The exploded bus cannot be driven again.
-   Dead passengers cannot ride onboard the bus — unless it's a Halloween-themed sequel.
-   Keanu Reeves is not the only hero in the world.

If you want to practice, fork the repository, implement the code according to TDD and requirements and show me the results.

## Conclusion

In this tutorial, I have shown you the power of TDD as a solid engineering technique when slicing features.

Typically, we start our work with a list of requirements that users or stakeholders would like to see us implement. Next, we have to devise clever ways to make each slice a deliverable item that our users can try out. Then, and only then, can we achieve actionable feedback and correct the course we are on. This is radically agile software development, which many organisations fail to follow because they deliver too large batches too late.

When I started grasping TDD and micro-commits, the notion of continuously integrating our work and delivering it to users — **the absolute CI/CD** — started to feel less intimidating and more like a safety harness protecting me against bad decisions.

I'm not looking back to the world of test-last development, big batches, continuous isolation, and eventually broken delivery; I hope after reading this tutorial, you share the same point of view with me.
