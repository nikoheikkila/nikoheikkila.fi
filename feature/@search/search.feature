Feature: Post search
  Visitors search the blog's posts by keyword and open a matching post from the results.

  Scenario Outline: Searching for a known term lists matching posts
    Given the visitor is browsing on a "<device>"
    And the visitor is on the "home page"
    When the visitor searches for "software"
    Then the search results list matching posts

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Searching for an unknown term reports no results
    Given the visitor is on the "home page"
    When the visitor searches for "xyznonexistent123"
    Then the search results report that no posts match

  Scenario Outline: Opening a search result
    Given the visitor is browsing on a "<device>"
    And search results for "software" are shown
    When the visitor opens the first search result
    Then the visitor is reading a post
    And the search results are closed

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Opening a search result with the keyboard
    Given search results for "software" are shown
    When the visitor moves to the first search result with the arrow keys
    And the visitor confirms the choice with Enter
    Then the visitor is reading a post

  Scenario Outline: Dismissing the search results
    Given search results for "software" are shown
    When the visitor dismisses the search results by "<method>"
    Then the search results are closed

    Examples:
      | method                   |
      | pressing Escape          |
      | clicking outside of them |
