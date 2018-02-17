import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../../Store/mapStateToProps'
import PageHeader from './../Web/PageHeader'
import Block from './../Web/Block'
import SignInForm from './../Forms/SignInForm'

class SignInBodyComponent extends Component {
  render () {
    return (
      <Block>
        <PageHeader>Dental Practice Manager</PageHeader>
          <SignInForm />
      </Block>
    )  
  }
}
const SignInBody = connect(mapStateToProps)(SignInBodyComponent)

export default SignInBody