# Input variables for the site deployment
# All variables have sensible defaults except account_id which must be provided

variable "account_id" {
  description = "CloudFlare account ID"
  type        = string

  validation {
    condition     = can(regex("^[a-f0-9]{32}$", var.account_id))
    error_message = "Account ID must be a 32-character hexadecimal string."
  }
}

variable "domain" {
  description = "Primary domain name serving the production site"
  type        = string
  default     = "nikoheikkila.fi"
}

variable "worker_service_name" {
  description = "Name of the CloudFlare Worker service serving the site"
  type        = string
  default     = "blog"
}

variable "dist_dir" {
  description = "Path to the built static site (Gatsby build output)"
  type        = string
  default     = "../../public"
}

variable "compatibility_date" {
  description = "Workers runtime compatibility date"
  type        = string
  default     = "2025-11-12"
}

# The provider has no data source for the account-level workers.dev subdomain,
# so it is pinned here (GET /accounts/{account_id}/workers/subdomain)
variable "workers_dev_subdomain" {
  description = "Account-level workers.dev subdomain used to compose preview URLs"
  type        = string
  default     = "yo-062"
}
