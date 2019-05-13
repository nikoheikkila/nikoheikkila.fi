# [nikoheikkila.fi](https://nikoheikkila.fi)

My personal blog. Forked from Gatsby Blog Starter template and inspired here
and there by Dan Abramov's blog.

[![Build Status](https://travis-ci.com/nikoheikkila/nikoheikkila.fi.svg?branch=master)](https://travis-ci.com/nikoheikkila/nikoheikkila.fi)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/587ffb2f1f2c47bcb6a3141574dbb440)](https://www.codacy.com/app/nikoheikkila/nikoheikkila.fi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nikoheikkila/nikoheikkila.fi&amp;utm_campaign=Badge_Grade)

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

## Testing

Project is packaged with ESLint code style tests, Cypress automated tests, and Pa11y accessibility tests. They can be ran respectively like so:

```bash
yarn lint
yarn test:dev
yarn test:a11y
```

All of the above are also run in Travis CI pipelines for commits and PRs.

## Writing

To quickly bootstrap a new post or page draft use the CLI tool `new.js`
at project root either via `yarn new` or invoking directly.
