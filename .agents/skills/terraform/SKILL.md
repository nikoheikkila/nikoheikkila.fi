---
name: terraform
description: Instructions for managing the Cloudflare infrastructure with Terraform. Use this when you need to work with Terraform or Cloudflare resources.
---

# Infrastructure Management with Terraform

## Terraform Configuration

Terraform manages the long-lived Cloudflare infrastructure in **one root module, `infra/cloudflare/`**, with remote state:
- **Zone**: Domain configuration for `nikoheikkila.fi`
- **DNS**: Records defined in YAML (`dns.yml`) for easier maintenance
- **R2 Storage**: Blog assets bucket with custom domain (`r2.nikoheikkila.fi`)
- **Workers**: Custom domain mapping (`nikoheikkila.fi` → service `blog`) and the shared placeholder Worker `blog-preview` (previews enabled)
- **State Backend**: Stored in the Cloudflare R2 bucket `terraform`

The production Worker `blog` is not Terraform-managed; Terraform only maps the custom domain to it.

The site is deployed with **Wrangler and Workers static assets**, not Terraform: the Cloudflare provider **cannot upload Workers static assets** (that flow needs an upload-session JWT only Wrangler implements), and it has no Workers Previews resource.
- **Config**: root `wrangler.jsonc` (Worker `blog`, no `main`; assets from `./public`, `html_handling: "force-trailing-slash"`, `not_found_handling: "404-page"`)
- **Static files**: `static/_redirects` (`/feed` → `/rss.xml`), `static/_headers` (cache rules) and `static/.assetsignore` (excludes source maps and build stats); Gatsby copies `static/` into `public/`
- **Previews**: Workers Previews `pr-<n>` of the shared Worker `blog-preview`, at `https://pr-<n>-blog-preview.yo-062.workers.dev`. `preview.yml` deploys them and `preview-cleanup.yml` deletes them when the PR closes. There is no per-PR bucket or Terraform workspace.

Credentials are 1Password references in the repository root, each file using the variable names the tools read: `CLOUDFLARE_API_TOKEN`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (see `OP_ARGS` in `infra/cloudflare/Taskfile.yml`):
- `.env.infra` — the infra token (account-wide Workers, for the custom domain) and the R2 keys for the state backend; loaded by `infra/cloudflare`

Previews are deployed and destroyed only by CI; there are no local preview credentials.

The only required input, `account_id`, comes from the GitHub repository variable `CLOUDFLARE_ACCOUNT_ID` (see [Infrastructure Variables](#infrastructure-variables) below).

## Infrastructure Commands

Run the Terraform module from the repo root via the `terraform:` Taskfile namespace, or from `infra/cloudflare/`:

```bash
# Core infrastructure (infra/cloudflare/)
task terraform:init        # Initialize providers and backend
task terraform:format      # Format Terraform code
task terraform:validate    # fmt -check + terraform validate
task terraform:plan        # Plan infrastructure changes
task terraform:deploy      # Apply changes (after careful review)

# Site (Wrangler, from the repo root) — site:deploy and site:verify need `task build` first so public/ exists
task site:verify           # Run the built site locally with wrangler dev
task site:deploy           # Production Worker blog — CI's job; avoid locally
```

Previews are CI-only: `task site:preview:deploy` and `task site:preview:delete`.

Guardrails to know about:
- Do **not** pass extra CLI args to multi-command tasks: `{{.CLI_ARGS}}` is appended to _every_ command the task runs, so extra flags can break the intermediate steps.
- There is no local destroy task. To delete a preview left behind by a closed PR, run the cleanup workflow from main: `gh workflow run preview-cleanup.yml -f pull-request=<n>`.

### CI deployment flow

Every Terraform run in CI goes through one of two portable composite actions, `.github/actions/terraform/plan` and `/deploy`. They run `terraform` directly, assume `terraform` is on `PATH`, and read provider and backend credentials from the calling step's `env:`. Each `action.yml` documents its inputs; `plan` outputs `needs-apply` (from `-detailed-exitcode`). They are composite actions rather than reusable workflows because GitHub only resolves environment secrets in the job that declares the `environment`, so the calling job declares it and passes the secrets as `env:`; jactionlint's `secrets-outside-env` rejects passing them into a reusable workflow. The calling jobs own everything project-specific: checkout, `setup-environment` (mise), downloading `static-assets`, and the Wrangler steps. Callers: `ci.yml` plans `infra/cloudflare` on every run with the read-only repository secrets `CLOUDFLARE_READ_API_TOKEN` and `R2_STATE_READ_ACCESS_KEY_ID`/`R2_STATE_READ_SECRET` (`lock: false`); on `main`, Deploy Infrastructure applies the saved plan only when the plan's `needs-apply` is `true`, then Deploy to Production runs `wrangler deploy` (it runs even when the infrastructure deploy is skipped), both in environment `prod`; the trusted `workflow_run` workflow `preview.yml` deploys the Workers Preview from the PR's `static-assets` artifact (environment `preview`); `preview-cleanup.yml` (`workflow_run` after the permissionless `pull-request-closed.yml`) deletes the Preview with `task site:preview:delete` when the PR closes. Each calling job declares its `environment` and passes the secrets as step `env:`: `CLOUDFLARE_API_TOKEN` in `preview` and `prod`, both restricted to `main`; `prod` also holds `CLOUDFLARE_R2_ACCESS_KEY_ID`/`CLOUDFLARE_R2_ACCESS_KEY_SECRET` for the state backend and `CLOUDFLARE_INFRA_API_TOKEN`, which Deploy Infrastructure uses as `CLOUDFLARE_API_TOKEN` because Workers Custom Domains need account-wide Workers Scripts Write. Never give a job that runs PR code a write token.

See all commands by running `task -a` in the `infra/cloudflare/` directory.

## Infrastructure Variables

Terraform variables (all but `account_id` keep their defaults):
- **`account_id`** (required): CloudFlare account ID (32-char hex), read from the GitHub repository variable `CLOUDFLARE_ACCOUNT_ID` as `TF_VAR_account_id` — CI passes it as step `env:`, and each module's `run` task fetches it with `gh variable get`
- **`domain`** (optional): Primary domain (default: `nikoheikkila.fi`)
- **`r2_bucket_name`** (optional): R2 bucket name (default: `blog`)
- **`r2_bucket_location`** (optional): Bucket location (default: `EEUR`)
- **`r2_storage_class`** (optional): Storage class (default: `Standard`)
- **`worker_service_name`** (optional): Worker service name (default: `blog`)
- **`preview_worker_name`** (optional): Name of the shared preview Worker that Workers Previews are created on (default: `blog-preview`)

All variables have sensible defaults except `account_id`.

## DNS Management Workflow

1. **Edit DNS records**: Edit `infra/cloudflare/dns.yml`
2. **Plan changes**: `task plan` (from `infra/cloudflare/` directory)
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
- The backend's `bucket`/`key` values are hardcoded strings, unrelated to the module's local directory path — renaming or relocating a root module directory never requires a state migration or `terraform state mv`; just re-run `terraform init` from the new location and it reattaches to the same remote state

## Redirect Infrastructure

Subdomain redirects are managed via `infra/cloudflare/redirects.yml` and applied automatically through `infra/cloudflare/locals.tf` and `infra/cloudflare/dns.tf`. To add a redirect, append an entry to `redirects.yml` and run `task plan` then `task deploy` — no HCL changes needed.

**redirects.yml schema:**

```yaml
redirects:
  - from: subdomain # subdomain prefix, e.g. "cv" → cv.nikoheikkila.fi
    to: "https://..." # redirect target URL
    status: 301 # HTTP status code
    preserve_path: true # optional: appends request path to target (default: false)
```

**Key constraints to be aware of:**
- **One ruleset per phase per zone**: Cloudflare allows only one `cloudflare_ruleset` resource per phase. All redirect rules (including the www→root redirect) are merged into the single `cloudflare_ruleset.www_redirect` resource via `local.redirect_rules` in `locals.tf`. Never create a second ruleset for the same phase.
- **Proxied DNS required**: Each redirect subdomain needs a proxied CNAME record pointing to the root domain so Cloudflare intercepts traffic before it reaches the origin. These are created automatically from `redirects.yml` by `cloudflare_dns_record.redirects` in `dns.tf`.
- **DNS conflict filter**: Entries whose `from` key already exists in `dns_config.dns_records` (i.e. `dns.yml`) are excluded from `cloudflare_dns_record.redirects` to prevent duplicate record conflicts. This is how the `www` entry coexists in both files.
- **`target_url` form**: Use `{ value = "..." }` for static external URLs. Use `{ expression = "concat(\"...\", http.request.uri.path)" }` when `preserve_path: true` to forward the request path. The `preserve_path` field in the YAML controls which form is used.

## Provider Quirks (learned the hard way)

- **Inspecting provider schemas** (`terraform providers schema -json`) requires a fully initialized backend. To probe resource attributes without credentials, create a scratch directory containing only a `terraform { required_providers { ... } }` stub, run `terraform init` there, and dump the schema from it.
- **Cloudflare strips `ETag` from 200 `text/html` responses at the edge**: static assets keep their etags and conditional requests still work. Production behaves identically — this is not a bug to chase.

## Infrastructure Troubleshooting

### Scenario: Validation Fails

- Run `task format` to fix formatting issues
- Check HCL syntax in `.tf` files
- Verify YAML syntax in `dns.yml`
- Ensure variable types match definitions
- `there is no package for ... cached in .terraform/providers` means the local provider cache is stale — re-run `task run command=init` in the module directory

### Scenario: S3 Operations Return 403 AccessDenied

- The R2 access keys authenticate but lack access to the `terraform` state bucket: check the R2 API token's bucket scope in the Cloudflare dashboard
- Diagnostic fallback: S3 credentials can be derived from any Cloudflare API token with R2 permissions (access key = token ID from `/user/tokens/verify`, secret = SHA-256 hex of the token value) to compare scopes

### Scenario: Plan Contains Unexpected Changes

- Check if manual changes were made via Cloudflare UI
- Verify the `CLOUDFLARE_ACCOUNT_ID` repository variable (`gh variable get CLOUDFLARE_ACCOUNT_ID`)
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

### Scenario: Terraform Artifacts Show Up as Untracked After Restructuring

- `.gitignore` patterns without a leading/middle slash (e.g. `tfplan`, `.terraform/`) cascade into every subdirectory below the `.gitignore` file itself — including a sibling module that merely happens to be nested underneath it at the time.
- If that `.gitignore` moves (e.g. as part of relocating the module directory that owns it) while a sibling module stays put, the sibling silently loses ignore coverage the moment it's no longer nested underneath — its `.terraform/`, `tfplan`, and compiled bundles start showing as untracked.
- Fix: give every Terraform root module directory (`infra/cloudflare/`) its own `.gitignore` with the standard artifact patterns (`tfplan`, `*.tfplan`, `*.tfstate*`, `.terraform/`, crash logs, override files, `.terraformrc`) rather than relying on a parent's file to cascade down.

### Infrastructure Outputs

View infrastructure outputs:

```bash
cd infra/cloudflare/
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
