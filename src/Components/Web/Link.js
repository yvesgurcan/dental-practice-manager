import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'

class LinkComponent extends Component {
  state = {linkStyle: this.props.environment.styles.link}
  onHover = () => {
    const {styles} = this.props.environment
    this.setState({linkStyle: styles.linkHover})
  }
  restoreLinkStyle = () => {
    const {styles} = this.props.environment
    this.setState({linkStyle: styles.link})
  }
  render () {
    const {children, href, target, style, onClick} = this.props
    const {onHover, restoreLinkStyle} = this
    return (
      <a href={href} target={target} onMouseEnter={onHover} onMouseLeave={restoreLinkStyle} onClick={onClick} style={{...style, ...this.state.linkStyle}}>{children}</a>
    )  
  }
}
const Link = connect(mapStateToProps)(LinkComponent)

export default Link