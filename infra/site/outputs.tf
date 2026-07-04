# Output values for the site deployment

output "environment" {
  description = "Deployment environment derived from the Terraform workspace"
  value       = local.environment
}

output "worker_name" {
  description = "Name of the Worker serving this deployment"
  value       = cloudflare_workers_script.site.script_name
}

output "bucket_name" {
  description = "R2 bucket holding the static files for this deployment"
  value       = cloudflare_r2_bucket.site.name
}

output "file_count" {
  description = "Number of static files deployed"
  value       = length(local.files)
}

output "url" {
  description = "Public URL of this deployment"
  value = (
    local.environment == "production"
    ? "https://${var.domain}"
    : "https://${local.worker_name}.${var.workers_dev_subdomain}.workers.dev"
  )
}
