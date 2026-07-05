---
name: git
description: Guidance on using Git. Load this skill always before invoking `git` in the project in anyway
---

- **Micro-commits encouraged**: You MUST use small, focused commits
- **Linear history required**: Never use `git merge` to integrate `main` into a branch — always `git rebase` (or fast-forward) so the commit history stays linear, even when resolving merge conflicts
- **Conventional commits**: Enforced via commitlint (header max 100 chars, body/footer max 100 chars per line)
- **Custom commit type**: `content` type available in addition to standard conventional commit types
- **Pre-commit hooks**: Husky runs `task lint`; Lefthook runs `task format lint`
- **Pre-push hooks**: Husky runs `task test`
