import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from '../Web/Block'
import RoleSetupForm from '../Forms/RoleSetupForm'

class SettingsBodyComponent extends Component {
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
    return (
      <Block>
        <RoleSetupForm />
      </Block>
    )  
  }
}
const SettingsBody = connect(mapStateToProps)(SettingsBodyComponent)

export default SettingsBody