import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../Utility/transformObjectIntoOptions'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import SectionHeader from './Web/SectionHeader'
import Textbox from './Web/Input/Textbox'
import Dropdown from './Web/Input/Dropdown'
import Checkbox from './Web/Input/Checkbox'
import Feedback from './Feedback'
import styles from './../Styles/styles'

class NewUserFormComponent extends Component {
  storeUser = (input) => {
    this.props.dispatch({type: "STORE_NEW_USER", ...input})
  }
  toggleSendEmailToNewUser = () => {
    const {sendEmailToNewUser} = this.state || {}
    this.setState({sendEmailToNewUser: !sendEmailToNewUser})
  }
  createUser = () => {
    const {newUser} = this.props.support
    if (!newUser) {
      this.props.dispatch({
        type: "NEW_USER_FEEDBACK",
        feedback: {
          form: {
            message: "Please enter the name, email, and role of the user.",
            status: "validationError",
          },
        },
      })
      return false
    }

    let validationError = false

    this.props.dispatch({type: "CLEAR_NEW_USER_FEEDBACK"})
    if (!newUser.name) {
      validationError = true
      this.props.dispatch({
        type: "NEW_USER_FEEDBACK",
        feedback: {
          name: {
            message: "Please enter the name of the user.",
            status: "validationError",
          },
        },
      })
    }

    if (!newUser.email) {
      validationError = true
      this.props.dispatch({
        type: "NEW_USER_FEEDBACK",
        feedback: {
          email: {
            message: "Please enter the email of the user.",
            status: "validationError",
          },
        },
      })
    }

    if (!newUser.role) {
      validationError = true
      this.props.dispatch({
        type: "NEW_USER_FEEDBACK",
        feedback: {
          role: {
            message: "Please select the role of the user.",
            status: "validationError",
          },
        },
      })
    }
    
    if (!validationError) {
      const {sendEmailToNewUser} = this.state || {}
      apiRequestHandler(
        "post",
        "users",
        {newUser, sendEmailToNewUser: sendEmailToNewUser || false},
        this.props.session,
        this.handleNewUserResponse
      )  
    }

  }
  handleNewUserResponse = (response) => {
    if (response.feedback.status === "success") {
      this.props.dispatch({type: "ADD_USER", newUser: {...response.newUser}})
      this.props.dispatch({type: "CLEAR_NEW_USER_FORM", newUser: {...response.newUser}})
      this.props.dispatch({type: "NEW_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
    else {
      this.props.dispatch({type: "CLEAR_NEW_USER_FEEDBACK"})
      this.props.dispatch({type: "NEW_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
  }
  render () {
    const {client} = this.props.session
    if (!client || !client.clientId) {
      return null
    }
    const {userRoles} = this.props.environment || {}
    const roleOptions = transformObjectIntoOptions(userRoles, {value: "type" , label: "title"})
    const {newUser, newUserFeedback} = this.props.support || {}
    const {sendEmailToNewUser} = this.state || {}
    return (
      <Block style={styles.newUserForm}>
        <SectionHeader>New User</SectionHeader>
        <Block>
          <Label>Name</Label>
          <Block>
            <Textbox name="name" value={(newUser || {}).name} onChange={this.storeUser} onPressEnter={this.createUser} style={{width: "100%"}}  />
          </Block>
          <Feedback feedback={(newUserFeedback || {}).name} />
          <Label>Email</Label>
          <Block>
            <Textbox name="email" value={(newUser || {}).email} onChange={this.storeUser} onPressEnter={this.createUser} style={{width: "100%"}}  />
          </Block>
          <Feedback feedback={(newUserFeedback || {}).email} />
          <Label>Role</Label>
          <Block>
          <Dropdown name='role' value={(newUser || {}).role} placeholder='Select Role' options={roleOptions} onChange={this.storeUser} />
          </Block>
          <Feedback feedback={(newUserFeedback || {}).role} />
          <Block>
            <Checkbox name="sendEmailToNewUser" value={sendEmailToNewUser} onChange={this.toggleSendEmailToNewUser}>Send welcome email with password instructions.</Checkbox>
          </Block>
          <Feedback feedback={(newUserFeedback || {}).form} />
          <Button onClick={this.createUser}>Add User</Button>
        </Block>
      </Block>
    )
  }
}
const NewUserForm = connect(mapStateToProps)(NewUserFormComponent)

export default NewUserForm