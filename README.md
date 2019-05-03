# [nikoheikkila.fi](https://nikoheikkila.fi)

My personal blog. Forked from Gatsby Blog Starter template and inspired here
and there by Dan Abramov's blog.

## Contributing

Content can be found under `src/pages`. Edit posts as needed and submit a PR
for me to review. All PRs are automaticallly deployed by Now to staging area.
Once approved and merged to master branch they will be deployed to production.

Other contributions to UI, accessibility, React components, security,
dependency updates etc. are warmly welcome as well!

### 1. Build Locally with Yarn

To run the build locally, type like so:

```bash
yarn
yarn dev
```

### 2. Build Locally with Now

Alternatively, you can mimic the production environment from Now like so:

```bash
npm install -g now
now dev
```

This will download and execute a Now builder running the `gatsby develop` command. Be warned that this is a new feature with Now and might not work as expected. In case you encounter any problems, revert to option #1.

Finally, open <http://localhost:8000> to view the blog.

## Writing

To quickly bootstrap a new post or page draft use the CLI tool `new.js`
at project root either via `yarn new` or invoking directly.
