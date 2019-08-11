import React from 'react'
import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'

import Hero from './hero'
import Banner from './banner'
import Footer from './footer'
import Pages from './pages'
import ThemeToggle from './theme'

import { isIndex } from '../utils/helpers'
import '../styles/main.scss'

const Layout = ({ title, cover, children }) => {
  const links = [
    {
      slug: '/',
      title: 'Blog',
    },
  ]

  return (
    <div id="container">
      <Menu className="site-menu" pageWrapId="content" outerContainerId="container">
        <Pages links={links} />
        <ThemeToggle />
      </Menu>
      <section id="content">
        <header>
          <section
            style={{
              maxWidth: isIndex() ? '720px' : '100%',
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

Layout.defaultProps = {
  cover: null,
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  cover: PropTypes.object,
}

export default Layout
