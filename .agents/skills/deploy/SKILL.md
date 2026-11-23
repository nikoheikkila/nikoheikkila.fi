---
name: deploy
description: Procedures for validating, planning, and deploying the blog and Cloudflare infrastructure. Use when asked to plan or deploy infrastructure changes.
---

# Deploy Procedure

1. Consult the `terraform` skill.
2. Run `task terraform:validate` and `task terraform:plan` from the repo root.
3. If the site changed (`wrangler.jsonc`, `static/`, or the Gatsby build), run `task build`. Site changes deploy only through CI: a Workers Preview on each pull request, production on merge to `main`.
4. Show the plan output and summarise what resources would change. Do not apply without explicit confirmation.

## One-time migration from `infra/site/` (remove once done)

The site moved from the Terraform module `infra/site/` to Wrangler. Before merging the PR that removes `infra/site/`:
1. From `infra/site/` in a checkout of `main` (the directory is gone from this change), in the `default` workspace, run `terraform state rm cloudflare_workers_script.site cloudflare_workers_script_subdomain.site`. Terraform then cannot destroy or overwrite the live `blog` Worker.
2. Never run `terraform destroy` in `infra/site/`: it would delete the live Worker `blog`.
3. The legacy buckets `site` and `site-pr-<n>` are deleted only after the soak period and with explicit user approval.
