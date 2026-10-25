Feature: Site navigation
  Visitors reach the site's sections from the sidebar menu and find social profiles and the RSS feed in the footer.

  Scenario Outline: Opening the sidebar menu
    Given the visitor is browsing on a <device>
    And the visitor is on the home page
    When the visitor opens the sidebar menu
    Then the visitor sees the sidebar menu

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario Outline: Closing the sidebar menu by clicking outside it
    Given the visitor is browsing on a <device>
    And the visitor has the sidebar menu open
    When the visitor clicks outside the sidebar menu
    Then the sidebar menu is closed

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Footer links to the author's social profiles
    Given the visitor is on the home page
    When the visitor scrolls to the footer
    Then the visitor sees the social profile links

  Scenario Outline: Subscribing to the RSS feed from the footer
    Given the visitor is browsing on a <device>
    And the visitor is on the home page
    When the visitor follows the RSS link in the footer
    Then the visitor arrives at the linked page

    Examples:
      | device  |
      | desktop |
      | phone   |

  Scenario: Visiting a page from the sidebar menu
    Given the visitor has the sidebar menu open
    When the visitor follows the "The Story" link in the sidebar menu
    Then the visitor is at the About page

  Scenario: Closing the sidebar menu with the menu button
    Given the visitor has the sidebar menu open
    When the visitor closes the sidebar menu
    Then the sidebar menu is closed

  Scenario: Cover image leads back to the home page
    Given the visitor is on the second index page
    When the visitor follows the cover image link
    Then the visitor is at the home page

  Scenario: Reading the author's story from the home page
    Given the visitor is on the home page
    When the visitor follows the link to the author's story
    Then the visitor is at the About page
