---
lang: en
author: Niko Heikkilä
date: 2026-11-20
title: Uses
hero: https://r2.nikoheikkila.fi/keychron.jpg
type: page
excerpt: The hardware, software, and terminal tools I use to survive my hectic days as a software engineer.
---

Some people are often puzzled about my setup or want to hear my recommendations for a given task. On this page, I will describe the tools I use to survive my day, accompanied by links for the readers to try them out. I try to keep this page updated, though probably no more often than every other year.

The works of [**Wes Bos**](https://wesbos.com/uses/) inspired this page. If you decide to make your own `/uses` page after reading this, please include me among the sources.

## Office and Computer Hardware

I regularly work from home, so a functional office setup is something you shouldn't be a cheapskate about.

I work with...

- **MacBook Pro 2023** with M3 Pro CPU and 36 GB RAM for all my personal and work needs.
- [**Autonomous Standing Desk**](https://www.autonomous.ai/standing-desks/smartdesk-2-home) since getting up off my ass helps me stay more alert when feeling drowsy.
- [**Lenovo ThinkVision P27u-20 27-inch 4K display**](https://www.lenovo.com/fi/fi/p/accessories-and-software/monitors/professional/62cbrat6eu). I used to have a curved monitor, but decided that a sharp Retina display for coding is better.
- [**Blue Yeti USB microphone**](https://www.logitechg.com/en-us/shop/p/yeti-premium-usb-microphone), since [pair](/blog/when-to-pair-program-and-when-to-go-solo/) and [ensemble programming](/blog/turning-up-the-developer-experience-to-eleven-with-mob-programming/) require constant and clear communication. I sometimes appear on podcasts too. It has a great physical mute button, and I can plug in my [**Sennheiser HD 560S**](https://www.sennheiser-hearing.com/p/hd-560s/ckyy9r5q0016i0c96sk5d9tog/) headphones via a 3.5mm jack for zero-latency audio feedback for my voice.
- **Mozi AR-2 BaseStand** lifts my laptop to a comfortable height for my eyes, which helps with neck pain.
- [**Keychron Q11**](https://www.keychron.com/products/keychron-q11-qmk-custom-mechanical-keyboard) mechanical split keyboard with brown Gateron switches and a satisfying tactile bump.
- [**Logitech MX Master 3S**](https://www.logitech.com/fi-fi/products/mice/mx-master-3s.html) mouse with custom macros for taking, e.g., screenshots. Nearly all the other mice feel too tiny for my hands.
- [**Amazon Kindle Paperwhite**](https://www.amazon.com/dp/B0CTMS64NT) for reading e-books, which I mostly strive to buy in DRM-free EPUB format.

## Software Tools

Although I am an open-source advocate, in most situations, I have no problem paying for and using commercial software when it gets the job done. The list is long, so here are the apps I use. I've marked the apps I've purchased or subscribed to with a moneybag (💰) sign.

Most apps offer a limited free plan that you should check out too, if it covers your needs.

### Desktop Applications

- [**Zen**](https://zen-browser.app/) for browsing the web. I'm stunned at how poorly other browsers have implemented the fast user profile switching, command panel, and other niceties. I used Arc before, but unfortunately it will be sunset in December 2026. Its official heir, Dia, didn't satisfy me because it abandoned many of the killer features in favor of stronger AI integrations.
- [**Kagi**](https://kagi.com/) for searching the web. I used to use DuckDuckGo, but as it uses Bing as its search backend, the results were growing less and less helpful. Kagi is a paid search engine that respects privacy and doesn't track you, which is an essential feature of a search engine.
- [**IntelliJ IDEA** 💰](https://www.jetbrains.com/idea/) for larger codebases that crave safe and automatic refactoring tools.
- [**Zed**](https://zed.dev/) for general-purpose programming activities.
- [**Raycast** 💰](https://www.raycast.com/) to boost my productivity with a variety of workflows and snippets.
- [**CleanShot X** 💰](https://cleanshot.com/) to capture screenshots and record videos. It's rather useful for reporting issues with websites.
- [**Obsidian** 💰](https://obsidian.md) for writing notes, drafts, checklists, and keeping a personal journal around. I kick off each day with a daily journal page, including a to-do list for important tasks. I used **Notion** for this before, but Obsidian is simpler with its pure local Markdown approach.
- [**Todoist** 💰](https://todoist.com) for _inboxing_, or getting that stuff out of your head for later.

### Terminal Applications

- [Mise](https://mise.jdx.dev/) to install all the apps and bootstrap a new MacBook with a single command. It also installs my dotfiles, launch agents, and other configurations.
- **Claude Code** and **GitHub Copilot CLI** for [agentic engineering](/blog/my-ai-agents-are-all-nuts/).
- [**Neovim**](https://neovim.io/) with [my custom configuration](https://github.com/nikoheikkila/nvim) for [writing Markdown](/blog/hello-neovim-my-old-friend/), performing quick single-file edits and working with files over SSH.
- [**Warp**](https://www.warp.dev/), a GPU-powered terminal with agentic AI capabilities.
- [**Friendly Interactive Shell (Fish)**](https://fishshell.com/) with the [**Oh-My-Fish**](https://github.com/oh-my-fish/oh-my-fish) framework (unmaintained these days, according to its README) and the [**Starship**](https://starship.rs/) [prompt customization](/blog/customize-your-shell-prompt-for-productivity/).
- [**Zoxide**](https://github.com/ajeetdsouza/zoxide) to quickly jump to a project.
- [**Fuzzy Finder (FZF)**](https://github.com/junegunn/fzf) to remember the exact command I typed a few hours ago. Warp also handles this with its built-in fuzzy search, but I still use FZF for Neovim and Fish.
- [**Lazygit**](https://github.com/jesseduffield/lazygit/) for managing version control. Sometimes the native command line `git` just isn't enough.

### Web Services

- [**1Password** 💰](https://1password.com) with a Business subscription paid by my employer. I use it to store passwords, secure notes, software licenses, movie tickets, and SSH keys. It's the best password manager out there, and using anything else would cause me a mental breakdown.
- [**Cloudflare R2** 💰](https://www.cloudflare.com/r2/) to serve static assets to this blog and other purposes.
- [**iCloud** 💰](https://www.apple.com/icloud/) with a 50-gigabyte subscription to dump all my random things into.
- [**Fastmail** 💰](https://fastmail.com/) for all my email needs. I canceled my HEY subscription due to DHH
  growing utterly nazified.
- [**GitHub**](https://github.com/) for storing my code unless work projects require otherwise.

In the end, I use too much of everything, so I've probably forgotten most of it. 🤷‍♂️
