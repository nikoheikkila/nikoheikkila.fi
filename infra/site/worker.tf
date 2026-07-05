# Cloudflare Worker serving the static site from R2.
# The production custom domain mapping (nikoheikkila.fi → service "blog")
# is managed separately in ../cloudflare/workers.tf.

resource "cloudflare_workers_script" "site" {
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

  lifecycle {
    precondition {
      condition     = contains(local.files, "index.html")
      error_message = "Build output is missing — run `task build` at the repository root before deploying the site."
    }
  }

  # Serve traffic only after every file is uploaded, so a deployment (or the
  # initial cutover from Workers static assets) never exposes a partial site.
  depends_on = [aws_s3_object.files]
}

# Serve the Worker on its workers.dev subdomain: preview URLs for pull requests,
# parity with the previous `workers_dev = true` Wrangler setting in production.
resource "cloudflare_workers_script_subdomain" "site" {
  account_id  = var.account_id
  script_name = cloudflare_workers_script.site.script_name
  enabled     = true
}
