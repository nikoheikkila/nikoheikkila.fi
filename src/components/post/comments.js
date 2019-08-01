import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Disqus } from 'gatsby-plugin-disqus'

export default class Comments extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    identifier: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    const { url, identifier, title } = props

    this.config = {
      url,
      identifier,
      title,
    }
  }

  render() {
    return (
      <section id="comments">
        <Disqus config={this.config} />
      </section>
    )
  }
}
