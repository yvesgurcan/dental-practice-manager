import React, { Component } from 'react'
import styles from './../../Styles/styles'

class Link extends Component {
  state = {linkStyle: styles.link}
  onHover = () => {
    this.setState({linkStyle: styles.linkHover})
  }
  restoreLinkStyle = () => {
    this.setState({linkStyle: styles.link})
  }
  render () {
    let {children, href, target, style} = this.props
    return (
      <a href={href} target={target} style={{...style, ...this.state.linkStyle}}>{children}</a>
    )  
  }
}

export default Link