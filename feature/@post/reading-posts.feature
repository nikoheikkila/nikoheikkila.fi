Feature: Reading posts
  Visitors read a post, follow its history on GitHub, and subscribe to new posts through RSS.

  Scenario: Opening a post from the home page
    Given the visitor is on the "home page"
    When the visitor opens the first post in the listing
    Then the visitor sees the post's title as the main heading

  Scenario: Post offers an RSS subscription
    When the visitor opens the "latest post"
    Then the post invites the visitor to subscribe through RSS

  Scenario: Subscribing to the RSS feed from a post
    Given the visitor is on the "latest post"
    When the visitor follows the post's RSS subscription link
    Then the visitor sees the RSS feed

  Scenario: Proposing an edit to a post on GitHub
    Given the visitor is on the "latest post"
    When the visitor chooses to edit the page
    Then GitHub opens in a new tab
    And GitHub asks the visitor to sign in before editing

  Scenario: Viewing a post's change history on GitHub
    Given the visitor is on the "latest post"
    When the visitor chooses to view the page history
    Then the post's change history on GitHub opens in a new tab

  Scenario: Code block shows its language and line numbers
    When the visitor opens the post "Hello, Neovim, My Old Friend"
    Then the code block is labelled as "Sh" code
    And the code block lines are numbered from 1
    And screen readers announce the code block by name

  Scenario: Code block can be reached with the keyboard
    Given the visitor is reading the post "Hello, Neovim, My Old Friend"
    When the visitor tabs to the code block
    Then the code block has keyboard focus for scrolling
