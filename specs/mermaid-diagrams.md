# Specification: Render Mermaid diagrams in articles as SVG

Status: ready
Type: feature
Feature file: feature/mermaid-diagrams.feature

## 1. Intent Description

Mermaid diagrams written in fenced `mermaid` code blocks in Markdown posts appear as SVG
diagrams in the published article. They are rendered at build time with the Pele library
(https://pele.run/api), and the SVG is part of the page markup. Diagrams follow the site's
current dark/light theme and use the site's fonts where possible. A diagram that cannot be
rendered fails the build, and so does a diagram without an accessible title and
description. The RSS feed keeps the plain Mermaid source. An example post under
`content/blog/` demonstrates the feature; it is not committed. Only code blocks tagged exactly `mermaid` are converted; other
code blocks are unchanged. Search is out of scope.

Accepted trade-offs of build-time rendering: no zoom or pan, wide diagrams scale down on
narrow screens instead of re-laying out, and label widths are estimated rather than measured
in the reader's browser.

**Hypothesis:** We believe writing diagrams in Mermaid will save me time compared with other
ways of making diagrams, because I can easily generate them with agents.
Validated after deployment by timing the next diagram created in Mermaid and comparing it with
the time it takes using my previous approach.

## 2. User-Facing Behavior

See `feature/mermaid-diagrams.feature`:

- Mermaid code block is published as a diagram
- Other code blocks are unchanged
- Diagram follows the reader's colour scheme (dark, light)
- Diagram labels use the site font
- Wide diagram fits a phone screen
- Post with several diagrams passes accessibility checks
- Invalid diagram fails the build
- Diagram without accessible text fails the build (accTitle, accDescr)
- RSS feed shows the Mermaid source
- Example post shows Mermaid diagrams

## 3. Feature Description

Post pages do not use the transformer's `html`: `src/templates/post.tsx` passes
`rawMarkdownBody` to `Content` (`src/components/post/content.tsx`), which renders it with
`react-markdown` + `rehype-raw` at build time (SSR) and again on hydration. The RSS feed
(`src/utils/rss.ts`) uses the transformer's `html`, a separate pipeline.

- **New Node module `src/mermaid/index.ts`** (domain directory, like `src/search/`): takes a post's Markdown and its file path,
  and replaces each fenced code block tagged exactly `mermaid` with the inline `<svg>`
  returned by Pele `render()`. Passes the site body font as `fontFamily` and a unique
  `idPrefix` per diagram. Throws an error naming the post file and line on a Pele error or
  a missing `accTitle`/`accDescr`.
- **New GraphQL field `renderedBody` on `MarkdownRemark`**: resolves to the module's output.
  The post template queries it instead of `rawMarkdownBody`. `Content` already passes raw
  HTML through `rehype-raw`, so it needs no change.
- **`src/components/post/content.module.scss`**: maps `--pele-*` variables to the existing
  SCSS colour tokens, with a light override under `prefers-color-scheme: light`.
- **RSS**: unchanged. The feed keeps showing the Mermaid source as a code block.
- **Example post** in `content/blog/`: written by the implementing agent. Not
  staged or committed.

### Musts
- Render at build time in Node only; the SVG reaches the browser as page data.
- Fail the build on a Pele error or a missing `accTitle`/`accDescr`; the error names the post
  file and line.
- Convert only code blocks tagged exactly `mermaid`.
- Give each diagram on a page a unique `idPrefix`.
- Pin Pele to an exact version.
- Add `src/mermaid/index.ts` to the coverage `include` list in `vitest.config.ts`, with 100%
  coverage.
- Report error lines as lines in the post file: add the frontmatter's line count, because
  `rawMarkdownBody` has the frontmatter stripped.

### Must Nots
- Ship Pele in the browser JS bundle, or render/`mount()` diagrams in the browser.
- Change how non-Mermaid code blocks render.
- Use `GatsbyImage` or `<img>` for diagrams.
- Edit existing posts.
- Commit fixture posts, or stage/commit the example post.

### Preferences
- Theme through CSS variables, not `render()` options.

### Escalation Triggers
- If `react-markdown`/`rehype-raw` alters Pele's SVG markup (e.g. a blank line inside the
  SVG splits the HTML block), stop and ask.
- If labels are visibly clipped in the Synonym font, stop and ask whether to add a custom
  measurer or accept it.
- If Pele cannot be imported in Gatsby's Node build (e.g. ESM-only), stop and ask.
- If component tests cannot emulate the preferred colour scheme per test, discard the theme
  colour test (no committed fixtures, no E2E substitute) and report it.

### Nonfunctional
- Build time: no limit. Measure `task build` duration before and after, and report both.
- SVG size: no limit.
- Accessibility: WCAG 2.2 A+AA via the existing `toHaveNoA11yViolations` matcher.

### Verification split
- Unit tests (`src/__tests__/unit/`): build-failure scenarios, non-Mermaid passthrough.
- Component tests (`Content`): SVG rendering, theme colours (if feasible), font, 375 px fit,
  accessibility.
- Example post: verified manually with Playwright MCP (no E2E test, since it is not
  committed).

## 4. Acceptance Criteria

### Done definition
1. In a post page, a fenced `mermaid` code block appears as an inline SVG whose accessible
   name is the diagram's `accTitle`; the Mermaid source is not shown.
2. Non-Mermaid code blocks render as before; existing `Content` tests stay green.
3. In dark and light mode, diagram colours match the mapped SCSS tokens (component test if
   feasible, otherwise the manual Playwright MCP check in M1).
4. Diagram labels use the site's body font.
5. At 375 px wide, the diagram stays inside the article width and the page does not scroll
   horizontally.
6. A page with two diagrams has no axe violations and no duplicate `id` values.
7. A Pele error fails `task build`; the error names the post file and the line in that file.
8. A missing `accTitle` or `accDescr` fails `task build`; the error names the post file and
   the missing attribute.
9. The post's entry in `public/rss.xml` shows the Mermaid source as a code block and has no
   `<svg>` (manual check).
10. The browser JS in `public/` contains no Pele code (manual check).
11. The uncommitted example post shows a flowchart and a sequence diagram, verified with
    Playwright MCP, and is not staged.
12. `task test` passes, including 100% unit coverage.
13. Clean `task build` duration (`task clean` then `task build`, same machine) is reported
    before and after the change.

### Evaluation design
Unit tests (`src/mermaid/index.ts`):

- **U1 (flowchart):** post with a `flowchart` block that has `accTitle` and `accDescr`.
  Result: output contains `<svg class="pele…">` titled by the `accTitle`; no Mermaid fence
  remains.
- **U2 (other language):** post with only a `typescript` block. Result: output equals input.
- **U3 (no code blocks):** Result: output equals input.
- **U4 (syntax error):** `content/blog/x.md` with frontmatter, and `flowchart TD\n  A -->`
  starting on line 12 of the file. Result: throws; message contains `content/blog/x.md` and
  the file line of the error (frontmatter lines included).
- **U5 (missing accTitle):** Result: throws; message names the post and `accTitle`.
- **U6 (missing accDescr):** Result: throws; message names the post and `accDescr`.
- **U7 (two diagrams):** Result: every `id` across both SVGs is unique.
- **U8 (tag case):** block tagged `Mermaid`. Result: output equals input. (Lowercase-only
  matches GitHub's and GitLab's native Mermaid fences.)
- **U9 (empty block):** empty `mermaid` block. Result: throws; message names the post.
- **U10 (font):** any valid diagram. Result: labels use the site's body font family.

Component tests (`Content`, all three browsers). Tests produce their input by calling
`src/mermaid/index.ts` in the browser test runner (Pele is isomorphic); test code is not
shipped, so this does not break the no-Pele-in-bundle rule. No hard-coded SVG strings.

- **C1 (render):** `Content` given U1's output. Result: an image-role element named by the
  `accTitle` is visible; no code region is shown.
- **C2 (narrow):** C1 at a 375 px viewport. Result: diagram width ≤ article width; no
  horizontal page scroll.
- **C3 (a11y):** `Content` given U7's output. Result: `toHaveNoA11yViolations` passes.
- **C4 (theme, if feasible):** C1 under dark and light colour schemes. Result: computed
  fill/stroke colours equal the mapped tokens. Discard if per-test colour scheme emulation
  is not feasible.

Manual checks:

- **M1 (example post):** build with the example post; Playwright MCP screenshots of both
  diagrams in dark mode, light mode, and at 375 px.
- **M2 (feed and bundle):** after M1's build, the RSS entry shows the source as code, and
  `grep PeleError public/*.js` finds nothing.
- **M3 (existing posts):** after M1's build, a handful of existing posts with varied content
  (code blocks, raw HTML, images, tables) are compared with Playwright MCP against the same
  pages on production (nikoheikkila.fi). They look the same: the switch from
  `rawMarkdownBody` to `renderedBody` must not change non-Mermaid markup.

## 5. Task Decomposition

- **T0 Baseline**: Input: clean `main`. Output: clean `task build` duration recorded here.
- **T1 Transform module**: Input: Pele added at an exact version. Output:
  `src/mermaid/index.ts` with unit tests U1–U10.
- **T2 Data field**: Input: T1. Output: `renderedBody` resolver, post template switched to
  it, `task typegen`, unit test with the existing Gatsby fakes.
- **T3 Styling and component tests**: Input: T2. Output: `--pele-*` mapping in
  `content.module.scss`, component tests C1–C4.
- **T4 Example post and verification**: Input: T3. Output: uncommitted example post, M1,
  M2 and M3 done, post-change build duration recorded.

## Later slices

- Client-side enhancement with Pele `mount()`: zoom, pan, and re-layout at the reader's width.
- SVG diagrams in the RSS feed (needs a transformer-remark integration and feed reader testing).

## Open questions

- Accepted risk (human): the RSS and bundle checks are one-off manual checks; nothing in the
  pipeline catches a later regression.
- Accepted risk (human): if C4 is discarded, theme colours are checked only by the manual
  Playwright MCP screenshots.

## Decision log

- 2026-10-18 Mode: critique mode, starting at stage 1 (intent). Raw request recorded above.
- 2026-10-18 F1 hypothesis (human): "Writing diagrams in Mermaid saves me time vs other measures because I can easily generate diagrams with agents." Measurement still open.
- 2026-10-18 F2 rendering time: build time (a), unless it harms reader experience. Downsides presented for confirmation.
- 2026-10-18 F3 GatsbyImage: not viable. gatsby-transformer-sharp has no SVG support (supported-extensions.js) and it outputs <img>/<picture>, which page CSS cannot theme. Proposed: inline <svg>.
- 2026-10-18 F4 theming: accepted. Diagrams follow the site's current dark/light theme.
- 2026-10-18 F5 invalid diagram: fail the build.
- 2026-10-18 F6 RSS feed and search index: get the plain Mermaid source, not the SVG.
- 2026-10-18 F2 confirmed: build-time rendering; downsides (no zoom, shrink on phones, estimated label widths) accepted.
- 2026-10-18 F3 confirmed: inline <svg>, not GatsbyImage.
- 2026-10-18 Hypothesis measurement: (a) time the next Mermaid diagram against the previous approach.
- 2026-10-18 Example post: the implementing agent writes a simple post under content/blog/ and verifies it.
- 2026-10-18 Fonts: use the site's fonts where possible.
- 2026-10-18 Stage 1 (intent) approved by human.
- 2026-10-18 S2-F1 search: ignored, out of scope (index uses title + excerpt only).
- 2026-10-18 S2-F2 RSS: human inclined to keep SVG if feed readers render it well. Evidence inconclusive; re-raised in stage 3.
- 2026-10-18 S2-F3 accTitle and accDescr required on every diagram; missing either fails the build.
- 2026-10-18 S2-F4 example post is a test post; not staged or committed.
- 2026-10-18 S2-F5 theme colours mapped from --pele-* variables to named SCSS tokens.
- 2026-10-18 Stage 2 scenarios approved. Human preference: component tests where possible, E2E for the rest.
- 2026-10-18 Discovery: post pages render rawMarkdownBody via react-markdown (src/components/post/content.tsx); RSS uses transformer-remark `html`. Two separate pipelines.
- 2026-10-18 S3-F1 accepted: Node module + `renderedBody` GraphQL field; not in Content's code renderer.
- 2026-10-18 S3-F2 accepted: RSS keeps plain Mermaid source; SVG in feed is a later slice.
- 2026-10-18 S3-F3 accepted: example post verified manually with Playwright MCP.
- 2026-10-18 S3-F4 accepted: unit tests for build-failure scenarios, component tests for the rest.
- 2026-10-18 S3-F5: no committed fixture posts; discard the theme colour test if colour scheme emulation is not feasible.
- 2026-10-18 S3-F6: no limits; measure build time before and after.
- 2026-10-18 Stage 3 (feature description) approved.
- 2026-10-18 Test setup fixed outside this spec: Vitest 5.0.3 -> 5.0.5 (`vitest related` crashed on SCSS in the browser project).
- 2026-10-18 S4-F1: syntax errors report the line in the post file.
- 2026-10-18 S4-F2: delegated to agent; lowercase `mermaid` only, matching GitHub/GitLab native fences.
- 2026-10-18 S4-F3: manual dark/light screenshots cover the theme criterion if C4 is discarded.
- 2026-10-18 S4-F4: one-off manual RSS and bundle checks accepted.
- 2026-10-18 S4-F5: build time measured from a clean build (`task clean` then `task build`) on the same machine.
- 2026-10-18 Stage 4 (acceptance criteria) approved. Validation gate next.
- 2026-10-18 Gate F1: RSS sentence restored to intent (dropped by agent in error).
- 2026-10-18 Gate F2: error lines include the frontmatter offset; added as a Must.
- 2026-10-18 Gate F3: "example post" used everywhere.
- 2026-10-18 Gate F4: component tests call the module in the browser runner; no hard-coded SVG.
- 2026-10-18 Module path changed by human: `src/mermaid/index.ts` (domain-based directory); added to coverage include.
- 2026-10-18 Validation gate passed. Status: ready.
- 2026-10-18 M3 added (human): manually compare a handful of existing posts with production,
  because the template switches from `rawMarkdownBody` to `renderedBody`.
