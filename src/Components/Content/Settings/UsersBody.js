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
  }
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }
  render () {
    const {styles} = this.props.environment
    const {users} = this.props.settings
    return (
    <Block>
        {(users || []).map(user => (
          <Block key={user.userId} style={styles.userList}>
            <RouteLink to={`/settings/users/${user.userId}`}>{user.name}</RouteLink> &mdash; {user.role}
          </Block>
        ))}
    </Block>
    )  
  }
}
const UsersBody = connect(mapStateToProps)(UsersBodyComponent)

export default UsersBody