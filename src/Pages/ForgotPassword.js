import React, { Component } from 'react'
import PublicPageWrapper from './../Components/PublicPageWrapper'
import PageHeader from './../Components/Web/PageHeader'
import ForgotPasswordForm from './../Components/ForgotPasswordForm'

class ForgotPassword extends Component {
  componentWillMount () {
    this.props.dispatch({type: "STORE_ROUTE", ...this.props.match})
  }
  render () {
    return (
      <PublicPageWrapper>
        <PageHeader>Dental Practice Manager</PageHeader>
          <ForgotPasswordForm />
      </PublicPageWrapper>
    )  
  }
}

export default ForgotPassword