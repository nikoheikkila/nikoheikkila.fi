import React from 'react'
import useDarkMode from 'use-dark-mode'
import Toggle from './toggle'

import sun from '../assets/sun.png'
import moon from '../assets/moon.png'

const ThemeToggle = () => {
  const darkMode = useDarkMode(false, {
    classNameLight: 'light',
    classNameDark: 'dark',
    storageKey: 'darkMode',
  })

  return (
    <Toggle
      icons={{
        checked: <img className="toggle-icon" src={moon} alt="checked" />,
        unchecked: <img className="toggle-icon" src={sun} alt="unchecked" />,
      }}
      checked={darkMode.value}
      onChange={darkMode.toggle}
    />
  )
}

export default ThemeToggle
