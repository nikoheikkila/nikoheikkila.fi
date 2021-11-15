---
lang: en
title: Static Site Rendering Conquer All
author: Niko Heikkilä
type: post
date: 2019-04-19
hero: https://f001.backblazeb2.com/file/nikoheikkila-fi/Blog/static-site-rendering-conquer-all.png
excerpt: Goodbye WordPress, it has been quite a journey.
categories:
    - WordPress
    - Gatsby
    - Now
---

Recently I began migrating my blog from an old - but not vulnerable - WordPress installation to [_Gatsby_][gatsby]. The migration went well save a brief downtime due to DNS misconfigurations. Now, the result lies in before your very eyes. Let's talk about changes later, though.

## Why Migrate From WordPress

I've been a long-time advocate of WordPress due to how easy publishing a site using it has been. Since a phenomenon referred to as _static site generators_ began surfacing a few years ago with [_Jekyll_][jekyll] on the front I began to think of migrating. At the start of 2019, I decided to go for it. I was tired of looking after WordPress updates when there was an inviting alternative not to.

I've built a couple of sites with Jekyll back in the day although I never felt too comfortable in that environment. This was most likely due to how heavy the build process is and how I usually develop nothing else with Ruby. There were also other strong contenders like [_VuePress_][vuepress], [_Hugo_][hugo], and [_Jigsaw_][jigsaw] to name but a few. For one reason or another they didn't win me over.

Gatsby, on the other hand, is built with JavaScript and powered by _React_. React, being [the cool kid on the block][community] with some admirable competition from Vue.js, provides a nice way of building reusable HTML elements with a _do-not-repeat-yourself_ (DRY) mindset. These are called components and you can leverage them for building your site. Combine this with the immense amount of plugins and great documentation provided by Gatsby and we have a clear winner in a race of being the best static site generator as of 2019.

Example snippet below shows a custom component renderer outputting a link to Google Translate page should I choose to publish a post not written in English. Don't be afraid of the JSX syntax. It's quite comfortable after getting used to.

```js
 render() {
    const { lang, url } = this.props
    return (
        <section className="language-info">
            <p>
                This post was written in {this.getLanguage(lang)}.
                You can access the machine translated version{' '}
                <OutboundLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </OutboundLink>.
            </p>
        </section>
    )
}
```

See how components can include other components like `<OutboundLink>` in this case. This makes composition of user interfaces a breeze.

Building your blog with Gatsby has many remarkable advantages over traditional dynamic web applications:

-   Your blog becomes a single page app (SPA) meaning the site feels like a unified page despite hundreds of posts spread across separate URLs.
-   All the content lives within your repository. You'll never have to worry about data loss again unless you're drunken and decide to delete your remote repository along with all the local clones of it - in which case your Internet license should be revoked indefinitely.
-   Markdown is the purest, most beautiful form of writing which I use to document my work every day. The important part is that you don't have to mess with WordPress HTML blocks or the new Gutenberg editor.
-   Build process minifies and bundles your assets for minimum footprint.
-   Deployment can be automated with a Continuous Integration pipeline or with [ZEIT Now][zeit] serverless service (no pun intended) like I did.
-   Your blog becomes _blazing fast_ because the content is plain old HTML with some CSS and Javascript assets ideally served via CDN network.

The inevitable trade-off of storing all the content in version control is that you have to edit raw text files and push them to a remote repository for anything to happen. This is very acceptable since I and many other developers are most comfortable with editing text in a code editor.

For other content creators, a publishing frontend is required. That's another topic where Gatsby shines: there is a great number of source plugins to fetch from package registry. This means you could, for instance, use [Netlify CMS][cms] or even pull the content from a headless [WordPress installation][wpcms].

## What Has Changed

I left my old site's styles pretty intact but did little tweaks here and there. Gatsby templates usually ship with a so-called _CSS-in-JS_ approach where you declare your styles by passing a `style` attribute (object) to a React component. As a fan of separating presentation from logic, I preferred compiling styles from SCSS with Webpack instead.

Most notable customization is the fabled **Dark Mode**. Go and click the toggle button with sun and moon icons behind the _hamburger menu_, then leave the site, and come back. You will be welcomed again with a nice darker theme easier for the eyes and it gets saved to your browser's local storage. Kudos for this feature goes to [**Dan Abramov's** blog][overreacted] where I ported the functionality from.

Another new addition is the post footer featuring links to Twitter discussions and GitHub edits. Since this blog is now fully open-sourced from back to front each post can be edited by readers. All it takes is to click a link, fork the repository, and submit a pull request. Contributions are welcome for other things than posts as well. I must admit not being the most proficient front-end developer, therefore any fixes regarding UI or UX are greatly appreciated.

As for the backend system, each check-in to this repository will launch a Travis CI pipeline running `eslint` linter for JavaScript code and a set of accessibility tests with `pa11y`. There is also a possibility of writing unit tests for your React components but it involved so much [mocking][mock] I started to feel ill quite fast. Pipelines are run on macOS and Linux platforms in parallel which might be excess use of resources for some but at least I can be confident my code works both on my Windows 10 WSL box and Macbook.

## Conclusion

I shall proceed with committing small updates and posting new content to this blog. Be sure to bookmark this site and star the [GitHub repository][github] if you fancy.

[jekyll]: https://jekyllrb.com
[vuepress]: https://vuepress.vuejs.org
[hugo]: https://gohugo.io
[jigsaw]: https://jigsaw.tighten.co
[gatsby]: https://gatsbyjs.org
[community]: https://dev.to/search?q=gatsby
[zeit]: https://zeit.co/dashboard
[cms]: https://www.gatsbyjs.org/docs/sourcing-from-netlify-cms
[wpcms]: https://www.gatsbyjs.org/packages/gatsby-source-wordpress/?=wordpress
[overreacted]: https://overreacted.io/
[mock]: https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a
[github]: https://github.com/nikoheikkila/nikoheikkila.fi
