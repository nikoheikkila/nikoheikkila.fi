---
lang: en
author: Niko Heikkilä
date: 2019-05-25
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/generating-conventional-changelogs.png
title: Generating Conventional Changelogs
type: post
excerpt: Spicing up your release notes with awesome changelog power.
categories:
    - Git
    - Fish
    - Shell
    - Tips
---

As an open-source maintainer, I have a severe obsession for informative release notes and I cringe every time I see release notes with the dreadful _"Bug fixes and minor improvements"_ line in it. I like to write my release notes as accurately as possible which is tedious by hand. I decided to use scripting power to ease it.

The script I made uses the Friendly Interactive Shell (you should too) but it's trivial to replicate the same functionality in Bash, ZSH or even include it as a Git alias.

## Installation and Usage

You can find the script as a [gist][gist] and place it within your Fish functions. Here I'm using my Python library `pwnedapi` for example.

```bash
curl -sSL https://gist.githubusercontent.com/nikoheikkila/96f734a5dffa7a9e6e32c33e8b2c7ddc/raw/3b98f241e203631915729d165ecf6e767bbff7ca/changes.fish -o ~/.config/fish/functions/changes.fish

changes v1.0.0
```

```md
## `v1.0.0`

Write your release notes on this line.

-   docs: add a security policy (_Niko Heikkilä_) (d02e70a)
-   fix(security): upgrade Python packages (_Niko Heikkilä_) (bbb0861)
-   fix(tests): replace parameter message with matches in pytest.raises (_Niko Heikkilä_) (9161cf9)
-   release: 1.0.1 (_Niko Heikkilä_) (f9cdd53)
```

The script takes only one argument which is the commit we compare our state to. It's fast, includes all the necessary information, and fully supports Markdown. What more could I ask?

## The Recipe

Naturally, you shouldn't blindly trust scripts downloaded from the Internet so let's go over what the script does. The full script can be seen below.

```bash
function changes -d "Generate a Markdown changelog from conventional commits" -a target

    # Use fallback variables if no arguments were given.
    if test (count $argv) -eq 0
        set target master
    end

    # Include commit message, author name, and the short hash in parentheses.
    set -l log_format "%s (_%aN_) (%h)"

    # Compare against HEAD (the latest commit).
    set -l source "HEAD"

    # Filter to commits that pass the conventional commit format.
    # See: https://www.conventionalcommits.org/
    set -l commit_filter "^[a-z]+(\([a-z]+\))?:\s.+"

    # Prefix each line with '- ' to render a Markdown list.
    set -l prefix '{print "- " $0}'

    # Write changelog header
    echo -e "## `$target`\n\n"
    echo -e "Write your release notes on this line.\n\n"

    # Fill and sort the actual changelog
    git log --oneline --pretty=format:$log_format $source...$target \
    | grep -E "$commit_filter" \
    | sort -k1 \
    | awk "$prefix"

end
```

The core of this tool is, naturally, `git-log` which is a powerful tool for finding out what's going on in your projects. Here we use it to print a compact one-liner log formatting each message with a custom pattern where:

-   `%s` is the commit title
-   `%aN` is the commit author's name respecting the `.mailmap` file if there's one
-   `%h` is the commit hash in a short format

The reason we include commit hash to our changelog is that GitHub and Gitlab will automatically link these hashes to their respective commit pages for viewing the entire diff. It's an extremely handy way to verify that a commit implements what it states.

Git can produce a log from a range of commits. Since branches and tags are pointers to a single commit we can specify those here. We compare from `HEAD` or the current state of clone to the given pointer to produce a list of recent changes.

Next, we pipe the log output to `grep` tool passing a regular expression filter which requires the commit title to pass the [_Conventional Commits_][cc] notation. You can modify this filter if you want but I like to keep it as is to enforce my team to use a shared commit template. If you are not familiar with Conventional Commits I highly recommend you read the aforementioned link and adopt it to your workflow.

Next, we want to group those commits so that each commit title prefix whether it's `feat`, `fix`, `docs`, or something else will stick together and `sort` is the solution for that. Finally, to fully leverage Markdown syntax we prefix each commit line with a dash using `awk`.

## Bonus: Export in Any Format

Now that we have the changelog in Markdown we can put it anywhere and in any format we want thanks to [Pandoc][pandoc]. To convert the changelog to eg. HTML pipe it like so (replace `html` to try out other formats):

```bash
changes v1.0.0 | pandoc -f markdown -t html
```

```html
<h2 id="v1.0.0"><code>v1.0.0</code></h2>

<p>Write your release notes on this line.</p>

<ul>
    <li>docs: add a security policy (<em>Niko Heikkilä</em>) (d02e70a)</li>
    <li>
        fix(security): upgrade Python packages (<em>Niko Heikkilä</em>)
        (bbb0861)
    </li>
    <li>
        fix(tests): replace parameter message with matches in pytest.raises (<em
            >Niko Heikkilä</em
        >) (9161cf9)
    </li>
    <li>release: 1.0.1 (<em>Niko Heikkilä</em>) (f9cdd53)</li>
</ul>
```

Next time you need to craft a new release for your project, try spicing it up with a great changelog. ✨🍰

[gist]: https://gist.github.com/nikoheikkila/96f734a5dffa7a9e6e32c33e8b2c7ddc
[cc]: https://www.conventionalcommits.org/
[pandoc]: https://pandoc.org/
