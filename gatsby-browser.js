/* eslint no-console: 0 */
let preferredTheme = null

window.__onThemeChange = function() {}

const resetDisQus = () => {
  if (typeof window.DISQUS === 'object') {
    window.DISQUS.reset({
      reload: true,
    })
  }
}

const setTheme = newTheme => {
  window.__theme = newTheme
  preferredTheme = newTheme
  document.body.className = newTheme
  window.__onThemeChange(newTheme)
  resetDisQus()
}

try {
  preferredTheme = localStorage.getItem('theme')
} catch (err) {
  console.error(`Unable to get stored theme. ${err}`)
}

window.__setPreferredTheme = newTheme => {
  setTheme(newTheme)

  try {
    localStorage.setItem('theme', newTheme)
  } catch (err) {
    console.error(`Unable to save theme to storage. ${err}`)
  }
}

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

darkQuery.addListener(e => window.__setPreferredTheme(e.matches ? 'dark' : 'light'))
setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'))
