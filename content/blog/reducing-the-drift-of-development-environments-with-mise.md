---
title: Reducing the Drift of Development Environments with Mise
author: Niko Heikkilä
lang: en
excerpt: How I bootstrap my laptop from a version-controlled Mise configuration and use the same pinned tools in CI to reduce development environment drift.
type: post
date: 2026-11-21
hero: "https://r2.nikoheikkila.fi/reducing-the-drift-of-development-environments-with-mise.jpg"
---

As cloud engineers, we are keen to declare our setup using Infrastructure-as-Code tools like Terraform, Pulumi, and CDK.

The same vigor, though, is often missing from our local development environments, and they drift. Need a new tool in your belt? Just install it from Homebrew or, worse, run this secret script from the internet without auditing it first. Trust me, bro.

This is problematic because of the many [supply-chain attacks](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem) where an attacker gains control of your private data through a package from a hijacked source.

I don't know of anyone who would have the patience to scan through Homebrew formulae or remote scripts before executing them. Obviously, [our AI agents](/blog/my-ai-agents-are-all-nuts/) don't scan them either unless we prompt them to. We have more important problems to solve.

## Bootstrapping a Development Environment with Mise

Having to periodically switch to a new laptop, I set out to solve the problem of bootstrapping a new development environment from a declarative configuration.

For this, I wanted a Terraform-esque experience of a current state I can compare the configuration against and, if satisfied, turn the configuration into a reality.

Initially, I peeked into Nix for repeatable local environments, but I quickly retreated since the learning curve seemed rather steep. I _do_ have more important problems to solve, right?

Then, I found [**Mise**](https://mise.jdx.dev/) and its bootstrap capabilities.

Fast-forward a few days and now I have a version-controlled setup that installs the apps configured in a TOML file.

It also maintains my _dotfiles_ (geek term for configuration files whose names are prefixed by a dot), sets up macOS launch agents for scheduled tasks, and configures different macOS default settings using the `defaults` command.

The Terraform-esque experience comes as a first-class citizen in Mise. Here is the output of runing `mise bootstrap plan` for a two-package config where an arbitrary example package `cowsay` is missing:

```text
$ mise bootstrap plan
unchanged  package:brew:git        installed (2.56.1)  installed (any version)
create     package:brew:cowsay     missing             installed (any version)
Plan: 1 create, 0 update, 1 unchanged, 0 remove, 0 run, 0 unknown
```

The line with _missing_ shows the drift. The plan covers packages and similar resources, which I can then install by running `mise bootstrap`.

One caveat is that many apps, especially those built with graphical user interfaces, still need to be installed via Mise's `brew` and `brew-cask` package managers as formulae and casks.

To that end, I've attempted to use the [**Aqua**](https://mise.jdx.dev/dev-tools/backends/aqua.html) backend for as many of the installations as possible. Aqua helps with security since it can easily verify checksums, signatures, attestations, and provenance if a recipe declares them. The downside is that not all required packages are available in Aqua.

To verify the bootstrap on a fresh system, I set up a container to install everything during the build. However, because I'm not using Linux as my daily driver, I needed to also test installation in a macOS virtual machine. A [GitHub Actions](/blog/craftpersons-guide-to-github-actions/) runner with the `macos-latest` label was helpful, albeit expensive for private repositories.

The real test is, of course, to unbox a fresh new laptop and run the installation there.

## Reducing Drift with the Same Tools Locally and in Builds

The benefits of Mise do not end in bootstraps. For this blog, I've set up its own [`mise.toml`](https://github.com/nikoheikkila/nikoheikkila.fi/blob/main/mise.toml) configuration along with a [composite action](https://github.com/nikoheikkila/nikoheikkila.fi/blob/main/.github/actions/setup-environment/action.yml) that wraps Mise's official action. The setup works great with automatic dependency updates from Renovate — a pattern I shall replicate across all my projects from now on.

The `mise.toml` pins every tool, and the lockfile records checksums for both platforms I use. This is an excerpt:

```toml
[settings]
lockfile = true
lockfile_platforms = ["linux-x64", "macos-arm64"]

[tools]
node = "26.13.1"
bun = "1.4.4"
terraform = "1.17.2"
vale = "3.27.0"
```

The composite action installs the same pins in CI, and Renovate keeps the Mise version itself current:

```yaml
runs:
  using: composite
  steps:
    - name: Install tools with Mise
      uses: jdx/mise-action@b44d12e7d0d8ee7461bb893e1b1993500433185b # v5.2.7
	  with:
	    # renovate: datasource=github-releases depName=jdx/mise
	    version: 2026.11.4
```

This pattern is how you should handle dependency management: establish a single definition of tools and dependencies that pins and installs the exact same set on your machine, your colleague's machine, and a remote build agent. No more setting up tool installations via setup actions and watching how those drift from the tools your team uses locally.

In the past, I used [scripts](/blog/new-computer-who-dis/) to bootstrap my environment, but maintaining it by hand quickly grew tedious and I archived the repository. With Mise, I no longer have to duct-tape pieces together with [Bash](/blog/don-t-use-bash-for-scripting-all-the-time/) as I wouldn't ever dream of doing that to cloud production environments.
