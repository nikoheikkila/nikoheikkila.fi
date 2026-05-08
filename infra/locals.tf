# Local values derived from resources
# Used to avoid repetition and maintain consistency across resources

locals {
  zone_id = cloudflare_zone.nikoheikkila_fi.id
  domain  = cloudflare_zone.nikoheikkila_fi.name
}

locals {
  redirects_config = yamldecode(file("${path.module}/redirects.yml"))

  redirect_rules = [for r in local.redirects_config.redirects : {
    ref         = "${r.from}_redirect"
    description = "Redirect ${r.from}.${local.domain} to ${r.to}"
    expression  = "(http.host eq \"${r.from}.${local.domain}\")"
    action      = "redirect"
    action_parameters = {
      from_value = {
        status_code           = r.status
        target_url            = try(r.preserve_path, false) ? { expression = "concat(\"${r.to}\", http.request.uri.path)" } : { value = r.to }
        preserve_query_string = try(r.preserve_path, false)
      }
    }
    enabled = true
  }]
}
