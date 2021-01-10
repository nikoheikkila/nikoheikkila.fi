---
lang: en
title: Squashing Software Defects with Eisenhower Matrix
author: Niko Heikkilä
type: post
cover: trello.jpg
date: 2017-12-05
excerpt: If only Trump would come up with something as genious.
categories:
  - Trello
  - Bugs
  - Eisenhower
---

Both in my work and personal life, I've used a plethora of project management tools but only Trello has stuck. However, even Trello can be useless unless you start taking care of your board systematically.

Trello's semi-agile default flow (_To Do_ → _Doing_ → _Done_) is easy, but especially for me, it comes with a clear risk of not starting the actual work on tasks. Happily (or sadly) the cards linger on my evergrowing _To Do_ list.

What I prefer to use instead, is a popular method commonly referred to as the [Eisenhower Matrix][2]. In brief, it consists of four categories (or lists in Trello). They are following:

1. **Do Now:** Do these next or as soon as possible.
2. **Decide:** You don't need to do these right now but do set a due date in the near future.
3. **Delegate:** Don't waste your brainpower on these, find out if someone else can help instead.
4. **Delete:** At times, even after the most careful research, you have to give up and reject a task either being too vague or irrelevant for the time being.

I'm also using an additional list called **Backlog** where I'm collecting all the ideas before deciding their place in the matrix. This list should be automated as far as possible with tools like _IFTTT_ and _Zapier_. For example, e-mails, tweets, SMS, notes and other material can easily be forwarded to the backlog with customized triggers.

Ideally, the current state of the matrix should be reviewed at the beginning of each week, but it's not too bothersome to check the status from your mobile app every now and then.

Now you might be thinking to yourself, how general this advice is. Well, it can be applied to a number of use cases. Take, for example, quality assurance in an open-source software project.

You would gather all the bug reports and issues from users automatically to your **Backlog**. Critical defects would be sent directly to list **Do Now**. Those needing further discussion would be in list **Decide**. Perhaps a 3rd party dependency introduced something unwanted in its latest release which you can't fix by yourself, that would go to list **Delegate**. Naturally, not all bug reports are born equal so discard user mistakes and such to list **Delete** with informative comments. This kind of approach will further benefit if your board is public (omitting security defects) so others can view and possibly collaborate on tasks.

Finally, to not make this sound like a $0.02 product advertisement, the matrix can be implemented in [many other apps][3], and even with a combination of a pen, some paper, and a cardboard box.

[1]: https://www.linkedin.com/in/nikoheikkila/
[2]: http://eisenhower-matrix.com/
[3]: https://support.todoist.com/hc/en-us/articles/210762449-Eisenhower-Matrix-with-Todoist
