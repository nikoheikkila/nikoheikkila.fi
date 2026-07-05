1. Load the `/terraform` skill.
2. Run `task terraform:validate` and `task terraform:plan` from the repo root.
3. If `infra/site/` changed, also run `task site:validate` (a site plan additionally needs `task build` so `public/` exists).
4. Show the plan output and summarise what resources would change. Do not apply without explicit confirmation.
