import test from 'ava'
import { colorPalette, randomColor } from '../utils/colors'

test('should print a random color', async t => {
  t.true(colorPalette.includes(randomColor()))
})
