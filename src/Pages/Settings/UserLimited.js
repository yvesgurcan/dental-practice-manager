import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import PageWrapper from './../../Components/PageWrapper'
import UserBody from './../../Components/Bodies/UserBody'

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

    const sessionUser = this.props.session.user || {}
    const user = sessionUser
    if (user) {
      this.setState({temporaryTitle: user.name})
      this.props.dispatch({type: 'SELECT_UPDATE_USER', user})
    }
  }
  updateUserNameTitle = (name) => {
    this.setState({temporaryTitle: name})
  }
  render () {
    const {temporaryTitle} = this.state
    return (
      <PageWrapper pageTitle={temporaryTitle}>
        <UserBody updateUserNameTitle={this.updateUserNameTitle} limited />
      </PageWrapper>
    )  
  }
}
const User = connect(mapStateToProps)(UserComponent)

export default User