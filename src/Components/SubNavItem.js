import React, { Component } from 'react'
import Block from './Web/Block'
import Link from './Web/Link'
import RouteLink from './RouteLink'
import styles from './../Styles/styles'

class SubNavItem extends Component {
  state = {linkStyle: styles.navItemLink}
  onHover = () => {
    this.setState({linkStyle: styles.navItemLinkHover})
  }
  restoreLinkStyle = () => {
    this.setState({linkStyle: styles.navItemLink})
  }
  render () {
    let {item, onClick} = this.props
    return (
      <Block style={styles.subNavItem} onClick={onClick} onMouseEnter={this.onHover} onMouseLeave={this.restoreLinkStyle}>
        <RouteLink to={item.url} style={this.state.linkStyle}>{item.name}</RouteLink>
      </Block>
    )
  }
}

export default SubNavItem