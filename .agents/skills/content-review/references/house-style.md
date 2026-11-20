# House Style for Content Review

Shared ground rules for the `fact-check`, `grammar-check`, `style-check`, and `seo-check` agents. Read this before
reviewing.

## Voice

- First-person, opinionated blog voice. Preserve the author's stance, humour, and short punchy sentences ("You do not.").
  Flag a passage only when it is unclear, inaccurate, or needlessly long, never because it is opinionated.
- Suggest edits, not rewrites. A suggestion should change the fewest words that fix the issue.

## Spelling

- The archive mixes British and American spelling. Do not enforce either; flag only inconsistency **within the reviewed
  file** (e.g. "organisation" and "organization" in the same post).

## Rendering Facts (do not flag these)

Markdown is rendered by `gatsby-transformer-remark` (CommonMark + GFM) with `gatsby-remark-smartypants`.

- `...`, straight quotes, and `--` are converted to typographic characters at build time. Do not suggest `…` or curly
  quotes.
- An ordered list starting at `1.` may interrupt a paragraph without a blank line; it renders as a list. At most a
  **Suggestion** for source consistency.
- Source line wrapping has no effect on output. The 120-character limit applies to code (Biome), not Markdown prose.
- Reference-style links (`[text][ref]` with definitions at the bottom) are the preferred link style.
- The trailing Unsplash photo credit is boilerplate HTML pasted from Unsplash; leave it alone.

## Frontmatter

- `title` renders as `<h1>`; body sections start at `##`.
- The slug is the filename. If `date` is in the past, assume the post is published: never recommend renaming the file
  without noting that it breaks existing links and needs a redirect.
- `excerpt` is the meta description and RSS item description.
- `hero` is the social sharing image.
- Quote any frontmatter value that contains `: ` (e.g. `title: "Foo: Bar"`), or YAML parsing breaks.
- Pun or reference titles (e.g. "Hello, Neovim, My Old Friend") are deliberate. Do not suggest descriptive tails;
  carry keywords in the `excerpt` and `##` headings instead.

## Headings

The author lowercases particles in phrasal verbs ("Set up Guardrails"). Do not flag that as a title case error.

## Published Posts

When `date` is in the past, separate two kinds of factual issue:

- **Wrong at publication**: the claim was never true. Severity as usual.
- **Stale since publication**: true then, outdated now (a renamed plugin, a feature that left beta). Say so explicitly
  in the issue, and offer either a minimal in-place update or an update note.

## Suggested Fixes

A suggestion must not introduce facts, qualifiers, or figures the post does not already contain. Only `fact-check`
adds new facts, and only with a cited source.

A suggestion must not remove hedges either. Dropping "relative", "mostly", or "probably" strengthens the claim. Suggest
a more precise qualifier instead. Intensifiers that scope a claim count too: "if I'm very lucky" marks a rare case, and
"if I'm lucky" makes it common. Vale's `proselint.Very` and `write-good.Weasel` alerts do not override this. Leave every word outside the flagged issue unchanged, punctuation included.

## Internal Links

`/blog/<slug>/` maps to `content/blog/<slug>.md`. Verify the file exists.

## Severity

- **Error**: must fix. Factually wrong, broken link, broken rendering, or a grammatical error a reader would notice.
- **Warning**: should fix. Misleading, ambiguous, or noticeably awkward.
- **Suggestion**: nice to have. Taste, polish, or optimisation.

## Ownership (avoid duplicate findings)

Each agent reports only issues in its own lane:

| Agent           | Owns                                                                                         |
|-----------------|----------------------------------------------------------------------------------------------|
| `fact-check`    | Claims, figures, citations, links, code, dates versus cited sources                          |
| `grammar-check` | Spelling, grammar, punctuation, Markdown syntax                                              |
| `style-check`   | Clarity, concision, tone, structure of body prose                                            |
| `seo-check`     | Frontmatter (`title`, `excerpt`, `hero`, `type`, `lang`), slug, headings as keywords, linking |

If a finding sits in another lane, leave it out.
