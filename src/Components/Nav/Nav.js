import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import checkUserPermissions from './../../Utility/checkUserPermissions'
import Block from './../Web/Block'
import NavItem from './NavItem'

class NavComponent extends Component {
  signOut = () => {
    this.props.dispatch({type: "REMOVE_LOCALSTORAGE_CLIENT"})
    this.props.dispatch({type: "REMOVE_LOCALSTORAGE_USER"})
    this.props.dispatch({type: "REMOVE_LOCALSTORAGE_SUPPORTUSER"})
    this.props.dispatch({type: "HIDE_NAV"})
    this.props.dispatch({type: "SIGN_OUT"})
  }
  render () {
    let {environment, session} = this.props
    let {styles, routes} = environment
    let {user, supportUser} = session
    return (
      <Block style={styles.nav}>
        {supportUser && supportUser.supportUserId
          ?
            <NavItem item={{
              name: "Support",
              url: "/support",
            }} />
          : null
        }
        {user && user.userId
          ? 
            <NavItem item={{
              name: "Home",
              url: "/",
            }} />
          : null
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