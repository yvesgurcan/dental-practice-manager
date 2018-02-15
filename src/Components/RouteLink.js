import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import { Link } from 'react-router-dom'

class RouteLinkComponent extends Component {
  state = {linkStyle: this.props.environment.styles.link}
  onHover = () => {
    const { styles } = this.props.environment
    this.setState({linkStyle: styles.linkHover})
  }
  restoreLinkStyle = () => {
    const { styles } = this.props.environment
    this.setState({linkStyle: styles.link})
  }
  render () {
    const {children, href, target, style, to} = this.props
    const {onHover, restoreLinkStyle} = this
    return (
      <Link to={to} children={children} href={href} target={target} onMouseEnter={onHover} onMouseLeave={restoreLinkStyle} style={{...style, ...this.state.linkStyle}} />
    )  
  }
}
const RouteLink = connect(mapStateToProps)(RouteLinkComponent)

export default RouteLink