locals {
  zone_id = cloudflare_zone.nikoheikkila_fi.id
  domain  = cloudflare_zone.nikoheikkila_fi.name
}
