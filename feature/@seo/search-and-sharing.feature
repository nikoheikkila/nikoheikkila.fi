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
    Then the link preview presents the post as an article
    And the link preview author is "Niko Heikkilä"
    And the link preview image is served securely

  Scenario: Search engines understand the post's place on the website
    When the visitor opens the latest post
    Then search engines see the post as part of the website
    And search engines see a breadcrumb trail to the post

  Scenario: Home page has a title and a description
    When the visitor opens the home page
    Then the page title is not empty
    And the search description is not empty

  Scenario: Link preview presents a page as a website
    When the visitor opens the About page
    Then the link preview presents the page as a website
