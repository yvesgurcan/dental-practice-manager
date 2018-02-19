import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import Block from './../Web/Block'
import RouteLink from './../RouteLink'

class SubNavItemComponent extends Component {
  onClick = (input) => {
    const { onClick } = this.props || {}
    this.props.dispatch({type: 'CLEAR_SUPPORT_VIEWS'})
    this.props.dispatch({type: 'CLEAR_SETTINGS_VIEWS'})
    if (onClick) {
      onClick(input)
    }
  }
  render () {
    const { styles } = this.props.environment || {}
    const { item } = this.props || {}
    if (!item || !item.url) {
      return null
    }
    return (
      <Block style={styles.subNavItem} onClick={this.onClick}>
        <RouteLink to={item.url}>{item.name}</RouteLink>
      </Block>
    )
  }
}

SubNavItemComponent.propTypes = {
  item: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

const SubNavItem = connect(mapStateToProps)(SubNavItemComponent)

export default SubNavItem