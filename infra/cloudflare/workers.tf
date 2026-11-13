# Cloudflare Workers configuration
# The Worker script itself is deployed and managed by the site module (./site)
# This resource only manages the custom domain mapping
resource "cloudflare_workers_custom_domain" "blog" {
  account_id = var.account_id
  hostname   = local.domain
  service    = var.worker_service_name
  zone_id    = local.zone_id

  # The Cloudflare API always returns environment = "production" as a server-side default,
  # even when omitted. This is a known provider bug (cloudflare/terraform-provider-cloudflare#5618).
  # The environment attribute is deprecated, so we ignore it to prevent perpetual drift.
  lifecycle {
    ignore_changes = [environment]
  }
}

# Shared preview Worker. Each pull request uploads a version of it with
# preview alias pr-<n> (see ../site), using a token that is Editor on this
# Worker only, and Editor cannot create Workers, so the Worker is created here.
# The deployed placeholder never serves a preview; preview versions are never
# deployed, so they don't drift from this content.
resource "cloudflare_workers_script" "preview" {
  account_id         = var.account_id
  script_name        = var.preview_worker_name
  main_module        = "worker.js"
  compatibility_date = "2025-11-12"
  content            = <<-JS
    export default {
      fetch: () => new Response("Not found: open a pull request preview URL instead.", { status: 404 }),
    };
  JS
}

# Preview alias URLs (pr-<n>-blog-preview.<subdomain>.workers.dev) require the
# workers.dev route and Preview URLs to be enabled on the Worker.
resource "cloudflare_workers_script_subdomain" "preview" {
  account_id       = var.account_id
  script_name      = cloudflare_workers_script.preview.script_name
  enabled          = true
  previews_enabled = true
}
