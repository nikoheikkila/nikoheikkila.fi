---
lang: en
author: Niko Heikkilä
date: 2021-02-07
hero: https://r2.nikoheikkila.fi/my-21st-century-note-taking-workflow.jpg
title: My 21st Century Note-Taking Workflow
type: post
excerpt: A fully automated pipeline from raw ideas to text documents.
---

Taking notes is a serious business. While I'm not your typical person journaling everything they see or hear, I write a lot whether it be articles, documentation or code. All of those require an optimised workflow for capturing the ideas, refining them, and finally shaping them to actual distributable fruits of thought.

In the past, I've experimented with various note-taking techniques. I began scribbling into old good text files on a hard disk with **Notepad++** -- those were the days. It worked solidly, and I only resorted to switching my text editor between _Vim_, _Sublime Text_, _Atom_, and _VS Code_. However, soon, I came across the need to view my notes on the phone, and the bad experience of synchronising simple documents via Dropbox and Google Drive drove me to my current workflow, fortunately.

**Too long, didn't read?** In brief, I jot down thoughts onto a paper tablet, transfer them to Notion, proofread them in Grammarly, and save the resulting products as finely organised as text files.

## Capturing the Ideas

Whenever ideas worth keeping start to pour in, I grab my [**Remarkable 2**](https://remarkable.com/) paper tablet and retreat into a peaceful corner to capture them.

The handwriting experience with Remarkable is precisely like with paper, if not even better. The pen reacts to different angles and pressures like a real one, and you never have to worry about the dried ink or sharpening. I can use a collection of different pens (fine-liner, ballpoint, mechanical pencil, and calligraphy pen mostly) and the eraser without changing the physical tool in my hand. On the hindsight, I should have bought the more expensive Remarkable pen that has the eraser equipped on the opposite end. Opening the sidebar menu and switching between the eraser and the pen is not too cumbersome, though.

Within Remarkable's filesystem, I've created folders for all the significant projects, and mostly I'm using a standard notebook with horizontal lines for writing down thoughts. At this stage, everything is an unrefined, unfiltered downpour of my mental stream.

Remarkable is also an ideal device for reading and editing PDFs. I don't meddle much in the world of academic research. Thus I haven't used that particular feature much. Nevertheless, it shines in signing documents which for certain people still seems to be the way despite living in an era of digital signatures.

One of Remarkable's rare downsides is its export feature, which currently only allows me to email the text to myself. These emails also often end up in my spam folder if I'm using my work email, but let's blame Google for that. It would be useful to launch the desktop app, convert the handwritten text to digital, and copy it to my clipboard. Exporting drawings in PDF or PNG formats, however, works well enough when I need it.

After exporting the rough notes, it's time to start refining them digitally.

## Digital Refinement

[**Notion**](https://notion.so) is an excellent tool for carrying around a personal wiki. Be warned that it requires some level of organising your workspace, but nothing that I couldn't handle.

Inside my Notion workspace, I have multiple projects as individual pages. Within those pages, I have small _databases_ where each row represents a note. This makes it easy for me to find content, although usually, I resort to the _Quick Search_ feature (`Cmd/Ctrl + P`) to get around.

After pasting the rough notes from email to Notion, the process is as simple as converting bullet points to entire paragraphs, adding links, improving formatting. With this crucial step, I ensure the raw blob becomes closer to a readable document.

## Shaping the End Result

However, Notion is not the be all end all of my drafting process. From there, I copy and paste to [**Grammarly**](https://grammarly.com/) for proofreading.

I have a paid Grammarly subscription which not only corrects my mistakes but helpfully teaches me to write better sentences. It's a golden tool for everyone who is not a native English speaker. Even if you are, it gives you priceless tips for adjusting your writing and tone to different audiences. For critical documents, I should consult a human proofreader, but most of the time, simple automation works best.

Besides source code, the vast majority of my writing is either in documentation or articles. What is common with them is that everything is stored as Markdown files in version control. At this stage, I rarely edit the files anymore, but there are useful Markdown extensions for VS Code if the need arises.

I strongly advocate storing all meaningful descriptions, decisions, and instructions next to your source code for developers.

**Nik Begley** wrote a fantastic post titled [_Confluence Is Where Documentation Goes To Die_](https://dev.to/niklasbegley/confluence-is-where-documentation-goes-to-die-3ank). Storing your written content in an external **WYSIWYG** (_what you see is what you get_) system outside everyday workflows is a guaranteed cause of the content's premature death. That's why I don't store the final editions of my text in Notion, either. Instead, my blog articles are in my blog's repository and documentation next to the source code it's describing. This is the way.

## One Tool, One Responsibility

I'm fond of workflows where each tool has a single concrete responsibility. When it comes to my note-taking pipeline, **Remarkable**, **Notion**, **Grammarly**, and **VS Code** all have a distinct role where they shine and won't overlap each other.

Previously I tried coping with fewer tools which effectively bloated my workflow and decreased my productivity. For instance, [VS Code can perform a great many things](https://www.vscodecandothat.com/), but taking notes, drafting them to real text, and proofreading in the same application would strip me of the possibility to look at my work from different perspectives in different applications, which is more important than speed. Hats off to you who can coordinate your entire work inside one **Emacs** buffer, though.

Your workflow may vary. Now go and write great things.
