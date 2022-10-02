---
lang: en
author: Niko Heikkilä
date: 2019-08-06
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/customize-your-shell-prompt-for-productivity.png
title: Customizing Your Shell Prompt for Productivity
type: post
excerpt: To developers, command line is a natural environment for daily work. It makes sense then to customize it to be as helpful as possible.
categories:
    - Tips
    - Terminal
    - Bash
    - Zsh
    - Fish
---

To developers, the command line is a natural environment for daily work. It makes sense then to customize it to be as helpful as possible.

Try opening an uncustomized Bash shell on your machine and you will likely be greeted with a very unhelpful _prompt_ (the text before your cursor) reading something like `bash-5.0$`. This only indicates you're running Bash shell version 5.0 which is the least useful information when opening the terminal.

What is useful enough information to include in the prompt then? I've gotten used to demanding the following information depending on the circumstances:

-   current working directory
-   current Git branch
-   current username if logged in to a remote machine or doing superuser stuff
-   system time if working in a full-screen mode
-   battery charge level if working on a laptop
-   state of the local project clone; eg. unstaged, modified, and deleted files or unpushed and unpulled commits
-   current application version from _package.json_ if working with a Javascript project
-   current runtime version depending on the programming language

You can find suitable commands to print out this information and customize your shell startup file `~/.bashrc` to include it but why keep reinventing the wheel?

## Board the Starship

[**Starship**][starship] is a highly customizable cross-shell prompt created with _Rust_. It's a successor to the popular [_Spaceship_][spaceship] theme for ZSH and the [_Spacefish_][spacefish] theme for Fish. I've been using the latter for more than a year now, and I was mildly annoyed by its sometimes sluggish output. After all, navigating in the command line environment should be a blazing fast experience. Thanks to Rust, speed is no longer an issue with Starship. The project is not yet out of the beta but the foundation is very mature for daily use.

You can install Starship by downloading the binary file to your system or using Rust's package manager `cargo`. I would believe the maintainers will eventually add it to other popular package managers like _APT_ and _Homebrew_ as well. After installing, you should place this short snippet to your shell startup file.

```bash
# ~/.bashrc or ~/.zshrc
eval "$(starship init $0)"

# ~/.config/fish/config.fish
eval (starship init fish)
```

This will load the Starship initialization code when you open a new shell session. If you want to peek the code before running it, remove the call to `eval` and run the expression inside parentheses.

Next, create a configuration file at `~/.config/starship.toml`. Don't worry if you're not familiar with TOML syntax, it's very human-readable. Finally, start hacking with the [documented configuration parameters][conf] and you might end up with something like this.

![A screenshot of a prompt customised with the _Starship_ framework.](https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/starship.png)

## Conclusion

With a few minutes of work, I've managed to squeeze out all the vital information from my environment. Now I can avoid typing `pwd`, `git status`, or `node -v` frequently and can focus being productive on my actual work.

You might argue this is a waste of time when you're switching machines regularly and will always fall back to the default Bash prompt. I used to think alike as well. However, unless you're a system administrator from the early 2000s with no better workflow than SSH'ing to servers, chances are you will be working in your local environment for **95%** of the time. There's no need to discard productivity customization due to this 5%. The return on investment in doing this is huge.

I bet _you_ have some nice customizations there. Share them in the comments!

[spaceship]: https://denysdovhan.com/spaceship-prompt/
[spacefish]: https://spacefish.matchai.me/
[starship]: https://starship.rs/
[conf]: https://starship.rs/config/
