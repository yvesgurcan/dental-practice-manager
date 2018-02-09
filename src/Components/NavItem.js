import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import Block from './Web/Block'
import Link from './Web/Link'
import RouteLink from './RouteLink'
import styles from './../Styles/styles'

class NavItemComponent extends Component {
  onClick = (input) => {
    this.props.dispatch({type: "CLEAR_SUPPORT_PAGE"})
    if (this.props.onClick) this.props.onClick(input)
  }
  render () {
    let {item} = this.props
    return (
      <Block style={styles.navItem} onClick={this.onClick} onMouseEnter={this.onHover} onMouseLeave={this.restoreLinkStyle}>
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