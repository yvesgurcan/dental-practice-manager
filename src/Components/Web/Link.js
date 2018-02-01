import React, { Component } from 'react'

class Link extends Component {
  render () {
    let {children, href, target, style} = this.props
    return (
      <a href={href} target={target} style={style}>{children}</a>
    )  
  }
}

export default Link