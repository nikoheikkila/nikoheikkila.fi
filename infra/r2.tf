# Cloudflare R2 configuration

resource "cloudflare_r2_bucket" "blog" {
  account_id    = var.r2_account_id
  name          = "blog"
  location      = "EEUR"
  storage_class = "Standard"
  jurisdiction  = "eu"
}

resource "cloudflare_r2_custom_domain" "blog_custom_domain" {
  account_id   = var.r2_account_id
  bucket_name  = cloudflare_r2_bucket.blog.name
  domain       = "r2.${var.domain_name}"
  zone_id      = var.zone_id
  enabled      = true
  jurisdiction = cloudflare_r2_bucket.blog.jurisdiction
}

resource "cloudflare_tiered_cache" "r2" {
  zone_id = var.zone_id
  value   = "on"
}
