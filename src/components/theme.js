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

  return (
    <section className="theme-toggle">
      <button type="button" onClick={toggle} aria-label="Switch between light and dark themes">
        <img src={enabled ? moon : sun} alt="Theme Icon" />
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
