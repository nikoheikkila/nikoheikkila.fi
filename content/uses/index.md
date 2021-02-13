---
lang: en
author: Niko Heikkilä
date: 2021-02-13
title: Uses
cover: keychron.jpg
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

![Visual Studio Code with Palenight color theme and Operator Mono font](https://f001.backblazeb2.com/file/nikoheikkila-fi/vscode.png)

My editor of choice is Visual Studio Code which I migrated to after using Atom and Sublime Text for some years. I dislike using full-blown IDEs as they are mostly resource hogs offering very little extra value to my workflow. Respectively, I'm too lazy to spend hours editing tweaking setings for barebone editors like Vim and Emacs. Therefore, VS Code fits best in my niche.

In the screenshot above I'm using a theme called [_Palenight_][theme] and a font called [Operator Mono][operator]. VS Code synchronizes all the fancy settings and extensions across platforms natively, so I can work on one platform and seamlessly continue on another.

[theme]: https://marketplace.visualstudio.com/items?itemName=whizkydee.material-palenight-theme
[operator]: https://www.cufonfonts.com/font/operator-mono

### Terminal

![Microsoft Terminal for Windows](https://f001.backblazeb2.com/file/nikoheikkila-fi/wsl.png)

For the command line, I've settled with [**iTerm 2**][iterm] and [**Windows Terminal**][msterminal]. Sometimes I also use the builtin terminal of VS Code for small tasks.

After years of cursing the _allfathers_ while navigating in a clunky Bash shell, I came across the [**Friendly Interactive Shell** (Fish)][fish]. I have then supercharged my Fish shell with the [**Oh-My-Fish**][omf] framework and the [**Starship**][starship] prompt theme.

While in the command line I use [`z`][z] to quickly jump to a project and [`fzf`][fzf] to remember the exact command I typed a few hours ago. These modifications let me swim in the command line like a fish in the sea. 🐟

Since Microsoft released their [Remote Development Pack][remotedevelopment] for VS Code which lets me access the files over SSH, WSL, or within a Docker container, I've largely given up on using Vim. However, on those rare occasions I need to use it I leverage the [SpaceVim][spacevim] configuration preset.

[hyper]: https://hyper.is
[iterm]: https://iterm2.com/
[msterminal]: https://github.com/Microsoft/Terminal
[fish]: https://fishshell.com/
[omf]: https://github.com/oh-my-fish/oh-my-fish
[starship]: https://starship.rs/
[z]: https://github.com/rupa/z/
[fzf]: https://github.com/junegunn/fzf
[remotedevelopment]: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
[spacevim]: https://spacevim.org/

### Browser

I've tried virtually every browser under the sun, but the one I keep coming back to is the new **Microsoft Edge** (or _Edgium_, if you prefer) which provides the best parts of Google Chrome without eating all your RAM. Previously, I used Vivaldi but due to its constant regression bugs and crashes on macOS, I gave up on using it. Hope it gets well again soon.

### Other Apps

Although I consider myself an open-source advocate in most situations I have no problem paying and using commercial software when it's good. This will be a mouthful so I'll list my used apps below. I've marked the apps I've purchased or subscribed to with a 💰 sign. Most apps offer a limited free plan which I advise to check out as well if it covers your needs.

_I use..._

- [1Password 💰](https://1password.com) with a family plan for storing passwords, secure notes, software licenses, and even movie tickets. It's the best password manager out there and using anything else would cause me a vile breakdown.
- [Alfred 💰](https://www.alfredapp.com/) to boost my productivity with a variety of workflows and snippets.
- [Backblaze 💰](https://www.backblaze.com) to back up my disks. It does everything silently on the background which means I usually forget its existence and that's definitely a good feature from a backup manager. Backblaze also ships with an S3 compatible cloud storage which I use to store some photos.
- [Cleanshot X 💰](https://cleanshot.com/) to capture screenshots and record videos -- useful for reporting website issues. On Windows, I use the builtin screenshot tool which you can summon with `Win + Shift + S`.
- [Dropbox 💰](https://www.dropbox.com) with a 2 TB subscription to dump all my random things into.
- [Fork](https://git-fork.com) for viewing commit diffs and solving merge conflicts in Git. Sometimes the native command line `git` isn't enough.
- [MindNode 💰](https://mindnode.com) for drawing, exporting, and sharing mind maps.
- [Notion 💰](https://www.notion.so/?r=6605af2045dd4c5bbf7a87d6d949c271) for writing notes, drafts, checklists, and keeping a personal micro-wiki around.
- [Insomnia](https://insomnia.rest/) for experimenting with REST and GraphQL APIs.
- [Rectangle](https://rectangleapp.com/) for organizing the windows in my desktop. Sadly, I haven't found a good Windows alternative but using the WIN and arrow keys is efficient enough.
- [TablePlus 💰](https://tableplus.io) for accessing relational databases, Redis caches, and more.
- [Todoist 💰](https://todoist.com) for reminding me to pay my repeating bills each month and a heap of other stuff.
- [Toggl](https://toggl.com) for tracking the time spent on projects and tasks which is a mandatory evil thing to do in work.

## Office Setup

I mostly work from home, so a good office setup is something you shouldn't be a cheapskate about.

_I work with..._

- [**Autonomous Standing Desk**](https://www.autonomous.ai/standing-desks/smartdesk-2-home) which is mostly in sitting position unless I'm listening to music.
- [**GAME**](https://www.sotka.fi/tuotteet/tuote/1848/35577/game-pelituoli-mustapunainen) office chair -- whoever came up with such a unique name?
- **Mozi AR-2 BaseStand** stand which lifts the laptop to a comfortable height for my eyes.
