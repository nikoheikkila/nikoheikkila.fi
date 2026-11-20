---
title: Generating Alt Texts for Images with Claude
author: Niko Heikkilä
lang: en
excerpt: Generate screen-reader-friendly alt text for images with a Claude plugin, the one AI use case social platforms still won't automate.
type: post
date: 2026-08-17
hero: https://r2.nikoheikkila.fi/generating-alt-texts-for-images-with-claude.jpg
---

My longstanding grievance with several social media platforms is how they promote the use of AI in content creation,
but for all the wrong use cases.

For instance, LinkedIn has become borderline unreadable with a constant stream of AI
content to such an extent that it has started rolling out an option to report individual posts and comments as AI slop.

Not all writing should be generated with AI, but some pieces of text can leverage the power in smart ways. Generating
screen-reader-friendly alt text for images is one notable use case.

## Why Alt Text Matters for Screen Readers

One of the more useful purposes for AI is image recognition: the ability to analyse and interpret images. It predates
large language models.

When you share images on social media, remember the blind and low-vision users who cannot understand your funny meme
without a screen reader. For screen readers to work, your image must be accompanied by so-called alt text, which in HTML
is denoted with an `alt` attribute.

Platforms such as Bluesky and Mastodon can helpfully warn you when you try to post an image without alt text. However,
neither offers an easy way to generate a description with the click of a button; Mastodon's web app can only extract the
text in an image.[^1]

## Generating Alt Text with a Claude Plugin

To work around this limitation, I created a custom agent and a skill, and published them as a Claude plugin[^2].

Any GitHub repository with a `.claude-plugin/marketplace.json` file can act as a plugin marketplace, so for now I have
dumped the plugin into my personal [GitHub repository](https://github.com/nikoheikkila/.agents) along with my agentic-cd
plugin. Both Claude Code and Cowork can install it from there. See Claude's documentation on
[installing plugins](https://claude.com/docs/cowork/guide/plugins) if you need help.

In Cowork, I can then drop or paste an image into the chat and prompt
`/alt-text-generator:generating-alt-text`, which returns the alt text ready to copy and paste into the social media post.

## Generating Alt Text from the Command Line

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

The plugin performs quite well even with the model set to Sonnet 5 on low effort, which keeps the token cost down.
Sometimes, the answers miss a few aspects and details from the image, but especially for images containing a lot of text
such as comics, the time saved is significant.

However, bear in mind that while I have extensive experience in web development, I'm no accessibility specialist. My
criterion is to have _some_ alt text rather than nothing. The skill was largely generated through discussions with
Claude while I gave it references to a few reputable sources on web accessibility.

If you're an accessibility specialist, you will likely spot room for improvement in the skill. Take it for a spin and
improve it freely.

[^1]: A pull request adding optional AI-generated alt text to Mastodon was [closed](https://github.com/mastodon/mastodon/pull/34244) because the maintainers don't want to delegate functionality to external LLMs. Third-party clients such as Ice Cubes, browser extensions for Bluesky, and fediverse bots such as [Altbot](https://github.com/micr0-dev/AltBot) can fill the gap instead, but I'd rather have them integrated in the apps themselves. Keep your jack, then!

[^2]: The plugin should be portable to other AI platforms with a few modifications. Let me know if you're interested in doing that.

[^3]: The directory change via `pushd` keeps the image inside Claude's working directory, so the headless run can read it without a permission prompt.
