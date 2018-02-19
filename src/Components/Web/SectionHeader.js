import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SectionHeader extends Component {
  render () {
    return (
      <h2 {...this.props}/>
    )  
  }
}

SectionHeader.propTypes = {
  children: PropTypes.any.isRequired,
}

export default SectionHeader