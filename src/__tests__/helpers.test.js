import test from 'ava'
import {formatReadingTime, isPage} from '../utils/helpers'

test('should humanize reading time', async t => {
    t.regex(formatReadingTime(30), /^(.+) 30 minutes read$/)
})

test('check if type is page', async t => {
    t.true(isPage('page'))
    t.false(isPage('post'))
})
