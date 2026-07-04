# Local values deriving the deployment environment from the Terraform workspace
# and the upload inventory from the build output.

locals {
  environment = terraform.workspace == "default" ? "production" : terraform.workspace
  worker_name = terraform.workspace == "default" ? var.worker_service_name : "${var.worker_service_name}-${terraform.workspace}"
  bucket_name = terraform.workspace == "default" ? "site" : "site-${terraform.workspace}"
}

# _headers and _redirects are Workers static assets conventions with no effect when
# serving from R2 — their rules are reproduced by content_types, cache_controls and
# redirects below, so they are excluded from the upload set.
locals {
  files = toset([for f in fileset(var.dist_dir, "**") : f if !contains(["_headers", "_redirects"], f)])

  extensions = { for f in local.files : f => try(regex("\\.([^./]+)$", f)[0], "") }

  mime_types = {
    avif        = "image/avif"
    css         = "text/css; charset=utf-8"
    gif         = "image/gif"
    html        = "text/html; charset=utf-8"
    ico         = "image/x-icon"
    jpeg        = "image/jpeg"
    jpg         = "image/jpeg"
    js          = "text/javascript; charset=utf-8"
    json        = "application/json"
    map         = "application/json"
    mjs         = "text/javascript; charset=utf-8"
    pdf         = "application/pdf"
    png         = "image/png"
    svg         = "image/svg+xml"
    ttf         = "font/ttf"
    txt         = "text/plain; charset=utf-8"
    webmanifest = "application/manifest+json"
    webp        = "image/webp"
    woff        = "font/woff"
    woff2       = "font/woff2"
    xml         = "application/xml"
  }

  # Extensionless well-known documents need explicit content types
  content_type_overrides = {
    ".well-known/webfinger" = "application/jrd+json"
    ".well-known/host-meta" = "application/xml"
    ".well-known/nodeinfo"  = "application/jrd+json"
  }

  content_types = {
    for f in local.files :
    f => lookup(local.content_type_overrides, f, lookup(local.mime_types, local.extensions[f], "application/octet-stream"))
  }

  immutable  = "public, max-age=31536000, immutable"
  revalidate = "public, max-age=0, must-revalidate"

  # Caching policy: hashed build artifacts are immutable, documents must revalidate
  cache_controls = {
    for f in local.files :
    f => (
      f == "rss.xml" ? "no-cache" :
      startswith(f, "static/") ? local.immutable :
      startswith(f, "page-data/") ? local.revalidate :
      contains(["js", "mjs", "css"], local.extensions[f]) ? local.immutable :
      local.extensions[f] == "html" ? local.revalidate :
      null
    )
  }

  # Path redirects served by the Worker (injected as JSON through a plain-text binding)
  redirects = {
    "/feed"  = { to = "/rss.xml", status = 301 }
    "/feed/" = { to = "/rss.xml", status = 301 }
  }
}
