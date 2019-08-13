import React from 'react'
import PropTypes from 'prop-types'
import useDarkMode from 'use-dark-mode'

import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

const ThemeToggle = ({ dark, classNameLight, classNameDark, storageKey }) => {
  const { toggle, value: enabled } = useDarkMode(dark, {
    classNameLight,
    classNameDark,
    storageKey,
  })

  const iconStyle = {
    backgroundColor: '#000000',
    position: 'absolute',
    top: 10,
    left: 0,
  }

  return (
    <section className="theme-toggle">
      <button type="button" onClick={toggle} aria-label="Switch between light and dark themes">
        <img style={iconStyle} src={enabled ? sun : moon} alt="Sun Icon" />
        <img style={iconStyle} src={enabled ? moon : sun} alt="Moon Icon" />
      </button>
    </section>
  )
}

ThemeToggle.defaultProps = {
  dark: false,
  classNameLight: 'light',
  classNameDark: 'dark',
  storageKey: 'darkMode',
}

ThemeToggle.propTypes = {
  dark: PropTypes.bool,
  classNameLight: PropTypes.string,
  classNameDark: PropTypes.string,
  storageKey: PropTypes.string,
}

export default ThemeToggle
