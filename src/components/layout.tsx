import React from 'react'
import { stack as Menu } from 'react-burger-menu'
import Hero from './hero'
import Footer from './footer'
import ThemeToggle from './theme'
import { LayoutProps, ContentLink } from '../types'
import { isIndex } from '../utils/helpers'
import '../styles/main.scss'
import ExternalLink from './elements'
import { Link } from 'gatsby'
import { getStaticPages } from '../graphql/pages'

const SidebarLink: React.FunctionComponent<ContentLink> = ({ slug, title }) => {
  if (slug.startsWith('/')) {
    return (
      <Link key={slug} to={slug}>
        {title}
      </Link>
    )
  }

  return (
    <ExternalLink key={slug} to={slug}>
      {title}
    </ExternalLink>
  )
}

const Layout: React.FunctionComponent<LayoutProps> = ({ location, title, cover, children }) => {
  const links = [
    {
      slug: '/',
      title: 'Blog',
    },
    {
      slug: 'https://cv.nikoheikkila.fi',
      title: 'Skills'
    }
  ]

  const staticPages = getStaticPages()
  const allPages = [...links, ...staticPages].map(({ slug, title }) => (
    <SidebarLink slug={slug} title={title} />
  ))

  return (
    <div id="container">
      <Menu className="site-menu" pageWrapId="content" outerContainerId="container">
        <ThemeToggle />
        {allPages}
      </Menu>
      <section id="content">
        <header>
          <section
            style={{
              maxWidth: isIndex(location) ? '720px' : '100%',
              margin: '0 auto',
            }}
          >
            {(cover && <Hero data={cover} alt={title} />)}
          </section>
        </header>
        <main>{children}</main>
        <Footer />
      </section>
    </div>
  )
}

export default Layout
