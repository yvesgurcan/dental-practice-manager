import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
import apiRequestHandler from './../../../Utility/apiRequestHandler'
import Block from './../../../Components/Web/Block'
import Text from './../../../Components/Web/Text'
import Label from './../../../Components/Web/Label'

class AccountBodyComponent extends Component {
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
    const { users, maxUsers } = this.props.settings || {}
    return (
    <Block>
      <Label>Users:</Label>
      {" "}
      <Text>{(users || []).length}/{maxUsers || 0}</Text>
    </Block>
    )  
  }
}
const AccountBody = connect(mapStateToProps)(AccountBodyComponent)

export default AccountBody