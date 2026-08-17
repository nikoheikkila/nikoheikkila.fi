---
title: Generating Alt Texts for Images with Claude
author: Niko Heikkilä
lang: en
excerpt: Plugin for writing screen-reader-friendly alt text for images. The one AI use case social platforms still won't automate.
type: post
date: 2026-08-17
hero: https://r2.nikoheikkila.fi/generating-alt-texts-for-images-with-claude.jpg
---

A longstanding grievance with several social media platforms has been how they promote the use of AI in content creation,
but for all the wrong use cases.

For instance, LinkedIn has become borderline unreadable with a constant stream of AI
content to such an extent that they now allow reporting individual posts and comments as AI slop.

Not all writing should be generated with AI, but some pieces of text can leverage the power in smart ways. Generating
screen-reader friendly descriptions for images is one notable use case.

## Why Helping Screen-Readers Matters

Yet, one of the more useful purposes for AI — predating large language models — is image recognition: the ability to
analyse and interpret images.

When you share images on social media, it's prudent to remember the blind and
low-vision users who possess no means of understanding your funny meme without a screen reader. For screen readers to
work, your image must be accompanied by so-called alt text, which in HTML is denoted with an `alt` attribute.

Platforms such as Bluesky and Mastodon helpfully allow you to warn yourself when attempting to post an image
without writing alt text. However, neither offers an easy way to generate one with the click of a button.[^1]

## Automation via a Plugin

To work around this limitation, I created a custom agent and a skill, and published them as a Claude plugin[^2].

For the time being, I have dumped it into my personal [GitHub repository](https://github.com/nikoheikkila/.agents) along with my TDD plugin.
Both Claude Code and Cowork can install the plugin from there, as any GitHub repository can act as a plugin marketplace.
See Claude's documentation on [installing plugins](https://claude.com/docs/cowork/guide/plugins) if you're not tech-savvy.

In Cowork, I can then drop or paste an image into the chat and prompt
`/alt-text-generator:generating-alt-text`, which returns the alt text ready to copy and paste into the social media post.

For command-line usage, I've created the following noninteractive Fish shell function[^3],
so I can run `alt-text /path/to/image.jpg` and receive the alt text in a few seconds.

```fish
function alt-text -a image -d "Generate alt text for a given image"
  if ! test -f "$image"
    echo "ERROR: $image must be a valid file"
    return 1
  end

  set -l base (dirname "$image")
  set -l filename (basename "$image")

  echo "Thinking about alt text for $image …"
  pushd "$base" || return 1
  claude --agent alt-text-generator -p "Generate alt text for @$filename"
  popd
end
```

The plugin performs quite well even with the model set to Sonnet 5 with low effort to minimise the token cost.
Sometimes, the answers miss a few aspects and details from the image, but especially for images containing a lot of text
such as comics, the time saved is significant.

However, bear in mind that while I have extensive experience in web development, I cannot walk around calling myself an
accessibility specialist and my criteria is to have _some_ alt text rather than nothing. The skill was largely generated
through discussions with Claude while I give it references to a few reputable sources on web accessibility.

If you're an accessibility specialist, you will undoubtedly spot room for improvement in the skill, so take it for a spin,
and do improve it freely.

[^1]:
    A pull request adding optional AI-generated alt text to Mastodon was
    [closed](https://github.com/mastodon/mastodon/pull/34244) because the maintainers don't want to delegate
    functionality to external LLMs. Third-party clients such as Ice Cubes, browser extensions for Bluesky, and fediverse
    bots such as [Altbot](https://github.com/micr0-dev/AltBot) can fill the gap instead, but I'd rather have them
    integrated in the apps themselves. Keep your jack, then!

[^2]:
    The plugin should be portable to other AI platforms with a few modifications. Let me know if you're interested in
    doing that.

[^3]:
    The directory change via `pushd` is necessary because `@` notation in the prompt resolve paths relative to the
    working directory. Thus, `@$filename` finds the image only while I'm in the correct directory.
