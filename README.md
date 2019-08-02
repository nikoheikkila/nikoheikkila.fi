<h1 align="center">Welcome to nikoheikkila.fi 👋</h1>

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Build Status](https://travis-ci.com/nikoheikkila/nikoheikkila.fi.svg?branch=master)](https://travis-ci.com/nikoheikkila/nikoheikkila.fi)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/587ffb2f1f2c47bcb6a3141574dbb440)](https://www.codacy.com/app/nikoheikkila/nikoheikkila.fi?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nikoheikkila/nikoheikkila.fi&amp;utm_campaign=Badge_Grade)

My personal blog. Forked from Gatsby Blog Starter template and inspired here and there by Dan Abramov's blog.

## 🏠 [Live Page](https://nikoheikkila.fi/)

## 🔧 Installation & Usage

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

## 🤖 Run tests

Project is packaged with ESLint code style tests, AVA unit tests, Cypress automated tests, and Pa11y accessibility tests. They can be ran respectively like so:

```sh
yarn lint
yarn test:unit
yarn test:dev
yarn test:a11y
```

## 👤 Author

**Niko Heikkilä &lt;yo@nikoheikkila.fi&gt;**

* Github: [@nikoheikkila](https://github.com/nikoheikkila)
* Mastodon: [@nikoheikkila](https://mastodon.technology/@nikoheikkila)
* DEV: [nikoheikkila](https://dev.to/nikoheikkila)
* LinkedIn: [nikoheikkila](https://www.linkedin.com/in/nikoheikkila)

## 🤝 Contributing

Content can be found under `src/pages`. Edit posts as needed and submit a PR for me to review. All PRs are automatically deployed by Now to staging area. Once approved and merged to master branch they will be deployed to production.

Other contributions to UI, accessibility, React components, security, dependency updates etc. are warmly welcome as well!

Feel free to check the [open issues](https://github.com/nikoheikkila/nikoheikkila.fi/issues).

## ✍️ Writing

To quickly bootstrap a new post or page draft use the CLI tool `new.js`
at project root either via `yarn new` or invoking directly.

## 📝 License

Copyright of blog posts © 2019 [Niko Heikkilä &lt;yo@nikoheikkila.fi&gt;](https://github.com/nikoheikkila).

Source code of this project is [MIT](https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/LICENSE-website) licensed.

***

<small>_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_.</small>
