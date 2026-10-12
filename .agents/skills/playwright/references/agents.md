# Specialized Playwright Test Agents

When developing complex test suites or debugging flaky/failing tests, specialized subagents can be delegated to using `invoke_subagent` or `define_subagent`.

## Agent Profiles

### 1. `playwright-test-planner`
- **Purpose**: Creates comprehensive end-to-end test plans for features and pages.
- **Workflow**:
  1. Explore interface and user flows using browser navigation tools or Playwright MCP tools (`planner_setup_page`, `browser_*`).
  2. Map primary user journeys, happy paths, edge cases, and accessibility considerations.
  3. Output structured markdown test plans into `specs/`.

### 2. `playwright-test-generator`
- **Purpose**: Generates automated Playwright test specifications from approved test plans.
- **Workflow**:
  1. Read the scenario specification from `specs/`.
  2. Step through each action and verification using Playwright locators (prioritizing accessibility roles).
  3. Generate self-contained, typed Playwright test files following the structural guidelines in [SKILL.md](../SKILL.md).

### 3. `playwright-test-healer`
- **Purpose**: Diagnoses, debugs, and repairs failing Playwright tests.
- **Workflow**:
  1. Execute tests to capture failure details and stack traces.
  2. Analyze page state, selectors, timing/hydration races, or markup changes.
  3. Remediate test code (update locators to match current DOM, fix assertions, handle hydration waits).
  4. Re-run tests to confirm clean passes.
