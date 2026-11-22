# Cloudflare Infrastructure

## Overview

This directory contains Terraform configuration for managing the complete Cloudflare infrastructure for `nikoheikkila.fi`, including DNS records and Workers custom domains.

## Infrastructure Components

### DNS Management (`dns.tf`, `dns.yml`)

DNS records are managed using a hybrid approach:
- **Configuration**: YAML file (`dns.yml`) for easy maintenance
- **Deployment**: Terraform reads YAML and creates Cloudflare DNS records
- **Zone**: `nikoheikkila.fi` (ID available via `terraform output zone_id`)

### R2 Storage (`r2.tf`)

- **Bucket**: `blog` (jurisdiction: EU)
- **Location**: EEUR (Eastern Europe)
- **Purpose**: Object storage for blog assets
- **Management**: Fully managed via Terraform
- **Terraform Resource**: `cloudflare_r2_bucket.blog`

### Cloudflare Workers (`workers.tf`)

- **Purpose**: Custom domain mapping for the Worker serving the blog
- **Custom Domain**: `nikoheikkila.fi`
- **Environment**: `production`
- **Deployment**: Worker code and static assets are deployed with Wrangler (`wrangler.jsonc` at the repository root); Terraform manages only the custom domain mapping
- **Terraform Resource**: `cloudflare_workers_custom_domain.blog`

### Preview Worker (`workers.tf`)

- **Purpose**: Shared placeholder Worker (`preview_worker_name`, default `blog-preview`) that hosts every pull request preview
- **Deployment**: Terraform creates it with a placeholder script that never serves a preview; Wrangler creates each Workers Preview `pr-<n>` of it
- **Previews**: the workers.dev subdomain and preview URLs are enabled on the Worker
- **Terraform Resources**: `cloudflare_workers_script.preview`, `cloudflare_workers_script_subdomain.preview`

### Site Deployment (Wrangler)

The built static site is deployed with Wrangler and Workers static assets, outside this module (see "Hosting Model" in [`AGENTS.md`](../../AGENTS.md)):
- **Config**: `wrangler.jsonc` at the repository root (Worker `blog`, assets from `public/`, trailing-slash canonicalisation, 404 page)
- **Static files**: Gatsby build output (`public/`); `static/_redirects` (`/feed` → `/rss.xml`) and `static/_headers` (cache rules) are copied from `static/`
- **Environments**: production Worker `blog`; pull request previews are Workers Previews `pr-<n>` of the shared `blog-preview` Worker

## Management Approach

### DNS Records

- **Configuration**: Edit `dns.yml` to add/modify/remove DNS records
- **Deployment**: Apply via Terraform
- **Format**: YAML for human-friendly editing
- **Validation**: Terraform validates configuration before applying

### Worker Code & Configuration

- **Managed via**: Wrangler (`wrangler.jsonc` at the repository root)
- **Deployment**: `task site:deploy` locally, GitHub Actions in CI
- **Configuration**: Compatibility date and assets settings in `wrangler.jsonc`

### Worker Infrastructure (Custom Domains)

- **Managed via**: Terraform (`workers.tf`)
- **Purpose**: Track custom domain mapping in IaC
- **Deployment**: `task deploy` (see Taskfile)

### R2 Buckets

- **Managed via**: Terraform (`r2.tf`)
- **Purpose**: Object storage infrastructure for blog assets
- **Deployment**: `task deploy` (see Taskfile)

## Why Wrangler for the Site?

1. **Separation of Concerns**:
   - DNS and infrastructure changes are infrequent and need careful review (this module)
   - The site deployment changes on every merge and per pull request (Wrangler, see above)

2. **No Per-PR State**:
   - Previews are Workers Previews of one shared Worker, so there is no per-pull-request
     bucket or Terraform workspace to create and destroy

3. **Wrangler Where Terraform Cannot**:
   - The Cloudflare provider cannot upload Workers static assets (that flow requires
     Wrangler), so the site is deployed with Wrangler
   - The provider also has no Workers Previews resource, so Wrangler creates and deletes
     previews (see "Hosting Model" in [`AGENTS.md`](../../AGENTS.md))

## Configuration

### Variables

The following variables are available:
- **`account_id`** (required): CloudFlare account ID (32-character hex string), read from the
  GitHub repository variable `CLOUDFLARE_ACCOUNT_ID` (`TF_VAR_account_id`)
- **`domain`** (optional): Primary domain name (default: `nikoheikkila.fi`)
- **`r2_bucket_name`** (optional): R2 bucket name (default: `blog`)
- **`r2_bucket_location`** (optional): R2 bucket location (default: `EEUR`, options: WNAM, ENAM, WEUR, EEUR, APAC)
- **`r2_storage_class`** (optional): R2 storage class (default: `Standard`, options: Standard, InfrequentAccess)
- **`worker_service_name`** (optional): CloudFlare Worker service name (default: `blog`)
- **`preview_worker_name`** (optional): Name of the shared preview Worker that hosts Workers Previews (default: `blog-preview`)

All variables except `account_id` have sensible defaults and typically don't need to be changed.

### Outputs

The following outputs are available after applying the configuration:
- **`zone_id`**: CloudFlare zone ID
- **`zone_name`**: Domain name
- **`r2_bucket_id`**: R2 bucket identifier
- **`r2_bucket_name`**: R2 bucket name
- **`r2_custom_domain`**: Custom domain for R2 bucket access
- **`worker_custom_domain`**: Worker custom domain hostname
- **`dns_record_count`**: Total number of DNS records managed

View outputs with: `task run -- output` or `terraform output`

### Secrets Management

All sensitive credentials are managed via **1Password** and referenced from `.env.infra` in the
repository root:
- `CLOUDFLARE_API_TOKEN`: the infra API token for the Terraform provider
- `AWS_ACCESS_KEY_ID`: R2 access key for the state backend
- `AWS_SECRET_ACCESS_KEY`: R2 secret key for the state backend

Commands are executed through `task run command='<terraform args>'`, which wraps them in `op run`.

## Common Tasks

All tasks are defined in `Taskfile.yml` for easy execution.

### Local Development (with 1Password)

From project root:

```bash
task terraform:init
task terraform:plan
task terraform:deploy
```

### CI/CD Pipeline

CI plans this module on every run and applies it on `main` before the site deploys: see `.github/workflows/ci.yml` and the composite action `.github/actions/terraform`.

### DNS Management

```bash
# 1. Edit DNS records
$EDITOR dns.yml

# 2. Validate and plan (from infra directory)
task plan

# 3. Review changes carefully
# 4. Apply if changes look correct
task deploy
```

### Worker Deployment

The CloudFlare Worker hosting the site is deployed with Wrangler by GitHub Actions for preview and
production (see "Site Deployment" above). Previews are CI-only. To deploy production manually from a local build:

```bash
task site:deploy
```

### State Lock Issues

**⚠️ Use this with CAUTION!** If Terraform state is locked:

```bash
task run command='force-unlock <LOCK_ID>'
```
