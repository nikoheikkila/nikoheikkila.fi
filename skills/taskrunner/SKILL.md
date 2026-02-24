---
name: taskrunner
description: Instructions for running project tasks. Use this when you need to run a project-specific command or workflow.
---

# Taskrunner Skill

Instructions for running project tasks. All commands use [Task](https://taskfile.dev/) as the task runner (see `Taskfile.yaml`).

## Essential Commands

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

## Running Specific Tests

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

## Common Workflows

### After editing source code

```bash
task lint          # Verify no type errors or lint violations
task test:unit     # Run unit tests
```

### After editing components

```bash
task lint              # Verify no type errors or lint violations
task test:component    # Run component tests in real browsers
```

### Before opening a pull request

```bash
task test    # Full suite: lint → unit → component → build → e2e
```

### After editing Markdown content

```bash
task build   # Verify the site builds successfully with the new content
```

### After editing infrastructure

```bash
cd infra && task validate && task plan    # Validate and preview changes
```