Feature: Moving between posts
  At the end of a post, visitors find links to the chronologically older and newer posts.

  Scenario: Post with neighbours links to the older and the newer post
    When the visitor opens the middle post
    Then the visitor sees a link to the older post
    And the visitor sees a link to the newer post

  Scenario Outline: Following a link to a neighbouring post
    Given the visitor is on the middle post
    When the visitor follows the link to the <neighbour> post
    Then the visitor arrives at the linked page

    Examples:
      | neighbour |
      | older     |
      | newer     |

  Scenario: Oldest post links only to a newer post
    When the visitor opens the oldest post
    Then the visitor sees no link to the older post
    And the visitor sees a link to the newer post

  Scenario: Latest post links only to an older post
    When the visitor opens the latest post
    Then the visitor sees a link to the older post
    And the visitor sees no link to the newer post

  Scenario: Standalone page has no post navigation
    When the visitor opens the Testimonials page
    Then the visitor sees no link to the older post
    And the visitor sees no link to the newer post
