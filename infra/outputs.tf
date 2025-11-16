output "zone_name" {
  description = "The zone name"
  value       = data.cloudflare_zone.main.name
}

output "zone_id" {
  description = "The zone ID"
  value       = data.cloudflare_zone.main.id
}

output "worker_custom_domain_id" {
  description = "The Workers custom domain ID"
  value       = cloudflare_workers_custom_domain.blog.id
}

output "worker_custom_domain_hostname" {
  description = "The Workers custom domain hostname"
  value       = cloudflare_workers_custom_domain.blog.hostname
}
