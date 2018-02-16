import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import apiRequestHandler from './../../../Utility/apiRequestHandler'
import Block from './../../../Components/Web/Block'
import RouteLink from './../../../Components/RouteLink'

class UsersBodyComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      "get",
      "users",
      {},
      this.props.session,
      this.storeUsers,
    )
    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
    )
  }
  
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    const {styles, userRoles} = this.props.environment
    const {users} = this.props.settings
    return (
    <Block>
        {(users || []).map(user => {
          const roleMatch = Object.keys(userRoles).map(key => userRoles[key]).filter(userRole => userRole.type === user.role)
          let role = ""
          if (roleMatch.length > 0) {
            role = roleMatch[0].title
          }
          return (
            <Block key={user.userId} style={styles.userList}>
            <RouteLink to={`/settings/users/${user.userId}`}>{user.name}</RouteLink> &mdash; {role}
          </Block>
          )
        })}
        <Block style={styles.userList}>
          <RouteLink to={`/settings/users/new`}>Add User</RouteLink>
        </Block>
    </Block>
    )  
  }
}
const UsersBody = connect(mapStateToProps)(UsersBodyComponent)

export default UsersBody