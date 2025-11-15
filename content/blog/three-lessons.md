---
lang: en
title: Three Lessons I’ve Learned as a Professional Web Developer
author: Niko Heikkilä
type: post
date: 2017-12-03
hero: https://nikoheikkila.ams3.cdn.digitaloceanspaces.com/Blog/three-lessons.jpg
excerpt: Do not fear PHP, explore tools, and watch your back with continuous integration.
---

Last month I had the pleasure of achieving my first full year as a professional web developer in a [Finnish company centered around online payments][1].

## #1 PHP Is Back With a Bang

Or depending on your point of view, still great. That is an acceptable answer too. I used to make some modest dynamic websites and customize WordPress blogs with PHP 5 and quickly saw myself growing tired of it. Languages like Python and Ruby felt a lot more sensible and fun to design websites with than old dog PHP. Luckily, that is not the case anymore.

In the university information system class my software engineering teacher – who happens to also be a professor – referred to PHP as a _toy language_ which nobody should use. I'm sure many of you have read at least one of those notorious blog posts warning about PHP being bad in everything but in `2017++` that is actually very far from the truth.

PHP of today comes with strict typing, great local development support with Vagrant and Docker, smarter syntax (never type `array()` again), and a ton of handy frameworks. Speaking of frameworks, use them. Seriously. Not only do frameworks like Laravel and Lumen enhance your application security, they also provide you with a huge array of helpers from database abstractions, authentication patterns and to – one of my favorites – templating engines. You'll still get funny comparisons like:

```php
echo 123 == '123lol' ? 'True' : 'False';
# Outputs True
```

But that will teach you to compare types besides values. Switch `==` to `===` above and see what happens.

All the goodness of frameworks also concerns CMS platforms like WordPress as well. For example, [Sage 9][2] is an upcoming major update to the popular WordPress starter theme that allows you to write your theme using Webpack, Blade templates and Bootstrap 4.

A matter of past are the days you had to edit your PHP files locally, then fire up an FTP client like FileZilla or WinSCP for transferring your code to a remote server, and finally hope that everything works. My personal PHP workflow consists of installing PHP locally via Homebrew package manager, setting up _nginx_, _MariaDB_, _Redis_, and other dependencies inside their own Docker containers that I've linked together with Docker Compose. I could as well install all of these in a virtual Vagrant box like _Homestead_ or _Scotch_ or let them live happily in macOS environment. However, this is the approach I'm most comfortable with and it gives enough freedom when moving between laptops.

In short, PHP gives you freedom while not sacrificing current best practices. It's fine not to like it, but only if you've understood the facts and not jumped on some random hater bandwagon.

## #2 Don't Be a Fool, Configure Your Tools

This is very an important topic which often gets overlooked. Setting up your environment is and should be more than downloading a basic text editor like Sublime Text and enabling syntax highlighting. If you're a Vim user you understand editor configuration like no one else does.

I'm in a lucky position where my manager actually allows and recommends us to educate ourselves and explore better workflows when there are no critical issues waiting on board. To that end, I've been consuming [Laracasts][3] videos about tooling which I recommend to everyone.

So, pick your weapon of choice, explore its features and limitations as long as it takes. Then set it up with your favorite UI scheme and install the necessary plugins. Do this before starting to write the first line of code to that groundbreaking new app you're working on.

I, not unlike many others, have switched from alternating between Vim and Atom to Visual Studio Code which already gives me integrated terminal, debugging, unit test runner, and some intelligent static analysis and code refactoring tools via extensions. For some of the more advanced tasks, I still use IntelliJ IDEA which currently has better PHP integration but I plan to start using VS Code as my only editor as soon as possible.

Despite Linus Torvalds badmouthing the use of debuggers I strongly advise using one – XDebug is good for PHP. Without a debugger, you'll place an additional cognitive load on your brain while trying to keep the flow of system in your mind. It is then very likely you get tired and start dumping the shit out of every variable in scope to your files until you find the poor sucker method returning `127` instead of `false`. With a debugger, you see the entire state of the application as it is until the breakpoint, and you can evaluate expressions inside that state. Not only does it save time but blocks needless fatigue as well.

As a last but not least important bit of advice; if someone likes Emacs do not try to religiously convert them to use Vim or vice versa. You look like you left your brain in the previous century. The culture around development tools is vastly rich and everyone has space for choosing their best equipment. Or would you start arguing with Gimli to switch their ax for a bow right before a horde of Uruk-hai is preparing for attack? I don't think you would.

## #3 Continuous Integration Guarantees Sweet Dreams

If you don't know what _continuous integration_ (CI) means it has been explained in detail in [this post][4].

We, like any decent software company, do code reviews as part of our development process. Without a stable CI, we would be drowning in regression bugs and would need to bug our colleagues if they have tested this or that and with what coverage.

In my primary project we have set the CI to first run code linting with PHP Code Sniffer and PHP Mess Detector (which are wonderful tools when configured right), run unit tests with coverage, and ultimately check if the coverage is 100 %. Any previous check returning non-zero exit code will fail the run and alert the developer through a notification. Lower than full coverage will also fail the run. If any of the checks have failed we do not approve the code review. At times it's a difficult way but it ensures the technical debt stays relatively short, code quality stays on acceptable levels, and new features will not break existing ones.

CI is also fairly easy to set up in Travis and in Gitlab with a couple of YAML blocks. If you work on a project with more than a handful of developers using CI is well worth it if not mandatory.

## Conclusion

2018 will see me developing these skills even further while adopting some new ones. Now I'm interested in hearing what were your special lessons from your first year?

[1]: https://www.paytrail.com/en
[2]: https://roots.io/sage/
[3]: https://laracasts.com/
[4]: https://dev.to/snwfdhmp/continuous-integration-like-im-five
