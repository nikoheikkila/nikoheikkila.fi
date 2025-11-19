# Input variables for Cloudflare infrastructure
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
  description = "Primary domain name"
  type        = string
  default     = "nikoheikkila.fi"
}

variable "r2_bucket_name" {
  description = "Name of the R2 bucket for blog assets"
  type        = string
  default     = "blog"
}

variable "r2_bucket_location" {
  description = "Geographic location for R2 bucket"
  type        = string
  default     = "EEUR"

  validation {
    condition     = contains(["WNAM", "ENAM", "WEUR", "EEUR", "APAC"], var.r2_bucket_location)
    error_message = "Location must be one of: WNAM, ENAM, WEUR, EEUR, APAC."
  }
}

variable "r2_storage_class" {
  description = "Storage class for R2 bucket"
  type        = string
  default     = "Standard"

  validation {
    condition     = contains(["Standard", "InfrequentAccess"], var.r2_storage_class)
    error_message = "Storage class must be either Standard or InfrequentAccess."
  }
}

variable "worker_service_name" {
  description = "Name of the CloudFlare Worker service"
  type        = string
  default     = "blog"
}
