---
name: terraform
description: Instructions for managing the Cloudflare infrastructure with Terraform. Use this when you need to work with Terraform or Cloudflare resources.
---

# Infrastructure Management with Terraform

## Terraform Configuration

Infrastructure is managed in the `infra/` directory using Terraform with Cloudflare provider:

- **Zone**: Domain configuration for `nikoheikkila.fi`
- **DNS**: Records defined in YAML (`dns.yml`) for easier maintenance
- **R2 Storage**: Blog assets bucket with custom domain
- **Workers**: Custom domain mapping for Cloudflare Workers
- **State Backend**: Stored in Cloudflare R2 bucket

## Infrastructure Commands

All commands must be run within the `infra/` directory:

```bash
cd infra/

# Initialize Terraform providers and backend
task init

# Format Terraform code
task format

# Validate configuration
task validate

# Plan infrastructure changes
task plan

# Apply changes (after careful review)
task deploy
```

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

## Infrastructure Troubleshooting

### Scenario: Validation Fails

- Run `task format` to fix formatting issues
- Check HCL syntax in `.tf` files
- Verify YAML syntax in `dns.yml`
- Ensure variable types match definitions

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
