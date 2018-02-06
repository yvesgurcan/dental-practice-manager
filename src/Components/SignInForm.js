import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import Textbox from './Web/Input/Textbox'
import Feedback from './Feedback'
import styles from './../Styles/styles'

class SignInFormComponent extends Component {
  storeLogin = (input) => {
    this.props.dispatch({type: "STORE_LOGIN", ...input})
    this.props.dispatch({type: "AUTH_FEEDBACK", feedback: undefined})
    this.props.dispatch({type: "RESUBMIT_OK"})
  }
  signIn = () => {
    const {login, allowResubmit} = this.props.session

    if (!login) {
      this.props.dispatch({type: "AUTH_FEEDBACK", feedback: {message: "Please enter your username and password.", status: "unauthorized"}})
      return false
    }
    else if (!login.email) {
      this.props.dispatch({type: "AUTH_FEEDBACK", feedback: {message: "Please enter your username.", status: "unauthorized"}})
      return false
    }
    else if (!login.password) {
      this.props.dispatch({type: "AUTH_FEEDBACK", feedback: {message: "Please enter your password.", status: "unauthorized"}})
      return false
    }
    else if (!allowResubmit) {
      return false
    }

    apiRequestHandler(
      "post",
      "signIn",
      {login: login},
      {},
      this.handleSignInResponse
    )
  }
  handleSignInResponse = (response) => {
    if (response.feedback.status === "success") {
      this.props.dispatch({type: "AUTH_SUCCESS", ...response.session})
    }
    else if (response.feedback.status === "unauthorized") {
      this.props.dispatch({type: "AUTH_FEEDBACK", feedback: {...response.feedback}})
    }
  }
  render () {
    let {feedback} = this.props.session
    return (
      <Block style={styles.signInForm}>
          <Label>Email</Label>
          <Block>
            <Textbox name="email" onChange={this.storeLogin} onPressEnter={this.signIn} style={{width: "100%"}}  />
          </Block>
          <Label>Password</Label>
          <Block>
            <Textbox name="password" type="password" onChange={this.storeLogin} onPressEnter={this.signIn} style={{width: "100%"}} />
          </Block>
          <Feedback feedback={feedback} />
          <Button onClick={this.signIn}>Sign In</Button>
      </Block>
    )  
  }
}
const SignInForm = connect(mapStateToProps)(SignInFormComponent)

export default SignInForm