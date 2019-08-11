import React from 'react'
import PropTypes from 'prop-types'

const HTML = ({ htmlAttributes, headComponents, bodyAttributes, preBodyComponents, body, postBodyComponents }) => (
  <html {...htmlAttributes} lang="en">
    <React.StrictMode>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
        {postBodyComponents}
      </body>
    </React.StrictMode>
  </html>
)

HTML.defaultProps = {
  body: '<div></div>',
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object.isRequired,
  headComponents: PropTypes.arrayOf(PropTypes.node).isRequired,
  bodyAttributes: PropTypes.object.isRequired,
  preBodyComponents: PropTypes.arrayOf(PropTypes.node).isRequired,
  body: PropTypes.string,
  postBodyComponents: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default HTML
