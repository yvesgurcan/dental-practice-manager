import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styles from './../Styles/styles'

class RouteLink extends Component {
  state = {linkStyle: styles.link}
  onHover = () => {
    this.setState({linkStyle: styles.linkHover})
  }
  restoreLinkStyle = () => {
    this.setState({linkStyle: styles.link})
  }
  render () {
    const {style} = this.props
    const {onHover, restoreLinkStyle} = this
    return (
      <Link {...this.props} onMouseEnter={onHover} onMouseLeave={restoreLinkStyle} style={{...style, ...this.state.linkStyle}} />
    )  
  }
}

export default RouteLink