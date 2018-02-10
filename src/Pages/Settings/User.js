import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageWrapper from './../../Components/PageWrapper'
import UserBody from './../../Components/Content/Settings/UserBody'

class UserComponent extends Component {
  state = {temporaryTitle: "User"}
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
    const {users} = this.props.settings
    if (!users) {
      apiRequestHandler(
        'get',
        'users',
        {},
        this.props.session,
        this.storeUsers,
      )
    }
    else {
      this.fetchSelectedUser()
    }
  }
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
    this.fetchSelectedUser(response.users)
  }
  fetchSelectedUser = (userList) => {
    let {users} = this.props.settings || {}
    if (userList) {
      users = [...userList]
    }

    const {userId} = this.props.match.params
    const userMatch = (users || []).filter(user => user.userId === Number(userId))
    const user = userMatch.length > 0 ? userMatch[0] : null
    this.setState({temporaryTitle: undefined})
    if (user) {
      this.props.dispatch({type: 'SELECT_UPDATE_USER', user})
    }
  }
  render () {
    const {updateUser} = this.props.settings
    const {temporaryTitle} = this.state
    return (
      <PageWrapper pageTitle={temporaryTitle || (updateUser || {}).name} menuRoute='/settings'>
        <UserBody />
      </PageWrapper>
    )  
  }
}
const User = connect(mapStateToProps)(UserComponent)

export default User