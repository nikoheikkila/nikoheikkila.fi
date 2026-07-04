# Terraform configuration for deploying the built static site to Cloudflare
# Uploads the Gatsby build output to R2 and serves it with a Cloudflare Worker.
#
# Environments are modelled as Terraform workspaces:
#   - default   → production (worker "blog", bucket "site", custom domain from ../workers.tf)
#   - pr-<n>    → pull request preview (worker "blog-pr-<n>", bucket "site-pr-<n>", workers.dev URL)

terraform {
  required_version = ">= 1.13.5, < 2.0.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }

    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  # S3-compatible backend using Cloudflare R2 for state storage
  # Credentials are managed via 1Password and injected through environment variables
  backend "s3" {
    bucket               = "terraform"
    key                  = "site.tfstate"
    workspace_key_prefix = "site"
    region               = "auto"

    endpoints = {
      s3 = "https://062f0fa13aa03208ea85092e2e89480f.eu.r2.cloudflarestorage.com"
    }

    # Skip AWS-specific validations since we're using R2
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true

    use_path_style = true
    use_lockfile   = true
  }
}

# API token is configured via CLOUDFLARE_API_TOKEN environment variable
provider "cloudflare" {
}

# The AWS provider talks to the R2 S3-compatible API for object uploads.
# Credentials for it (and for the state backend) are derived at runtime from
# CLOUDFLARE_API_TOKEN by r2-credentials.ts, so no separate R2 keys are needed.
# R2 does not implement the AWS flexible checksum extensions, so uploads additionally
# require AWS_REQUEST_CHECKSUM_CALCULATION=when_required and
# AWS_RESPONSE_CHECKSUM_VALIDATION=when_required in the environment (set by the Taskfile).
provider "aws" {
  region = "auto"

  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_region_validation      = true
  skip_requesting_account_id  = true

  s3_use_path_style = true

  endpoints {
    s3 = "https://062f0fa13aa03208ea85092e2e89480f.eu.r2.cloudflarestorage.com"
  }
}
