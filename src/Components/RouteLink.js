import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RouteLink extends Component {
  render () {
    return (
      <Link {...this.props} />
    )  
  }
}

export default RouteLink