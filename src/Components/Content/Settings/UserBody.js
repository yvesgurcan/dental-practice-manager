import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../../Store/mapStateToProps'
// import apiRequestHandler from './../../../Utility/apiRequestHandler'
import Block from './../../../Components/Web/Block'
import UpdateUserForm from './../../../Components/UpdateUserForm'

class UserBodyComponent extends Component {
  render () {
    return (
    <Block>
      <UpdateUserForm />
    </Block>
    )  
  }
}
const UserBody = connect(mapStateToProps)(UserBodyComponent)

export default UserBody