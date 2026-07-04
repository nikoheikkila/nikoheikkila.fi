#!/bin/sh
# Derives S3-compatible credentials for the R2 API from the Cloudflare API token:
# the access key is the token ID and the secret is the SHA-256 hash of the token value.
# See https://developers.cloudflare.com/r2/api/tokens/
#
# Source this before running Terraform so both the state backend and the object
# uploads authenticate with the same token that powers the Cloudflare provider.
set -eu

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
	echo "CLOUDFLARE_API_TOKEN is not set" >&2
	exit 1
fi

AWS_ACCESS_KEY_ID="$(curl -sf -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	"https://api.cloudflare.com/client/v4/user/tokens/verify" |
	sed -n 's/.*"id":"\([a-f0-9]\{32\}\)".*/\1/p')"
AWS_SECRET_ACCESS_KEY="$(printf '%s' "$CLOUDFLARE_API_TOKEN" | shasum -a 256 | awk '{print $1}')"

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
	echo "Could not resolve the Cloudflare API token ID" >&2
	exit 1
fi

export AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY
