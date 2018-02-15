import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import apiRequestHandler from './../Utility/apiRequestHandler'
import RouteLink from './RouteLink'
import Block from './Web/Block'
import Button from './Web/Button'
import FormGroup from './Web/Input/FormGroup'
import Feedback from './Feedback'

class SignInFormComponent extends Component {
  componentWillMount = () => {
    this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: undefined})
    this.props.dispatch({type: 'RESUBMIT_OK'})
  }
  storeLogin = (input) => {
    this.props.dispatch({type: 'STORE_LOGIN', ...input})
    this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: undefined})
    this.props.dispatch({type: 'RESUBMIT_OK'})
  }
  signIn = () => {
    const {login, allowResubmit} = this.props.session

    if (!login) {
      this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: {message: 'Please enter your username and password.', status: 'validationError'}})
      return false
    }
    else if (!login.email) {
      this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: {message: 'Please enter your username.', status: 'validationError'}})
      return false
    }
    else if (!login.password) {
      this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: {message: 'Please enter your password.', status: 'validationError'}})
      return false
    }
    else if (!allowResubmit) {
      return false
    }

    apiRequestHandler(
      'post',
      'signIn',
      {login: login},
      {},
      this.handleSignInResponse
    )
    
  }
  handleSignInResponse = (response) => {
    if (response.feedback.status === 'success') {
      this.props.dispatch({type: 'AUTH_SUCCESS', ...response.session})
      if (response.session.user) {
        this.props.dispatch({type: 'SET_LOCALSTORAGE_USER', user: {...response.session.user}})        
      }
      else if (response.session.supportUser) {
        this.props.dispatch({type: 'SET_LOCALSTORAGE_SUPPORTUSER', supportUser: {...response.session.supportUser}})        
      }
    }
    else if (response.feedback.status === 'unauthorized') {
      this.props.dispatch({type: 'AUTH_FEEDBACK', feedback: {...response.feedback}})
    }
  }
  render () {
    const { styles } = this.props.environment
    let {feedback, login} = this.props.session
    return (
      <Block style={styles.signInForm}>
        <FormGroup
          label='Email'
          name='email'
          value={(login || {}).email}
          onChange={this.storeLogin}
          onPressEnter={this.signIn}
        />
        <FormGroup
          label='Password'
          name='password'
          type='password'
          value={(login || {}).password}
          onChange={this.storeLogin}
          onPressEnter={this.signIn}
        />
        <Feedback feedback={feedback} />
        <Button onClick={this.signIn}>Sign In</Button>
        <Block style={styles.forgotPassword}>
          <RouteLink to='/signIn/help/'>Forgot password?</RouteLink>
        </Block>
      </Block>
    )  
  }
}
const SignInForm = connect(mapStateToProps)(SignInFormComponent)

export default SignInForm