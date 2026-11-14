---
name: terraform
description: Instructions for managing the Cloudflare infrastructure with Terraform. Use this when you need to work with Terraform or Cloudflare resources.
---

# Infrastructure Management with Terraform

## Terraform Configuration

Everything is managed with Terraform and the Cloudflare provider across **two root modules with separate state**:

`infra/cloudflare/` — long-lived core infrastructure:
- **Zone**: Domain configuration for `nikoheikkila.fi`
- **DNS**: Records defined in YAML (`dns.yml`) for easier maintenance
- **R2 Storage**: Blog assets bucket with custom domain (`r2.nikoheikkila.fi`)
- **Workers**: Custom domain mapping (`nikoheikkila.fi` → service `blog`)
- **State Backend**: Stored in the Cloudflare R2 bucket `terraform`

`infra/site/` — the site deployment (changes on every merge and per pull request):
- **Static files**: Gatsby build output (`public/`) uploaded to a per-environment R2 bucket via `aws_s3_object`
- **Worker**: `worker.ts` (compiled to `worker.js` by Bun — a gitignored build artifact) serves the bucket with trailing-slash canonicalisation, conditional/range requests, and the path redirects bundled from `redirects.json`
- **Environments = Terraform workspaces**: `default` → production (worker `blog`, bucket `site`); `pr-<n>` → preview (bucket `site-pr-<n>` only; CI uploads a version of the shared worker `blog-preview` with preview alias `pr-<n>` via `task ci:preview:upload`, because the provider cannot set preview aliases) at `https://pr-<n>-blog-preview.yo-062.workers.dev`
- **Headers policy**: per-object `content_type`/`cache_control` set at upload time in `locals.tf` (replaces the former `static/_headers`)

Terraform serves the site from R2 because the Cloudflare provider **cannot upload Workers static assets** — that API flow requires an upload-session JWT only Wrangler implements.

Credentials are 1Password references in the repository root, each file using the variable names the tools read: `CLOUDFLARE_API_TOKEN`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` (see `OP_ARGS` in each `Taskfile.yml`):
- `.env.infra` — the infra token (account-wide Workers, for the custom domain) and production R2 keys; loaded by `infra/cloudflare`
- `.env.prod` — the token scoped to `blog` and production R2 keys; loaded by `infra/site`

Previews are deployed and destroyed only by CI; there are no local preview credentials.

Shared Terraform inputs live at the common parent, `infra/` (see `TFVARS`):
- `infra/cloudflare.tfvars` — variables described under [Infrastructure Variables](#infrastructure-variables) below

## Infrastructure Commands

Both modules are reachable from the repo root via Taskfile namespaces (`terraform:` and `site:`), or run the same tasks from inside their directories:

```bash
# Core infrastructure (infra/cloudflare/)
task terraform:init        # Initialize providers and backend
task terraform:format      # Format Terraform code
task terraform:validate    # fmt -check + terraform validate
task terraform:plan        # Plan infrastructure changes
task terraform:deploy      # Apply changes (after careful review)

# Site deployment (infra/site) — requires `task build` first so public/ exists
task site:validate                  # fmt -check + terraform validate
task site:deploy                    # Production (default workspace) — CI's job; avoid locally
```

Site module guardrails to know about:
- A plan/apply fails with a precondition error if `public/` is missing — run `task build` first. `worker.js` is compiled automatically by the `site:build` task dependency; never edit it by hand.
- `site:ci:destroy` (CI only) refuses the `default` workspace, so preview cleanup cannot destroy production. There is no local destroy task.
- Do **not** pass extra CLI args to multi-command tasks (e.g. `task site:plan -- -refresh=false` breaks: `{{.CLI_ARGS}}` is appended to _every_ terraform invocation in the task, including `workspace select`).
- R2 does not implement AWS flexible checksums; the site Taskfile exports `AWS_REQUEST_CHECKSUM_CALCULATION=when_required` and `AWS_RESPONSE_CHECKSUM_VALIDATION=when_required`. Raw `terraform` invocations outside the Taskfile need those variables too.

### CI deployment flow

Every Terraform run in CI goes through one reusable workflow, `.github/workflows/terraform.yml` (`workflow_call`; inputs `module`, `operation`, `environment`, `workspace`, `artifacts-run-id`). Supported pairs: `cloudflare/plan` and `cloudflare/deploy` (`task terraform:ci:*`, the deploy applies the saved plan), `site/deploy` and `site/destroy` (`task site:ci:deploy`/`site:ci:destroy`, plus `site:ci:preview:upload` for previews). Callers: `ci.yml` plans on every run with the read-only repository secrets `CLOUDFLARE_READ_API_TOKEN` and `R2_STATE_READ_ACCESS_KEY_ID`/`R2_STATE_READ_SECRET` (`-lock=false`), and on `main` deploys `infra/cloudflare` from that plan (Deploy Infrastructure), then deploys workspace `default` (Deploy to Production), both in environment `prod`; the trusted `workflow_run` workflow `preview.yml` deploys workspace `pr-<n>` from the PR's CI artifacts (environment `preview`); `preview-cleanup.yml` (`pull_request_target`) destroys it when the PR closes. Inside an environment the called job reads that environment's own secrets: `CLOUDFLARE_API_TOKEN` plus `CLOUDFLARE_R2_ACCESS_KEY_ID`/`CLOUDFLARE_R2_ACCESS_KEY_SECRET` in `preview` and `prod`, both restricted to `main`; `prod` also holds `CLOUDFLARE_INFRA_API_TOKEN`, used by `cloudflare/deploy` because Workers Custom Domains need account-wide Workers Scripts Write. Never give a job that runs PR code a write token.

See all commands by running `task -a` in the `infra/cloudflare/` directory.

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

## Testing the Worker

`infra/site/worker.test.ts` unit-tests `worker.ts` purely through its public `fetch(request, env)` entry point — no unexported helpers are tested directly, and no Workers runtime emulator (`@cloudflare/vitest-pool-workers`, `miniflare`, `wrangler`) is installed. It runs as part of the `unit` Vitest project (`vitest.unit.config.ts` includes `infra/site/*.test.ts`) via `task test:unit`, and is type-checked by `lint:site` (`infra/site/tsconfig.json`'s `include` is `["*.ts"]`, so any new flat `.ts` file in that directory is picked up automatically).

Patterns worth reusing if this Worker (or another one) grows more tests:
- **Import the source with an explicit `.ts` extension**: `import worker from "./worker.ts"`, not `"./worker"`. The directory also holds the gitignored, previously-compiled `worker.js`; an extensionless import can resolve to that stale bundle instead of the source depending on what happens to exist on disk. `allowImportingTsExtensions: true` in `infra/site/tsconfig.json` permits this.
- **Fake `R2Bucket` fully, not partially**: implement all members with a plain `: R2Bucket` annotation — no `as unknown as R2Bucket` cast. Stub the members the Worker never calls (`put`, `createMultipartUpload`, `resumeMultipartUpload`, `delete`, `list`) with correctly-typed functions that throw. This catches typos in the fake itself instead of silently compiling them away.
- **`R2Bucket.get()` is overloaded** (a required-`onlyIf` overload returning `R2ObjectBody | R2Object | null`, and an optional-`onlyIf` overload returning `R2ObjectBody | null`). A single loosely-typed arrow function can't satisfy both — its return type ends up too wide for the stricter overload. Declare `get` using TS's function-overload pattern instead (two signatures matching the interface exactly, followed by one implementation), inside a factory so it can still close over the fake's backing store.
- **`new Request(url, init)` defaults to the wrong `cf` shape for a fetch handler**: it constructs `Request<unknown, CfProperties<unknown>>` (the outgoing shape), but a Worker's `fetch(request: Request, env)` parameter is inferred as `Request<unknown, IncomingRequestCfProperties<unknown>>` (the incoming shape) via `satisfies ExportedHandler<Env>`. `CfProperties` is a union that includes the narrower outgoing `RequestInitCfProperties`, which isn't assignable to the incoming type — instantiate the generic explicitly: `new Request<unknown, IncomingRequestCfProperties<unknown>>(url, init)`.
- **A bare `R2Object` (no `body` key at all, not `body: undefined`) simulates R2's conditional-request behaviour**: `respondWith()` in `worker.ts` checks `"body" in object` to decide between 304 and 200/206. The fake doesn't need to implement real ETag/`onlyIf` comparison logic — that's R2's responsibility, not the Worker's — it just needs to be able to return an object shaped either way per test case.

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
- `there is no package for ... cached in .terraform/providers` means the local provider cache is stale — re-run `task run command=init` in the module directory

### Scenario: S3 Operations Return 403 AccessDenied

- The R2 access keys authenticate but lack access to the target bucket: check the R2 API token's bucket scope in the Cloudflare dashboard (it must be account-wide since site buckets are created per pull request)
- Diagnostic fallback: S3 credentials can be derived from any Cloudflare API token with R2 permissions (access key = token ID from `/user/tokens/verify`, secret = SHA-256 hex of the token value) to compare scopes

### Scenario: Plan Contains Unexpected Changes

- Check if manual changes were made via Cloudflare UI
- Verify variable values in `infra/cloudflare.tfvars`
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
- Fix: give every Terraform root module directory (`infra/cloudflare/`, `infra/site/`) its own `.gitignore` with the standard artifact patterns (`tfplan`, `*.tfplan`, `*.tfstate*`, `.terraform/`, crash logs, override files, `.terraformrc`) rather than relying on a parent's file to cascade down.

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

The site module outputs (per workspace): `url` (deployment URL, read by CI), `worker_name`, and `bucket_name`.
