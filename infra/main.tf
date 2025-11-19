# Terraform configuration for Cloudflare infrastructure
# Manages zone, DNS, R2 storage, and Workers custom domains

terraform {
  required_version = ">= 1.13.5, < 2.0.0"

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 5.0"
    }
  }

  # S3-compatible backend using Cloudflare R2 for state storage
  # Credentials are managed via 1Password and injected through environment variables
  backend "s3" {
    bucket = "terraform"
    key    = "terraform.tfstate"
    region = "auto"

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
