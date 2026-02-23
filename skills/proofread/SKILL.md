---
name: proofread
description: Review blog posts and pages for grammar, style, frontmatter validity, technical accuracy, and SEO. Use this when asked to review, proofread, or validate Markdown content.
---

# Content Review

Review Markdown content in `content/` for quality across four areas:

1. Grammar and style
2. Frontmatter validation
3. Technical accuracy
4. SEO metadata.

## Review Checklist

When reviewing content, check all four areas and report findings grouped by category.

### 1. Frontmatter Validation

Every Markdown file must have valid YAML frontmatter with these fields:

| Field     | Required | Type   | Notes                                              |
|-----------|----------|--------|----------------------------------------------------|
| `title`   | yes      | string | Title-cased (use the `title` npm package rules)    |
| `author`  | yes      | string | Typically `Niko Heikkilä`                          |
| `lang`    | yes      | string | `en`, `fi`, or `sv`                                |
| `excerpt` | yes      | string | Short summary used in RSS, OpenGraph, and meta     |
| `type`    | yes      | string | `post` (blog post) or `page` (standalone page)     |
| `date`    | yes      | string | ISO 8601 date (`YYYY-MM-DD`), not in the future    |
| `hero`    | yes      | string or null | URL to cover image or `null`                |

**Validation rules:**

- `type: post` files must be in `content/blog/` (flat file or directory with `index.md`)
- `type: page` files must be in `content/` root
- `date` must be a valid ISO 8601 date and should not be in the future
- `hero` must be either `null` or a valid URL (typically starts with `https://r2.nikoheikkila.fi/`) pointing to an image asset
- `lang` affects the OpenGraph locale: `en` maps to `en_GB`, others map to `fi_FI`
- `excerpt` should not contain line breaks (they're stripped in the SEO component)

### 2. Grammar and Style

**Writing conventions to check:**

- Clear, concise prose; avoid filler words and unnecessary jargon
- Active voice preferred over passive voice
- Consistent tense within sections
- Proper punctuation and capitalization
- No orphaned or incomplete sentences
- Headings use sentence case (not title case) in body text — only the frontmatter `title` is title-cased
- Code terms in backticks when referenced inline

**Markdown conventions:**

- Use `##` for top-level sections within a post (the `title` frontmatter field renders as `<h1>`)
- Fenced code blocks with language identifiers (e.g., ` ```typescript `)
- Links use descriptive text, not bare URLs or "click here"
- Lists use `-` for unordered items
- Emojis are acceptable but should not replace meaningful text

### 3. Technical Accuracy

- **Code snippets**: Verify syntax is valid for the declared language
- **External links**: Check that URLs are not broken and are well-formed (scheme, host, path) — flag any that look outdated or broken
- **Command examples**: Ensure shell commands are correct and runnable
- **Version references**: Flag specific version numbers that may be outdated
- **Technical claims**: Flag assertions that seem inaccurate or overly broad

### 4. SEO and Metadata

- **Title**: Should be descriptive, under 60 characters for optimal display in search results
- **Excerpt**: Should be a compelling 1-2 sentence summary, under 160 characters for meta description
- **Slug** (derived from filename): Should be readable, use kebab-case, and avoid stop words where practical
- **Hero image**: Posts with `hero: null` fall back to a default site cover image — recommend setting a specific hero for better social sharing
- **Type field**: Determines OpenGraph type (`post` → `article`, `page` → `website`) — verify it matches the content's purpose
- **Language field**: Affects OpenGraph locale tag — verify it matches the actual content language

**RSS feed impact:**

- Only `type: post` content appears in the RSS feed (pages are filtered out)
- The `excerpt` field is used as the RSS item description
- The full HTML content is included as `content:encoded`

## File Placement Rules

```
content/
├── about.md              # type: page (standalone pages at root)
├── now.md                # type: page
├── testimonials.md       # type: page
├── uses.md               # type: page
└── blog/                 # type: post (all blog posts here)
    ├── my-post.md        # Simple post (single file)
    └── my-post-with-assets/  # Post with co-located images
        ├── index.md
        └── screenshot.png
```

**Filename convention:** kebab-case derived from the title via `@sindresorhus/slugify`.

## Review Output Format

Structure review feedback as:

```markdown
## Content Review: {filename}

### Frontmatter
- [issue or "All fields valid"]

### Grammar and Style
- [findings]

### Technical Accuracy
- [findings]

### SEO and Metadata
- [findings]
```

Mark issues by severity: **Error** (must fix), **Warning** (should fix), **Suggestion** (nice to have).
