import test from 'ava'
import { hex2dec, colorPalette, randomColor, foregroundColor } from '../utils/colors'

test('should print a random color', async t => {
  t.plan(1)
  t.true(colorPalette.includes(randomColor()))
})

test('should convert hex value to decimal', async t => {
  t.plan(16)
  const hexes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

  hexes.forEach((hex, i) => t.is(hex2dec(hex), numbers[i]))
})

test('should throw error on invalid hex value', async t => {
  t.plan(2)
  const error = t.throws(() => foregroundColor('123'), {instanceOf: TypeError})

  t.is(error.message, 'Invalid hex value 123')
})

test('should use light color on dark background', async t => {
  t.plan(5)
  const backgrounds = ['#070092', '#295330', '#820009', '#763507', '#00070a']

  backgrounds.forEach(background => {
    t.is(foregroundColor(background), '#FFFFFF')
  })
})

test('should use dark color on light background', async t => {
  t.plan(5)
  const backgrounds = ['#f5a7ba', '#b8bfe0', '#a1f98b', '#f4ff93', '#f7f7f7']

  backgrounds.forEach(background => {
    t.is(foregroundColor(background), '#000000')
  })
})
