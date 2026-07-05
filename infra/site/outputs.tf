# Output values for the site deployment

output "worker_name" {
  description = "Name of the Worker serving this deployment"
  value       = cloudflare_workers_script.site.script_name
}

output "bucket_name" {
  description = "R2 bucket holding the static files for this deployment"
  value       = cloudflare_r2_bucket.site.name
}

output "url" {
  description = "Public URL of this deployment"
  value = (
    local.is_production
    ? "https://${var.domain}"
    : "https://${local.worker_name}.${var.workers_dev_subdomain}.workers.dev"
  )
}
