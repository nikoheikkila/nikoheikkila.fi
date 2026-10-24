Feature: Page not found
  Visitors who reach an address without content see an error page that leads them back to the posts.

  Scenario: Missing page shows the 404 page
    When the visitor lands on "/this-page-does-not-exist/"
    Then the response status is 404
    And the page title is "Page Not Found"
    And the visitor sees a heading "You have erred"
    And the visitor sees a text "ERR_CONTENT_NOT_FOUND"

  Scenario: Returning home from the 404 page
    Given the visitor is on "/this-page-does-not-exist/"
    When the visitor follows the "Home" link
    Then the visitor is at "/"
