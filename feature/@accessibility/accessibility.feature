Feature: Accessibility
  Visitors using assistive technology or only a keyboard can read and navigate the blog, which meets WCAG 2.2 AA.

  Scenario Outline: Page meets WCAG 2.2 AA
    When the visitor opens the <page>
    Then the page has no accessibility violations

    Examples:
      | page              |
      | home page         |
      | second index page |
      | latest post       |
      | About page        |
      | Uses page         |

  Scenario: Skip link appears on the first Tab press
    Given the visitor is on the home page
    When the visitor presses "Tab"
    Then the skip link is focused

  Scenario: Skip link jumps to the main content
    Given the visitor is on the home page
    And the skip link is focused
    When the visitor presses "Enter"
    Then the main content is in view
    And the page address points to the main content
