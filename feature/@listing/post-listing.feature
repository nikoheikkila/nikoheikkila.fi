Feature: Post listing
  Visitors browse the latest posts on numbered index pages that hold thirty posts each.

  Scenario Outline: Home page lists the latest posts
    Given the visitor is browsing on a <device>
    When the visitor opens the home page
    Then the visitor sees 30 posts

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Moving to the next index page
    Given the visitor is browsing on a <device>
    And the visitor is on the home page
    When the visitor follows the link to the next index page
    Then the visitor is at "/2/"

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Returning to the previous index page
    Given the visitor is browsing on a <device>
    And the visitor is on the second index page
    When the visitor follows the link to the previous index page
    Then the visitor is at "/"

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: First index page has no previous page
    When the visitor opens the home page
    Then the visitor sees no link to the previous index page

  Scenario: Last index page has no next page
    When the visitor opens the last index page
    Then the visitor sees no link to the next index page

  Scenario: Last index page links back to the previous page
    Given the visitor is on the last index page
    When the visitor follows the link to the previous index page
    Then the visitor sees a link to the next index page

  Scenario: Second index page links to its neighbours
    When the visitor opens the second index page
    Then the visitor sees a link to the previous index page
    And the visitor sees a link to the next index page
