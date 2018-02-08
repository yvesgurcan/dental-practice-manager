import React, { Component } from 'react'
import Block from './Web/Block'
import Link from './Web/Link'
import RouteLink from './RouteLink'
import styles from './../Styles/styles'

class NavItem extends Component {
  render () {
    let {item, onClick} = this.props
    return (
      <Block style={styles.navItem} onClick={onClick} onMouseEnter={this.onHover} onMouseLeave={this.restoreLinkStyle}>
        {item.url
            ? <RouteLink to={item.url} style={styles.navItemLink}>{item.name}</RouteLink>
            : <Link href={item.url} style={styles.navItemLink}>{item.name}</Link>
          }
      </Block>
    )
  }
}

export default NavItem