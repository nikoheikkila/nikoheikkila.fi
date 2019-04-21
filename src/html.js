import React from 'react';
import PropTypes from 'prop-types';

export default class HTML extends React.Component {
    render() {

        const {
            htmlAttributes,
            headComponents,
            bodyAttributes,
            preBodyComponents,
            body,
            postBodyComponents
        } = this.props

        return (
            <html {...htmlAttributes} lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    {headComponents}
                </head>
                <body {...bodyAttributes} className="light">
                    {preBodyComponents}
                    <div
                        key="body"
                        id="___gatsby"
                        dangerouslySetInnerHTML={{ __html: body }}
                    />
                    {postBodyComponents}
                </body>
            </html>
        );
    }
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
};
