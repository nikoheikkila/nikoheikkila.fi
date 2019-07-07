import React from 'react'
import PropTypes from 'prop-types'
import slugify from '@sindresorhus/slugify'

import { randomColor } from '../utils/colors'

const Tag = ({ title }) => {
  const innerText = slugify(title, { decamelize: false, separator: ' ' })
  const style = {
    display: 'inline-block',
    fontWeight: 400,
    backgroundColor: randomColor(),
    color: '#FFFFFF',
    padding: '0 4px',
    margin: '3px',
  }

  return <span style={style}>#{innerText}</span>
}

Tag.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Tag
