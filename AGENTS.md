# AGENTS.md

This file provides instructions for coding agents when working in this repository.

## Agent Rules

- **Scope**: You are a coding agent for a Hugo static blog. Your work is limited to source code, tests, content, styles, and infrastructure in this repository.
- **Content safety**: Never modify files under `content/` unless explicitly asked to create or edit content.
- **Infrastructure safety**: Never modify files under `infra/` without using the terraform skill. Always run `task terraform:validate` before proposing infrastructure changes.
- **Post-edit verification**: Always run `task lint` after editing source files. Fix any issues before continuing.
- **Minimal changes**: Prefer the smallest diff that satisfies the request. Do not refactor, add comments, or "improve" surrounding code unless asked.
- **Early exit**: If a task is ambiguous or could affect production deployment, stop and ask for clarification rather than guessing.
- **Verbosity**: Keep responses concise. Summarise what changed and why; omit explanations of unchanged code.

## Quick Start

The project is a Hugo static site generator for a personal blog. All tasks are run via `task <name>` — use the taskrunner skill (`/taskrunner`) and run `task -a` for the full command reference.

## Architecture Overview

The key architectural decisions are described below.

### Content-First Architecture

- **Markdown-driven content**: Blog posts and pages are written in Markdown with YAML frontmatter in `content/`
- **Hugo page generation**: Pages are created via Hugo's content and template system
- **Go templates**: Layouts and partials live in `layouts/`
- **30 posts per index page**: Pagination with numbered routes (`/`, `/page/2/`, etc.)

### Tech Stack

- **Framework**: Hugo (Go-based static site generator)
- **Styling**: Sass with BEM naming conventions (dark mode default)
- **Testing**: Playwright (E2E only)
- **Static Analysis**: Biome 2 (linting and formatting for JS/TS assets)
- **Task Runner**: Task (see Taskfile.yaml)
- **Deployment**: Cloudflare Pages with Terraform provider and 1Password for secrets management

### Directory Structure

```plain
├── content/           # Markdown content (posts and pages)
│   └── blog/         # Blog post files (some with co-located assets)
├── layouts/          # Hugo templates and partials
│   ├── _default/     # Base templates (baseof, single, list)
│   └── partials/     # Reusable template fragments
├── static/           # Static assets
├── assets/           # Sass and JS assets processed by Hugo Pipes
├── src/
│   └── __tests__/    # Test files
│       └── feature/  # E2E tests (Playwright)
├── infra/            # Terraform infrastructure (Cloudflare DNS, R2, Workers)
└── skills/           # Claude Code skill definitions (symlinked from .claude/skills)
```

## Development Workflow

### Styling Approach

- **Sass with BEM**: Component styles use BEM naming conventions
- **Dark mode default**: Light mode is opt-in via `prefers-color-scheme: light` media query

### Testing Architecture

- **E2E tests**: Run against the production build served on port 8000
- **Full suite order**: lint → build → e2e

## Deployment

### Build Process

1. **Content processing**: Markdown files transformed to HTML via Hugo's Goldmark renderer
2. **Image optimization**: Hugo's built-in image processing via `resources.GetRemote`
3. **Static generation**: Full static site with trailing slash support

### Performance Optimizations

- **RSS feed**: Generated at `/rss.xml`
- **Sitemap**: Generated at `/sitemap-index.xml`
- **AI crawler blocking**: Custom robots.txt template

## Key Conventions

### Git Workflow

- **Micro-commits encouraged**: Author advocates for small, focused commits
- **Conventional commits**: Enforced via commitlint (header max 100 chars, body/footer max 100 chars per line)
- **Custom commit type**: `content` type available in addition to standard conventional commit types
- **Pre-commit hooks**: Husky runs `task lint`; Lefthook runs `task format lint`
- **Pre-push hooks**: Husky runs `task test`

### Code Quality

- **Biome configuration**: Strict formatting and linting rules (120 char line width)
- **Import sorting**: Handled by Biome's `useSortedAttributes` assist

### File Naming

- **Layouts**: kebab-case for Hugo template files
- **Content**: kebab-case for markdown files
- **Tests**: `*.test.ts` suffix for all test files

## Troubleshooting

### Common Build Issues

- **Cache issues**: Use `task clean` to clear build cache

### Development Server Issues

- **Port conflicts**: Development server runs on <http://localhost:1313>
- **Hot reload problems**: Restart dev server if hot reload stops working
- **Asset loading**: Static assets are served from `/static` directory
