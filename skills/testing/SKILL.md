---
name: testing
description: Testing guidance for working with Vitest and Playwright. Use this skill before running tests, writing new
tests, debugging tests, or any test-related reasoning task.
---

## Conventions

- **Unit tests**: Run in Node environment, 100% coverage enforced (lines, functions, branches, statements) via `task test:unit` (which passes `--coverage`). Includes both `src/__tests__/unit/**` and `infra/site/*.test.ts` (e.g. the Cloudflare Worker) — both are matched by the same `include` glob in `vitest.unit.config.ts` and share one coverage report.
- **Coverage config lives in the root `vitest.config.ts`, never in a project file**: Vitest's `projects` feature (used here to split `vitest.unit.config.ts`/`vitest.component.config.ts`) treats `coverage` as a root-only option — a `coverage` block declared inside a project config is silently ignored, with no warning. `task test:component` deliberately gets no `--coverage` flag and no threshold, since only unit tests are held to 100%.
- **Component tests**: Run in real browsers (Chromium, Firefox, WebKit) via `@vitest/browser-playwright`
- **E2E tests**: Run against the production build served on port 8000
- **Locator strategy**: Never use `data-testid` attributes. Always use web-first locators (`getByRole`, `getByLabel`, `getByText`). Scope locators to a parent when the page has multiple elements of the same role (e.g., `modal.getByRole("article")` vs `page.getByRole("article")`)
- **SSR hydration in E2E**: Any page with React-controlled interactive elements — not just forms and inputs, but also toggle buttons, hook-driven components, and anything relying on a React event handler — needs `waitUntil: "networkidle"` in `page.goto()` to ensure hydration has completed before interaction. Without it, clicks silently do nothing because the `onClick` handler has not been attached yet.
- **Accessibility matcher**: `toHaveNoA11yViolations` (defined in `src/__tests__/components/a11y.ts`, registered globally via `setup.ts`) runs an axe-core scan with WCAG 2.2 A+AA tags by default. Call it on the `container` from `render()`: `await expect(container).toHaveNoA11yViolations()`. Pass `RunOptions` as a second argument for per-call rule overrides. E2E accessibility scans use `AxeBuilder` from `@axe-core/playwright` — see the playwright skill.
- **test.each over loops**: Never use `for`/`forEach` inside a test body to iterate over cases. Use `test.each` so each case becomes a named, individually reportable test.
- **Full suite order**: lint → unit → component → build → e2e

## Unit Test Issues

- **Extensionless imports can silently resolve to a stale build artifact**: `infra/site/worker.js` is a gitignored, previously-compiled Bun bundle sitting right next to `worker.ts`. An extensionless `import worker from "./worker"` can resolve to the stale `.js` file instead of the TypeScript source — tests still pass (the bundle is usually functionally equivalent) but coverage silently attributes to the wrong file, and behavior can drift from source between builds. Import the source explicitly — `import worker from "./worker.ts"` — which requires `allowImportingTsExtensions: true` in `infra/site/tsconfig.json`. See the terraform skill's "Testing the Worker" section for the full pattern (hand-rolled `R2Bucket` fake, no miniflare).

## Component Test Issues

- **`toBeHidden()` requires `visibility: hidden`**: `transform: translateX(-100%)` moves an element off-screen visually, but Playwright's `toBeHidden()` / `toBeVisible()` only respond to `visibility: hidden`, `display: none`, or `opacity: 0`. Animated slide-in panels must pair the transform with `visibility: hidden` on the closed state and `visibility: visible` on the open state, using a `transition: visibility 0s delay` to hide after the transform completes and `transition: visibility 0s` (no delay) to show before it starts.
- **Gatsby mock required**: Component tests must mock the `gatsby` module in `src/__tests__/components/setup.ts`. Gatsby's browser runtime (`cache-dir/find-path.js`) calls `redirects_default.forEach()` during module initialization, but `redirects_default` is data generated at Gatsby build time and does not exist in the Vitest browser environment. Without the mock, all component test files fail to import.
- **Vite dep optimization**: This project uses Rolldown (not esbuild) for `optimizeDeps`. Use `optimizeDeps.rolldownOptions` — `optimizeDeps.esbuildOptions` is deprecated and silently ignored in newer Vite versions.
- **Controlled input race conditions**: When Playwright's `fill()` + `press("Enter")` runs faster than React re-renders, `onSubmit` handlers can see stale prop values. Use functional state updates (`setState(prev => ...)`) in submit handlers to read the latest accumulated state instead of relying on closure-captured values.
- **Color contrast in component tests**: Components import their own `.module.scss` but not `main.scss`, so globally-set foreground colors are absent. If a component's SCSS sets a dark background without a matching foreground, axe's `color-contrast` rule will fire as a false positive. Suppress it with `{ rules: { "color-contrast": { enabled: false } } }` and add a comment noting the E2E scan covers it. Do not suppress it globally.
