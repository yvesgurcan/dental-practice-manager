import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import Block from './Web/Block'
import Label from './Web/Label'
import Button from './Web/Button'
import Textbox from './Web/Input/Textbox'
import styles from './../Styles/styles'

class SignInFormComponent extends Component {
  storeLogin = (input) => {
    this.props.dispatch({type: "STORE_LOGIN", ...input})
  }
  signIn = () => {
    const {login} = this.props.session
    apiRequestHandler(
      "post",
      "signIn",
      login,
      this.handleSignInResponse
    )
  }
  handleSignInResponse = (response) => {
    console.log("yo!")
    this.props.dispatch({type: "AUTH_SUCCESS", user: response.user, client: response.client})
  }
  render () {
    return (
      <Block style={styles.signInForm}>
          <Label>Email</Label>
          <Block>
            <Textbox name="user" onChange={this.storeLogin} onPressEnter={this.signIn} style={{width: "100%"}}  />
          </Block>
          <Label>Password</Label>
          <Block>
            <Textbox name="password" type="password" onChange={this.storeLogin} onPressEnter={this.signIn} style={{width: "100%"}} />
          </Block>
          <Button onClick={this.signIn}>Sign In</Button>
      </Block>
    )  
  }
}
const SignInForm = connect(mapStateToProps)(SignInFormComponent)

export default SignInForm