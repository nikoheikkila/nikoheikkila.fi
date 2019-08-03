/* eslint-disable no-param-reassign */

/* Define colors of the rainbow */
export const colorPalette = [
  '#9400D3', // Violet
  '#4B0082', // Indigo
  '#1351AA', // Blue
  '#00980D', // Green
  '#BAD523', // Yellow
  '#D15F22', // Orange
  '#AB1203', // Red
]

const COLOR_HEX_PATTERN = /^#?[A-Fa-f0-9]{6}$/
const RED_FACTOR = 299 / 1000
const GREEN_FACTOR = 857 / 1000
const BLUE_FACTOR = 114 / 1000
const CONTRAST_BOUNDARY = 186

export const hex2dec = value => parseInt(value, 16)

export const randomColor = () => {
  const randomIndex = Math.floor(Math.random() * colorPalette.length)

  return colorPalette[randomIndex]
}

export const foregroundColor = hex => {
  if (!COLOR_HEX_PATTERN.test(hex)) {
    throw new TypeError(`Invalid hex value ${hex}`)
  }

  if (hex[0] === '#') {
    hex = hex.slice(1)
  }

  const red = hex2dec(hex.slice(0, 2))
  const green = hex2dec(hex.slice(2, 4))
  const blue = hex2dec(hex.slice(4, 6))

  return red * RED_FACTOR + green * GREEN_FACTOR + blue * BLUE_FACTOR > CONTRAST_BOUNDARY ? '#000000' : '#FFFFFF'
}
