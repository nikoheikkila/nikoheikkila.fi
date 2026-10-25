Feature: Search engine and link previews
  Posts and the home page describe themselves to search engines and social media, so visitors see an accurate
  title, description, and image before they arrive.

  Scenario: Post description matches its excerpt
    When the visitor opens the latest post
    Then the search description matches the post excerpt

  Scenario: Link preview matches the post
    When the visitor opens the latest post
    Then the link preview title matches the post heading
    And the link preview address matches the post address

  Scenario: Link preview presents the post as an article
    When the visitor opens the latest post
    Then the link preview type is "article"
    And the link preview author is "Niko Heikkilä"
    And the link preview image is served over HTTPS

  Scenario: Structured data describes the post
    When the visitor opens the latest post
    Then the structured data names the website at the post address
    And the structured data includes a breadcrumb trail

  Scenario: Home page has a title and a description
    When the visitor opens the home page
    Then the page title is not empty
    And the search description is not empty
