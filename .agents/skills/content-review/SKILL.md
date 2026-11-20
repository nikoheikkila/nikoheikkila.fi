---
name: content-review
description: Review posts and pages for facts, grammar, style, and SEO. Use this when asked to review, proofread, or validate content.
argument-hint: "[path/to/file.md]"
arguments: [file]
allowed-tools:
	- Read
	- Write
	- Edit
	- Glob
	- AskUserQuestion
	- Bash(task content:*)
	- Agent(fact-check)
	- Agent(grammar-check)
	- Agent(style-check)
	- Agent(seo-check)
---

## Content Review

File $file needs a thorough content review. If the user omitted the file, ask if they intended to review a specific file so they can point you to one.

Review the received Markdown content by dispatching the following subagents in parallel, in a single message. Do not edit the file until the user approves.

1. **fact-check**: This is most important. The agent verifies claims, code snippets, and external links.
2. **grammar-check**: The agent checks for grammar, spelling, and punctuation issues.
3. **style-check**: The agent checks for writing style, clarity, and conciseness.
4. **seo-check**: The agent checks for search engine optimization, including metadata, headings, and keyword usage.

The agents are read-only: none has a shell or write tools, and a `PreToolUse` hook (`.claude/deny-writes.sh`) blocks
any that slip through. Only you run commands and edit files. Before dispatching, run the linters yourself:

- `task content:harper file=/abs/path.md dialect=us` (`dialect=british` for British spelling)
- `task content:vale file=/abs/path.md`

Both exit non-zero when they find anything; that is expected. If one fails to run, say so in the brief. Treat a Vale
report of "0 files" as a failed run, not a clean one: the `.vale.ini` globs match repo-relative paths only, so check the
path before dispatching. Run both linters and get their real output before dispatching any agent, so no agent needs a
corrected brief mid-run.

Flag linter spelling false positives (coinages, names) in the review, and offer to add them to
`.vale/styles/config/vocabularies/Blog/accept.txt`. Harper's dictionary is per-user, outside the repo; leave it alone.

Each agent already knows its checklist, output schema, and the shared [house style](references/house-style.md). Brief
each with the absolute file path, e.g. `Review /abs/path/content/blog/post.md and return the JSON defined in your
instructions.` Append both linter outputs to the `grammar-check` brief and the Vale output to the `style-check` brief.
Do not restate their instructions. The fact-check agent takes several minutes; report the other results
as they arrive, then compile the review once all four are in.

## Consolidating Findings

The agents' outputs are raw input, not the final review. Before presenting:

- **Deduplicate**: When agents report the same issue, keep it once in the section of the agent that owns it (see the
  ownership table in the house style).
- **Verify disputed claims**: Check claims about rendering, links, or the repository yourself, e.g. that an internal
  link target exists under `content/blog/`, or how remark renders a construct. Downgrade or drop findings that the
  house style's rendering facts contradict, and say why.
- **Calibrate severity**: Apply the house style's severity definitions uniformly across agents.
- **Resolve conflicts**: When suggestions contradict each other (e.g. style trims the excerpt one way, SEO another),
  merge them into one recommendation.
- **Strip unverified claims from fixes**: A non-fact-check agent's suggested wording sometimes adds a fact the post
  never made (e.g. "an opt-in setting"). Keep the fix, drop the new claim unless `fact-check` confirmed it.
- **Fact fixes win**: When a fact-check rewrite of a sentence supersedes a grammar or style fix on the same sentence,
  report the fact fix and note the other as moot.
- **Unverified claims**: When `fact-check` could not reach a source (e.g. a video it could not watch) and only
  suspects a claim is off, present it as unverified and name what the author should check. When applying "All
  findings", apply only rewordings that stay true either way (e.g. dropping a qualifier); leave the rest and list them
  in the summary for the author.
- **Untested code claims**: `fact-check` cannot run code. When it recommends removing code based on documentation alone,
  present it as untested and, when applying, prefer rewording the prose over deleting the code.
- **Diff every suggestion against the original**: Agents sometimes change words outside the issue they flag (e.g. a
  title suggestion that silently drops a comma). Restore anything the finding did not ask to change.
- **Keep hedges**: Dropping a qualifier such as "relative" or "mostly" makes the claim stronger than the author meant it.
  For a vague hedge, suggest a sharper one ("a modest success"), never removing it.
- **Verify broken links yourself**: When `fact-check` reports a dead link, confirm it with
  `curl -s -o /dev/null -w '%{http_code}' -L <url>` and check its suggested replacement the same way.
- **Structural edits ripple**: A new `##` heading from `seo-check` can land between a lead-in sentence and the list or
  paragraph it introduces. Place headings so lead-ins stay attached, and drop punctuation fixes (e.g. a list-introducing
  colon) that the heading makes moot.
- **Check fixes together**: Before presenting, read the suggested fixes side by side. Two fixes that add the same
  transition ("Still,") a few lines apart, or contradict a later sentence, should be merged or one dropped.

When the fact check passes, list what it verified (from its `verified` array) instead of a bare "All claims valid".
Never describe checks it did not report.

## Review Output Format

Structure review feedback as:

```markdown
## Content Review: {filename}

### Fact Check

- [issue or "All claims valid"]

### Grammar

- [findings or "Grammar is valid"]

### Prose and Style

- [findings or "Prose and style are valid"]

### SEO and Metadata

- [findings or "SEO and metadata are valid"]
```

Mark issues by severity: **Error** (must fix), **Warning** (should fix), **Suggestion** (nice to have), and prefix each
with its line number. Order each section by severity.

Ask the user whether they want to apply the suggested edits or not, using `AskUserQuestion` with options such as
"Errors and Warnings only", "All findings", and "None". If they want edits, apply them with `Edit` (or one `Write` when
most paragraphs change). If not, return the review feedback only.
