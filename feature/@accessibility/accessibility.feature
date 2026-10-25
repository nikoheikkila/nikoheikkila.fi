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
      | Now page          |
      | Testimonials page |

  # WebKit, like Safari, does not move Tab focus to links, so the webkit project skips this tag.
  @tabs-to-links
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

  Scenario: Open search results meet WCAG 2.2 AA
    Given the visitor has searched for "software"
    Then the page has no accessibility violations

  Scenario: Open sidebar menu meets WCAG 2.2 AA
    Given the visitor has the sidebar menu open
    Then the page has no accessibility violations

  Scenario: Keyboard focus stays inside the open search results
    Given the visitor has searched for "software"
    When the visitor presses "Shift+Tab"
    Then focus stays within the search results
