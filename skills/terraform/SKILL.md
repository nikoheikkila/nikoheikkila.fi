---
name: terraform
description: Instructions for managing the Cloudflare infrastructure with Terraform. Use this when you need to work with Terraform or Cloudflare resources.
---

# Infrastructure Management with Terraform

## Terraform Configuration

Everything is managed with Terraform and the Cloudflare provider across **two root modules with separate state**:

`infra/` — long-lived core infrastructure:

- **Zone**: Domain configuration for `nikoheikkila.fi`
- **DNS**: Records defined in YAML (`dns.yml`) for easier maintenance
- **R2 Storage**: Blog assets bucket with custom domain (`r2.nikoheikkila.fi`)
- **Workers**: Custom domain mapping (`nikoheikkila.fi` → service `blog`)
- **State Backend**: Stored in the Cloudflare R2 bucket `terraform`

`infra/site/` — the site deployment (changes on every merge and per pull request):

- **Static files**: Gatsby build output (`public/`) uploaded to a per-environment R2 bucket via `aws_s3_object`
- **Worker**: `worker.ts` (compiled to `worker.js` by Bun — a gitignored build artifact) serves the bucket with trailing-slash canonicalisation, conditional/range requests, and the path redirects bundled from `redirects.json`
- **Environments = Terraform workspaces**: `default` → production (worker `blog`, bucket `site`); `pr-<n>` → preview (worker `blog-pr-<n>`, bucket `site-pr-<n>`) at `https://blog-pr-<n>.yo-062.workers.dev`
- **Headers policy**: per-object `content_type`/`cache_control` set at upload time in `locals.tf` (replaces the former `static/_headers`)

Terraform serves the site from R2 because the Cloudflare provider **cannot upload Workers static assets** — that API flow requires an upload-session JWT only Wrangler implements.

## Infrastructure Commands

Both modules are reachable from the repo root via Taskfile namespaces (`terraform:` and `site:`), or run the same tasks from inside their directories:

```bash
# Core infrastructure (infra/)
task terraform:init        # Initialize providers and backend
task terraform:format      # Format Terraform code
task terraform:validate    # fmt -check + terraform validate
task terraform:plan        # Plan infrastructure changes
task terraform:deploy      # Apply changes (after careful review)

# Site deployment (infra/site) — requires `task build` first so public/ exists
task site:validate                  # fmt -check + terraform validate
task site:plan WORKSPACE=pr-123     # Plan a preview deployment
task site:deploy WORKSPACE=pr-123   # Apply it (deploys to workers.dev)
task site:destroy WORKSPACE=pr-123  # Tear a preview down (interactive confirm)
task site:deploy                    # Production (default workspace) — CI's job; avoid locally
```

Site module guardrails to know about:

- A plan/apply fails with a precondition error if `public/` is missing — run `task build` first. `worker.js` is compiled automatically by the `site:build` task dependency; never edit it by hand.
- `site:destroy` and `site:ci:destroy` refuse the `default` workspace, so previews cannot destroy production.
- Do **not** pass extra CLI args to multi-command tasks (e.g. `task site:destroy -- -auto-approve` breaks: `{{.CLI_ARGS}}` is appended to *every* terraform invocation in the task, including `workspace select`). For a non-interactive destroy use the CI task with 1Password: `cd infra/site && op run --env-file='../.env' -- task ci:destroy WORKSPACE=pr-123`.
- R2 does not implement AWS flexible checksums; the site Taskfile exports `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` and `AWS_RESPONSE_CHECKSUM_VALIDATION=when_required`. Raw `terraform` invocations outside the Taskfile need those variables too.

### CI deployment flow

The `.github/actions/terraform-site` composite action (inputs: `workspace`, `operation: deploy|destroy`) runs `task ci:deploy`/`ci:destroy`. `ci.yml` deploys workspace `pr-<n>` on every pull request and `default` on merge to `main`; `preview-cleanup.yml` destroys the PR workspace when it closes. Secrets: `CLOUDFLARE_API_TOKEN` plus `CLOUDFLARE_R2_ACCESS_KEY_ID`/`CLOUDFLARE_R2_ACCESS_KEY_SECRET` (the account-wide R2 token, shared with the state backend).

See all commands by running `task -a` in the `infra/` directory.

## Infrastructure Variables

Terraform variables are configured in `infra/cloudflare.tfvars`:

- **`account_id`** (required): CloudFlare account ID (32-char hex)
- **`domain`** (optional): Primary domain (default: `nikoheikkila.fi`)
- **`r2_bucket_name`** (optional): R2 bucket name (default: `blog`)
- **`r2_bucket_location`** (optional): Bucket location (default: `EEUR`)
- **`r2_storage_class`** (optional): Storage class (default: `Standard`)
- **`worker_service_name`** (optional): Worker service name (default: `blog`)

All variables have sensible defaults except `account_id`.

The site module reuses the same tfvars file (`-var-file=../cloudflare.tfvars`) and adds its own variables in `infra/site/variables.tf`: `dist_dir` (default `../../public`), `compatibility_date`, and `workers_dev_subdomain` (the pinned account-level workers.dev subdomain).

## DNS Management Workflow

1. **Edit DNS records**: Edit `infra/dns.yml`
2. **Plan changes**: `task plan` (from infra directory)
3. **Review carefully**: Check TTL, priority, proxied settings
4. **Apply**: `task deploy`
5. **Verify**: Check DNS propagation

**Important DNS Considerations**:

- Email records (MX, SPF, DKIM, DMARC) affect deliverability
- TTL=1 means "auto" (Cloudflare-managed)
- Proxied records hide origin IP but require valid SSL
- Test changes in a preview environment if possible

## Terraform Best Practices

### Code Style

- Run `task format` before committing
- Add comments explaining "why", not "what"
- Include file-level headers describing purpose
- Use descriptive variable and resource names

### Making Changes

- Always run `task plan` before `task deploy`
- Review the plan output carefully
- Make small, focused changes (micro-commits)
- Never commit `.tfstate` files (state is always stored remotely)

### Variable Management

- Add validation rules for new variables
- Provide sensible defaults where appropriate
- Document variables in README and variable descriptions
- Use type constraints (string, number, bool)

### State Management

- State is stored in R2 backend (no local state)
- Credentials are managed via 1Password environment variables
- If state is locked, check for concurrent operations
- Only force-unlock with extreme caution: `task run -- force-unlock <LOCK_ID>`

## Redirect Infrastructure

Subdomain redirects are managed via `infra/redirects.yml` and applied automatically through `infra/locals.tf` and `infra/dns.tf`. To add a redirect, append an entry to `redirects.yml` and run `task plan` then `task deploy` — no HCL changes needed.

**redirects.yml schema:**

```yaml
redirects:
  - from: subdomain        # subdomain prefix, e.g. "cv" → cv.nikoheikkila.fi
    to: "https://..."      # redirect target URL
    status: 301            # HTTP status code
    preserve_path: true    # optional: appends request path to target (default: false)
```

**Key constraints to be aware of:**

- **One ruleset per phase per zone**: Cloudflare allows only one `cloudflare_ruleset` resource per phase. All redirect rules (including the www→root redirect) are merged into the single `cloudflare_ruleset.www_redirect` resource via `local.redirect_rules` in `locals.tf`. Never create a second ruleset for the same phase.
- **Proxied DNS required**: Each redirect subdomain needs a proxied CNAME record pointing to the root domain so Cloudflare intercepts traffic before it reaches the origin. These are created automatically from `redirects.yml` by `cloudflare_dns_record.redirects` in `dns.tf`.
- **DNS conflict filter**: Entries whose `from` key already exists in `dns_config.dns_records` (i.e. `dns.yml`) are excluded from `cloudflare_dns_record.redirects` to prevent duplicate record conflicts. This is how the `www` entry coexists in both files.
- **`target_url` form**: Use `{ value = "..." }` for static external URLs. Use `{ expression = "concat(\"...\", http.request.uri.path)" }` when `preserve_path: true` to forward the request path. The `preserve_path` field in the YAML controls which form is used.

## Provider Quirks (learned the hard way)

- **No data source for the account workers.dev subdomain**: the Cloudflare provider (v5) exposes only the per-script `cloudflare_workers_script_subdomain`. The account-level subdomain (`yo-062`) is pinned as the `workers_dev_subdomain` variable in `infra/site/variables.tf`; refresh it from `GET /accounts/{account_id}/workers/subdomain` if it ever changes.
- **AWS provider checksum settings are env vars, not HCL**: `request_checksum_calculation` is rejected as a provider argument in v6 — only `AWS_REQUEST_CHECKSUM_CALCULATION`/`AWS_RESPONSE_CHECKSUM_VALIDATION` environment variables work.
- **Inspecting provider schemas** (`terraform providers schema -json`) requires a fully initialized backend. To probe resource attributes without credentials, create a scratch directory containing only a `terraform { required_providers { ... } }` stub, run `terraform init` there, and dump the schema from it.
- **R2 populates `object.range` even for full reads**: the Worker must only answer `206` when the request actually carries a `Range` header (see the comment in `infra/site/worker.ts`).
- **Cloudflare strips `ETag` from 200 `text/html` responses at the edge**: assets keep their etags and conditional requests still work. Production behaves identically — do not chase this as a Worker bug.

## Infrastructure Troubleshooting

### Scenario: Validation Fails

- Run `task format` to fix formatting issues
- Check HCL syntax in `.tf` files
- Verify YAML syntax in `dns.yml`
- Ensure variable types match definitions
- `there is no package for ... cached in .terraform/providers` means the local provider cache is stale — re-run `op run --env-file='.env' -- terraform init` in the module directory

### Scenario: S3 Operations Return 403 AccessDenied

- The R2 access keys authenticate but lack access to the target bucket: check the R2 API token's bucket scope in the Cloudflare dashboard (it must be account-wide since site buckets are created per pull request)
- Diagnostic fallback: S3 credentials can be derived from any Cloudflare API token with R2 permissions (access key = token ID from `/user/tokens/verify`, secret = SHA-256 hex of the token value) to compare scopes

### Scenario: Plan Contains Unexpected Changes

- Check if manual changes were made via Cloudflare UI
- Verify variable values in `cloudflare.tfvars`
- Review git diff to see what changed in code
- Check for provider version changes

### Scenario: State Is Locked

- Wait for concurrent operations to complete
- Check if any GitHub Actions workflows are running with `gh run list`
- Last resort: `task run -- force-unlock <LOCK_ID>`

### Scenario: Can't Authenticate with Cloudflare API

- Ensure 1Password CLI is installed and authenticated with `op account get`
- Verify `.env` file contains correct 1Password references
- Check `CLOUDFLARE_API_TOKEN` has sufficient permissions
- Verify R2 credentials for state backend access

### Infrastructure Outputs

View infrastructure outputs:

```bash
cd infra/
task run -- output
```

Available outputs:

- `zone_id`: CloudFlare zone ID
- `zone_name`: Domain name
- `r2_bucket_id`: R2 bucket identifier
- `r2_bucket_name`: R2 bucket name
- `r2_custom_domain`: Custom domain for R2 access
- `worker_custom_domain`: Worker hostname
- `dns_record_count`: Number of managed DNS records

The site module outputs (per workspace): `url` (deployment URL, read by CI), `worker_name`, and `bucket_name`.
