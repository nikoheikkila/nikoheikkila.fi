---
name: git
description: Guidance on using Git. Load this skill always before invoking `git` in the project in anyway
---

-   This project uses Trunk-Based Development. Commits and pushes to `main` branch are allowed **if and only if** the
    commit hooks pass. Do not create feature branches unless the user requests so.
-   **Micro-commits encouraged**: You must use small, focused, and atomic commits
-   **Linear history required**: Never use `git merge` to integrate `main` into a branch — always `git rebase` (or fast-forward) so the commit history stays linear, even when resolving merge conflicts
-   **Conventional commits**: Enforced via commitlint (header max 100 chars, body/footer max 100 chars per line)
-   **Custom commit type**: `content` type available in addition to standard conventional commit types
-   **Pre-commit hooks**: Lefthook runs `task format`, stages formatted files (if any), and runs `task lint`
-   **Pre-push hooks**: Lefthook runs `task test`
