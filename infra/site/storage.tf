# R2 bucket holding the built static site for this environment.
# Objects are uploaded through the S3-compatible API because the Cloudflare
# provider has no resource for R2 object uploads.

resource "cloudflare_r2_bucket" "site" {
  account_id    = var.account_id
  name          = local.bucket_name
  location      = "EEUR"
  storage_class = "Standard"
  jurisdiction  = "eu"
}

resource "aws_s3_object" "files" {
  for_each = local.files

  bucket        = cloudflare_r2_bucket.site.name
  key           = each.value
  source        = "${var.dist_dir}/${each.value}"
  etag          = filemd5("${var.dist_dir}/${each.value}")
  content_type  = local.content_types[each.value]
  cache_control = local.cache_controls[each.value]
}
