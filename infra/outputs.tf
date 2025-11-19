# Output values for Cloudflare infrastructure
# These can be referenced by other Terraform configurations or used in CI/CD pipelines

output "zone_id" {
  description = "The zone ID"
  value       = local.zone_id
}

output "zone_name" {
  description = "The zone name"
  value       = local.domain
}

output "r2_bucket_id" {
  description = "The R2 bucket ID"
  value       = cloudflare_r2_bucket.blog.id
}

output "r2_bucket_name" {
  description = "The R2 bucket name"
  value       = cloudflare_r2_bucket.blog.name
}

output "r2_custom_domain" {
  description = "The R2 custom domain"
  value       = cloudflare_r2_custom_domain.blog_custom_domain.domain
}

output "worker_custom_domain" {
  description = "The Worker custom domain"
  value       = cloudflare_workers_custom_domain.blog.hostname
}

output "dns_record_count" {
  description = "Total number of DNS records managed"
  value       = length(cloudflare_dns_record.records)
}
