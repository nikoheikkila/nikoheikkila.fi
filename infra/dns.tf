locals {
  dns_config = yamldecode(file("${path.module}/dns.yml"))
}

resource "cloudflare_dns_record" "records" {
  for_each = local.dns_config.dns_records

  zone_id  = var.zone_id
  name     = each.value.name
  type     = each.value.type
  content  = each.value.type == "TXT" ? jsonencode(each.value.content) : each.value.content
  ttl      = each.value.ttl
  priority = try(each.value.priority, null)
  proxied  = each.value.proxied
  comment  = each.value.comment
}
