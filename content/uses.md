---
lang: en
author: Niko Heikkilä
date: 2022-10-09
title: Uses
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/keychron.jpg
type: page
excerpt: The tools I use to survive my hectic days as a software engineer.
categories:
    - Tools
    - Software
    - Apps
---

Some people are often puzzled about my setup — and the font I use — or want to hear my recommendations for a given task. On this page, I will describe the majority of tools I use to survive my day accompanied with links for the readers to try them out. I try to keep this page updated as often as possible. That probably won't happen more often than every other year, but anyway...

This page was inspired by the works of [**Wes Bos**][wesbos]. If you decide to make your own `/uses` page after reading this, please include me among the sources.

[wesbos]: https://wesbos.com/uses/

## Hardware and Software

### Operating Systems

I develop mainly on two platforms that currently are **macOS** on MacBook Pro (M1 Max) and **Windows 11 with WSL**. I've mastered my setup so there's no hindrance to my productivity while switching from the operating system to another.

### Keyboard

I'm typing with the [**Keychron K8**][keyboard] wireless mechanical keyboard, which with its brown switches provides a pleasant tactile bump. I've previously used mostly Cherry MX red switches, which might better suit for games, but not for real typing.

### Mouse

As for the mouse, I'm using [**Logitech MX Master 3**][mouse]. I couldn't live without its horizontal scrollwheel anymore which has become irreplaceable with spreadsheets and database software. It's also lightweight enough to carry around yet large enough to comfortably fit into my rather large hands.

Both the keyboard and the mouse support connecting up to three devices at most via Bluetooth, which is a must-have because I switch the laptop I'm working on often.

[keyboard]: https://www.keychron.com/pages/keychron-k8-wireless-mechanical-keyboard
[mouse]: https://www.logitech.com/en-us/products/mice/mx-master-3.910-005620.html

### Code Editor

![A screenshot of my Visual Studio Code setup using Elegant Black as the color theme and Jetbrains Mono as the primary font while editing TypeScript source code.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/vscode.png)

My editor of choice is **Visual Studio Code** which I migrated to after using Atom and Sublime Text for some years. I dislike using full-blown IDEs as they are mostly resource hogs offering very little extra value to my workflow. Respectively, I'm too lazy to spend hours editing and tweaking settings for barebone editors like Vim and Emacs. Therefore, VS Code offers a great balance.

In the screenshot above I'm using a theme called [Elegant Black][theme] and a font called [Jetbrains Mono][operator]. VS Code synchronizes all the fancy settings and extensions across platforms natively, so I can work on one platform and seamlessly continue on another.

[theme]: https://github.com/iamjazzar/elegant-black
[operator]: https://www.jetbrains.com/lp/mono/

### Terminal

![A screenshot of my Windows Terminal setup using `tmux` terminal multiplexer and three split windows. The top-right pane is building this Gatsby site, the top-left pane has a cow saying "Moo!", and the bottom pane displays the resource consumption using the `htop` utility.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/wsl.png)

For the command line, I've settled with [**Kitty**][kitty] and [**Windows Terminal**][msterminal]. Sometimes, I also use the builtin terminal of VS Code for small tasks.

After years of cursing the _allfathers_ while navigating in a clunky Bash shell, I came across the [**Friendly Interactive Shell** (Fish)][fish]. I have then supercharged my Fish shell with the [**Oh-My-Fish**][omf] framework and the [**Starship**][starship] prompt theme.

While in the command line I use [`tmux`][tmux] for persisting window and buffer layouts, [`z`][z] to quickly jump to a project, and [`fzf`][fzf] to remember the exact command I typed a few hours ago. These modifications let me swim in the command line like a fish in the sea. 🐟

Since Microsoft released their [Remote Development Pack][remotedevelopment] for VS Code, which lets me access the files over SSH, WSL, or within a Docker container, I've largely given up on using Vim. However, on those rare occasions and quick editing tasks I need to use it I leverage the [Doom NVIM][doom] configuration preset.

[kitty]: https://sw.kovidgoyal.net/kitty/
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

I've tried virtually every browser under the sun, but the one I keep coming back to is **Microsoft Edge** mainly because it's incredibly stable, supports all my operating systems, and is also less a resource hog than Google Chrome.

I used to favour Vivaldi, but frequent crashing and bugs led me to give up on our relationship. For a web developer, browser is a tool that is literally always active so it must be stable.

### Other Apps

Although I consider myself an open-source advocate in most situations I have no problem paying and using commercial software when it delivers the job. This will be a mouthful so I'll list my used apps below. I've marked the apps I've purchased or subscribed to with a 💰 sign.

Most apps offer a limited free plan which I advise to check out as well if it covers your needs.

Therefore, I use...

-   [**1Password**](https://1password.com) with a business and family subscriptions paid by my employer. I use it for storing passwords, secure notes, software licenses, movie tickets, and even SSH keys. It's the best password manager out there and using anything else would cause me a mental breakdown.
-   [**Alfred** 💰](https://www.alfredapp.com/) to boost my productivity with a variety of workflows and snippets.
-   [**DigitalOcean Spaces** 💰](https://www.digitalocean.com/products/spaces) to serve static assets to this blog and other purposes.
-   [**Cleanshot X** 💰](https://cleanshot.com/) to capture screenshots and record videos -- useful for reporting website issues. On Windows, I use the builtin screenshot tool which I can summon with <kbd>Win+Shift+S</kbd>.
-   [**Dropbox** 💰](https://www.dropbox.com) with a 2 terabyte subscription to dump all my random things into.
-   [**Fork** 💰](https://git-fork.com) for viewing commit diffs and solving merge conflicts in Git. Sometimes the native command line `git` isn't enough.
-   [**MindNode** 💰](https://mindnode.com) for drawing, exporting, and sharing mind maps.
-   [**Obsidian** 💰](https://obsidian.md) for writing notes, drafts, checklists, and keeping a personal micro-wiki around. Previously, I used **Notion** for this, but Obsidian is more simple with its pure Markdown approach.
-   [**Insomnia**](https://insomnia.rest/) for experimenting with REST and GraphQL APIs.
-   [**Rectangle**](https://rectangleapp.com/) for organizing the windows in my desktop. Sadly, I haven't found a good Windows alternative but using the WIN and arrow keys is efficient enough.
-   [**TablePlus** 💰](https://tableplus.io) for accessing relational databases, Redis caches, and more.
-   [**Todoist** 💰](https://todoist.com) for reminding me to pay my repeating bills each month and a heap of other stuff.
-   [**Toggl**](https://toggl.com) for tracking the time spent on projects and tasks, which is a mandatory evil thing to do in work.

## Office Setup

I regularly work from home, so a functional office setup is something you shouldn't be a cheapskate about.

Therefore, I work with...

-   [**Autonomous Standing Desk**](https://www.autonomous.ai/standing-desks/smartdesk-2-home). Getting up from my ass helps me to stay more alert when I'm feeling drowsy.
-   [**Samsung 27-inch WQHD**](https://www.samsung.com/fi/monitors/gaming/wqhd-curved-monitor-27-inch-lc27jg50qquxen/) curved monitor. I was surprised how nice curved monitors are to look at.
-   [**Blue Yeti USB microphone**](https://www.bluemic.com/en-us/products/yeti/), since pair and ensemble programming require constant and clear communication. It has a great physical mute button and I can plug in my [**Bose QuietComfort 35**](https://www.bose.fi/fi_fi/products/headphones/over_ear_headphones/quietcomfort-35-wireless-ii.html) headphones via a 3.5mm jack for a zero-latency audio feedback for my voice.
-   **Mozi AR-2 BaseStand** stand which lifts my laptop to a comfortable height for my eyes.
