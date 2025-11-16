resource "cloudflare_dns_record" "fm1_domainkey" {
  zone_id = var.zone_id
  name    = "fm1._domainkey"
  type    = "CNAME"
  content = "fm1.nikoheikkila.fi.dkim.fmhosted.com"
  ttl     = 1
  proxied = false
  comment = "FastMail DKIM key 1 for email authentication"
}

resource "cloudflare_dns_record" "fm2_domainkey" {
  zone_id = var.zone_id
  name    = "fm2._domainkey"
  type    = "CNAME"
  content = "fm2.nikoheikkila.fi.dkim.fmhosted.com"
  ttl     = 1
  proxied = false
  comment = "FastMail DKIM key 2 for email authentication"
}

resource "cloudflare_dns_record" "fm3_domainkey" {
  zone_id = var.zone_id
  name    = "fm3._domainkey"
  type    = "CNAME"
  content = "fm3.nikoheikkila.fi.dkim.fmhosted.com"
  ttl     = 1
  proxied = false
  comment = "FastMail DKIM key 3 for email authentication"
}

resource "cloudflare_dns_record" "www" {
  zone_id = var.zone_id
  name    = "www"
  type    = "CNAME"
  content = "nikoheikkila.fi"
  ttl     = 1
  proxied = true
  comment = "WWW subdomain redirects to root domain"
}

resource "cloudflare_dns_record" "mx1" {
  zone_id  = var.zone_id
  name     = "@"
  type     = "MX"
  content  = "in1-smtp.messagingengine.com"
  ttl      = 3600
  priority = 10
  proxied  = false
  comment  = "FastMail primary mail server"
}

resource "cloudflare_dns_record" "mx2" {
  zone_id  = var.zone_id
  name     = "@"
  type     = "MX"
  content  = "in2-smtp.messagingengine.com"
  ttl      = 3600
  priority = 20
  proxied  = false
  comment  = "FastMail secondary mail server"
}

resource "cloudflare_dns_record" "atproto" {
  zone_id = var.zone_id
  name    = "_atproto"
  type    = "TXT"
  content = "\"did=did:plc:krt7mrzm5yv5wdcsr6cwpyiy\""
  ttl     = 3600
  proxied = false
  comment = "Bluesky account handle verification"
}

resource "cloudflare_dns_record" "dmarc" {
  zone_id = var.zone_id
  name    = "_dmarc"
  type    = "TXT"
  content = "\"v=DMARC1; p=none; rua=mailto:4ae84ca24554494e9b7c6b8c31255a6f@dmarc-reports.cloudflare.net\""
  ttl     = 1
  proxied = false
  comment = "DMARC policy for email authentication and reporting"
}

resource "cloudflare_dns_record" "domainkey" {
  zone_id = var.zone_id
  name    = "_domainkey"
  type    = "TXT"
  content = "\"o=~;\""
  ttl     = 3600
  proxied = false
  comment = "DomainKeys policy record for email signing"
}

resource "cloudflare_dns_record" "spf" {
  zone_id = var.zone_id
  name    = "@"
  type    = "TXT"
  content = "\"v=spf1 include:spf.messagingengine.com ?all\""
  ttl     = 3600
  proxied = false
  comment = "SPF record authorizing FastMail to send email for this domain"
}

resource "cloudflare_dns_record" "google_verification" {
  zone_id = var.zone_id
  name    = "@"
  type    = "TXT"
  content = "\"google-site-verification=MLLGeqngejlf0D2JCR4InSIwNUkjXpx50AhpIyJKdgQ\""
  ttl     = 3600
  proxied = false
  comment = "Google Search Console domain ownership verification"
}
