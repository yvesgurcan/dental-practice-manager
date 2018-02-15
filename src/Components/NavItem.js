import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import Link from './Web/Link'
import RouteLink from './RouteLink'

class NavItemComponent extends Component {
  onClick = (input) => {
    this.props.dispatch({type: "CLEAR_SUPPORT_PAGE"})
    if (this.props.onClick) this.props.onClick(input)
  }
  render () {
    let { styles } = this.props.environment
    let {item} = this.props
    return (
      <Block style={styles.navItem} onClick={this.onClick}>
        {item.url
            ? <RouteLink to={item.url} style={styles.navItemLink}>{item.name}</RouteLink>
            : <Link href={item.url} style={styles.navItemLink}>{item.name}</Link>
          }
      </Block>
    )
  }
}
const NavItem = connect(mapStateToProps)(NavItemComponent)

export default NavItem