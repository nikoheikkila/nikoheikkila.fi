import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default class NotFoundPage extends React.Component {

  render() {
    const { location } = this.props

    return (
      <Layout location={location} title="404 Not Found">
        <SEO title="404: Not found" />
        <h1>🤖 You have erred, but it is human</h1>
        <p>
          <code>
            REASON: ERR_ROBOT_UPRISING_FAILED
          </code>
        </p>
        <p>
          Alas, the content you so humbly requested is nowhere to be found.
        </p>
        <p>
          <a href="/">↪️ Go back to homepage</a>.
        </p>
      </Layout>
    )
  }
}
