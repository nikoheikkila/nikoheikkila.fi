Feature: External links
  Links that leave the blog open in a separate, isolated tab, so the visitor keeps their place on the blog.

  Scenario: Visitor can edit pages
    Given the visitor is on the latest post
    When the visitor follows the external "Edit Page" link
    Then the GitHub text editor opens in a new tab
    And the latest post is open in the original tab

  Scenario: Visitors can view page history
    Given the visitor is on the latest post
    When the visitor follows the external "View History" link
    Then the GitHub commits listing opens in a new tab
    And the latest post is open in the original tab

  Scenario: Skills menu item opens the CV site in a new tab
    Given the visitor has the sidebar menu open
    When the visitor follows the external "Skills" link
    Then LinkedIn opens in a new tab
