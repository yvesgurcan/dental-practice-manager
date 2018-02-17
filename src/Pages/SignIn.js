import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './../Store/mapStateToProps'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import SignInBody from './../Components/Bodies/SignInBody'

class SignInComponent extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PublicPageWrapper>
        <SignInBody />
      </PublicPageWrapper>
    )  
  }
}
const SignIn = connect(mapStateToProps)(SignInComponent)

export default SignIn