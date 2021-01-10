<h1 align="center">Welcome to nikoheikkila.fi 👋</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/2296609f-151b-491d-b3f8-d908eb78e4f5/deploy-status)](https://app.netlify.com/sites/nikoheikkila/deploys)
![Build Status](https://github.com/nikoheikkila/nikoheikkila.fi/workflows/Main%20Workflow/badge.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/587ffb2f1f2c47bcb6a3141574dbb440)](https://www.codacy.com/app/nikoheikkila/nikoheikkila.fi?utm_source=github.com&utm_medium=referral&utm_content=nikoheikkila/nikoheikkila.fi&utm_campaign=Badge_Grade)

My personal blog. Forked from Gatsby Blog Starter template and inspired here and there by Dan Abramov's blog.

## 🏠 [Live Page](https://nikoheikkila.fi/)

## 🔧 Installation & Usage

### Environment

Gatsby makes use of several environment variables which are documented in `.env.example` file. Before building the project make sure to modify these variables as needed. Then copy the `.env.example` as `.env.development` to project root for Gatsby to recognize it.

### 1. Build Locally with Yarn

To run the build locally, type like so:

```bash
cp .env.example .env.development
yarn
yarn dev
```

### 2. Build Locally with Netlify

Alternatively, you can mimic the production environment from Netlify like so:

```bash
npm install -g netlify-cli
ntl dev
```

This will download and execute a Netlify builder running the `gatsby develop` command.

Finally, open <http://localhost:8000> to view the blog.

## 🤖 Run tests

Project is packaged with Prettier formatter, AVA unit tests, Playwright automated tests, and Pa11y accessibility tests. They can be ran respectively like so:

```sh
yarn lint
yarn test:unit
yarn test:dev
yarn test:a11y
```

## 👤 Author

**Niko Heikkilä &lt;yo@nikoheikkila.fi&gt;**

- Github: [@nikoheikkila](https://github.com/nikoheikkila)
- Mastodon: [@nikoheikkila](https://mastodon.technology/@nikoheikkila)
- DEV: [nikoheikkila](https://dev.to/nikoheikkila)
- LinkedIn: [nikoheikkila](https://www.linkedin.com/in/nikoheikkila)

## 🤝 Contributing

Content can be found under `content/` directory. Edit posts as needed and submit a PR for me to review. All PRs are automatically deployed by Netlify as preview deployments. Once approved and merged to master branch they will be deployed to production.

Other contributions to UI, accessibility, React components, security, dependency updates etc. are warmly welcome as well!

Feel free to check the [open issues](https://github.com/nikoheikkila/nikoheikkila.fi/issues).

## ✍️ Writing

To quickly bootstrap a new post or page draft use the CLI tool `new.js`
at project root either via `yarn new` or invoking directly.

## 📝 License

Copyright of blog posts © 2019 [Niko Heikkilä &lt;yo@nikoheikkila.fi&gt;](https://github.com/nikoheikkila).

Source code of this project is [MIT](https://github.com/nikoheikkila/nikoheikkila.fi/blob/master/LICENSE-website) licensed.

---

<small>_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_.</small>
