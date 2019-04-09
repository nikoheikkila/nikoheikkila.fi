import React from 'react'
import { Link } from 'gatsby'
import banner from '../assets/banner.jpg'
import { rhythm } from '../utils/typography'

import '../styles/main.scss'

class Layout extends React.Component {
  render() {
    const { title, children } = this.props

    const header = (
      <section>
        <Link style={{ boxShadow: `none` }} to="/">
          <img src={banner} alt={title} />
        </Link>
      </section>
    )

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
