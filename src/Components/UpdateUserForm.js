import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../Utility/transformObjectIntoOptions'
import Block from './Web/Block'
import Button from './Web/Button'
import SectionHeader from './Web/SectionHeader'
import FormGroup from './Web/Input/FormGroup'
import Feedback from './Feedback'
import styles from './../Styles/styles'

class UpdateUserFormComponent extends Component {
  storeUser = (input) => {
    this.props.dispatch({type: "STORE_USER", ...input})
  }
  toggleSendEmailToNewUser = () => {
    const {sendEmailToNewUser} = this.state || {}
    this.setState({sendEmailToNewUser: !sendEmailToNewUser})
  }
  updateUser = () => {
    const {updateUser} = this.props.settings || {}
    if (!updateUser) {
      this.props.dispatch({
        type: "UPDATE_USER_FEEDBACK",
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

    this.props.dispatch({type: "CLEAR_UPDATE_USER_FORM"})
    if (!updateUser.name) {
      validationError = true
      this.props.dispatch({
        type: "UPDATE_USER_FEEDBACK",
        feedback: {
          name: {
            message: "Please enter the name of the user.",
            status: "validationError",
          },
        },
      })
    }

    if (!updateUser.email) {
      validationError = true
      this.props.dispatch({
        type: "UPDATE_USER_FEEDBACK",
        feedback: {
          email: {
            message: "Please enter the email of the user.",
            status: "validationError",
          },
        },
      })
    }

    if (!updateUser.role) {
      validationError = true
      this.props.dispatch({
        type: "UPDATE_USER_FEEDBACK",
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
        "put",
        "users",
        {updateUser, sendEmailToNewUser: sendEmailToNewUser || false},
        this.props.session,
        this.handleNewUserResponse
      )  
    }

  }
  handleNewUserResponse = (response) => {
    if (response.feedback.status === "success") {
      this.props.dispatch({type: "UPDATE_USER", updateUser: {...response.updateUser}})
      this.props.dispatch({type: "CLEAR_UPDATE_USER_FORM", updateUser: {...response.updateUser}})
      this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
    else {
      this.props.dispatch({type: "CLEAR_UPDATE_USER_FORM"})
      this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
  }
  render () {
    this.props.match
    const {userId} = this.props.routeData.params
    const {updateUser, updateUserFeedback} = this.props.settings || {}
    const {userRoles} = this.props.environment || {}
    const roleOptions = transformObjectIntoOptions(userRoles, {value: "type" , label: "title"})
    const {sendEmailToNewUser} = this.state || {}
    return (
      <Block style={styles.formWrapper}>
        <Block>
          <FormGroup
            label="Name"
            name="name"
            value={(updateUser || {}).name}
            onChange={this.storeUser}
            onPressEnter={this.updateUser}
            feedback={(updateUserFeedback || {}).name}
          />
          <FormGroup
            label="Email"
            name="email"
            value={(updateUser || {}).email}
            onChange={this.storeUser}
            onPressEnter={this.updateUser}
            feedback={(updateUserFeedback || {}).name}
          />
          <FormGroup
            label="Role"
            name="role"
            value={(updateUser || {}).role}
            placeholder='Select Role'
            options={roleOptions}
            onChange={this.storeUser}
            feedback={(updateUserFeedback || {}).name}
          />
          {userId === "add" || userId === "new"
            ?
            <FormGroup
              checkbox
              label="Send welcome email with password instructions."
              name="sendEmailToNewUser"
              value={sendEmailToNewUser}
              onChange={this.toggleSendEmailToNewUser}
            />
            :
            null
          }
        </Block>
      </Block>
    )
  }
}
const UpdateUserForm = connect(mapStateToProps)(UpdateUserFormComponent)

export default UpdateUserForm