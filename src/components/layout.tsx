import React from 'react'
import { stack as Menu } from 'react-burger-menu'

import Hero from './hero'
import Banner from './banner'
import Footer from './footer'
import Pages from './pages'
import ThemeToggle from './theme'
import { LayoutProps, PageProps } from '../types'
import { isIndex } from '../utils/helpers'
import '../styles/main.scss'

const Layout = ({ location, title, cover, children }: LayoutProps) => {
  const pages: PageProps = {
    links: [
    {
      slug: '/',
      title: 'Blog',
    },
    {
      slug: 'https://cv.nikoheikkila.fi',
      title: 'Skills'
    }
  ]
  }

  return (
    <div id="container">
      <Menu className="site-menu" pageWrapId="content" outerContainerId="container">
        <ThemeToggle />
        <Pages links={pages.links} />
      </Menu>
      <section id="content">
        <header>
          <section
            style={{
              maxWidth: isIndex(location) ? '720px' : '100%',
              margin: '0 auto',
            }}
          >
            {(cover && <Hero data={cover} alt={title} />) || <Banner />}
          </section>
        </header>
        <main>{children}</main>
        <Footer />
      </section>
    </div>
  )
}

export default Layout
