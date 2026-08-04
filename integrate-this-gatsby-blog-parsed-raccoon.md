# standard.site integration for nikoheikkila.fi

## Context

When a `nikoheikkila.fi` article is shared on Bluesky today it renders the default link card that
CardyB scrapes from OpenGraph tags. Verified live:

```bash
curl 'https://cardyb.bsky.app/v1/extract?url=https://nikoheikkila.fi/blog/my-vibe-coding-workflow/'
{"title":"My Vibe-Coding Workflow","description":"By far, the least sexy way...","image":"..."}
```

Bluesky now renders an **enhanced** card — publication name and avatar, author profile, publish
date, estimated reading time, publication theme colours — when the shared URL is backed by
[standard.site](https://standard.site) records on the AT Protocol
([announcement](https://atproto.com/blog/standard-site-bluesky-timeline),
[implementation notes](https://github.com/bluesky-social/atproto/discussions/4978)).

The goal is that enhanced card, with **no manual step when publishing a post**. Writing a post stays
`write → commit → push`; CI publishes the records and the deploy carries the link tags.

**Identity (verified):** handle `nikoheikkila.fi` resolves via DNS TXT `_atproto.nikoheikkila.fi` to
`did:plc:krt7mrzm5yv5wdcsr6cwpyiy`, hosted on `https://shimeji.us-east.host.bsky.network` (resolve
this from the DID document rather than hardcoding it — it changes if the account migrates).

## What Bluesky actually requires

1. A `site.standard.publication` record, verified by `/.well-known/site.standard.publication`
   returning its AT-URI as plain text.
2. A `site.standard.document` record per article.
3. Article pages must carry **both** link tags, server-rendered (the crawler runs no JavaScript):
   ```html
   <link rel="site.standard.document" href="at://did:plc:krt7…/site.standard.document/3mab…" />
   <link rel="site.standard.publication" href="at://did:plc:krt7…/site.standard.publication/3lxq…" />
   ```
4. The **publication home page** must carry the publication link tag. The atproto discussion is
   blunt about this: *"Without the addition of this `<link />` tag on publication home pages …
   Bluesky will be unable to render the enhanced link card."* Here that page is `/` — this blog has
   no `/blog/` index (`gatsby/onCreatePages.ts` generates `/`, `/2/`, `/3/`, `/blog/<slug>/`) — so
   the publication `url` is `https://nikoheikkila.fi`, no trailing slash.

Gatsby's Head API emits into the static HTML at build time, so 3–4 are a natural fit.

Both lexicons declare `"key": "tid"` (fetched from
`at://did:plc:re3ebnp5v7ffagz6rb6xfei4/com.atproto.lexicon.schema/site.standard.document`), so
record keys are server-generated TIDs — a slug cannot be turned into an AT-URI. The mapping has to
come from the PDS.

## Design: writes in CI, reads in the build

Two distinct paths, deliberately separated because **they run under different runtimes**:

```text
push to main
  └── acceptance_tests job
        ├── step: Sync standard.site records     [main only, non-fatal]
        │     bun run scripts/standard-site.ts   → BUN runtime
        │     read content/**/*.md, reconcile against live PDS, create/update records
        │
        ├── step: Build site  (task build)       → NODE runtime
        │     onPreBootstrap  → read-only reconcile (public listRecords, no credentials)
        │     createPages     → pageContext.standardSite
        │     Head API        → SEO renders the link tags
        │     onPostBuild     → public/.well-known/site.standard.publication
        │
        ├── step: E2E
        └── step: upload artifact (include-hidden-files: true)
  └── deploy job → downloads the same artifact → Terraform → R2 + Worker
```

**The live PDS records are the only durable source of truth.** Nothing is committed — no
`standard-site.json` in git, no generated file in `static/`. Every build re-derives the
slug→rkey map from the PDS, so an interrupted sync, a failed deploy, or a stale checkout all
self-heal on the next run, and there is no "forgot to sync" failure mode.

### The runtime split is load-bearing

`node_modules/.bin/gatsby` is `#!/usr/bin/env node` and `bun run` honours the shebang. Probed:

```console
$ bun run go        # go -> a #!/usr/bin/env node bin
runtime: node
Bun.YAML: undefined
```

`.github/actions/setup-environment/action.yml:7` says the same: *"Despite using Bun, we need Node.js
for Gatsby to build correctly."* So **no Bun global is available inside any Gatsby lifecycle hook** —
`Bun.YAML`, `Bun.Glob`, `Bun.file` all throw. Consequences:

- The **writer** runs as `bun run scripts/standard-site.ts`, under Bun, and may use `Bun.YAML.parse`
  for frontmatter and `Bun.Glob` for `content/**/*.md`. No YAML dependency needed.
- The **reader** runs inside `gatsby build`, under Node, and needs **no frontmatter parsing at all**:
  it matches records to pages by `path`, and `createPages` already has every slug from GraphQL. Node
  24's global `fetch` covers the two public HTTP calls, so the build gains **no new dependency**.

`@atproto/api@0.20.37` is therefore a devDependency used only by the writer script, never by the
build.

### Why the build must not fail on sync problems

The read-only reconcile runs in `gatsby develop` too, and `scripts/generate-types.ts` *spawns*
`gatsby develop` — so `task typegen`, and `task lint` after any `task clean`, would touch the
network. The reconcile therefore **never fails a build**: on any network or HTTP error it warns and
returns an empty manifest, pages render without the link tags, and the next build with connectivity
puts them back. Offline development and CI stay unaffected, and a Bluesky outage cannot block
deploying the blog.

### Standard.site data does not go through `gatsby-config.ts`

`gatsby-config.ts` is evaluated before `onPreBootstrap`, so it can only ever see pre-sync state.
Do not put standard.site URIs in `siteMetadata` and do not import a manifest there. They travel
through `pageContext` instead.

## Changes

### 1. Pure logic — `src/utils/standardSite.ts` (new)

Dependency-free, no filesystem, no network, no `@atproto/api`. Everything the unit suite touches
lives here, which is what keeps the 100 % coverage threshold in `vitest.config.ts` achievable.

```typescript
interface StandardSiteManifest {
	did: string;
	publication: string;                  // rkey, "" when absent
	documents: Record<string, string>;    // slug -> rkey
}
```

Exports:

- `recordUri(did, collection, rkey)` — `at://<did>/<collection>/<rkey>`, `""` when `rkey` is empty.
- `publicationUriFor(manifest)` / `documentUriFor(manifest, slug)` — `""` when unknown.
- `manifestFromRecords(did, publicationRecords, documentRecords)` — adopts the publication rkey whose
  `url` canonicalises to `https://nikoheikkila.fi` (trim trailing slashes, as the lexicon's own best
  practices advise), then adopts document rkeys whose `site` matches that publication URI, keyed by
  their `path`. This is the whole reconcile decision, as a pure function — both the reader and the
  writer call it.
- `toSlug(relativePath)` — mirrors `createFilePath`: strip `.md`, strip a trailing `/index`, add
  leading and trailing slashes. `blog/foo.md → /blog/foo/`;
  `blog/series/part-one/index.md → /blog/series/part-one/`. Writer-side only, but pure and worth
  testing because a mismatch here silently drops a link tag.
- `toPlainText(markdown)` — takes a body with frontmatter already removed; strips fenced and
  indented code, images, link syntax, heading markers, emphasis and raw HTML, then collapses
  whitespace. Feeds `textContent`, which Bluesky uses for the reading-time estimate.
- `toPublishedAt(date)` — frontmatter `YYYY-MM-DD` → `2026-08-04T00:00:00.000Z`. All 62 posts use
  the date-only form (verified), so no time-of-day handling is needed.
- `buildDocumentRecord(...)` — `$type`, `site` (the publication **AT-URI**, not the URL), `path`
  (the Gatsby slug), `title`, `description`, `publishedAt`, `textContent`.
- `buildPublicationRecord(...)` — `$type`, `url: "https://nikoheikkila.fi"`, `name`, `description`,
  `icon` blob ref, `basicTheme` (with `$type: "site.standard.theme.basic"` and
  `$type: "site.standard.theme.color#rgb"` on each colour), `preferences: { showInDiscover: true }`.

Return `""` rather than `null` throughout so page context stays stable and components can guard on
truthiness.

### 2. Read-only reconcile — `gatsby/standardSiteRecords.ts` (new)

Node-side, no credentials, no dependencies beyond global `fetch`. Deliberately *not* imported by any
unit test, so it stays out of the coverage report — the same arrangement `infra/site/worker.test.ts`
uses for its hand-rolled `R2Bucket`. It is thin on purpose: every decision it makes lives in
`manifestFromRecords`.

`fetchManifest(reporter): Promise<StandardSiteManifest>`:

1. `GET https://plc.directory/did:plc:krt7mrzm5yv5wdcsr6cwpyiy`, take the `#atproto_pds`
   `serviceEndpoint`.
2. `GET <pds>/xrpc/com.atproto.repo.listRecords` for `site.standard.publication` and
   `site.standard.document`, following `cursor` (limit caps at 100; 62 documents today).
3. Hand both lists to `manifestFromRecords`.
4. Wrap the whole thing in try/catch: on failure `reporter.warn` with the cause and return
   `{ did, publication: "", documents: {} }`. **Never throw.**

### 3. Gatsby lifecycle hooks

Pass the manifest between hooks through Gatsby's `cache` API rather than a hand-written file, so
there is no reasoning about the `.cache` directory's lifecycle. A stale cached manifest is a safe
fallback because rkeys are immutable.

**`gatsby/onPreBootstrap.ts`** (new) — `const manifest = await fetchManifest(reporter)`;
`await cache.set("standardSite", manifest)`. (Verified safe: `.cache` deletion happens at
`gatsby/dist/services/initialize.js:342-355`, `ensureDir` at `:378`, `onPreBootstrap` at `:475`.)

**`gatsby/onPostBuild.ts`** (new) — read the cached manifest; when `publication` is non-empty write
`public/.well-known/site.standard.publication` containing exactly the AT-URI plus a trailing
newline; when empty, warn and skip. Writing into `public/` rather than `static/` keeps tracked
source files clean. Note this does not run under `gatsby develop`, so the endpoint only exists after
a real `task build`.

**`gatsby/onCreatePages.ts`** — read the cached manifest and add to the post page context:

```typescript
context: {
	slug,
	previous,
	next,
	standardSite: {
		publicationUri: publicationUriFor(manifest),
		documentUri: documentUriFor(manifest, slug),
	},
}
```

List pages (`/`, `/2/`, `/3/`) get `standardSite: { publicationUri }` only. `reporter.warn` for any
`frontmatter.type === "post"` whose `documentUri` is empty while `publicationUri` is not — that is
the signal that a post has no record yet.

**`gatsby-node.ts`** — export the two new hooks alongside the existing three.

### 4. Emit the link tags

- **`src/components/seo.tsx`** — add optional `standardSitePublicationUri?: string` and
  `standardSiteDocumentUri?: string`; render each `<link>` only when its URI is non-empty, as a
  small sub-component beside the existing `BasicMeta` / `OpenGraph` / `SchemaOrg` trio.
- **`src/templates/post.tsx`** — extend the existing `PageContext` type with
  `standardSite: { publicationUri: string; documentUri: string }`, retype `Head` as
  `HeadFC<Queries.PostQuery, PageContext>`, pass both URIs to `SEO`.
- **`src/templates/list.tsx`** — same with `standardSite: { publicationUri: string }` and
  `HeadFC<Queries.IndexQuery, PageContext>`. (Both generated types exist:
  `src/gatsby-types.d.ts:3023` and `:3035`.)
- `src/pages/404.tsx` receives no page context and so carries no tag. That is fine — nothing
  requires it there.

### 5. Writer — `scripts/standard-site.ts` (new)

Runs under Bun, beside the existing `scripts/generate-types.ts`. Imports the pure builders from
`src/utils/standardSite.ts`, so the record *shapes* are unit-tested even though this file is not.

1. Read `content/**/*.md` via `Bun.Glob`, sorted by path for determinism. Parse frontmatter with
   `Bun.YAML.parse`. **Filter to `type: post` first, then validate** `title`, `excerpt`, `date` —
   `content/now.md` is a `type: page` file with no `excerpt` (verified), so validating before
   filtering would fail on a file the integration never uses. Fail with a file-specific message.
2. Resolve the PDS from the DID document, then `new AtpAgent({ service: <that host> })` — not a
   hardcoded `bsky.social`, so a future account migration doesn't silently break writes.
   `login()` with `BLUESKY_IDENTIFIER` / `BLUESKY_APP_PASSWORD`.
3. Assert `agent.session?.did === "did:plc:krt7mrzm5yv5wdcsr6cwpyiy"` and abort before any write if
   it differs.
4. `listRecords` both collections and build the current manifest with `manifestFromRecords` — the
   same function the build uses, so reader and writer can never disagree about adoption.
5. Publication record — create when absent, otherwise `putRecord` on the adopted rkey:
   - `url: "https://nikoheikkila.fi"`, `name` / `description` from `siteMetadata`
   - `icon`: upload `static/favicon.png` (verified 512×512, 16 KB, well under the 1 MB cap). Without
     it the card has no publication avatar.
   - `basicTheme` from `src/styles/_variables.scss`: background `$darkBg` rgb(30,41,59), foreground
     `$darkFg` rgb(241,245,249), accent `$teal` rgb(102,178,178), accentForeground `$almostBlack`
     rgb(15,23,42)
   - `preferences: { showInDiscover: true }`
6. Per post: `createRecord` when there is no adopted rkey (the server assigns the TID the lexicon
   requires), otherwise `putRecord` with the fetched CID as `swapRecord`. Deep-compare against the
   listed record and skip writes when nothing changed, so repeat CI runs stay off the firehose.
   Leave `validate` **unset** — that input flag means "validate only known Lexicons", and the
   standard.site lexicons *are* published as `com.atproto.lexicon.schema` records, so unset catches
   malformed records instead of silently accepting them.
7. Report manifest entries whose post no longer exists; never delete. Stale records are harmless,
   and deleting one can break an old Bluesky embed.
8. `--dry-run` prints every planned write and touches nothing.

**`Taskfile.yaml`** — add, following the `op run` convention from `infra/*/Taskfile.yml`:

```yaml
standard:
  desc: Publish content as standard.site records on the AT Protocol
  deps: [install]
  cmds:
    - op run --env-file='.env' -- bun run scripts/standard-site.ts {{ .CLI_ARGS }}
```

CI invokes the script directly (it has the secrets in the environment, not 1Password), so also allow
running without `op` — read credentials from the environment and only shell out through `op` via the
task.

**`.env`** (new, committed — 1Password references only, mirroring the committed `infra/.env`):

```dotenv
BLUESKY_IDENTIFIER="op://Personal/Bluesky/username"
BLUESKY_APP_PASSWORD="op://Personal/Bluesky/app password"
```

**`tsconfig.json`** — add `"./scripts/**/*"` to `include` so `bunx tsc --noEmit` covers the writer.
If that surfaces pre-existing errors in `scripts/generate-types.ts`, fall back to a
`scripts/tsconfig.json` plus a `lint:scripts` task shaped like the existing `lint:site`. Do not add
`new.ts` — it has a pre-existing broken import (`./src/types` does not exist) and is out of scope.

### 6. CI — one non-fatal step, no job-graph surgery

Add to `acceptance_tests` in `.github/workflows/ci.yml`, immediately **before** `Build site` so the
build's reconcile sees records created in the same run:

```yaml
- name: Sync standard.site records
  if: github.event_name == 'push' && github.ref_name == 'main'
  continue-on-error: true
  run: bun run scripts/standard-site.ts
  env:
    BLUESKY_IDENTIFIER: ${{ secrets.BLUESKY_IDENTIFIER }}
    BLUESKY_APP_PASSWORD: ${{ secrets.BLUESKY_APP_PASSWORD }}
```

A step-level `continue-on-error` keeps a PDS outage from blocking the deploy while still surfacing a
failure annotation. A separate job was considered and rejected: `acceptance_tests` runs on PRs too,
and a skipped `needs` dependency skips its dependents unless every downstream job gains
`if: !cancelled()`.

Pull requests skip the step entirely and build in read-only mode: existing posts still get their
link tags from public records, and a PR-only post warns that no record exists yet.

**Accepted residual:** records are written from the test job, before `deploy` (which carries
`environment: production`). If a deploy is gated or fails, a record can briefly describe a page that
is not live. This is inherent — something must write before the build that carries the tags — and it
is self-correcting on the next push. It does not affect the card, which Bluesky only snapshots when
a link is actually shared.

Also add `include-hidden-files: true` to the existing `Upload static assets` step
(`actions/upload-artifact@v7`, whose default is `'false'`). Both deploy jobs download that artifact
instead of rebuilding, so without this the `.well-known` endpoint is silently missing from every CI
deploy while working perfectly locally.

### 7. Ship `.well-known` to production — `infra/site/locals.tf`

Verified that no Worker change is needed: `asKey()` maps the path straight to the R2 key, Gatsby's
`copyStaticDirs` and Terraform's `fileset(dist_dir, "**")` both handle dot-directories, and
`gatsby serve` uses `dotfiles: "allow"`. Two overrides are needed, because the extension regex
yields `publication` for this filename and nothing in `mime_types` matches:

```hcl
content_type_overrides = {
  ".well-known/site.standard.publication" = "text/plain; charset=utf-8"
}

content_types = {
  for f in local.files :
  f => lookup(local.content_type_overrides, f,
    lookup(local.mime_types, local.extensions[f], "application/octet-stream"))
}
```

Add the same path to `cache_controls` with `local.revalidate`, so a future publication-rkey change
is not hidden behind heuristic caching. Per `CLAUDE.md`, use the terraform skill for this edit.

### 8. Tests

- **`src/__tests__/unit/standardSite.test.ts`** (new) — `recordUri`, `publicationUriFor`,
  `documentUriFor`, `manifestFromRecords` (adoption, trailing-slash canonicalisation, records
  belonging to another publication, empty inputs), `toSlug`, `toPlainText`, `toPublishedAt`,
  `buildDocumentRecord`, `buildPublicationRecord`. All pure, so 100 % coverage needs no mocking and
  no injected ports. `test.each` for table cases, per the testing skill.
- **`src/__tests__/feature/api.test.ts`** — extend the existing `API Tests` block, guarded so the
  suite stays green offline and on a machine that has never synced:

  ```typescript
  const response = await request.get("/.well-known/site.standard.publication");
  test.skip(response.status() === 404, "standard.site records not present in this build");
  ```

  Then assert the body matches `/^at:\/\/did:plc:[a-z0-9]+\/site\.standard\.publication\/[a-z0-9]+$/`,
  that `/` contains `link[rel="site.standard.publication"]`, and that
  `/blog/my-vibe-coding-workflow/` contains both link tags.

The write path (create/update/skip/`swapRecord`/DID assertion) is intentionally not unit-tested — it
is a CI script with a dry-run mode whose record shapes are covered through the pure builders. This
mirrors how `scripts/generate-types.ts` is treated and avoids dragging an `AtpAgent` fake under the
100 % threshold (`CLAUDE.md` forbids the `as unknown as T` cast that would otherwise make one
tractable).

## One-time setup

1. Create a Bluesky app password at https://bsky.app/settings/app-passwords and store it in
   1Password at the paths in `.env`.
2. Add repository secrets `BLUESKY_IDENTIFIER` and `BLUESKY_APP_PASSWORD`.
3. `task standard -- --dry-run`, review the 63 planned writes, then `task standard` to bootstrap the
   publication and the 62 existing documents. (CI would do this on the first push to `main`; doing
   it once by hand makes the first run reviewable.)

## Verification

1. `task lint && task test:unit && task test:component`
2. `task standard -- --dry-run` — every planned PDS write, before any of them happen.
3. `task standard`, then confirm the records landed:
   ```console
   curl --get 'https://shimeji.us-east.host.bsky.network/xrpc/com.atproto.repo.listRecords' \
     --data-urlencode 'repo=did:plc:krt7mrzm5yv5wdcsr6cwpyiy' \
     --data-urlencode 'collection=site.standard.document' \
     --data-urlencode 'limit=100'
   ```
   Re-resolve the host from https://plc.directory/did:plc:krt7mrzm5yv5wdcsr6cwpyiy if it moved, or
   browse on https://pdsls.dev.
4. `task build && task serve`, then:
   - `curl -i localhost:8000/.well-known/site.standard.publication` returns the AT-URI as
     `text/plain`
   - `grep 'site.standard' public/index.html` shows the publication tag
   - `grep 'site.standard' public/blog/my-vibe-coding-workflow/index.html` shows both tags
   - the build log shows no "missing standard.site record" warnings
5. Confirm graceful degradation, since every build depends on it: re-run `task build` with the
   network blocked (or point `plc.directory` at a black hole) and check the build still succeeds with
   a warning and no link tags.
6. Confirm the first write-mode CI build re-renders post HTML. `acceptance_tests` restores `.cache`
   and `public` from `actions/cache@v6`, so verify the tags are present in the uploaded artifact and
   not just locally — page context is part of page data, so Gatsby should invalidate, but the whole
   design rests on it.
7. `task test:e2e -- api`, then `task terraform:validate && task site:validate`.
8. Run the publication through https://site-validator.fly.dev to confirm verification resolves.
9. **Final check happens on production.** Previews live at `blog-pr-<n>.yo-062.workers.dev`, but the
   publication `url` and the verification endpoint both point at `nikoheikkila.fi`, so a preview URL
   will not resolve to a verified publication. After merging, paste a post URL into the composer at
   https://main.bsky.dev — the preview should show publication name, avatar, author and reading time
   without posting. That is the acceptance criterion met.

## Deliberately out of scope

- `bskyPostRef` — needs a post URI that only exists after sharing.
- Per-document `coverImage` blobs — `app.bsky.embed.external#viewExternal` takes its thumbnail from
  the embed's own blob, which CardyB already fills from `og:image`, so the field would not change
  the card.
- `updatedAt` — no frontmatter field records edit time; deriving it from git history is a separate
  change.
- `site.standard.graph.subscription` / `recommend` — reader-side lexicons.
- Pre-existing SEO quirks (`seo.tsx` writes OG tags as `name=` rather than `property=`;
  `schema.tsx` injects JSON-LD client-side on idle). Neither blocks the enhanced card — CardyB
  extracts this site's metadata correctly today.

## Publishing workflow after this change

Unchanged: write the post, commit, push. The `main` build syncs the records, emits the link tags and
deploys the matching artifact. The only remaining rule is social rather than technical — wait for the
production deploy before sharing the link, because Bluesky snapshots the first card it sees.
