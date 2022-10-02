---
lang: en
author: Niko Heikkilä
date: 2021-10-24
title: Uses
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/keychron.jpg
type: page
excerpt: These are the tools I use to survive my hectic days.
categories:
    - Tools
    - Software
    - Apps
---

Some people are often puzzled about my setup – and the font I use – or want to hear my recommendations for a given task. On this page I will describe the majority of tools I use to survive my day accompanied with links for the readers to try them out. I try to keep this page updated as often as possible. That probably won't happen more often than every other year, but anyway...

This page was inspired by the works of [**Wes Bos**][wesbos]. If you decide to make your own `/uses` page after reading this, please include me among the sources.

[wesbos]: https://wesbos.com/uses/

## Hardware and Software

### Operating Systems

I develop mainly on two platforms that currently are **macOS** and **Windows 10 with WSL**. I've mastered my setup so there's no hindrance to my productivity while switching from the operating system to another.

### Keyboard

I'm typing with the [**Keychron K8**][keyboard] wireless mechanical keyboard which with its brown switches provides a pleasant tactile bump. I've previously used mostly Cherry MX red switches, which might better suit for games, but not for real typing.

### Mouse

As for the mouse, I'm using [**Logitech MX Master 3**][mouse]. I couldn't live without its horizontal scrollwheel anymore which has become irreplaceable with spreadsheets and database software. It's also lightweight enough to carry around yet large enough to comfortably fit into my rather large hands.

Both the keyboard and the mouse support connecting up to three devices at most via Bluetooth.

[keyboard]: https://www.keychron.com/pages/keychron-k8-wireless-mechanical-keyboard
[mouse]: https://www.logitech.com/en-us/products/mice/mx-master-3.910-005620.html

### Code Editor

![A screenshot of my Visual Studio Code setup using Palenight as the color theme and Operator Mono as the primary font while editing React source code.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/vscode.png)

My editor of choice is Visual Studio Code which I migrated to after using Atom and Sublime Text for some years. I dislike using full-blown IDEs as they are mostly resource hogs offering very little extra value to my workflow. Respectively, I'm too lazy to spend hours editing and tweaking settings for barebone editors like Vim and Emacs. Therefore, VS Code fits best in my niche.

In the screenshot above I'm using a theme called [Palenight][theme] and a font called [Operator Mono][operator]. VS Code synchronizes all the fancy settings and extensions across platforms natively, so I can work on one platform and seamlessly continue on another.

[theme]: https://marketplace.visualstudio.com/items?itemName=whizkydee.material-palenight-theme
[operator]: https://www.cufonfonts.com/font/operator-mono

### Terminal

![A screenshot of my Windows Terminal setup using `tmux` terminal multiplexer and three split windows. The top-right pane is building this Gatsby site, the top-left pane has a cow saying "Moo!", and the bottom pane displays the resource consumption using the `htop` utility.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/wsl.png)

For the command line, I've settled with [**iTerm 2**][iterm] and [**Windows Terminal**][msterminal]. Sometimes I also use the builtin terminal of VS Code for small tasks.

After years of cursing the _allfathers_ while navigating in a clunky Bash shell, I came across the [**Friendly Interactive Shell** (Fish)][fish]. I have then supercharged my Fish shell with the [**Oh-My-Fish**][omf] framework and the [**Starship**][starship] prompt theme.

While in the command line I use [`tmux`][tmux] for persisting window and buffer layouts, [`z`][z] to quickly jump to a project, and [`fzf`][fzf] to remember the exact command I typed a few hours ago. These modifications let me swim in the command line like a fish in the sea. 🐟

Since Microsoft released their [Remote Development Pack][remotedevelopment] for VS Code which lets me access the files over SSH, WSL, or within a Docker container, I've largely given up on using Vim. However, on those rare occasions I need to use it I leverage the [Doom NVIM][doom] configuration preset.

[iterm]: https://iterm2.com/
[msterminal]: https://github.com/Microsoft/Terminal
[fish]: https://fishshell.com/
[omf]: https://github.com/oh-my-fish/oh-my-fish
[starship]: https://starship.rs/
[tmux]: https://github.com/tmux/tmux
[z]: https://github.com/rupa/z/
[fzf]: https://github.com/junegunn/fzf
[remotedevelopment]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
[doom]: https://github.com/NTBBloodbath/doom-nvim

### Browser

I've tried virtually every browser under the sun, but the one I keep coming back to is [**Vivaldi**](https://vivaldi.com) due to its theming system and power-user features. It uses Chromium under the hood so it's not the first choice for privacy enthusiasts, but that risk I'm willing to take.

If, for some reason, Vivaldi lets me down I've also enjoyed the new **Microsoft Edge** browser which could be described as the resource-friendly sibling of Chrome.

### Other Apps

Although I consider myself an open-source advocate in most situations I have no problem paying and using commercial software when it's good. This will be a mouthful so I'll list my used apps below. I've marked the apps I've purchased or subscribed to with a 💰 sign.

Most apps offer a limited free plan which I advise to check out as well if it covers your needs.

_I use..._

-   [**1Password**](https://1password.com) with a business and family subscriptions paid by my employer. I use it for storing passwords, secure notes, software licenses, and even movie tickets. It's the best password manager out there and using anything else would cause me a vile breakdown.
-   [**Alfred** 💰](https://www.alfredapp.com/) to boost my productivity with a variety of workflows and snippets.
-   [**Backblaze** 💰](https://www.backblaze.com) to back up my disks. It does everything silently on the background which means I usually forget its existence and that's definitely a good feature from a backup manager. Backblaze also ships with an S3 compatible cloud storage which I use to store my blog's images and static assets.
-   [**Cleanshot X** 💰](https://cleanshot.com/) to capture screenshots and record videos -- useful for reporting website issues. On Windows, I use the builtin screenshot tool which you can summon with `Win + Shift + S`.
-   [**Dropbox** 💰](https://www.dropbox.com) with a 2 TB subscription to dump all my random things into.
-   [**Fork** 💰](https://git-fork.com) for viewing commit diffs and solving merge conflicts in Git. Sometimes the native command line `git` isn't enough.
-   [**MindNode** 💰](https://mindnode.com) for drawing, exporting, and sharing mind maps.
-   [**Obsidian** 💰](https://obsidian.md) for writing notes, drafts, checklists, and keeping a personal micro-wiki around. Previously, I used **Notion** for this, but Obsidian is more simple with its pure Markdown approach.
-   [**Insomnia**](https://insomnia.rest/) for experimenting with REST and GraphQL APIs.
-   [**Rectangle**](https://rectangleapp.com/) for organizing the windows in my desktop. Sadly, I haven't found a good Windows alternative but using the WIN and arrow keys is efficient enough.
-   [**TablePlus** 💰](https://tableplus.io) for accessing relational databases, Redis caches, and more.
-   [**Todoist** 💰](https://todoist.com) for reminding me to pay my repeating bills each month and a heap of other stuff.
-   [**Toggl**](https://toggl.com) for tracking the time spent on projects and tasks which is a mandatory evil thing to do in work.

## Office Setup

I mostly work from home, so a good office setup is something you shouldn't be a cheapskate about.

_I work with..._

-   [**Autonomous Standing Desk**](https://www.autonomous.ai/standing-desks/smartdesk-2-home) which is mostly in sitting position unless I'm listening to music.
-   [**GAME**](https://www.sotka.fi/tuotteet/tuote/1848/35577/game-pelituoli-mustapunainen) office chair -- whoever came up with such a unique name?
-   **Mozi AR-2 BaseStand** stand which lifts the laptop to a comfortable height for my eyes.
