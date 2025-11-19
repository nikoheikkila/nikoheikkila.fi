# Local values derived from resources
# Used to avoid repetition and maintain consistency across resources

locals {
  zone_id = cloudflare_zone.nikoheikkila_fi.id
  domain  = cloudflare_zone.nikoheikkila_fi.name
}
