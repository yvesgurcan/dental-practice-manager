import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class RouteLink extends Component {
  render () {
    let {children, href, target, style} = this.props
    return (
      <Link {...this.props} />
    )  
  }
}

export default RouteLink