import React from 'react'
import profilePic from '../assets/profile.jpg'

class Bio extends React.Component {
  render() {
    return (
      <section className='bio'>
        <img src={profilePic} alt="Niko Heikkilä"/>

        <p>
          A blog by{' '}
          <a href="https://twitter.com/nikoheikkila" target="_blank" rel="noopener noreferrer me">Niko Heikkilä</a>{'. '}
          Powered by coffee, {' '}
          <a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer me">VS Code</a>, {' '}
          and {' '}
          <a href="https://gatsbyjs.org" target="_blank" rel="noopener noreferrer me">Gatsby</a>.
        </p>

      </section>
    )
  }
}

export default Bio
