<h1 align="center">Welcome to nikoheikkila.fi 👋</h1>

[![Delivery Pipeline](https://github.com/nikoheikkila/nikoheikkila.fi/actions/workflows/ci.yml/badge.svg)](https://github.com/nikoheikkila/nikoheikkila.fi/actions/workflows/ci.yml)

My personal blog. Forked from Gatsby Blog Starter template and inspired here and there by Dan Abramov's blog.

## 🏠 [Live Page](https://nikoheikkila.fi/)

## 🔧 Installation & Usage

Requires [Mise](https://mise.jdx.dev) [activated in your shell](https://mise.jdx.dev/getting-started.html#activate-mise), which installs the toolchain pinned in `mise.toml`. Install dependencies and start the development server like so:

```bash
mise install
task install
task dev
```

Then, open <http://localhost:8000> to view the blog.

## 🤖 Run tests

Project is packaged with Biome linter and formatter, Vitest unit and component tests, Stryker mutation tests, and Playwright BDD acceptance tests. Run the full suite like so:

```bash
task test
```

Run a single layer with `task test:unit`, `task test:component`, `task test:mutation`, or `task test:e2e` (requires `task build` first).

## 🚦 Delivery Pipeline

Content and code changes follow the workflow below:

![Delivery Pipeline: pull requests, pushes to main and manual runs start unit tests, component tests on three browsers, mutation tests, the Terraform plan and the build in parallel; the build feeds acceptance tests on three browsers. When all pass the pull request is mergeable. Pull requests from this repository then deploy the build to a Workers Preview with the Wrangler GitHub Action and run a Lighthouse audit; Preview Cleanup deletes the preview when the pull request closes. Pushes to main deploy the infrastructure only when the plan has changes, then production with the Wrangler GitHub Action, then run a Lighthouse audit.](docs/ci-flow.svg)

Every Terraform run goes through one of two composite actions:

![Terraform deployment overview, two rows from trigger to Terraform action to target to result. Every pull request and push to main runs a read-only plan of the core infrastructure and reports whether changes need applying. A push to main applies the saved plan to the core infrastructure when it has changes, so it matches the reviewed plan. The site itself is deployed with Wrangler, outside these actions.](docs/terraform-flow.svg)

## 👤 Author

**Niko Heikkilä**

- Github: [@nikoheikkila](https://github.com/nikoheikkila)
- Bluesky: [@nikoheikkila.fi](https://bsky.app/profile/nikoheikkila.fi)
- LinkedIn: [nikoheikkila](https://www.linkedin.com/in/nikoheikkila)

## 🤝 Contributing

Content can be found under `content/` directory. Edit posts as needed and submit a PR for me to review. Every PR from this repository is deployed as a Workers Preview of the `blog-preview` Cloudflare Worker, linked from the PR as its `preview` deployment. Once approved and merged to the `main` branch, changes are deployed to production.

Other contributions to UI, accessibility, React components, security, dependency updates etc. are warmly welcome as well!

Feel free to check the [open issues](https://github.com/nikoheikkila/nikoheikkila.fi/issues).

## ✍️ Writing

To quickly bootstrap a new post or page draft use the CLI tool via `task new`.

## 📝 License

Copyright of blog posts © 2019–Today [Niko Heikkilä &lt;yo@nikoheikkila.fi&gt;](https://github.com/nikoheikkila).

Source code of this project is [MIT](LICENSE-website) licensed.

---

<small>_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_.</small>
