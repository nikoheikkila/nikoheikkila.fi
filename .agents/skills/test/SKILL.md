---
name: test
description: Procedure for executing the project's full test suite (task test) and reporting failures or success. Use when asked to run tests or verify the test suite.
---

# Test Suite Execution

1. Run `task test` from the repository root (runs full pipeline: lint → unit → component → build → e2e).
2. Summarise any failures with the failing test name, file path, and error message.
3. If all tests pass, confirm with a one-line summary.
