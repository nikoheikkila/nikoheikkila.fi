import React, { Component } from 'react'
import Img from 'gatsby-image'

export default class Hero extends Component {
    render() {
        const { data, alt = 'Cover Image' } = this.props

        const NormalizedImage = props => {
            let normalizedProps = props
            if (
                props.fluid
                && props.fluid.presentationWidth
                && props.fluid.presentationHeight) {
                normalizedProps = {
                    ...props,
                    style: {
                        ...(props.style || {}),
                        maxWidth: props.fluid.presentationWidth,
                        maxHeight: props.fluid.presentationHeight,
                        margin: '0 auto',
                    },
                }
            }

            return <Img {...normalizedProps} />
        }

        return (
            <NormalizedImage fluid={data} alt={alt} />
        )
    }
}
