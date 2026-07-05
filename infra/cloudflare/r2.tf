# Cloudflare R2 configuration

resource "cloudflare_r2_bucket" "blog" {
  account_id    = var.account_id
  name          = var.r2_bucket_name
  location      = var.r2_bucket_location
  storage_class = var.r2_storage_class
  jurisdiction  = "eu"
}

# Custom domain for R2 bucket access
# Allows accessing R2 objects via r2.nikoheikkila.fi instead of generic R2 URLs
resource "cloudflare_r2_custom_domain" "blog_custom_domain" {
  account_id   = var.account_id
  bucket_name  = cloudflare_r2_bucket.blog.name
  domain       = "r2.${local.domain}"
  zone_id      = local.zone_id
  enabled      = true
  jurisdiction = cloudflare_r2_bucket.blog.jurisdiction
}

# Enable tiered caching for improved performance and reduced origin load
# Tiered cache uses Cloudflare's upper-tier data centers as an additional cache layer
resource "cloudflare_tiered_cache" "r2" {
  zone_id = cloudflare_zone.nikoheikkila_fi.id
  value   = "on"
}
