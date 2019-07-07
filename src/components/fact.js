import React from 'react'
import dayjs from 'dayjs'

class RandomFact extends React.Component {
  state = {
    fact: '',
    readMore: '',
  }

  date = null

  constructor(props) {
    super(props)

    this.date = dayjs()
  }

  async componentDidMount() {
    const newState = await this.getFact()
    this.setState(newState)
  }

  async getFact() {
    const url = `http://numbersapi.com/${this.date.month() + 1}/${this.date.date()}/date?json`
    const readMore = `https://en.wikipedia.org/wiki/${this.date.format('MMMM_D')}`

    let fact = 'No facts for today. Come back tomorrow!'

    try {
      const response = await fetch(url)
      const json = await response.json()
      const { found, text } = json

      fact = found ? text : fact
    } catch (err) {
      console.error(err)
    }

    return {
      fact,
      readMore,
    }
  }

  render() {
    const { fact, readMore } = this.state

    return (
      <article className="cat-fact">
        <blockquote>
          <p>
            <em>{fact}</em>
          </p>{' '}
          <p>
            <a href={readMore} target="_blank" rel="noopener noreferrer">
              (more facts)
            </a>
          </p>
        </blockquote>
      </article>
    )
  }
}

export default RandomFact
