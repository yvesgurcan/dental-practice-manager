import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageHeader extends Component {
  render () {
    return (
      <h1 {...this.props}/>
    )  
  }
}

PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
}

export default PageHeader