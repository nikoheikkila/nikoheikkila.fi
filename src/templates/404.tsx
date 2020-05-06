import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Page } from '../../src/types'

const NotFound = ({ location }: Page) => {
  const title = 'Page Not Found'

  return (
    <Layout location={location} title={title}>
      <SEO title={title} />
      <h1>🤖 You have erred, but it is human</h1>

      <p>
        <code className="language-js">REASON: ERR_CONTENT_NOT_FOUND</code>
      </p>

      <p>Alas, the content you so humbly requested is nowhere to be found.</p>
      <p>
        Go back to <Link to="/">home</Link> instead?
      </p>
    </Layout>
  )
}

export default NotFound
