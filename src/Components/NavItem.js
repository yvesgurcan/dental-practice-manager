import React, { Component } from 'react'
import Block from './Web/Block'
import Link from './Web/Link'
import styles from './../Styles/styles'

class NavItem extends Component {
  render () {
    let {item} = this.props
    return (
      <Block style={styles.navItem}>
        <Link href={item.url} style={styles.navItemLink}>{item.name}</Link>
      </Block>
    )
  }
}

export default NavItem