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
- **Deployment**: Worker script and static files are managed by the site module (`site/`)
- **Terraform Resource**: `cloudflare_workers_custom_domain.blog`

### Site Deployment (`site/`)

A separate Terraform root module deploying the built static site:

- **Static files**: Gatsby build output (`public/`) uploaded to an R2 bucket through the
  S3-compatible API (`aws_s3_object`)
- **Worker**: `site/worker.ts` (compiled with Bun before Terraform runs) serves the bucket
  with trailing-slash canonicalisation, conditional requests, range requests, and path
  redirects (`/feed` → `/rss.xml`)
- **Environments**: Terraform workspaces — `default` deploys production (worker `blog`,
  bucket `site`), `pr-<n>` deploys a pull request preview (worker `blog-pr-<n>`,
  bucket `site-pr-<n>`, served from `workers.dev`)
- **Caching and content types**: set per object at upload time (see `site/locals.tf`),
  replacing the previous `_headers` and `_redirects` files

## Management Approach

### DNS Records

- **Configuration**: Edit `dns.yml` to add/modify/remove DNS records
- **Deployment**: Apply via Terraform
- **Format**: YAML for human-friendly editing
- **Validation**: Terraform validates configuration before applying

### Worker Code & Configuration

- **Managed via**: Terraform (`site/`)
- **Deployment**: `task site:deploy` locally, GitHub Actions in CI
- **Configuration**: Compatibility date and bindings in `site/worker.tf`

### Worker Infrastructure (Custom Domains)

- **Managed via**: Terraform (`workers.tf`)
- **Purpose**: Track custom domain mapping in IaC
- **Deployment**: `task deploy` (see Taskfile)

### R2 Buckets

- **Managed via**: Terraform (`r2.tf`)
- **Purpose**: Object storage infrastructure for blog assets
- **Deployment**: `task deploy` (see Taskfile)

## Why Two Root Modules?

1. **Separation of Concerns**:
   - DNS and infrastructure changes are infrequent and need careful review (`infra/`)
   - The site deployment changes on every merge and per pull request (`infra/site/`)

2. **State Isolation**:
   - Each site environment lives in its own Terraform workspace and state file,
     so preview deployments never touch production or core infrastructure state

3. **Terraform Only**:
   - The Cloudflare provider cannot upload Workers static assets (that flow requires
     Wrangler), so the site is served from R2 instead — every part of the deployment
     is plain Terraform with no extra tooling

4. **State Management**:
   - Terraform state tracks all infrastructure changes
   - R2 backend provides reliable, cost-effective storage

## Configuration

### Variables

The following variables can be configured in `cloudflare.tfvars`:

- **`account_id`** (required): CloudFlare account ID (32-character hex string)
- **`domain`** (optional): Primary domain name (default: `nikoheikkila.fi`)
- **`r2_bucket_name`** (optional): R2 bucket name (default: `blog`)
- **`r2_bucket_location`** (optional): R2 bucket location (default: `EEUR`, options: WNAM, ENAM, WEUR, EEUR, APAC)
- **`r2_storage_class`** (optional): R2 storage class (default: `Standard`, options: Standard, InfrequentAccess)
- **`worker_service_name`** (optional): CloudFlare Worker service name (default: `blog`)

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

All sensitive credentials are managed via **1Password**:

- `CLOUDFLARE_API_TOKEN`: API token for Terraform provider
- `AWS_ACCESS_KEY_ID`: R2 access key for state backend
- `AWS_SECRET_ACCESS_KEY`: R2 secret key for state backend

Secrets are referenced in `.env` file using 1Password CLI references.

Commands are executed with: `op run --env-file=".env" -- <command>`

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

See `.github/workflows/terraform.yml` for CI/CD pipeline details.

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

The CloudFlare Worker hosting the site is deployed by GitHub Actions for preview and production
through the `site/` module. To deploy manually from a local build:

```bash
# Preview (workspace pr-<n>)
task site:plan WORKSPACE=pr-123
task site:deploy WORKSPACE=pr-123

# Tear the preview down again
task site:destroy WORKSPACE=pr-123

# Production
task site:deploy
```

### State Lock Issues

**⚠️ Use this with CAUTION!** If Terraform state is locked:

```bash
op run --env-file="../.env" -- terraform force-unlock <LOCK_ID>
```
