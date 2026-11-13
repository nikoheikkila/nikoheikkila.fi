# Output values for the site deployment

output "worker_name" {
  description = "Name of the Worker serving this deployment"
  value       = local.worker_name
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
    : "https://${terraform.workspace}-${var.preview_worker_name}.${var.workers_dev_subdomain}.workers.dev"
  )
}

# Wrangler configuration for uploading a preview version of the shared
# preview Worker, bound to this workspace's bucket. The provider cannot set a
# version's preview alias, so CI writes this next to the Worker bundle and runs
# `wrangler versions upload --preview-alias <workspace>` with it.
output "wrangler_config" {
  description = "Wrangler configuration (JSON) for this preview's version upload; null in production"
  value = local.is_production ? null : jsonencode({
    name               = var.preview_worker_name
    account_id         = var.account_id
    main               = "worker.js"
    compatibility_date = var.compatibility_date
    workers_dev        = true
    preview_urls       = true
    r2_buckets = [{
      binding      = "SITE"
      bucket_name  = cloudflare_r2_bucket.site.name
      jurisdiction = cloudflare_r2_bucket.site.jurisdiction
    }]
  })
}
