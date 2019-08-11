import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'

import Hero from './hero'
import Banner from './banner'
import Toggle from './toggle'
import Footer from './footer'
import Pages from './pages'
import { isIndex } from '../utils/helpers'

import '../styles/main.scss'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

const Layout = ({ title, cover, children }) => {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(window.__theme)
    window.__onThemeChange = () => {
      setTheme(window.__theme)
    }
  }, [])

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
        <Toggle
          icons={{
            checked: <img className="toggle-icon" src={moon} alt="checked" />,
            unchecked: <img className="toggle-icon" src={sun} alt="unchecked" />,
          }}
          checked={theme === 'dark'}
          onChange={e => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
        />
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
