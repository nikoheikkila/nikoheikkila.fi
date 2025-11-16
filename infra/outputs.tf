output "zone_name" {
  description = "The zone name"
  value       = data.cloudflare_zone.main.name
}

output "zone_id" {
  description = "The zone ID"
  value       = data.cloudflare_zone.main.id
}
