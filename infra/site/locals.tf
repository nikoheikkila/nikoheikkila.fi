# Local values deriving the deployment environment from the Terraform workspace
# and the upload inventory from the build output.

locals {
  is_production = terraform.workspace == "default"
  suffix        = local.is_production ? "" : "-${terraform.workspace}"
  worker_name   = "${var.worker_service_name}${local.suffix}"
  bucket_name   = "site${local.suffix}"
}

locals {
  files = fileset(var.dist_dir, "**")

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

  content_types = {
    for f in local.files :
    f => lookup(local.mime_types, local.extensions[f], "application/octet-stream")
  }

  immutable  = "public, max-age=31536000, immutable"
  revalidate = "public, max-age=0, must-revalidate"

  # Caching policy (formerly static/_headers): hashed build artifacts are
  # immutable, documents must revalidate
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
}
