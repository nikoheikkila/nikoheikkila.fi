Feature: Cover images
  Posts and pages open with a cover image that decorates the page without distracting screen reader users.

  Scenario Outline: Cover image is decorative
    When the visitor opens the <page>
    Then the visitor sees the cover image
    And the cover image is hidden from screen readers

    Examples:
      | page        |
      | latest post |
      | About page  |

  Scenario: Page cover image loads
    When the visitor opens the About page
    Then the cover image is loaded
