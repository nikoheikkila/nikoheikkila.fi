---
name: troubleshooting
description: Known gotchas for GraphQL/type generation, GatsbyImage+flexbox, FlexSearch version pinning, dev server issues, and CI/deployment surprises (silently skipped PR workflows, stripped ETag headers, Terraform quirks). Load when debugging a build, layout, dev server, or CI/deployment problem in this repo.
---

### Common Build Issues

- **GraphQL queries**: Run `task dev` to access GraphQL explorer at `localhost:8000/___graphql`
- **Type generation**: Run `task typegen` to generate TypeScript types from GraphQL (or `task build` which triggers it)
- **Cache issues**: Use `task clean` to clear build cache and delete `src/gatsby-types.d.ts`
- **React SSR drops event handler props**: Gatsby's `setHeadComponents` renders via React's `renderToString`, which does not serialize event handler props (`onLoad`, `onClick`, etc.) to HTML attributes. The `<link media="print" onLoad="this.media='all'">` non-blocking font trick silently breaks in `gatsby-ssr.tsx` — the stylesheet is permanently `media="print"` and fonts never load. Use a plain `<link rel="stylesheet">` with `preconnect` hints instead.

### Image & Layout Issues

- **GatsbyImage + flexbox**: Do not use `display: flex` on elements wrapping `GatsbyImage`. It breaks the visibility/loading mechanism (image stays `visibility: hidden`). Use `text-align: center` instead — constrained-layout `GatsbyImage` renders as `inline-block`.
- **FlexSearch version**: `gatsby-plugin-local-search` and `react-use-flexsearch` require FlexSearch 0.6.x API (`FlexSearch.create()`, `.import()`, `.export()`). FlexSearch 0.8.x has an incompatible API. Pin to `flexsearch@0.6.32`.

### Development Server Issues

- **Port conflicts**: Development server runs on <http://localhost:8000>
- **Hot reload problems**: Restart dev server if hot reload stops working
- **Asset loading**: Static assets are served from `/static` directory
- **Note**: `task dev` runs `task clean` first, which deletes generated types

### CI & Deployment Issues

- **PR workflows silently missing**: when a pull request has merge conflicts, GitHub cannot create the merge ref and `pull_request` workflows do not run at all — no failure, just absence (only default-setup CodeQL checks appear). Check `gh pr view <n> --json mergeable` before debugging anything else.
- **Missing `ETag` on HTML responses**: Cloudflare strips `ETag` from 200 `text/html` responses at the edge on both previews and production. Assets keep their etags and conditional requests still work — this is expected, not a Worker bug.
- **Terraform provider quirks** (workers.dev subdomain data source, AWS checksum env vars, R2 range behaviour): documented in the terraform skill.
- **Relocating a Terraform module directory can silently un-ignore its artifacts**: a `.gitignore`'s unanchored patterns (e.g. `tfplan`, `.terraform/`) only cascade into directories actually nested underneath it. Moving the module that owns the `.gitignore` away from a sibling module leaves that sibling's build artifacts untracked — every root module directory needs its own `.gitignore`.
