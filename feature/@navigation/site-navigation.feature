Feature: Site navigation
  Visitors reach the site's sections from the sidebar menu and find social profiles and the RSS feed in the footer.

  Scenario Outline: Opening the sidebar menu
    Given the visitor is browsing on a "<device>"
    And the visitor is on the "home page"
    When the visitor opens the sidebar menu
    Then the visitor sees the sidebar menu

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Closing the sidebar menu by clicking outside it
    Given the visitor is browsing on a "<device>"
    And the sidebar menu is open
    When the visitor clicks outside the sidebar menu
    Then the sidebar menu is closed

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Footer links to the author's social profiles
    Given the visitor is on the "home page"
    When the visitor scrolls to the footer
    Then the footer links to the author's social profiles

  Scenario Outline: Subscribing to the RSS feed from the footer
    Given the visitor is browsing on a "<device>"
    And the visitor is on the "home page"
    When the visitor follows the RSS link in the footer
    Then the visitor sees the RSS feed

    Examples:
      | device  |
      | desktop |
      | phone   |
