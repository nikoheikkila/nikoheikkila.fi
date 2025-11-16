# Cloudflare Workers configuration

# Custom domain for the Worker
# The Worker script itself is deployed and managed via wrangler CLI
# This resource only manages the custom domain mapping
resource "cloudflare_workers_custom_domain" "blog" {
  account_id  = var.r2_account_id
  hostname    = var.domain_name
  service     = "blog"
  zone_id     = var.zone_id
  environment = "production"
}
