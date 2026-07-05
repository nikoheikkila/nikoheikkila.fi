# Cloudflare zone configuration
# Defines the primary domain zone

resource "cloudflare_zone" "nikoheikkila_fi" {
  account = {
    id = var.account_id
  }
  name = var.domain
  type = "full"
}
