import React from 'react'
import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'

import Hero from './hero'
import Banner from './banner'
import Toggle from './toggle'
import Footer from './footer'
import Pages from './pages'

import '../styles/main.scss'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'
import { isIndex } from '../utils/helpers'

class Layout extends React.Component {
  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme })
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme })
    }
  }

  render() {
    const { title, children, cover } = this.props
    const { theme } = this.state

    const headerStyle = {
      maxWidth: isIndex() ? '720px' : '100%',
      margin: '0 auto',
    }

    const header = <section style={headerStyle}>{(cover && <Hero data={cover} alt={title} />) || <Banner />}</section>

    const toggle = (
      <Toggle
        icons={{
          checked: <img className="toggle-icon" src={moon} alt="checked" />,
          unchecked: <img className="toggle-icon" src={sun} alt="unchecked" />,
        }}
        checked={theme === 'dark'}
        onChange={e => window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')}
      />
    )

    const links = [
      {
        slug: '/',
        title: 'Blog',
      },
    ]

    const sideMenu = (
      <Menu className="site-menu" pageWrapId="content" outerContainerId="container">
        <Pages links={links} />
        {toggle}
      </Menu>
    )

    return (
      <div id="container">
        {sideMenu}
        <section id="content">
          <header>{header}</header>
          <main>{children}</main>
          <Footer />
        </section>
      </div>
    )
  }
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
