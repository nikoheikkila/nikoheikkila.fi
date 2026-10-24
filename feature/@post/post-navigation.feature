Feature: Moving between posts
  At the end of a post, visitors find links to the chronologically older and newer posts.

  Scenario: Post with neighbours links to the older and the newer post
    When the visitor opens a post that has both older and newer posts
    Then the visitor sees a link to the older post
    And the visitor sees a link to the newer post

  Scenario Outline: Following a link to a neighbouring post
    Given the visitor is reading a post that has both older and newer posts
    When the visitor follows the link to the "<neighbour>" post
    Then the visitor is reading the post named in the link

    Examples:
      | neighbour |
      | older     |
      | newer     |

  Scenario: Oldest post links only to a newer post
    When the visitor opens the oldest post
    Then there is no link to an older post
    And the visitor sees a link to the newer post
