Feature: Feeds and crawler files
  The blog publishes an RSS feed, a sitemap, and crawler rules, so visitors can follow new posts in a feed reader
  and find them through search engines.

  Scenario: Feed reader receives the RSS feed
    When a feed reader fetches the RSS feed
    Then the response is a valid XML document

  Scenario: Search engine receives the sitemap
    When a search engine fetches the sitemap
    Then the response is a valid XML document

  Scenario: Search engine receives the crawler rules
    When a search engine fetches the crawler rules
    Then the crawler rules match the approved version
