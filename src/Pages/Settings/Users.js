import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageWrapper from './../../Components/PageWrapper'
import Block from './../../Components/Web/Block'
import RouteLink from './../../Components/RouteLink'

class UsersComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      "get",
      "users",
      {clientId: 1},
      this.storeUsers,
    )
  }
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }
  render () {
    const {users} = this.props.settings
    return (
      <PageWrapper route='/settings/users' menuRoute='/settings'>
        {(users || []).map(user => (
          <Block>
            <RouteLink to={`/settings/users/${user.userId}`} key={user.userId}>{user.name}</RouteLink>
          </Block>
        ))}
      </PageWrapper>
    )  
  }
}
const Users = connect(mapStateToProps)(UsersComponent)

export default Users