Feature: Feeds and crawler files
  The blog publishes an RSS feed, a sitemap, and crawler rules, so visitors can follow new posts in a feed reader
  and find them through search engines.

  Scenario: RSS feed is a valid XML document
    When the visitor fetches "/rss.xml"
    Then the response is a valid XML document

  Scenario: Sitemap is a valid XML document
    When the visitor fetches "/sitemap-index.xml"
    Then the response is a valid XML document

  Scenario: Crawler rules match the approved version
    When the visitor fetches "/robots.txt"
    Then the response matches the approved version
