import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../Utility/transformObjectIntoOptions'
import Block from './Web/Block'
import Button from './Web/Button'
import SecondaryButton from './Web/SecondaryButton'
import FormGroup from './Web/Input/FormGroup'
import Feedback from './Feedback'

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

    this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})
    
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
        this.handleUpdateUserResponse
      )  
    }

  }
  handleUpdateUserResponse = (response) => {
    if (response.feedback.status === "success") {
      const {updateUser} = this.props.settings || {}
      this.props.dispatch({type: "UPDATE_USER", updateUser: {...response.updateUser}})
      this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})
      this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
      this.props.updateUserNameTitle(updateUser.name)
      apiRequestHandler(
        "get",
        "users",
        {},
        this.props.session,
        this.storeUsers,
      )
    }
    else {
      this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})
      this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})
    }
  }
  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }
  sendForgotPasswordEmail = () => {
    const {updateUser} = this.props.settings || {}

    this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})

    if (!updateUser.name) {
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

    if (!updateUser.role) {
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

    if (!updateUser.email) {
      this.props.dispatch({
        type: "UPDATE_USER_FEEDBACK",
        feedback: {
          email: {
            message: "Please enter the email of the user.",
            status: "validationError",
          },
        },
      })
      return false
    }

    apiRequestHandler(
      "post",
      "accountRecovery",
      {email: updateUser.email},
      {},
      this.handleAccountRecoveryResponse
    )
  }
  handleAccountRecoveryResponse = (response) => {
    this.props.dispatch({
      type: "UPDATE_USER_FEEDBACK",
      feedback: {
        form: {...response.feedback},
      },
    })
  }
  render () {
    const {userId} = this.props.routeData.params
    const {updateUser, updateUserFeedback} = this.props.settings || {}
    const { styles, userRoles } = this.props.environment || {}
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
            feedback={(updateUserFeedback || {}).email}
          />
          <FormGroup
            label="Role"
            name="role"
            value={(updateUser || {}).role}
            placeholder='Select Role'
            options={roleOptions}
            onChange={this.storeUser}
            feedback={(updateUserFeedback || {}).role}
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
          <Feedback feedback={(updateUserFeedback || {}).form} />
          <Button onClick={this.updateUser}>Update User</Button>
          <SecondaryButton onClick={this.sendForgotPasswordEmail}>Reset Password</SecondaryButton>
        </Block>
      </Block>
    )
  }
}
const UpdateUserForm = connect(mapStateToProps)(UpdateUserFormComponent)

export default UpdateUserForm