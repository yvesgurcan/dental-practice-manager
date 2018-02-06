import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import checkUserPermissions from './../Utility/checkUserPermissions'
import styles from './../Styles/styles'
import Block from './Web/Block'
import NavItem from './NavItem'

class NavComponent extends Component {
  signOut = () => {
    this.props.dispatch({type: "SIGN_OUT"})
  }
  render () {
    let {environment, session} = this.props
    let {routes} = environment
    let {user, supportUser} = session
    return (
      <Block style={styles.nav}>
        {supportUser
          ?
            <NavItem item={{
              name: "Support",
              url: "/",
            }} />
          :
            <NavItem item={{
              name: "Home",
              url: "/",
            }} />
        }
        {
          checkUserPermissions(routes, user).map(route => <NavItem key={routes[route].url} item={routes[route]} />)
        }
        <NavItem onClick={this.signOut} item={{ name: "Sign Out" }} />
      </Block>
    )
  }
}
const Nav = connect(mapStateToProps)(NavComponent)

export default Nav