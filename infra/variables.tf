variable "zone_id" {
  description = "CloudFlare zone ID for the domain"
  type        = string
  default     = "d1561b53f2558d8285b1217e13fc9e68"
}

variable "domain_name" {
  description = "Domain name"
  type        = string
  default     = "nikoheikkila.fi"
}

variable "r2_account_id" {
  description = "CloudFlare R2 account ID"
  type        = string
  default     = "062f0fa13aa03208ea85092e2e89480f"
}
