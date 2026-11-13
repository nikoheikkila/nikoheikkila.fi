# Cloudflare Worker serving the static site from R2 — production only.
# Previews never create a Worker: CI uploads a version of the shared
# "blog-preview" Worker per pull request (see the wrangler_config output),
# so no credential needs account-wide rights to create Workers.
# The production custom domain mapping (nikoheikkila.fi → service "blog")
# is managed separately in ../cloudflare/workers.tf.

resource "cloudflare_workers_script" "site" {
  count = local.is_production ? 1 : 0

  account_id  = var.account_id
  script_name = local.worker_name

  content            = file("${path.module}/worker.js")
  main_module        = "worker.js"
  compatibility_date = var.compatibility_date

  bindings = [
    {
      name         = "SITE"
      type         = "r2_bucket"
      bucket_name  = cloudflare_r2_bucket.site.name
      jurisdiction = cloudflare_r2_bucket.site.jurisdiction
    },
  ]

  # Serve traffic only after every file is uploaded, so a deployment (or the
  # initial cutover from Workers static assets) never exposes a partial site.
  depends_on = [aws_s3_object.files]
}

# Serve the Worker on its workers.dev subdomain, parity with the previous
# `workers_dev = true` Wrangler setting in production.
resource "cloudflare_workers_script_subdomain" "site" {
  count = local.is_production ? 1 : 0

  account_id  = var.account_id
  script_name = cloudflare_workers_script.site[0].script_name
  enabled     = true
}
