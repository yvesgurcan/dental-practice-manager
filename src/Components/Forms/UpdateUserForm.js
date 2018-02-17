import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import apiRequestHandler from './../../Utility/apiRequestHandler'
import transformObjectIntoOptions from './../../Utility/transformObjectIntoOptions'
import Block from './../Web/Block'
import Button from './../Web/Button'
import SecondaryButton from './../Web/SecondaryButton'
import CancelButton from './../Web/CancelButton'
import DangerButton from './../Web/DangerButton'
import FormGroup from './../Web/Input/FormGroup'
import Feedback from './../Feedback'

class UpdateUserFormComponent extends Component {
  state = {cancelButtonLabel: this.props.environment.cancelButton.doneLabel}

  storeUser = (input) => {
    this.setState({ cancelButtonLabel: undefined })
    this.setState({ validationError: false })
    this.props.dispatch({type: 'STORE_USER', ...input})
  }

  cancel = () => {
    this.setState({redirect: true})
  }

  toggleSendEmailToNewUser = () => {
    const {sendEmailToNewUser} = this.state || {}
    this.setState({sendEmailToNewUser: !sendEmailToNewUser})
  }

  validateForm = (forgotPasswordRequest) => {
    const { updateUser } = this.props.settings || {}
    if (!updateUser) {
      this.props.dispatch({
        type: 'UPDATE_USER_FEEDBACK',
        feedback: {
          form: {
            message: 'Please enter the name, email, and role of the user.',
            status: 'validationError',
          },
        },
      })
      return { interrupt: true }
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
      if (forgotPasswordRequest) {
        return { interrupt: true }
      }

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

    if (this.isUniqueDentist(true).error) {
      validationError = true
    }

    this.setState({validationError: validationError})
    return { validationError }

  }

  isUniqueDentist = (validateUpdate) => {
    const {updateUser, users} = this.props.settings || {}
    let validationError = false
    let message = ''
    let message2 = ''

    if (!users || !updateUser) {
      return {error: false, feedback: '', feedback2: ''}
    }

    const originalUser = (users).filter(user => updateUser.userId === user.userId)

    if (originalUser.length > 0) {
      const {userRoles} = this.props.environment || {}

      if (originalUser[0].role === userRoles.dentist.type && (!validateUpdate || updateUser.role !== userRoles.dentist.type)) {
        const otherDentists = users.filter(user => user.userId !== updateUser.userId && user.role === userRoles.dentist.type)

        if (otherDentists.length === 0) {
          validationError = true
          message = `You can not change the role of this user. At least one user must be a ${userRoles.dentist.title}.`
          message2 = `You can not delete this user. At least one user must be a ${userRoles.dentist.title}.`

          if (validateUpdate) {
            this.props.dispatch({
              type: "UPDATE_USER_FEEDBACK",
              feedback: {
                role: {
                  message: message,
                  status: "validationError",
                },
              },
            })
          }

        }

      }

    }
    return {error: validationError, feedback: message, feedback2: message2}
  }

  updateUser = () => {

    const validationResults = this.validateForm()
    if (validationResults.interrupt) {
      return false
    }
    
    if (!validationResults.validationError) {
      const { sendEmailToNewUser } = this.state || {}
      const { updateUser } = this.props.settings || {}
      const { userId } = this.props.routeData.params

      if (isNaN(userId)) {
        apiRequestHandler(
          "post",
          "users",
          {newUser: updateUser, sendEmailToNewUser: sendEmailToNewUser || false},
          this.props.session,
          this.handleUpdateUserResponse
        )
        return false
      }

      apiRequestHandler(
        "put",
        "users",
        {updateUser},
        this.props.session,
        this.handleUpdateUserResponse
      ) 
    }

  }

  handleUpdateUserResponse = (response) => {
    this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})
    this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})

    if (response.feedback.status === "success") {
      const { updateUser } = this.props.settings || {}
      const { cancelButton } = this.props.environment || {}
      this.setState({cancelButtonLabel: cancelButton.doneLabel})

      const {userId} = this.props.routeData.params
      if (isNaN(userId)) {
        this.props.dispatch({type: 'CLEAR_SETTINGS_VIEWS'})
        this.setState({redirect: true})
        return false
      }

      this.props.updateUserNameTitle(updateUser.name)
      apiRequestHandler(
        "get",
        "users",
        {},
        this.props.session,
        this.storeUsers,
      )

    }

  }

  storeUsers = (response) => {
    this.props.dispatch({type: 'STORE_USERS', users: response.users})
  }

  sendForgotPasswordEmail = () => {

    const validationResults = this.validateForm(true)
    if (validationResults.interrupt) {
      return false
    }

    const {updateUser} = this.props.settings || {}
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

  deleteUser = () => {
    const {updateUser, users} = this.props.settings || {}
    let validationError = false

    this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})

    const originalUser = (users).filter(user => updateUser.userId === user.userId)

    if (originalUser.length === 0) {
      return false
    }

    if (this.isUniqueDentist(true).error) {
      validationError = true
    }

    if (!validationError) {
      apiRequestHandler(
        "delete",
        "users",
        {deleteUser: originalUser[0]},
        this.props.session,
        this.handleDeleteUser
      )
  
    }

  }

  handleDeleteUser = (response) => {
    this.props.dispatch({type: "CLEAR_UPDATE_USER_FEEDBACK"})

    if (response.feedback.status === "success") {
      this.props.dispatch({type: 'CLEAR_SETTINGS_VIEWS'})
      this.setState({redirect: true})
      return false
    }
    
    this.props.dispatch({type: "UPDATE_USER_FEEDBACK", feedback: {form: {...response.feedback}}})

    // this.setState({deleteError: true})

  }
  
  render () {
    const {userId} = this.props.routeData.params
    const {updateUser, updateUserFeedback} = this.props.settings || {}
    const { styles, userRoles } = this.props.environment || {}
    const roleOptions = transformObjectIntoOptions(userRoles, {value: 'type' , label: 'title'})
    const { sendEmailToNewUser, redirect, cancelButtonLabel, validationError, deleteError } = this.state || {}
    const isUniqueDentist = this.isUniqueDentist()
    if (redirect) {
      return <Redirect to='/settings/users' />
    }
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
            disabled={isUniqueDentist.error}
            title={isUniqueDentist.feedback}
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
          <CancelButton onClick={this.cancel}>{cancelButtonLabel}</CancelButton>
          <Button disabled={Boolean(cancelButtonLabel || validationError)} title={cancelButtonLabel ? 'You must edit the user\'s info before saving the changes.' : undefined} onClick={this.updateUser}>{isNaN(userId) ? "Create User" : "Update User"}</Button>
          <SecondaryButton hidden={Boolean(isNaN(userId))} disabled={Boolean(!updateUser || !updateUser.email || !cancelButtonLabel)} title={!updateUser || !updateUser.email ? "You must enter the email address of the user before resetting their password." : !cancelButtonLabel ? "You must update the user before resetting their password." : undefined} onClick={this.sendForgotPasswordEmail}>Reset Password</SecondaryButton>
          <DangerButton hidden={Boolean(isNaN(userId))} disabled={Boolean(isUniqueDentist.error || deleteError)} title={isUniqueDentist.feedback2 || (deleteError ? "This user can not be deleted." : undefined)} onClick={this.deleteUser}>Delete User</DangerButton>
        </Block>
      </Block>
    )
  }
}
const UpdateUserForm = connect(mapStateToProps)(UpdateUserFormComponent)

export default UpdateUserForm