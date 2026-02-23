# AGENTS.md

This file provides instructions for coding agents when working in this repository.

## Quick Start

The project is a Gatsby static site generator for a personal blog built with TypeScript, React 19, and Bun.

### Essential Commands

```bash
# Install dependencies (frozen lockfile, runs once per session)
task install

# Start development server with hot reload (cleans cache first)
task dev

# Create new blog post or page interactively
task new

# Generate GraphQL TypeScript types (skipped if src/gatsby-types.d.ts exists)
task typegen

# Lint codebase (tsc --noEmit + biome check)
task lint

# Format and lint codebase (biome check --write + terraform format)
task format

# Run full test suite (lint → unit → component → build → e2e)
task test

# Build for production
task build

# Serve production build locally on port 8000
task serve

# Clear build cache and delete src/gatsby-types.d.ts
task clean
```

### Single Test Execution

```bash
# Run specific unit test file
task test:unit -- src/__tests__/unit/helpers.test.ts

# Run specific component test file
task test:component -- src/__tests__/components/article.test.tsx

# Run unit tests in watch mode
task test:unit:watch

# Run component tests in watch mode
task test:component:watch

# Run specific e2e test
task test:e2e -- src/__tests__/feature/index.test.ts

# Run e2e tests with UI mode
task test:e2e -- --ui
```

## Architecture Overview

The key architectural decisions are described below.

### Content-First Architecture

- **Markdown-driven content**: Blog posts and pages are written in Markdown with YAML frontmatter in `content/`
- **Programmatic page generation**: Pages are created dynamically in `gatsby/onCreatePages.ts`
- **Gatsby Slices**: Layout components (sidebar menu, footer) use Gatsby's Slices API via `gatsby/slices.ts`
- **GraphQL data layer**: All content is queryable through Gatsby's GraphQL interface
- **30 posts per index page**: Pagination with numbered routes (`/`, `/2/`, `/3/`, etc.)

### Tech Stack

- **Runtime**: Bun (replaces Node.js for faster builds and testing)
- **Framework**: Gatsby 5 with TypeScript and React 19
- **Styling**: Sass modules with custom CSS architecture (dark mode default)
- **Testing**: Vitest (unit tests in Node, component tests in real browsers via Playwright) + Playwright (E2E)
- **Static Analysis**: Biome 2 (linting and formatting)
- **Task Runner**: Task (see Taskfile.yaml)
- **Deployment**: Cloudflare Pages with Terraform provider and 1Password for secrets management

### Directory Structure

```plain
├── content/           # Markdown content (posts and pages)
│   └── blog/         # Blog post files (some with co-located assets)
├── src/
│   ├── components/   # React components organized by domain
│   │   ├── blog/     # Blog-specific components (article, cover, header, pagination)
│   │   ├── hooks/    # Custom hooks (useIcons, useToggle)
│   │   ├── layout/   # Layout and structural components (container, footer, menu)
│   │   └── post/     # Post-specific components (content, header, navigation, subscribe)
│   ├── graphql/      # GraphQL query fragments
│   ├── templates/    # Gatsby page templates
│   │   ├── list.tsx  # Blog index template (pagination)
│   │   └── post.tsx  # Individual post template
│   ├── styles/       # Sass variables and global styles
│   ├── utils/        # Utility functions (datetime, helpers, robots, rss)
│   └── __tests__/    # Test files
│       ├── unit/         # Unit tests (Vitest, Node environment)
│       ├── components/   # Component tests (Vitest, browser environment)
│       └── feature/      # E2E tests (Playwright)
├── gatsby/           # Gatsby Node.js APIs (onCreatePages, onCreateNodes, slices, schema)
├── infra/            # Terraform infrastructure (Cloudflare DNS, R2, Workers)
├── scripts/          # Build utility scripts (type generation)
├── skills/           # Claude Code skill definitions (symlinked from .claude/skills)
└── static/           # Static assets
```

Top-level components in `src/components/`: `elements.tsx`, `hero.tsx`, `schema.tsx` (JSON-LD), `seo.tsx`.

## Development Workflow

### Component Development

- **Modular architecture**: Components are organized by domain (blog, layout, post)
- **TypeScript-first**: All components use TypeScript with generated Gatsby types
- **Custom hooks**: Located in `src/components/hooks/`
- **Icon management**: FontAwesome icons managed through `useIcons` hook

### Styling Approach

- **Sass modules**: Component styles use `.module.scss` files co-located with components
- **Sass includes**: Sass files can import from `src/styles/` directory
- **Dark mode default**: Light mode is opt-in via `prefers-color-scheme: light` media query
- **Configuration**: Sass options configured in `gatsby-config.ts`

### Testing Architecture

- **Unit tests**: Run in Node environment, 100% coverage enforced (lines, functions, branches, statements)
- **Component tests**: Run in real browsers (Chromium, Firefox, WebKit) via `@vitest/browser-playwright`
- **E2E tests**: Run against the production build served on port 8000
- **Full suite order**: lint → unit → component → build → e2e

## Deployment

### Build Process

1. **Content processing**: Markdown files transformed to HTML via `gatsby-transformer-remark`
2. **Image optimization**: Sharp-based image processing with `gatsby-plugin-image`
3. **Remote hero images**: Fetched from Cloudflare R2 via `onCreateNodes.ts`
4. **Code splitting**: Automatic JavaScript bundling and optimization
5. **Static generation**: Full static site with `trailingSlash: "always"`

### Performance Optimizations

- **RSS feed**: Generated at `/rss.xml` with custom serializer
- **Sitemap**: Automatic generation via `gatsby-plugin-sitemap`
- **Manifest**: PWA manifest for standalone app experience
- **Offline support**: Service worker in production only
- **AI crawler blocking**: Custom robots.txt policy via `gatsby-plugin-robots-txt`

## Key Conventions

### Git Workflow

- **Micro-commits encouraged**: Author advocates for small, focused commits
- **Conventional commits**: Enforced via commitlint (header max 100 chars, body/footer max 100 chars per line)
- **Custom commit type**: `content` type available in addition to standard conventional commit types
- **Pre-commit hooks**: Husky runs `task lint`; Lefthook runs `task format lint`
- **Pre-push hooks**: Husky runs `task test`

### Code Quality

- **Biome configuration**: Strict formatting and linting rules (120 char line width)
- **TypeScript strict mode**: Full type safety with generated types
- **JSX conventions**: Classic JSX runtime (`jsx: "react"`), double quotes, trailing commas, tab indentation
- **Import sorting**: Handled by Biome's `useSortedAttributes` assist

### File Naming

- **Components**: PascalCase for React components
- **Utilities**: camelCase for utility functions
- **Content**: kebab-case for markdown files
- **Tests**: `*.test.ts` or `*.test.tsx` suffix for all test files
- **Styles**: `*.module.scss` for component-scoped styles

## Troubleshooting

### Common Build Issues

- **GraphQL queries**: Run `task dev` to access GraphQL explorer at `localhost:8000/___graphql`
- **Type generation**: Run `task typegen` to generate TypeScript types from GraphQL (or `task build` which triggers it)
- **Cache issues**: Use `task clean` to clear build cache and delete `src/gatsby-types.d.ts`

### Development Server Issues

- **Port conflicts**: Development server runs on <http://localhost:8000>
- **Hot reload problems**: Restart dev server if hot reload stops working
- **Asset loading**: Static assets are served from `/static` directory
- **Note**: `task dev` runs `task clean` first, which deletes generated types
