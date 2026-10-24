Feature: External links
  Links that leave the blog open in a separate, isolated tab, so the visitor keeps their place on the blog.

  Scenario: External link in a post opens in a new tab
    Given the visitor is reading the post "Hello, Neovim, My Old Friend"
    When the visitor follows the link to "the source code"
    Then GitHub opens in a new tab isolated from the blog
    And the post stays open in the original tab

  Scenario: Skills menu item opens the CV site in a new tab
    Given the sidebar menu is open
    When the visitor follows the "Skills" menu item
    Then the CV site opens in a new tab isolated from the blog
