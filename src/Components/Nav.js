import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import checkUserPermissions from './../Utility/checkUserPermissions'
import Block from './Web/Block'
import HorizontalRuler from './Web/HorizontalRuler'
import NavItem from './NavItem'

class NavComponent extends Component {
  render () {
    let {environment, session} = this.props
    let {routes} = environment
    let {user} = session
    return (
      <Block>
        {
          checkUserPermissions(routes, user).map(route => <NavItem key={routes[route].url} item={routes[route]} />)
        }
        <HorizontalRuler/>
      </Block>
    )
  }
}
const Nav = connect(mapStateToProps)(NavComponent)

export default Nav