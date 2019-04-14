import React from 'react'
import { Link } from 'gatsby'
import banner from '../assets/banner.jpg'
import Toggle from './toggle'

import '../styles/main.scss'
import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

class Layout extends React.Component {
  state = {
    theme: null,
  }

  componentDidMount() {
    this.setState({ theme: window.__theme });
    window.__onThemeChange = () => {
      this.setState({ theme: window.__theme });
    };
  }

  render() {
    const { title, children } = this.props
    const { theme } = this.state

    const header = (
      <section className="banner">
        <Link  to="/">
          <img src={banner} alt={title} />
        </Link>
        <Toggle
          icons={{
            checked: (
              <img
                src={moon}
                width="16"
                height="16"
                alt="checked"
                style={{ pointerEvents: 'none' }}
              />
            ),
            unchecked: (
              <img
                src={sun}
                width="16"
                height="16"
                alt="unchecked"
                style={{ pointerEvents: 'none' }}
              />
            ),
          }}
          checked={theme === 'dark'}
          onChange={e =>
            window.__setPreferredTheme(
              e.target.checked ? 'dark' : 'light'
            )
          }
        />
      </section>
    )

    return (
      <div className="content">
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
