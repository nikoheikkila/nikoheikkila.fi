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

# Wrangler configuration for `wrangler preview --name <workspace>`, which CI runs
# because the provider has no Previews resource. Preview bindings are read only
# from `previews`; `no_bundle` uploads worker.js as-is (the command has no flag).
output "wrangler_config" {
  description = "Wrangler configuration (JSON) for this preview's Workers Preview; null in production"
  value = local.is_production ? null : jsonencode({
    name               = var.preview_worker_name
    account_id         = var.account_id
    main               = "worker.js"
    compatibility_date = var.compatibility_date
    no_bundle          = true
    previews = {
      r2_buckets = [{
        binding      = "SITE"
        bucket_name  = cloudflare_r2_bucket.site.name
        jurisdiction = cloudflare_r2_bucket.site.jurisdiction
      }]
    }
  })
}
