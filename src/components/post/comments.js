/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DiscussionEmbed } from 'disqus-react'

const defaultShortName = 'nikoheikkilafi'

export default class Comments extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  state = {}

  constructor(props) {
    super(props)

    const { url, identifier, title } = props

    this.state = {
      config: {
        url,
        identifier,
        title,
      },
    }

    /**
     * Reload Disqus when DOM changes.
     * TODO: CSS style won't be reapplied on reset and needs to be resolved.
     */
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(mutations => {
        mutations.filter(this.classDidChange).forEach(() =>
          window.DISQUS.reset({
            reload: true,
          })
        )
      })
    }
  }

  componentDidMount() {
    this.observer.observe(document.body, {
      attributes: true,
      childList: false,
      subtree: false,
    })
  }

  componentDidUnMount() {
    this.observer.disconnect()
  }

  classDidChange({ type, attributeName }) {
    return type === 'attributes' && attributeName === 'class'
  }

  render() {
    const shortName = process.env.GATSBY_DISQUS_SHORTNAME || defaultShortName
    const { config } = this.state

    return (
      <section id="comments">
        <DiscussionEmbed shortname={shortName} config={config} />
      </section>
    )
  }
}
