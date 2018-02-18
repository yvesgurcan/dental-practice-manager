import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import Block from './../Web/Block'
import UpdateUserForm from './../Forms/UpdateUserForm'

class UserBodyComponent extends Component {
  componentWillMount () {
    apiRequestHandler(
      'get',
      'settings',
      {},
      this.props.session,
      this.storeSettings,
    )
  }

  storeSettings = (response) => {
    this.props.dispatch({ type: 'STORE_SETTINGS', settings: {...response.settings} })
  }

  render () {
    return (
    <Block>
      <UpdateUserForm updateUserNameTitle={this.props.updateUserNameTitle} />
    </Block>
    )  
  }
}
const UserBody = connect(mapStateToProps)(UserBodyComponent)

export default UserBody