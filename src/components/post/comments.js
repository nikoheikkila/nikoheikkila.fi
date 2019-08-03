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
