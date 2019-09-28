import _ from 'lodash'

interface ILocation {
  pathname: string
  state: {
    previous: string
  }
}

export const formatReadingTime = (minutes: number): string => {
  const cups: number = Math.round(minutes / 5)
  const time: string = minutes < 2 ? 'minute' : 'minutes'

  if (cups > 5) {
    return `${new Array(Math.round(cups / Math.E)).fill('🍱').join('')} ${minutes} ${time} read`
  }

  return `${new Array(cups || 1).fill('☕️').join('')} ${minutes} ${time} read`
}

/**
 * Index page is either the home page or any page with path `/n`
 * where `n` is a natural number > 0.
 */
export const isIndex = ({ pathname }: ILocation) => /^\/[0-9]*$/.test(pathname)

export const getPreviousPage = ({ state }: ILocation): string => {
  if (!_.has(state, 'previous')) {
    return '/'
  }

  return state.previous
}
