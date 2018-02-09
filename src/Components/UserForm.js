import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../Utility/transformObjectIntoOptions'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import Textbox from './Web/Input/Textbox'
import Dropdown from './Web/Input/Dropdown'
import Feedback from './Feedback'
import styles from './../Styles/styles'

class UserFormComponent extends Component {
  storeUser = () => {

  }
  createUser = () => {

  }
  render () {
    let {userRoles} = this.props.environment
    const roleOptions = transformObjectIntoOptions(userRoles, {value: "type" , label: "title"})
    let {newUser} = this.props.support
    return (
      <Block style={styles.newUserForm}>
        <Label>Name</Label>
        <Block>
          <Textbox name="name" value={(newUser || {}).name} onChange={this.storeUser} onPressEnter={this.createUser} style={{width: "100%"}}  />
        </Block>
        <Label>Email</Label>
        <Block>
          <Textbox name="email" value={(newUser || {}).email} onChange={this.storeUser} onPressEnter={this.createUser} style={{width: "100%"}}  />
        </Block>
        <Label>Role</Label>
        <Block>
        <Dropdown name='role' value={(newUser || {}).role} placeholder='Select Role' options={roleOptions} onChange={this.storeUser} />
        </Block>
        <Button onClick={this.createUser}>Add User</Button>
      </Block>
    )  
  }
}
const UserForm = connect(mapStateToProps)(UserFormComponent)

export default UserForm