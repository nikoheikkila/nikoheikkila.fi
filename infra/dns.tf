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

  rules = [{
    ref         = "www_to_root_redirect"
    description = "Redirect www subdomain to root domain"
    expression  = "(http.host eq \"www.${local.domain}\")"
    action      = "redirect"
    action_parameters = {
      from_value = {
        status_code = 301
        target_url = {
          expression = "concat(\"https://${local.domain}\", http.request.uri.path)"
        }
        preserve_query_string = true
      }
    }
    enabled = true
  }]
}
