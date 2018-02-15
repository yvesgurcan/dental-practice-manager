import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import RouteLink from './RouteLink'

class SubNavItemComponent extends Component {
  render () {
    const { styles } = this.props.environment
    let {item, onClick} = this.props
    return (
      <Block style={styles.subNavItem} onClick={onClick}>
        <RouteLink to={item.url}>{item.name}</RouteLink>
      </Block>
    )
  }
}
const SubNavItem = connect(mapStateToProps)(SubNavItemComponent)

export default SubNavItem