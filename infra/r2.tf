# Cloudflare R2 configuration

resource "cloudflare_r2_bucket" "blog" {
  account_id   = var.r2_account_id
  name         = "blog"
  location     = "EEUR"
  jurisdiction = "eu"
}
