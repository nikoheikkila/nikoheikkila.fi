Feature: Search engine and link previews
  Posts and the home page describe themselves to search engines and social media, so visitors see an accurate
  title, description, and image before they arrive.

  Scenario: Search engine describes a post with its excerpt
    When a search engine indexes the "latest post"
    Then the post's search description matches its excerpt

  Scenario: Shared post link shows a rich preview
    When a social media service previews a link to the "latest post"
    Then the link preview title matches the post's heading
    And the link preview presents the post as an article by "Niko Heikkilä"
    And the link preview points to the post's address
    And the link preview image is served over HTTPS

  Scenario: Search engine sees where a post sits on the site
    When a search engine indexes the "latest post"
    Then the post's structured data names the website at the post's address
    And the post's structured data includes a breadcrumb trail

  Scenario: Home page has a title and a description
    When a search engine indexes the "home page"
    Then the page has a title
    And the page has a search description
