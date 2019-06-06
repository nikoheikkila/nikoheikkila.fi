import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import RandomFact from '../components/fact'

export default class NotFoundPage extends React.Component {

render() {
    const { location } = this.props

    return (
      <Layout location={location} title="404 Not Found">
        <SEO title="404: Not found" />
        <h1>🤖 You have erred, but it is human</h1>

        <div className='gatsby-highlight' data-language='js'>
          <code className="language-js">
            REASON: ERR_CONTENT_NOT_FOUND
          </code>
        </div>

        <p>
          Alas, the content you so humbly requested is nowhere to be found.
          Why not celebrate this day with the following random fact instead?
        </p>

        <RandomFact />

      </Layout>
    )
  }
}
