Feature: Post search
  Visitors search the blog's posts by keyword and open a matching post from the results.

  Scenario Outline: Searching for a known term lists matching posts
    Given the visitor is browsing on a <device>
    And the visitor is on the home page
    When the visitor searches for "software"
    Then the visitor sees the search results

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Searching for an unknown term reports no results
    Given the visitor is on the home page
    When the visitor searches for "xyznonexistent123"
    Then the visitor sees a no results message

  Scenario Outline: Opening a search result
    Given the visitor is browsing on a <device>
    And the visitor has searched for "software"
    When the visitor follows the first search result link
    Then the visitor is on a post page
    And the search results are hidden

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Opening a search result with the keyboard
    Given the visitor has searched for "software"
    And the first search result is focused
    When the visitor presses "Enter"
    Then the visitor is on a post page

  Scenario Outline: Dismissing the search results
    Given the visitor has searched for "software"
    When the visitor dismisses the search results by <method>
    Then the search results are hidden

    Examples:
      | method                    |
      | pressing Escape           |
      | clicking outside focus    |
      | clicking the close button |

  Scenario: Submitting an empty search shows no results
    Given the visitor is on the home page
    When the visitor submits an empty search
    Then the search results are hidden

  Scenario: Focus returns to the search box after dismissing the results
    Given the visitor has searched for "software"
    When the visitor presses "Escape"
    Then the search box is focused
