import React, { Component } from 'react'
import Block from './Web/Block'
import Link from './Web/Link'
import RouteLink from './RouteLink'
import styles from './../Styles/styles'

class NavItem extends Component {
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
      <Block style={styles.navItem} onClick={onClick} onMouseEnter={this.onHover} onMouseLeave={this.restoreLinkStyle}>
        {item.url
            ? <RouteLink to={item.url} style={this.state.linkStyle}>{item.name}</RouteLink>
            : <Link href={item.url} style={this.state.linkStyle}>{item.name}</Link>
          }
      </Block>
    )
  }
}

export default NavItem