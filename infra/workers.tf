# Cloudflare Workers configuration
# The Worker script itself is deployed and managed via wrangler CLI
# This resource only manages the custom domain mapping
resource "cloudflare_workers_custom_domain" "blog" {
  account_id = var.account_id
  hostname   = local.domain
  service    = var.worker_service_name
  zone_id    = local.zone_id
}
