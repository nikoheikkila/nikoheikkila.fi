import React from 'react'
import slugify from '@sindresorhus/slugify'

import { randomColor, foregroundColor } from '../utils/colors'

interface Props {
  title: string
}

const Tag = ({ title }: Props) => {
  const innerText = slugify(title, { decamelize: false, separator: ' ' })
  const backgroundColor = randomColor()
  const color = foregroundColor(backgroundColor)

  const style = {
    display: 'inline-block',
    fontSize: '0.8em',
    fontWeight: 700,
    backgroundColor,
    color,
    padding: '4px 12px',
    margin: '0 8px 8px 0',
  }

  return <span style={style}>#{innerText}</span>
}

export default Tag
