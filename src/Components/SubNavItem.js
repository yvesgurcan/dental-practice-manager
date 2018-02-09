import React, { Component } from 'react'
import Block from './Web/Block'
import RouteLink from './RouteLink'
import styles from './../Styles/styles'

class SubNavItem extends Component {
  render () {
    let {item, onClick} = this.props
    return (
      <Block style={styles.subNavItem} onClick={onClick}>
        <RouteLink to={item.url}>{item.name}</RouteLink>
      </Block>
    )
  }
}

export default SubNavItem