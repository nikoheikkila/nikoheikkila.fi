# DNS records configuration
# Records are defined in dns.yml for easier management
# Includes email (FastMail), verification, and redirect records

locals {
  dns_config = yamldecode(file("${path.module}/dns.yml"))
}

resource "cloudflare_dns_record" "records" {
  for_each = local.dns_config.dns_records

  zone_id = local.zone_id
  name    = each.value.name
  type    = each.value.type
  # TXT records must be enclosed in quotes per Cloudflare API requirements
  content = each.value.type == "TXT" ? jsonencode(each.value.content) : each.value.content
  ttl     = each.value.ttl
  # Priority is only used for MX records, null for others
  priority = try(each.value.priority, null)
  proxied  = each.value.proxied
  comment  = each.value.comment
}

# Redirect www subdomain to root domain with 301 permanent redirect
# This consolidates traffic and improves SEO
# Migrated from cloudflare_page_rule to cloudflare_ruleset (Page Rules are deprecated)
resource "cloudflare_ruleset" "www_redirect" {
  zone_id     = local.zone_id
  name        = "Redirect www to root domain"
  description = "301 redirect from www to root domain"
  kind        = "zone"
  phase       = "http_request_dynamic_redirect"

  rules = local.redirect_rules
}

# Proxied CNAME records for redirect subdomains
# proxied = true is required so Cloudflare intercepts traffic and applies the ruleset redirect
resource "cloudflare_dns_record" "redirects" {
  for_each = { for r in local.redirects_config.redirects : r.from => r if !contains(keys(local.dns_config.dns_records), r.from) }

  zone_id = local.zone_id
  name    = "${each.value.from}.${local.domain}"
  type    = "CNAME"
  content = local.domain
  ttl     = 1
  proxied = true
  comment = "Redirect proxy record for ${each.value.from}.${local.domain}"
}
