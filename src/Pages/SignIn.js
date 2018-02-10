import React, { Component } from 'react'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import PageHeader from './../Components/Web/PageHeader'
import SignInForm from './../Components/SignInForm'

class Login extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PublicPageWrapper>
        <PageHeader>Dental Practice Manager</PageHeader>
          <SignInForm />
      </PublicPageWrapper>
    )  
  }
}

export default Login