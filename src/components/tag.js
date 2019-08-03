import React from 'react'
import PropTypes from 'prop-types'
import slugify from '@sindresorhus/slugify'

import { randomColor, foregroundColor } from '../utils/colors'

const Tag = ({ title }) => {
  const innerText = slugify(title, { decamelize: false, separator: ' ' })
  const backgroundColor = randomColor()
  const color = foregroundColor(backgroundColor)

  const style = {
    display: 'inline-block',
    fontWeight: 700,
    backgroundColor,
    color,
    padding: '0 6px',
    margin: '5px',
    borderRadius: '10%',
  }

  return <span style={style}>#{innerText}</span>
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Tag
