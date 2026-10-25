Feature: Reading posts
  Visitors read a post, follow its history on GitHub, and subscribe to new posts through RSS.

  Scenario: Home page allows navigating to a post
    Given the visitor is on the home page
    When the visitor opens the latest post
    Then the visitor sees the post title as the main heading

  Scenario: Subscribing to the RSS feed from a post
    Given the visitor is on the latest post
    When the visitor follows the RSS feed link
    Then the visitor arrives at the linked page

