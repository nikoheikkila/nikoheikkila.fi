/*
 * Copyright (c) 2015 instructure-react
 * Forked from https://github.com/aaronshaf/react-toggle/
 * + applied https://github.com/aaronshaf/react-toggle/pull/90
 * */

import React, { PureComponent } from 'react'
import '../styles/toggle.scss'

// Copyright 2015-present Drifty Co.
// http://drifty.com/
// from: https://github.com/driftyco/ionic/blob/master/src/util/dom.ts

const pointerCoord = event => {
  // get coordinates for either a mouse click
  // or a touch depending on the given event
  if (event) {
    const { changedTouches } = event

    if (changedTouches && changedTouches.length > 0) {
      const touch = changedTouches[0]
      return { x: touch.clientX, y: touch.clientY }
    }

    const { pageX } = event

    if (pageX !== undefined) {
      return { x: pageX, y: event.pageY }
    }
  }

  return { x: 0, y: 0 }
}

export default class Toggle extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchCancel = this.handleTouchCancel.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.previouslyChecked = !!(props.checked || props.defaultChecked)
    this.state = {
      checked: !!(props.checked || props.defaultChecked),
      hasFocus: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('checked' in nextProps) {
      this.setState({ checked: !!nextProps.checked })
      this.previouslyChecked = !!nextProps.checked
    }
  }

  getIcon(type) {
    const { icons } = this.props
    if (!icons) {
      return null
    }
    return icons[type] === undefined ? Toggle.defaultProps.icons[type] : icons[type]
  }

  handleClick(event) {
    const checkbox = this.input
    this.previouslyChecked = checkbox.checked
    if (event.target !== checkbox && !this.moved) {
      event.preventDefault()
      checkbox.focus()
      checkbox.click()
      return
    }

    this.setState({ checked: checkbox.checked })
  }

  handleTouchStart(event) {
    const { hasFocus } = this.state
    this.startX = pointerCoord(event).x
    this.touchStarted = true
    this.hadFocusAtTouchStart = hasFocus
    this.setState({ hasFocus: true })
  }

  handleTouchMove(event) {
    if (!this.touchStarted) return
    this.touchMoved = true

    const { checked } = this.state

    if (this.startX != null) {
      const currentX = pointerCoord(event).x
      if (checked && currentX + 15 < this.startX) {
        this.setState({ checked: false })
        this.startX = currentX
      } else if (!checked && currentX - 15 > this.startX) {
        this.setState({ checked: true })
        this.startX = currentX
      }
    }
  }

  handleTouchEnd(event) {
    if (!this.touchMoved) return
    const checkbox = this.input
    event.preventDefault()

    const { checked } = this.state

    if (this.startX != null) {
      if (this.previouslyChecked !== checked) {
        checkbox.click()
      }

      this.touchStarted = false
      this.startX = null
      this.touchMoved = false
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false })
    }
  }

  handleTouchCancel() {
    if (this.startX != null) {
      this.touchStarted = false
      this.startX = null
      this.touchMoved = false
    }

    if (!this.hadFocusAtTouchStart) {
      this.setState({ hasFocus: false })
    }
  }

  handleFocus(event) {
    const { onFocus } = this.props

    if (onFocus) {
      onFocus(event)
    }

    this.hadFocusAtTouchStart = true
    this.setState({ hasFocus: true })
  }

  handleBlur(event) {
    const { onBlur } = this.props

    if (onBlur) {
      onBlur(event)
    }

    this.hadFocusAtTouchStart = false
    this.setState({ hasFocus: false })
  }

  render() {
    const { className, disabled, ...inputProps } = this.props
    const { checked, hasFocus } = this.state
    const classes = `react-toggle${checked ? ' react-toggle--checked' : ''}${hasFocus ? ' react-toggle--focus' : ''}${
      disabled ? ' react-toggle--disabled' : ''
    }${className ? ` ${className}` : ''}`

    return (
      <div
        id="theme-switcher"
        role="button"
        tabIndex="0"
        className={classes}
        onClick={this.handleClick}
        onKeyPress={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        onTouchCancel={this.handleTouchCancel}
      >
        <div className="react-toggle-track">
          <div className="react-toggle-track-check">{this.getIcon('checked')}</div>
          <div className="react-toggle-track-x">{this.getIcon('unchecked')}</div>
        </div>
        <div className="react-toggle-thumb" />

        <input
          {...inputProps}
          ref={ref => {
            this.input = ref
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          className="react-toggle-screenreader-only"
          type="checkbox"
          aria-label="Switch between Dark and Light mode"
        />
      </div>
    )
  }
}
