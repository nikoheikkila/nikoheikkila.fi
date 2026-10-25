Feature: Page not found
  Visitors who reach an address without content see an error page that leads them back to the posts.

  Scenario: Missing page shows the 404 page
    When the visitor opens a page that does not exist
    Then search engines are told the page does not exist
    And the page title is "Page Not Found"
    And the visitor sees a heading "You have erred"
    And the visitor sees that the content was not found

  Scenario: Returning home from the 404 page
    Given the visitor is on a page that does not exist
    When the visitor follows the link to the home page
    Then the visitor is at the home page
