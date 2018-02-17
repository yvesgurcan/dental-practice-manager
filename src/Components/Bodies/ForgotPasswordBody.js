import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageHeader from './../Web/PageHeader'
import Block from './../Web/Block'
import ForgotPasswordForm from './../Forms/ForgotPasswordForm'

class SignInBodyComponent extends Component {
  render () {
    return (
      <Block>
        <PageHeader>Dental Practice Manager</PageHeader>
        <ForgotPasswordForm />
      </Block>
    )  
  }
}
const SignInBody = connect(mapStateToProps)(SignInBodyComponent)

export default SignInBody