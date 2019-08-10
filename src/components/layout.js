import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { slide as Menu } from 'react-burger-menu'
import _ from 'lodash'

import Hero from './hero'
import Banner from './banner'
import Toggle from './toggle'
import Footer from './footer'
import Pages from './pages'

import '../styles/main.scss'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

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

  getPreviousPage() {
    const {
      location: { state },
    } = this.props

    if (!state || !_.has(state, 'previous')) {
      return '/'
    }

    return state.previous
  }

  isIndex() {
    /**
     * Index page is either the home page or any page with path `/n`
     * where `n` is a natural number > 0.
     */

    const {
      location: { pathname },
    } = this.props

    return /^\/[0-9]*$/.test(pathname)
  }

  render() {
    const { title, children, cover } = this.props
    const { theme } = this.state

    const headerStyle = {
      maxWidth: this.isIndex() ? '720px' : '100%',
      margin: '0 auto',
    }

    const header = (
      <section style={headerStyle}>
        {(cover && <Hero data={cover} alt={title} />) || <Banner />}
        {this.isIndex() || (
          <Link to={this.getPreviousPage()} style={{ fontSize: '0.8em' }}>
            ← Back to posts
          </Link>
        )}
      </section>
    )

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
  location: PropTypes.object,
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  cover: PropTypes.object,
}

export default Layout
