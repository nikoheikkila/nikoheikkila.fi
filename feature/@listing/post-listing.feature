Feature: Post listing
  Visitors browse the latest posts on numbered index pages that hold thirty posts each.

  Scenario Outline: Home page lists the latest posts
    Given the visitor is browsing on a "<device>"
    When the visitor opens the "home page"
    Then the visitor sees 30 posts

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Moving to the next index page
    Given the visitor is browsing on a "<device>"
    And the visitor is on the "home page"
    When the visitor follows the next index page link
    Then the visitor is on the "second index page"

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Returning to the previous index page
    Given the visitor is browsing on a "<device>"
    And the visitor is on the "second index page"
    When the visitor follows the previous index page link
    Then the visitor is on the "home page"

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: First index page has no previous page
    When the visitor opens the "home page"
    Then there is no link to a previous index page

  Scenario: Last index page has no next page
    When the visitor opens the "last index page"
    Then there is no link to a next index page
    And the previous index page link leads to the "second index page"

  Scenario: Index page opened directly by its address
    When the visitor opens the "second index page"
    Then the visitor sees the "Latest Articles" listing
    And the previous index page link leads to the "home page"
    And the next index page link leads to the "third index page"
