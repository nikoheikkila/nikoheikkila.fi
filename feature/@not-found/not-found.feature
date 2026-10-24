Feature: Page not found
  Visitors who reach an address without content see an error page that leads them back to the posts.

  Scenario: Unknown address shows the not-found page
    When the visitor opens an address that does not exist
    Then the response status is 404
    And the page title is "Page Not Found"
    And the visitor sees the heading "You have erred"
    And the visitor sees the error code "ERR_CONTENT_NOT_FOUND"

  Scenario: Returning home from the not-found page
    Given the visitor is on the not-found page
    When the visitor follows the "home" link
    Then the visitor sees the "Latest Articles" listing

  Scenario: Searching from the not-found page
    Given the visitor is on the not-found page
    When the visitor searches for "Neovim"
    Then the search results list matching posts
