import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'
import Link from './../Web/Link'
import RouteLink from './../RouteLink'

class NavItemComponent extends Component {
  onClick = (input) => {
    this.props.dispatch({type: "CLEAR_SUPPORT_VIEWS"})
    this.props.dispatch({type: "CLEAR_SETTINGS_VIEWS"})
    if (this.props.onClick) this.props.onClick(input)
  }
  render () {
    let { styles } = this.props.environment || {}
    let {item} = this.props || {}
    if (!item) {
      return null
    }
    return (
      <Block style={styles.navItem} onClick={this.onClick}>
        {item.url
            ? <RouteLink to={item.url} style={styles.navItemLink}>{item.name}</RouteLink>
            : <Link style={styles.navItemLink}>{item.name}</Link>
          }
      </Block>
    )
  }
}

NavItemComponent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
}

const NavItem = connect(mapStateToProps)(NavItemComponent)

export default NavItem