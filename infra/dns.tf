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
resource "cloudflare_page_rule" "www_redirect" {
  zone_id  = local.zone_id
  target   = "www.${local.domain}/*"
  priority = 1
  status   = "active"

  actions = {
    forwarding_url = {
      url         = "https://${local.domain}/$1"
      status_code = 301
    }
  }
}
