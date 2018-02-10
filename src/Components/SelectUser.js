import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformArrayIntoOptions from './../Utility/transformArrayIntoOptions'
import Block from './Web/Block'
import FormGroup from './Web/Input/FormGroup'

class SelectUserComponent extends Component {
  componentWillMount () {
    const {client} = this.props.session || {}
    if (client) {
      apiRequestHandler(
        'get',
        'users',
        {},
        this.props.session,
        this.storeUsers,
      )
    }

  }
  storeUsers = (response) => {
    this.props.dispatch({ type: 'STORE_USERS', users: [ ...response.users ] })
    this.props.dispatch({ type: 'USERS_LOADED'})
  }
  selectUser = (user) => {
    this.props.dispatch({ type: 'SELECT_USER', user: { ...user.object } })
    this.props.dispatch({ type: "SET_LOCALSTORAGE_USER", user: { ...user.object } })
  }
  render () {
    const {client} = this.props.session || {}
    if (!client || !client.clientId) {
      return null
    }
    const {loadingUsers} = this.props.support || {}
    const {users} = this.props.settings || {}
    const {user} = this.props.session || {}
    const userOptions = transformArrayIntoOptions(users, {value: "userId", label: "name"})
    return (
      <FormGroup
        label="User"
        name="user"
        value={(user || {}).userId}
        placeholder='Select User'
        options={userOptions}
        onChange={this.selectUser}
        feedback={loadingUsers || !users || users.length > 0 ? null : {status: 'warning', message: 'No user were found for this client.'}}
      />
    )  
  }
}
const SelectUser = connect(mapStateToProps)(SelectUserComponent)

export default SelectUser