Feature: Mermaid diagrams in posts
  Mermaid code blocks in Markdown posts are published as themed SVG diagrams

  Scenario: Mermaid code block is published as a diagram
    Given a post contains a "flowchart" Mermaid code block
    When the visitor opens the post
    Then the visitor sees the flowchart as an SVG diagram
    And the Mermaid source is not shown as a code block

  Scenario: Other code blocks are unchanged
    Given a post contains a "typescript" code block
    When the visitor opens the post
    Then the visitor sees the TypeScript source as a code block

  Scenario Outline: Diagram follows the visitor's colour scheme
    Given a post contains a Mermaid diagram
    And the visitor prefers the "<scheme>" colour scheme
    When the visitor opens the post
    Then the diagram uses the site's "<scheme>" theme colours

    Examples:
      | scheme |
      | dark   |
      | light  |

  Scenario: Diagram labels use the site font
    Given a post contains a Mermaid diagram
    When the visitor opens the post
    Then the diagram labels are set in the site's body font

  Scenario: Wide diagram fits a phone screen
    Given a post contains a wide "flowchart LR" Mermaid diagram
    And the visitor's screen is 375 pixels wide
    When the visitor opens the post
    Then the diagram fits within the article width
    And the page does not scroll horizontally

  Scenario: Post with several diagrams passes accessibility checks
    Given a post contains a flowchart and a sequence Mermaid diagram
    When the visitor opens the post
    Then the page has no accessibility violations

  Scenario: Invalid diagram fails the build
    Given a post contains a Mermaid code block with a syntax error
    When the site is built
    Then the build fails
    And the error names the post and the line of the syntax error in the post file

  Scenario Outline: Diagram without accessible text fails the build
    Given a post contains a Mermaid diagram without an "<attribute>"
    When the site is built
    Then the build fails
    And the error names the post and the missing "<attribute>"

    Examples:
      | attribute |
      | accTitle  |
      | accDescr  |

  Scenario: RSS feed shows the Mermaid source
    Given a post contains a Mermaid diagram
    When a feed reader fetches the RSS feed
    Then the post's entry shows the Mermaid source as a code block
    And the entry contains no SVG diagram

  Scenario: Example post shows Mermaid diagrams
    Given the site is built with the example post
    When the visitor opens the example post
    Then the visitor sees a flowchart diagram and a sequence diagram
