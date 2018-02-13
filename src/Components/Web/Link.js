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
    const {children, href, target, style} = this.props
    const {onHover, restoreLinkStyle} = this
    return (
      <a href={href} target={target} onMouseEnter={onHover} onMouseLeave={restoreLinkStyle} style={{...style, ...this.state.linkStyle}}>{children}</a>
    )  
  }
}

export default Link