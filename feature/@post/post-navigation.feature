Feature: Moving between posts
  At the end of a post, visitors find links to the chronologically older and newer posts.

  Scenario: Post with neighbours links to the older and the newer post
    When the visitor opens the "middle post"
    Then the visitor sees the "older post link"
    And the visitor sees the "newer post link"

  Scenario Outline: Following a link to a neighbouring post
    Given the visitor is on the "middle post"
    When the visitor follows the "<neighbour> post" link
    Then the visitor is on the "<neighbour> post"

    Examples:
      | neighbour |
      | older     |
      | newer     |

  Scenario: Oldest post links only to a newer post
    When the visitor opens the "oldest post"
    Then the visitor does not see the "older post link"
    And the visitor sees the "newer post link"
