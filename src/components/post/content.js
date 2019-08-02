import React from 'react'
import PropTypes from 'prop-types'

const Article = ({ content, className }) => (
  <article
    className={className}
    dangerouslySetInnerHTML={{
      __html: content,
    }}
  />
)

Article.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Article.defaultProps = {
  className: 'post-html',
}

export default Article
