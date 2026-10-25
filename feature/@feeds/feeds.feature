Feature: Feeds and crawler files
  The blog publishes an RSS feed, a sitemap, and crawler rules, so visitors can follow new posts in a feed reader
  and find them through search engines.

  Scenario: RSS feed is readable by feed readers
    When a feed reader fetches the RSS feed
    Then the RSS feed is well-formed

  Scenario: Sitemap is readable by search engines
    When a search engine fetches the sitemap
    Then the sitemap is well-formed

  Scenario: Crawler rules match the approved version
    When a crawler fetches the crawler rules
    Then the response matches the approved version

  Scenario: RSS feed announces the latest post
    When a feed reader fetches the RSS feed
    Then the newest item in the feed is the latest post
