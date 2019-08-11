import React from 'react'
import useDarkMode from 'use-dark-mode'

import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

const ThemeToggle = () => {
  const { toggle, value: enabled } = useDarkMode(false, {
    classNameLight: 'light',
    classNameDark: 'dark',
    storageKey: 'darkMode',
  })

  return (
    <section className="theme-toggle">
      <button type="button" onClick={toggle} aria-label="Switch between light and dark themes">
        <img src={enabled ? moon : sun} alt="Theme Icon" />
      </button>
    </section>
  )
}

export default ThemeToggle
