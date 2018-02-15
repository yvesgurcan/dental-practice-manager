import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import RouteLink from './RouteLink'
import Block from './Web/Block'
import Button from './Web/Button'
import SectionHeader from './Web/SectionHeader'
import FormGroup from './Web/Input/FormGroup'

class ForgotPasswordFormComponent extends Component {
  componentWillMount = () => {
    this.props.dispatch({type: "AUTH_HELP_FEEDBACK", feedback: undefined})
    this.props.dispatch({type: "CLEAR_PASSWORD"})
    this.props.dispatch({type: "RESUBMIT_OK"})
  }
  storeEmail = (input) => {
    this.props.dispatch({type: "STORE_LOGIN", ...input})
    this.props.dispatch({type: "AUTH_HELP_FEEDBACK", feedback: undefined})
    this.props.dispatch({type: "RESUBMIT_OK"})
  }
  sendEmail = () => {
    const {login, allowResubmit} = this.props.session

    if (!login || !login.email) {
      this.props.dispatch({type: "AUTH_HELP_FEEDBACK", feedback: {message: "Please enter your username.", status: "validationError"}})
      return false
    }
    else if (!allowResubmit) {
      return false
    }

    apiRequestHandler(
      "post",
      "accountRecovery",
      {email: login.email},
      {},
      this.handleAccountRecoveryResponse
    )
  }
  handleAccountRecoveryResponse = (response) => {
    if (response.feedback.status === "success") {
      this.props.dispatch({type: "AUTH_HELP_FEEDBACK", feedback: {...response.feedback}})
    }
    else if (response.feedback.status === "unauthorized") {
      this.props.dispatch({type: "AUTH_HELP_FEEDBACK", feedback: {...response.feedback}})
    }
  }
  render () {
    const { styles } = this.props.environment
    let {recoveryFeedback, login} = this.props.session
    return (
      <Block style={styles.signInForm}>
        <SectionHeader>Account Recovery</SectionHeader>
        <FormGroup
          label='Email'
          name='email'
          value={(login || {}).email}
          onChange={this.storeEmail}
          onPressEnter={this.sendEmail}
          feedback={recoveryFeedback}
        />
        <Button onClick={this.sendEmail}>Send Instructions</Button>
        <Block style={styles.forgotPassword}>
          <RouteLink to='/signIn'>I remember my password now!</RouteLink>
        </Block>
      </Block>
    )  
  }
}
const ForgotPasswordForm = connect(mapStateToProps)(ForgotPasswordFormComponent)

export default ForgotPasswordForm