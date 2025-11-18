resource "cloudflare_zone" "nikoheikkila_fi" {
  account = {
    id = var.account_id
  }
  name = "nikoheikkila.fi"
  type = "full"
}
